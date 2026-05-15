"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import EventCard from "@/components/EventCard";

// Dummy events data
const allEvents = [
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
  {
    id: 4,
    title: "Crypto & Blockchain Expo",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    category: "Tech",
    date: "June 5, 2026",
    location: "Miami, FL",
    price: 79,
  },
  {
    id: 5,
    title: "Summer Music Festival",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
    category: "Music",
    date: "June 15, 2026",
    location: "Coachella Valley, CA",
    price: 199,
  },
  {
    id: 6,
    title: "Startup Pitch Competition",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    category: "Business",
    date: "June 20, 2026",
    location: "Boston, MA",
    price: 49,
  },
];

const categories = ["Tech", "Music", "Business", "Sports", "Art", "Food"];

function EventsContent() {
  const searchParams = useSearchParams();
  const [filteredEvents, setFilteredEvents] = useState(allEvents);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    let results = allEvents;

    // Filter by category
    if (selectedCategory) {
      results = results.filter((event) => event.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      results = results.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price
    if (priceFilter === "free") {
      results = results.filter((event) => event.price === 0);
    } else if (priceFilter === "paid") {
      results = results.filter((event) => event.price > 0);
    }

    setFilteredEvents(results);
  }, [selectedCategory, searchTerm, priceFilter]);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container-max">
        {/* Page Header */}
        <h1 className="font-playfair text-4xl font-bold mb-8 text-[#0f172a]">
          Discover Events
        </h1>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search events by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="md:col-span-1">
            <div className="card p-6">
              <h3 className="font-playfair text-lg font-bold mb-6 text-[#0f172a]">
                Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-8">
                <h4 className="font-source font-semibold text-gray-900 mb-4">Category</h4>
                <div className="space-y-3">
                  <label className="flex items-center font-source text-sm">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={selectedCategory === ""}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-3 w-4 h-4"
                    />
                    All Categories
                  </label>
                  {categories.map((category) => (
                    <label key={category} className="flex items-center font-source text-sm">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-3 w-4 h-4"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="font-source font-semibold text-gray-900 mb-4">Price</h4>
                <div className="space-y-3">
                  <label className="flex items-center font-source text-sm">
                    <input
                      type="radio"
                      name="price"
                      value="all"
                      checked={priceFilter === "all"}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className="mr-3 w-4 h-4"
                    />
                    All Prices
                  </label>
                  <label className="flex items-center font-source text-sm">
                    <input
                      type="radio"
                      name="price"
                      value="free"
                      checked={priceFilter === "free"}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className="mr-3 w-4 h-4"
                    />
                    Free
                  </label>
                  <label className="flex items-center font-source text-sm">
                    <input
                      type="radio"
                      name="price"
                      value="paid"
                      checked={priceFilter === "paid"}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className="mr-3 w-4 h-4"
                    />
                    Paid
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="md:col-span-3">
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="card p-12 text-center">
                <p className="font-source text-gray-600">
                  No events found matching your criteria. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white py-12"><div className="container-max"><p className="font-source text-gray-600">Loading events...</p></div></div>}>
      <EventsContent />
    </Suspense>
  );
}
