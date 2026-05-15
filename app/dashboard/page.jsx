import Link from "next/link";
import BookingStatusBadge from "@/components/BookingStatusBadge";

// Dummy user data
const userData = {
  name: "Sarah Anderson",
  email: "sarah@example.com",
  stats: {
    registeredEvents: 12,
    upcomingEvents: 4,
    totalSpent: 450,
  },
  bookings: [
    {
      id: 1,
      eventName: "Tech Innovation Summit 2026",
      date: "May 20, 2026",
      status: "Confirmed",
      tickets: 2,
      price: 198,
    },
    {
      id: 2,
      eventName: "Jazz in the Park",
      date: "May 25, 2026",
      status: "Pending",
      tickets: 4,
      price: 0,
    },
    {
      id: 3,
      eventName: "Business Leaders Conference",
      date: "June 1, 2026",
      status: "Confirmed",
      tickets: 1,
      price: 149,
    },
    {
      id: 4,
      eventName: "Crypto & Blockchain Expo",
      date: "June 5, 2026",
      status: "Completed",
      tickets: 1,
      price: 79,
    },
  ],
};

export default function DashboardPage() {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container-max">
        {/* Welcome Header */}
        <div className="mb-12">
          <h1 className="font-playfair text-4xl font-bold mb-2 text-[#0f172a]">
            Welcome back, {userData.name}
          </h1>
          <p className="font-source text-gray-600">
            Manage your events and bookings from your personal dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6">
            <p className="font-source text-sm text-gray-600 mb-2">Registered Events</p>
            <p className="font-playfair text-3xl font-bold text-[#b8960c]">
              {userData.stats.registeredEvents}
            </p>
          </div>
          <div className="card p-6">
            <p className="font-source text-sm text-gray-600 mb-2">Upcoming Events</p>
            <p className="font-playfair text-3xl font-bold text-[#b8960c]">
              {userData.stats.upcomingEvents}
            </p>
          </div>
          <div className="card p-6">
            <p className="font-source text-sm text-gray-600 mb-2">Total Spent</p>
            <p className="font-playfair text-3xl font-bold text-[#b8960c]">
              ${userData.stats.totalSpent}
            </p>
          </div>
        </div>

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
          <h2 className="font-playfair text-2xl font-bold mb-6 text-[#0f172a]">
            Recent Bookings
          </h2>

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
                {userData.bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-[#e7e5e4] hover:bg-[#f5f5f4] transition-colors">
                    <td className="py-4 px-4 text-gray-900">{booking.eventName}</td>
                    <td className="py-4 px-4 text-gray-600">{booking.date}</td>
                    <td className="py-4 px-4">
                      <BookingStatusBadge status={booking.status} />
                    </td>
                    <td className="py-4 px-4 text-gray-900">{booking.tickets}</td>
                    <td className="py-4 px-4 text-right font-semibold text-gray-900">
                      {booking.price === 0 ? "Free" : `$${booking.price}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for mobile */}
          <div className="md:hidden space-y-4">
            {userData.bookings.map((booking) => (
              <div key={booking.id} className="bg-[#f5f5f4] p-4 rounded-sm">
                <p className="font-semibold text-gray-900 mb-2">{booking.eventName}</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>📅 {booking.date}</p>
                  <p>🎫 {booking.tickets} ticket(s)</p>
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-[#e7e5e4]">
                    <BookingStatusBadge status={booking.status} />
                    <span className="font-semibold text-gray-900">
                      {booking.price === 0 ? "Free" : `$${booking.price}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
