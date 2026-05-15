"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Dummy event data for booking
const eventDetails = {
  1: {
    id: 1,
    title: "Tech Innovation Summit 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    date: "May 20, 2026",
    location: "San Francisco, CA",
    price: 99,
  },
  2: {
    id: 2,
    title: "Jazz in the Park",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
    date: "May 25, 2026",
    location: "Central Park, NY",
    price: 0,
  },
};

export default function BookingPage({ params }) {
  const event = eventDetails[params.id];
  const [numTickets, setNumTickets] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container-max text-center">
          <h1 className="font-playfair text-3xl font-bold mb-4 text-[#0f172a]">
            Event Not Found
          </h1>
          <Link href="/events" className="btn-primary">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = event.price * numTickets;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      alert(`Booking confirmed! ${numTickets} ticket(s) for ${event.title}`);
      setIsProcessing(false);
      // In a real app, redirect to confirmation page
    }, 1500);
  };

  const handleDecrement = () => {
    if (numTickets > 1) {
      setNumTickets(numTickets - 1);
    }
  };

  const handleIncrement = () => {
    setNumTickets(numTickets + 1);
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container-max">
        {/* Header */}
        <h1 className="font-playfair text-4xl font-bold mb-12 text-[#0f172a]">
          Complete Your Booking
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Event Summary */}
          <div className="lg:col-span-2">
            <div className="card overflow-hidden mb-8">
              {/* Event Image */}
              <div className="relative h-64 w-full bg-gray-200">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h2 className="font-playfair text-2xl font-bold mb-4 text-[#0f172a]">
                  {event.title}
                </h2>

                <div className="space-y-3 text-gray-700 font-source mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Selection */}
            <div className="card p-6">
              <h3 className="font-playfair text-xl font-bold mb-6 text-[#0f172a]">
                Select Number of Tickets
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Ticket Counter */}
                <div>
                  <label className="block font-source text-sm font-medium text-gray-700 mb-4">
                    How many tickets would you like?
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="w-12 h-12 border border-[#e7e5e4] rounded-sm hover:bg-[#f5f5f4] transition-colors flex items-center justify-center font-semibold"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={numTickets}
                      onChange={(e) => setNumTickets(Math.max(1, parseInt(e.target.value) || 1))}
                      className="input-field w-20 text-center"
                      min="1"
                      max="10"
                    />
                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="w-12 h-12 border border-[#e7e5e4] rounded-sm hover:bg-[#f5f5f4] transition-colors flex items-center justify-center font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-[#f5f5f4] p-4 rounded-sm">
                  <div className="flex justify-between mb-2 font-source">
                    <span className="text-gray-700">
                      {event.price === 0 ? "Free" : `$${event.price}`} × {numTickets} ticket{numTickets !== 1 ? "s" : ""}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {totalPrice === 0 ? "Free" : `$${totalPrice}`}
                    </span>
                  </div>
                </div>

                {/* Booking Terms */}
                <div className="border-t border-[#e7e5e4] pt-6">
                  <label className="flex items-start gap-3 font-source">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the{" "}
                      <Link href="#" className="text-[#b8960c] hover:text-[#0f172a]">
                        terms and conditions
                      </Link>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "Processing..." : "Confirm Booking"}
                </button>
              </form>
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="font-playfair text-xl font-bold mb-6 text-[#0f172a]">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-[#e7e5e4]">
                <div className="flex justify-between font-source">
                  <span className="text-gray-700">Ticket Price</span>
                  <span className="text-gray-900">
                    {event.price === 0 ? "Free" : `$${event.price}`}
                  </span>
                </div>
                <div className="flex justify-between font-source">
                  <span className="text-gray-700">Quantity</span>
                  <span className="text-gray-900">{numTickets}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6 font-playfair text-lg">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-[#b8960c]">
                  {totalPrice === 0 ? "Free" : `$${totalPrice}`}
                </span>
              </div>

              <Link
                href="/events"
                className="btn-outline w-full text-center"
              >
                Back to Events
              </Link>

              {/* Info */}
              <div className="mt-8 pt-6 border-t border-[#e7e5e4] space-y-3 font-source text-sm text-gray-600">
                <p>
                  <strong className="text-gray-900">What's included:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Digital e-ticket</li>
                  <li>Event program</li>
                  <li>Networking access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
