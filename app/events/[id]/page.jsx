import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "@/components/CategoryBadge";

// Dummy events data (in a real app, this would come from a database)
const eventDetails = {
  1: {
    id: 1,
    title: "Tech Innovation Summit 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&h=500&fit=crop",
    category: "Tech",
    date: "May 20, 2026",
    time: "09:00 AM - 06:00 PM",
    location: "San Francisco Convention Center, CA",
    organizer: "Tech Leaders Inc.",
    price: 99,
    description: `Join us for the most anticipated tech summit of 2026. This three-day conference brings together industry leaders, innovators, and visionaries to discuss the latest breakthroughs in artificial intelligence, cloud computing, and digital transformation.

    Our keynote speakers include renowned technologists, successful entrepreneurs, and influential thought leaders. The event features over 50 sessions, interactive workshops, and networking opportunities.

    Whether you're a developer, entrepreneur, or business professional, you'll gain valuable insights into emerging technologies that are shaping the future. Network with peers, discover new tools and platforms, and stay ahead of industry trends.

    The summit includes complimentary breakfast, lunch, and refreshments throughout the day, plus exclusive access to our networking lounge.`,
    reviews: [
      {
        id: 1,
        author: "Sarah Johnson",
        rating: 5,
        comment: "Absolutely fantastic event! The speakers were incredible and I made some great connections.",
      },
      {
        id: 2,
        author: "Michael Chen",
        rating: 4,
        comment: "Great organization and content. Would have liked more hands-on sessions, but overall excellent.",
      },
    ],
  },
  2: {
    id: 2,
    title: "Jazz in the Park",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1000&h=500&fit=crop",
    category: "Music",
    date: "May 25, 2026",
    time: "06:00 PM - 10:00 PM",
    location: "Central Park, New York, NY",
    organizer: "NYC Music Foundation",
    price: 0,
    description: `Experience an unforgettable evening of live jazz music in the heart of Central Park. This free outdoor concert features some of the city's best jazz musicians performing under the stars.

    Bring your blanket or lawn chair and enjoy a beautiful evening with friends and family. The ambiance is perfect for a casual date night or a relaxing gathering with colleagues.

    Light food and beverages will be available for purchase. In case of rain, the concert will be rescheduled to the following weekend.`,
    reviews: [
      {
        id: 1,
        author: "Emma Wilson",
        rating: 5,
        comment: "Beautiful evening! The weather was perfect and the musicians were phenomenal.",
      },
      {
        id: 2,
        author: "David Brown",
        rating: 5,
        comment: "Best free event in the city. Coming back next year!",
      },
    ],
  },
};

export default function EventDetailPage({ params }) {
  const event = eventDetails[params.id];

  if (!event) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container-max text-center">
          <h1 className="font-playfair text-3xl font-bold mb-4 text-[#0f172a]">
            Event Not Found
          </h1>
          <p className="font-source text-gray-600 mb-8">
            The event you're looking for doesn't exist.
          </p>
          <Link href="/events" className="btn-primary">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Image */}
      <div className="relative h-96 w-full bg-gray-200">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Event Details */}
      <div className="container-max py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <CategoryBadge category={event.category} />
              <h1 className="font-playfair text-4xl font-bold mt-4 mb-4 text-[#0f172a]">
                {event.title}
              </h1>

              {/* Event Meta Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-gray-700 font-source">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">{event.date}</p>
                    <p className="text-sm">{event.time}</p>
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
                  <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Organizer</p>
                    <p className="text-sm">{event.organizer}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12 pb-12 border-b border-[#e7e5e4]">
              <h2 className="font-playfair text-2xl font-bold mb-4 text-[#0f172a]">
                About This Event
              </h2>
              <div className="font-source text-gray-700 whitespace-pre-line leading-relaxed">
                {event.description}
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <h2 className="font-playfair text-2xl font-bold mb-6 text-[#0f172a]">
                Attendee Reviews
              </h2>
              <div className="space-y-6">
                {event.reviews.map((review) => (
                  <div key={review.id} className="card p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-source font-semibold text-gray-900">
                          {review.author}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating ? "text-[#b8960c]" : "text-gray-300"
                            }`}
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
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <div className="mb-8">
                <p className="font-source text-sm text-gray-600 mb-2">Price per ticket</p>
                <p className="font-playfair text-4xl font-bold text-[#b8960c]">
                  {event.price === 0 ? "Free" : `$${event.price}`}
                </p>
              </div>

              <Link
                href={`/booking/${event.id}`}
                className="btn-primary w-full mb-4"
              >
                Book Now
              </Link>

              <Link
                href="/events"
                className="btn-outline w-full text-center"
              >
                Back to Events
              </Link>

              {/* Event Info */}
              <div className="mt-8 pt-8 border-t border-[#e7e5e4] space-y-4 font-source text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Capacity</p>
                  <p className="font-semibold text-gray-900">500 tickets available</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Tickets Sold</p>
                  <p className="font-semibold text-gray-900">342 / 500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
