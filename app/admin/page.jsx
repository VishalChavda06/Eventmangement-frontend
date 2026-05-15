import Link from "next/link";

// Dummy admin data
const adminStats = {
  totalUsers: 5240,
  totalEvents: 342,
  totalBookings: 18500,
  revenue: 125340,
  monthlyGrowth: 12,
};

const recentUsers = [
  { id: 1, name: "Sarah Johnson", email: "sarah@example.com", joinDate: "May 10, 2026", status: "Active" },
  { id: 2, name: "Michael Chen", email: "michael@example.com", joinDate: "May 9, 2026", status: "Active" },
  { id: 3, name: "Emma Wilson", email: "emma@example.com", joinDate: "May 8, 2026", status: "Active" },
];

const recentEvents = [
  { id: 1, name: "Tech Innovation Summit 2026", organizer: "Tech Leaders Inc.", date: "May 20, 2026", bookings: 342 },
  { id: 2, name: "Jazz in the Park", organizer: "NYC Music Foundation", date: "May 25, 2026", bookings: 1240 },
  { id: 3, name: "Business Leaders Conference", organizer: "Business Network", date: "June 1, 2026", bookings: 876 },
];

export default function AdminPage() {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container-max">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-playfair text-4xl font-bold mb-2 text-[#0f172a]">
            Admin Dashboard
          </h1>
          <p className="font-source text-gray-600">
            Manage events, users, and bookings across the platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-source text-sm text-gray-600 mb-2">Total Users</p>
                <p className="font-playfair text-3xl font-bold text-[#0f172a]">
                  {adminStats.totalUsers.toLocaleString()}
                </p>
              </div>
              <svg className="w-12 h-12 text-[#b8960c] opacity-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-source text-sm text-gray-600 mb-2">Total Events</p>
                <p className="font-playfair text-3xl font-bold text-[#0f172a]">
                  {adminStats.totalEvents.toLocaleString()}
                </p>
              </div>
              <svg className="w-12 h-12 text-[#b8960c] opacity-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7h4v2h-4z" />
              </svg>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-source text-sm text-gray-600 mb-2">Total Bookings</p>
                <p className="font-playfair text-3xl font-bold text-[#0f172a]">
                  {adminStats.totalBookings.toLocaleString()}
                </p>
              </div>
              <svg className="w-12 h-12 text-[#b8960c] opacity-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 5.1L21.97 16H12.6L6 6.6h9V5.1zM3 5.5C3 4.12 4.12 3 5.5 3S8 4.12 8 5.5 6.88 8 5.5 8 3 6.88 3 5.5z" />
              </svg>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-source text-sm text-gray-600 mb-2">Total Revenue</p>
                <p className="font-playfair text-3xl font-bold text-[#0f172a]">
                  ${(adminStats.revenue / 1000).toFixed(1)}K
                </p>
              </div>
              <svg className="w-12 h-12 text-[#b8960c] opacity-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Admin Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link href="/admin/users" className="card p-6 hover:shadow-lg transition-shadow">
            <svg className="w-8 h-8 text-[#b8960c] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8.048M12 2C6.477 2 2 6.463 2 12s4.477 10 10 10 10-4.463 10-10S17.523 2 12 2zm0 20c-5.514 0-10-4.486-10-10S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
            <h3 className="font-playfair text-xl font-bold mb-2 text-[#0f172a]">Manage Users</h3>
            <p className="font-source text-gray-600 text-sm">View and manage user accounts</p>
          </Link>

          <Link href="/admin/events" className="card p-6 hover:shadow-lg transition-shadow">
            <svg className="w-8 h-8 text-[#b8960c] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="font-playfair text-xl font-bold mb-2 text-[#0f172a]">Manage Events</h3>
            <p className="font-source text-gray-600 text-sm">Oversee all events on the platform</p>
          </Link>
        </div>

        {/* Recent Users */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h2 className="font-playfair text-2xl font-bold mb-6 text-[#0f172a]">
              Recent Users
            </h2>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between pb-4 border-b border-[#e7e5e4]">
                  <div>
                    <p className="font-source font-semibold text-gray-900">{user.name}</p>
                    <p className="font-source text-sm text-gray-600">{user.email}</p>
                    <p className="font-source text-xs text-gray-500 mt-1">Joined {user.joinDate}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-source font-semibold rounded-full">
                    {user.status}
                  </span>
                </div>
              ))}
            </div>
            <Link href="/admin/users" className="btn-outline w-full text-center mt-6">
              View All Users
            </Link>
          </div>

          {/* Recent Events */}
          <div className="card p-6">
            <h2 className="font-playfair text-2xl font-bold mb-6 text-[#0f172a]">
              Recent Events
            </h2>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between pb-4 border-b border-[#e7e5e4]">
                  <div>
                    <p className="font-source font-semibold text-gray-900">{event.name}</p>
                    <p className="font-source text-sm text-gray-600">by {event.organizer}</p>
                    <p className="font-source text-xs text-gray-500 mt-1">{event.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-source font-semibold text-gray-900">{event.bookings}</p>
                    <p className="font-source text-xs text-gray-600">bookings</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/admin/events" className="btn-outline w-full text-center mt-6">
              View All Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
