import Link from "next/link";
import Image from "next/image";
import CategoryBadge from "./CategoryBadge";

export default function EventCard({ event }) {
  const categoryLabel = event.category?.name || event.category || "General";
  const eventId = event._id || event.id;
  const imageUrl = event.image || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&h=300&fit=crop";

  return (
    <div className="card overflow-hidden">
      {/* Event Image */}
      <div className="relative h-56 w-full bg-gray-100">
        <Image
          src={imageUrl}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Event Details */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <CategoryBadge category={categoryLabel} />
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${event.status === "cancelled" ? "bg-red-100 text-red-700" : event.status === "completed" ? "bg-slate-100 text-slate-700" : event.status === "ongoing" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
            {event.status || "upcoming"}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-playfair text-xl font-semibold mb-3 text-[#0f172a] line-clamp-2">
          {event.title}
        </h3>

        {/* Date, Time, and Location */}
        <div className="space-y-2 mb-4 text-sm text-gray-600 font-source">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{event.time || "Time not set"}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{event.availableSeats} / {event.totalSeats} seats available</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-playfair text-2xl font-bold text-[#b8960c]">
            {event.isFree || Number(event.price) === 0 ? "Free" : `$${event.price}`}
          </span>
        </div>

        {/* View Details Button */}
        <Link href={`/events/${eventId}`} className="btn-primary w-full text-center">
          View Details
        </Link>
      </div>
    </div>
  );
}
