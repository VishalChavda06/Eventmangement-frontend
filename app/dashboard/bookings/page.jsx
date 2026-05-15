import Link from "next/link";
import BookingStatusBadge from "@/components/BookingStatusBadge";

// Dummy bookings data
const bookings = [
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
    status: "Cancelled",
    tickets: 1,
    price: 79,
  },
];

export default function BookingsPage() {
  const totalValue = bookings.reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container-max">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="font-source text-[#b8960c] hover:text-[#0f172a] transition-colors mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="font-playfair text-4xl font-bold text-[#0f172a]">My Bookings</h1>
          <p className="font-source text-gray-600 mt-2">
            Manage and track all your event bookings
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6">
            <p className="font-source text-sm text-gray-600 mb-2">Total Bookings</p>
            <p className="font-playfair text-3xl font-bold text-[#b8960c]">
              {bookings.length}
            </p>
          </div>
          <div className="card p-6">
            <p className="font-source text-sm text-gray-600 mb-2">Total Spent</p>
            <p className="font-playfair text-3xl font-bold text-[#b8960c]">
              ${totalValue}
            </p>
          </div>
          <div className="card p-6">
            <p className="font-source text-sm text-gray-600 mb-2">Confirmed</p>
            <p className="font-playfair text-3xl font-bold text-[#b8960c]">
              {bookings.filter((b) => b.status === "Confirmed").length}
            </p>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="card p-6">
          {/* Desktop Table */}
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full font-source text-sm">
              <thead>
                <tr className="border-b border-[#e7e5e4]">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Event Name</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Tickets</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">Price</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
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
                    <td className="py-4 px-4 text-right">
                      <button className="font-source text-sm text-[#b8960c] hover:text-[#0f172a] transition-colors">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-[#f5f5f4] p-4 rounded-sm">
                <div className="flex justify-between items-start mb-3">
                  <p className="font-semibold text-gray-900">{booking.eventName}</p>
                  <BookingStatusBadge status={booking.status} />
                </div>
                <div className="space-y-1 text-sm text-gray-600 mb-3">
                  <p>📅 {booking.date}</p>
                  <p>🎫 {booking.tickets} ticket(s)</p>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-[#e7e5e4]">
                  <span className="font-semibold text-gray-900">
                    {booking.price === 0 ? "Free" : `$${booking.price}`}
                  </span>
                  <button className="font-source text-sm text-[#b8960c] hover:text-[#0f172a] transition-colors">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
