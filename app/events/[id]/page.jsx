"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "@/components/CategoryBadge";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const response = await fetch(`http://localhost:9090/api/events/${params.id}`);
        const data = await response.json();
        if (response.ok) {
          setEvent(data.data);
        } else {
          setError(data.message || "Event not found");
        }
      } catch (err) {
        setError("Unable to load event details.");
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container-max text-center">
          <p className="font-source text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event || error) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container-max text-center">
          <h1 className="font-playfair text-3xl font-bold mb-4 text-[#0f172a]">Event Not Found</h1>
          <p className="font-source text-gray-600 mb-8">{error || "The event you're looking for doesn't exist."}</p>
          <Link href="/events" className="btn-primary">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = event.category?.name || event.category || "General";
  const eventId = event._id || event.id;
  const imageUrl = event.image || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&h=500&fit=crop";
  const eventDescription = event.description || "No description available yet.";
  const eventReviews = Array.isArray(event.reviews) ? event.reviews : [];

  return (
    <div className="bg-white">
      <div className="relative h-96 w-full bg-gray-200">
        <Image src={imageUrl} alt={event.title} fill className="object-cover" priority />
      </div>

      <div className="container-max py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <CategoryBadge category={categoryName} />
              <h1 className="font-playfair text-4xl font-bold mt-4 mb-4 text-[#0f172a]">
                {event.title}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-gray-700 font-source">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">{new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-sm">{event.time || "Time not set"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-sm">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Organizer</p>
                    <p className="text-sm">{event.organizer?.name || event.organizerName || event.organizer?.email || "Organizer"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11h8M8 15h5" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Category</p>
                    <p className="text-sm">{event.category?.name || event.category || "General"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Seats</p>
                    <p className="text-sm">{event.availableSeats} / {event.totalSeats} available</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Status</p>
                    <p className="text-sm capitalize">{event.status || "upcoming"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12 pb-12 border-b border-[#e7e5e4]">
              <h2 className="font-playfair text-2xl font-bold mb-4 text-[#0f172a]">About This Event</h2>
              <div className="font-source text-gray-700 whitespace-pre-line leading-relaxed">
                {eventDescription}
              </div>
            </div>

            <div>
              <h2 className="font-playfair text-2xl font-bold mb-6 text-[#0f172a]">Attendee Reviews</h2>
              {eventReviews.length === 0 ? (
                <div className="card p-6 text-gray-600">No reviews yet for this event.</div>
              ) : (
                <div className="space-y-6">
                  {eventReviews.map((review) => (
                    <div key={review.id} className="card p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-source font-semibold text-gray-900">{review.author}</p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < review.rating ? "text-[#b8960c]" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="font-source text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <div className="mb-8">
                <p className="font-source text-sm text-gray-600 mb-2">Price per ticket</p>
                <p className="font-playfair text-4xl font-bold text-[#b8960c]">
                  {Number(event.price) === 0 ? "Free" : `$${event.price}`}
                </p>
              </div>

              <button
                type="button"
                onClick={() => router.push(`/booking/${eventId}`)}
                className="btn-primary w-full mb-4"
              >
                Book Now
              </button>

              <Link href="/events" className="btn-outline w-full text-center">
                Back to Events
              </Link>

              <div className="mt-8 pt-8 border-t border-[#e7e5e4] space-y-4 font-source text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Capacity</p>
                  <p className="font-semibold text-gray-900">{event.totalSeats || "N/A"} seats</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Available</p>
                  <p className="font-semibold text-gray-900">{event.availableSeats ?? "N/A"} seats</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Status</p>
                  <p className="font-semibold text-gray-900 capitalize">{event.status || "upcoming"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
