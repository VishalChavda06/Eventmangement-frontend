'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminBookingsPage() {
  const router = useRouter();

  // State
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  // Fetch all bookings on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (!token || !user) {
          router.push('/');
          return;
        }

        const parsedUser = JSON.parse(user);
        if (parsedUser.role !== 'admin') {
          router.push('/');
          return;
        }

        const response = await fetch(
          'http://localhost:9090/api/admin/bookings',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

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

  // Filter bookings based on status
  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

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
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600 text-center">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-[#0f172a] font-serif mb-8">
          All Bookings
        </h1>

        {/* Error state */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Filter pills */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'confirmed', 'cancelled', 'pending'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-[#0f172a] text-white'
                  : 'bg-white border border-[#0f172a] text-[#0f172a] hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filteredBookings.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <p className="text-gray-600">No bookings found</p>
          </div>
        )}

        {/* Bookings table */}
        {filteredBookings.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">#</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">User</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Event</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Organizer</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Seats</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Amount</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-3 text-gray-900">{index + 1}</td>
                    <td className="px-6 py-3">
                      <div>
                        <p className="font-medium text-gray-900">
                          {booking.user?.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {booking.user?.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-gray-900">
                      {booking.event?.title}
                    </td>
                    <td className="px-6 py-3 text-gray-900">
                      {booking.event?.organizer?.name}
                    </td>
                    <td className="px-6 py-3 text-gray-900">
                      {booking.seatsBooked}
                    </td>
                    <td className="px-6 py-3 text-gray-900">
                      {booking.totalAmount === 0
                        ? 'Free'
                        : `$${booking.totalAmount.toFixed(2)}`}
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-3 text-gray-600">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
