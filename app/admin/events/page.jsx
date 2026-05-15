import Link from "next/link";

// Dummy events data
const events = [
  { id: 1, name: "Tech Innovation Summit 2026", organizer: "Tech Leaders Inc.", date: "May 20, 2026", status: "Active", bookings: 342 },
  { id: 2, name: "Jazz in the Park", organizer: "NYC Music Foundation", date: "May 25, 2026", status: "Active", bookings: 1240 },
  { id: 3, name: "Business Leaders Conference", organizer: "Business Network", date: "June 1, 2026", status: "Active", bookings: 876 },
  { id: 4, name: "Crypto & Blockchain Expo", organizer: "Digital Futures", date: "June 5, 2026", status: "Active", bookings: 654 },
  { id: 5, name: "Startup Pitch Competition", organizer: "Innovation Hub", date: "June 15, 2026", status: "Cancelled", bookings: 0 },
];

export default function AdminEventsPage() {
  const activeEvents = events.filter((e) => e.status === "Active").length;
  const totalBookings = events.reduce((sum, e) => sum + e.bookings, 0);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container-max">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="font-source text-[#b8960c] hover:text-[#0f172a] transition-colors mb-4 inline-block">
            ← Back to Admin
          </Link>
          <h1 className="font-playfair text-4xl font-bold text-[#0f172a]">Manage Events</h1>
          <p className="font-source text-gray-600 mt-2">
            {events.length} total events • {activeEvents} active • {totalBookings.toLocaleString()} total bookings
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6">
            <p className="font-source text-sm text-gray-600 mb-2">Total Events</p>
            <p className="font-playfair text-3xl font-bold text-[#b8960c]">
              {events.length}
            </p>
          </div>
          <div className="card p-6">
            <p className="font-source text-sm text-gray-600 mb-2">Active Events</p>
            <p className="font-playfair text-3xl font-bold text-[#b8960c]">
              {activeEvents}
            </p>
          </div>
          <div className="card p-6">
            <p className="font-source text-sm text-gray-600 mb-2">Total Bookings</p>
            <p className="font-playfair text-3xl font-bold text-[#b8960c]">
              {totalBookings.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Events Table */}
        <div className="card p-6">
          {/* Desktop Table */}
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full font-source text-sm">
              <thead>
                <tr className="border-b border-[#e7e5e4]">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Event Name</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Organizer</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">Bookings</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b border-[#e7e5e4] hover:bg-[#f5f5f4] transition-colors">
                    <td className="py-4 px-4 text-gray-900">{event.name}</td>
                    <td className="py-4 px-4 text-gray-600">{event.organizer}</td>
                    <td className="py-4 px-4 text-gray-600">{event.date}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        event.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-semibold text-gray-900">
                      {event.bookings.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="font-source text-sm text-[#b8960c] hover:text-[#0f172a] transition-colors">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-[#f5f5f4] p-4 rounded-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{event.name}</p>
                    <p className="font-source text-sm text-gray-600">{event.organizer}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    event.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {event.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600 mb-3">
                  <p>📅 {event.date}</p>
                  <p>🎫 {event.bookings.toLocaleString()} bookings</p>
                </div>
                <button className="font-source text-sm text-[#b8960c] hover:text-[#0f172a] transition-colors">
                  Edit Event
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
