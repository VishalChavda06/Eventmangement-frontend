import Link from "next/link";
import EventCard from "@/components/EventCard";

// Dummy data for featured events
const featuredEvents = [
  {
    id: 1,
    title: "Tech Innovation Summit 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    category: "Tech",
    date: "May 20, 2026",
    location: "San Francisco, CA",
    price: 99,
  },
  {
    id: 2,
    title: "Jazz in the Park",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
    category: "Music",
    date: "May 25, 2026",
    location: "Central Park, NY",
    price: 0,
  },
  {
    id: 3,
    title: "Business Leaders Conference",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    category: "Business",
    date: "June 1, 2026",
    location: "New York, NY",
    price: 149,
  },
];

const categories = ["Music", "Tech", "Sports", "Business", "Art", "Food"];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0f172a] to-[#1a1f3a] text-[#fafaf9] py-20 md:py-32">
        <div className="container-max text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Discover & Manage Events
          </h1>
          <p className="font-source text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of people discovering amazing events and managing them effortlessly. From intimate gatherings to large conferences, Eventra is your all-in-one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events" className="btn-gold">
              Browse Events
            </Link>
            <Link href="/register" className="btn-outline border-[#fafaf9] text-[#fafaf9] hover:bg-white hover:text-[#0f172a]">
              Create Event
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#f5f5f4] py-12">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="font-playfair text-4xl font-bold text-[#b8960c] mb-2">
                1,200+
              </p>
              <p className="font-source text-gray-700">Active Events</p>
            </div>
            <div>
              <p className="font-playfair text-4xl font-bold text-[#b8960c] mb-2">
                50K+
              </p>
              <p className="font-source text-gray-700">Attendees</p>
            </div>
            <div>
              <p className="font-playfair text-4xl font-bold text-[#b8960c] mb-2">
                300+
              </p>
              <p className="font-source text-gray-700">Organizers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container-max">
          <h2 className="font-playfair text-4xl font-bold mb-8 text-[#0f172a]">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/events?category=${category}`}
                className="px-6 py-3 border border-[#0f172a] text-[#0f172a] font-source font-medium rounded-sm hover:bg-[#f5f5f4] transition-all duration-200"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-[#f5f5f4]">
        <div className="container-max">
          <h2 className="font-playfair text-4xl font-bold mb-12 text-[#0f172a]">
            Featured Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/events" className="btn-primary">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0f172a] text-[#fafaf9] py-16">
        <div className="container-max text-center">
          <h2 className="font-playfair text-4xl font-bold mb-4">
            Ready to Organize Your Event?
          </h2>
          <p className="font-source text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            Join our community of event organizers and create unforgettable experiences.
          </p>
          <Link href="/register" className="btn-gold">
            Create Your First Event
          </Link>
        </div>
      </section>
    </div>
  );
}
