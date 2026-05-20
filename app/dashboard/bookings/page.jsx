'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BookingsPage() {
  const router = useRouter();

  // State
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(null);

  // Fetch user's bookings on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('http://localhost:9090/api/bookings/my', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setBookings(data.data);
        } else {
          setError(data.message || 'Failed to fetch bookings');
        }
      } catch (err) {
        setError('Error fetching bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  // Handle cancel booking
  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    setCancelling(bookingId);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:9090/api/bookings/${bookingId}/cancel`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Update booking in place
        setBookings(
          bookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: 'cancelled' }
              : booking
          )
        );
      } else {
        alert(data.message || 'Failed to cancel booking');
      }
    } catch (err) {
      alert('Error cancelling booking');
    } finally {
      setCancelling(null);
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    if (status === 'confirmed') {
      return (
        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-medium">
          Confirmed
        </span>
      );
    } else if (status === 'cancelled') {
      return (
        <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded text-xs font-medium">
          Cancelled
        </span>
      );
    } else if (status === 'pending') {
      return (
        <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-xs font-medium">
          Pending
        </span>
      );
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf9] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-center">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-[#0f172a] font-serif mb-6">
          My Bookings
        </h1>

        {/* Error state */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Empty state */}
        {bookings.length === 0 && !error && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <p className="text-gray-600 mb-6">No bookings yet</p>
            <Link
              href="/events"
              className="inline-block bg-[#0f172a] text-white rounded-md px-6 py-2.5 font-semibold hover:bg-[#1e293b] transition-colors duration-200"
            >
              Browse Events
            </Link>
          </div>
        )}

        {/* Bookings list */}
        {bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                {/* Left side - Event info */}
                <div className="flex-1">
                  {booking.event?.image && (
                    <img
                      src={booking.event.image}
                      alt={booking.event.title}
                      className="w-16 h-16 rounded object-cover mb-4 md:mb-0 md:float-left md:mr-4"
                    />
                  )}

                  <div>
                    <h3 className="font-bold text-[#0f172a] mb-1">
                      {booking.event?.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      📅 {new Date(booking.event?.date).toLocaleDateString()} at{' '}
                      {booking.event?.time}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      📍 {booking.event?.location}
                    </p>
                    <p className="text-sm text-gray-600">
                      👤 Organized by {booking.event?.organizer?.name}
                    </p>
                  </div>
                </div>

                {/* Right side - Details and actions */}
                <div className="md:text-right">
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">
                      {booking.seatsBooked} seat(s)
                    </p>
                    <p className="font-bold text-[#0f172a] text-lg">
                      {booking.totalAmount === 0
                        ? 'Free'
                        : `$${booking.totalAmount.toFixed(2)}`}
                    </p>
                    <div className="mt-2">
                      <StatusBadge status={booking.status} />
                    </div>
                  </div>

                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      disabled={cancelling === booking._id}
                      className="border border-red-500 text-red-500 rounded-md px-4 py-1.5 text-sm font-medium hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {cancelling === booking._id ? 'Cancelling...' : 'Cancel'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
