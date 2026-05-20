'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const ticketCode = searchParams.get('ticket');

  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Success Checkmark */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-4xl text-green-600">✓</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-[#0f172a] font-serif mb-2">
          Booking Confirmed!
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 mb-8">
          Your booking has been confirmed successfully
        </p>

        {/* Ticket Code Box */}
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Your Ticket Code
          </p>
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
            <code className="text-lg font-mono font-bold text-[#0f172a]">
              {ticketCode || 'Loading...'}
            </code>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <Link
            href="/dashboard/bookings"
            className="bg-[#0f172a] text-white rounded-md px-4 py-2.5 font-semibold hover:bg-[#1e293b] transition-colors duration-200 inline-block"
          >
            View My Bookings
          </Link>
          <Link
            href="/events"
            className="border border-[#0f172a] text-[#0f172a] rounded-md px-4 py-2.5 font-semibold hover:bg-[#f0f0f0] transition-colors duration-200 inline-block"
          >
            Browse More Events
          </Link>
        </div>

        {/* Info Note */}
        <p className="text-sm text-gray-600">
          A notification has been sent to your account
        </p>
      </div>
    </div>
  );
}
