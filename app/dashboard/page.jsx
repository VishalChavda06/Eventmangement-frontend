"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookingStatusBadge from "@/components/BookingStatusBadge";

export default function DashboardPage() {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const u = localStorage.getItem("user");
      return u ? JSON.parse(u) : null;
    } catch (err) {
      return null;
    }
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
      return;
    }

    const loadProfileAndBookings = async () => {
      try {
        const response = await fetch("http://localhost:9090/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Unauthorized");
        }
        const data = await response.json();
        const profile = data.data || data.user || data;
        setUser(profile);
        localStorage.setItem("user", JSON.stringify(profile));

        // Fetch user's bookings
        const bookingsResponse = await fetch("http://localhost:9090/api/bookings/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (bookingsResponse.ok) {
          const bookingsData = await bookingsResponse.json();
          setBookings(bookingsData.data || []);
        }
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadProfileAndBookings();
  }, [router]);

  if (loading) return null;
  if (!user) return null;

  // Calculate stats from real bookings
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const totalSpent = confirmedBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const upcomingBookings = confirmedBookings.filter(b => {
    const eventDate = new Date(b.event?.date);
    return eventDate > new Date();
  }).length;

  const stats = {
    registeredEvents: bookings.length,
    upcomingEvents: upcomingBookings,
    totalSpent: totalSpent.toFixed(2)
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container-max">
        {/* Welcome Header */}
        <div className="mb-12">
          <h1 className="font-playfair text-4xl font-bold mb-2 text-[#0f172a]">
            Welcome back, {user.name || user.email}
          </h1>
          <p className="font-source text-gray-600">Manage your events and bookings from your personal dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6">
            <p className="font-source text-sm text-gray-600 mb-2">Registered Events</p>
            <p className="font-playfair text-3xl font-bold text-[#b8960c]">{stats.registeredEvents}</p>
          </div>
          <div className="card p-6">
            <p className="font-source text-sm text-gray-600 mb-2">Upcoming Events</p>
            <p className="font-playfair text-3xl font-bold text-[#b8960c]">{stats.upcomingEvents}</p>
          </div>
          <div className="card p-6">
            <p className="font-source text-sm text-gray-600 mb-2">Total Spent</p>
            <p className="font-playfair text-3xl font-bold text-[#b8960c]">${stats.totalSpent}</p>
          </div>
        </div>

        {user.role === "organizer" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Link href="/organizer/create-event" className="card p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-playfair text-xl font-bold mb-3 text-[#0f172a]">Create a New Event</h3>
              <p className="font-source text-gray-600 text-sm">
                Publish your next event and make it visible to attendees across the platform.
              </p>
            </Link>
            <Link href="/events" className="card p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-playfair text-xl font-bold mb-3 text-[#0f172a]">View Published Events</h3>
              <p className="font-source text-gray-600 text-sm">
                See the live events you have created and verify they are visible to users.
              </p>
            </Link>
          </div>
        )}

        {/* Dashboard Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link href="/dashboard/bookings" className="card p-6 hover:shadow-lg transition-shadow">
            <svg className="w-8 h-8 text-[#b8960c] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
            </svg>
            <h3 className="font-playfair text-xl font-bold mb-2 text-[#0f172a]">My Bookings</h3>
            <p className="font-source text-gray-600 text-sm">View and manage all your event bookings</p>
          </Link>

          <Link href="/dashboard/notifications" className="card p-6 hover:shadow-lg transition-shadow">
            <svg className="w-8 h-8 text-[#b8960c] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <h3 className="font-playfair text-xl font-bold mb-2 text-[#0f172a]">Notifications</h3>
            <p className="font-source text-gray-600 text-sm">Stay updated with event reminders</p>
          </Link>
        </div>

        {/* Recent Bookings Table */}
        <div className="card p-6">
          <h2 className="font-playfair text-2xl font-bold mb-6 text-[#0f172a]">Recent Bookings</h2>

          {/* Table for larger screens */}
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full font-source text-sm">
              <thead>
                <tr className="border-b border-[#e7e5e4]">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Event Name</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Tickets</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking._id} className="border-b border-[#e7e5e4] hover:bg-[#f5f5f4] transition-colors">
                      <td className="py-4 px-4 text-gray-900">{booking.event?.title || 'Unknown Event'}</td>
                      <td className="py-4 px-4 text-gray-600">{new Date(booking.event?.date).toLocaleDateString()}</td>
                      <td className="py-4 px-4"><BookingStatusBadge status={booking.status} /></td>
                      <td className="py-4 px-4 text-gray-900">{booking.seatsBooked}</td>
                      <td className="py-4 px-4 text-right font-semibold text-gray-900">{booking.totalAmount === 0 ? "Free" : `$${booking.totalAmount.toFixed(2)}`}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 px-4 text-center text-gray-600">
                      No bookings yet. <Link href="/events" className="text-[#0f172a] hover:underline">Explore events</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Cards for mobile */}
          <div className="md:hidden space-y-4">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div key={booking._id} className="bg-[#f5f5f4] p-4 rounded-sm">
                  <p className="font-semibold text-gray-900 mb-2">{booking.event?.title || 'Unknown Event'}</p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>📅 {new Date(booking.event?.date).toLocaleDateString()}</p>
                    <p>🎫 {booking.seatsBooked} ticket(s)</p>
                    <div className="flex justify-between items-center pt-2 mt-2 border-t border-[#e7e5e4]">
                      <BookingStatusBadge status={booking.status} />
                      <span className="font-semibold text-gray-900">{booking.totalAmount === 0 ? "Free" : `$${booking.totalAmount.toFixed(2)}`}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600 py-8">
                No bookings yet. <Link href="/events" className="text-[#0f172a] hover:underline">Explore events</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
