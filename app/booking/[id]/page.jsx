'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function BookingPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  // State
  const [event, setEvent] = useState(null);
  const [seatsBooked, setSeatsBooked] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  // Fetch event details and check for existing booking on mount
  useEffect(() => {
    const fetchEventAndCheckBooking = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        // Fetch event details
        const eventResponse = await fetch(`http://localhost:9090/api/events/${id}`);
        const eventData = await eventResponse.json();

        if (eventResponse.ok) {
          setEvent(eventData.data);
        } else {
          setFetchError(eventData.message || 'Failed to fetch event');
        }

        // Check if user has already booked this event
        const bookingsResponse = await fetch('http://localhost:9090/api/bookings/my', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const bookingsData = await bookingsResponse.json();
        if (bookingsResponse.ok) {
          const userBookings = bookingsData.data;
          const hasBooked = userBookings.some(
            (booking) => booking.event._id === id && booking.status !== 'cancelled'
          );
          setAlreadyBooked(hasBooked);
        }
      } catch (err) {
        setFetchError('Error fetching event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndCheckBooking();
  }, [id, router]);

  // Handle booking submission
  const handleBook = async () => {
    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:9090/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          eventId: id,
          seatsBooked
        })
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/booking/${id}/success?ticket=${data.data.ticket.ticketCode}`);
      } else {
        setError(data.message || 'Booking failed');
      }
    } catch (err) {
      setError('Error creating booking');
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf9]">
        <p className="text-gray-600">Loading event details...</p>
      </div>
    );
  }

  // Fetch error state
  if (fetchError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf9] p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center">
          {fetchError}
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf9]">
        <p className="text-gray-600">Event not found</p>
      </div>
    );
  }

  const totalAmount = event.isFree ? 0 : event.price * seatsBooked;

  return (
    <div className="min-h-screen bg-[#fafaf9] py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Main booking card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          {/* Event Summary Section */}
          <div className="mb-6">
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            <h1 className="text-2xl font-bold text-[#0f172a] font-serif mb-4">
              {event.title}
            </h1>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>
                  {new Date(event.date).toLocaleDateString()} at{' '}
                  {event.time}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{event.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <span>👤</span>
                <span>Organized by {event.organizer?.name || 'Unknown'}</span>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <span className="font-semibold text-[#0f172a]">
                  {event.isFree ? 'Free' : `$${event.price} per seat`}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6 border-gray-200" />

          {/* Booking Section */}
          {!alreadyBooked && (
            <div>
              <h2 className="text-lg font-bold text-[#0f172a] font-serif mb-4">
                Select Seats
              </h2>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3">
                  Available: {event.availableSeats} seats
                </p>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Seats
                </label>
                <input
                  type="number"
                  min="1"
                  max={event.availableSeats}
                  value={seatsBooked}
                  onChange={(e) => setSeatsBooked(parseInt(e.target.value) || 1)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                />
              </div>

              {/* Total Amount */}
              <div className="flex justify-between items-center mb-6 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  Total Amount
                </span>
                <span className="text-xl font-bold text-[#0f172a]">
                  {event.isFree ? 'Free' : `$${totalAmount.toFixed(2)}`}
                </span>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Already Booked Message */}
          {alreadyBooked && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700 text-center font-semibold">
                ✓ You have already booked this event
              </p>
              <p className="text-blue-600 text-sm text-center mt-2">
                Check your booking details in the dashboard
              </p>
            </div>
          )}

          {/* Confirm Booking Button */}
          {alreadyBooked ? (
            <Link
              href="/dashboard/bookings"
              className="w-full block text-center bg-[#0f172a] text-white rounded-md px-4 py-2.5 font-semibold hover:bg-[#1e293b] transition-colors duration-200"
            >
              View My Bookings
            </Link>
          ) : (
            <button
              onClick={handleBook}
              disabled={submitting}
              className="w-full bg-[#0f172a] text-white rounded-md px-4 py-2.5 font-semibold hover:bg-[#1e293b] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Booking...' : 'Confirm Booking'}
            </button>
          )}

          {/* Back link */}
          <div className="mt-4 text-center">
            <Link
              href={`/events/${id}`}
              className="text-sm text-[#0f172a] hover:underline"
            >
              ← Back to Event
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
