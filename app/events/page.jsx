"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import EventCard from "@/components/EventCard";

function EventsContent() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [eventsResponse, categoriesResponse] = await Promise.all([
          fetch("http://localhost:9090/api/events"),
          fetch("http://localhost:9090/api/categories"),
        ]);

        const [eventsData, categoriesData] = await Promise.all([
          eventsResponse.json(),
          categoriesResponse.json(),
        ]);

        if (eventsResponse.ok) {
          setEvents(eventsData.data || []);
        } else {
          setError(eventsData.message || "Unable to load events");
          setEvents([]);
        }

        if (categoriesResponse.ok) {
          setCategories(categoriesData.data || []);
        } else {
          setCategories([]);
        }
      } catch (err) {
        setError("Unable to load events. Please try again later.");
        setEvents([]);
        setCategories([]);
      } finally {
        setLoading(false);
        setLoadingCategories(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let results = [...events];
    const selectedCategoryLower = String(selectedCategory).toLowerCase();

    if (selectedCategory !== "all") {
      results = results.filter((event) => {
        const categoryId = String(event.category?._id || event.category || "");
        const categoryName = String(event.category?.name || "").toLowerCase();
        return categoryId === selectedCategory || categoryName === selectedCategoryLower;
      });
    }

    if (searchTerm) {
      results = results.filter((event) =>
        event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceFilter === "free") {
      results = results.filter((event) => Number(event.price) === 0);
    } else if (priceFilter === "paid") {
      results = results.filter((event) => Number(event.price) > 0);
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredEvents(results);
  }, [events, selectedCategory, searchTerm, priceFilter]);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container-max">
        {/* Page Header */}
        <h1 className="font-playfair text-4xl font-bold mb-6 text-[#0f172a]">
          Discover Events
        </h1>

        {/* Category Filter Pills */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
              selectedCategory === "all"
                ? "bg-[#0f172a] text-white"
                : "bg-white text-[#0f172a] border-[#0f172a]"
            }`}
          >
            All
          </button>
          {categories.map((category) => {
            const isActiveCategory =
              selectedCategory === category._id ||
              selectedCategory.toLowerCase() === category.name.toLowerCase();
            return (
              <button
                key={category._id}
                type="button"
                onClick={() => setSelectedCategory(category._id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActiveCategory
                    ? "bg-[#0f172a] text-white"
                    : "bg-white text-[#0f172a] border-[#0f172a]"
                }`}
              >
                {category.name}
              </button>
            );
          })}
          {loadingCategories && <div className="text-sm text-gray-500">Loading categories...</div>}
        </div>

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
          <div className="md:col-span-1">
            <div className="card p-6">
              <h3 className="font-playfair text-lg font-bold mb-6 text-[#0f172a]">Filters</h3>

              <div className="mb-8">
                <h4 className="font-source font-semibold text-gray-900 mb-4">Category</h4>
                <div className="space-y-3">
                  <label className="flex items-center font-source text-sm">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === "all"}
                      onChange={() => setSelectedCategory("all")}
                      className="mr-3 w-4 h-4"
                    />
                    All Categories
                  </label>
                  {categories.map((category) => {
                    const isChecked =
                      selectedCategory === category._id ||
                      selectedCategory.toLowerCase() === category.name.toLowerCase();
                    return (
                      <label key={category._id} className="flex items-center font-source text-sm">
                        <input
                          type="radio"
                          name="category"
                          value={category._id}
                          checked={isChecked}
                          onChange={() => setSelectedCategory(category._id)}
                          className="mr-3 w-4 h-4"
                        />
                        {category.name}
                      </label>
                    );
                  })}
                </div>
              </div>

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

          <div className="md:col-span-3">
            {loading ? (
              <div className="rounded-xl bg-white p-10 text-center text-sm text-gray-600 shadow-sm">
                Loading events...
              </div>
            ) : error ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-800">
                {error}
              </div>
            ) : filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <EventCard key={event._id || event.id} event={event} />
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
