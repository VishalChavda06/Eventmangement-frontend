"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrganizerCreateEventPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    location: "",
    price: "",
    totalSeats: "",
    availableSeats: "",
    isFree: false,
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!token || !user) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(user);
    if (parsedUser.role !== "organizer") {
      router.push("/");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserRole(parsedUser.role);

    const loadCategories = async () => {
      try {
        const response = await fetch("http://localhost:9090/api/categories");
        const data = await response.json();
        if (response.ok) {
          setCategories(data.data || []);
        }
      } catch (error) {
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageFile(null);
      setImagePreview("");
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!formData.title.trim()) {
      setFormError("Title is required.");
      return;
    }
    if (!formData.category) {
      setFormError("Please select a category.");
      return;
    }
    if (!formData.date) {
      setFormError("Event date is required.");
      return;
    }
    if (!formData.time) {
      setFormError("Event time is required.");
      return;
    }
    if (!formData.location.trim()) {
      setFormError("Location is required.");
      return;
    }
    if (!formData.description.trim()) {
      setFormError("Event description is required.");
      return;
    }
    if (!formData.totalSeats) {
      setFormError("Total seats are required.");
      return;
    }

    const token = typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
      return;
    }

    setSubmitting(true);

    try {
      let imageUrl = formData.image;

      if (imageFile && imagePreview) {
        const uploadResponse = await fetch("http://localhost:9090/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ image: imagePreview }),
        });
        const uploadData = await uploadResponse.json();
        if (!uploadResponse.ok) {
          setFormError(uploadData.message || "Unable to upload event image.");
          setSubmitting(false);
          return;
        }
        imageUrl = uploadData.data.url;
      }

      const response = await fetch("http://localhost:9090/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          date: formData.date,
          time: formData.time,
          location: formData.location,
          price: Number(formData.price) || 0,
          totalSeats: Number(formData.totalSeats),
          availableSeats: formData.availableSeats ? Number(formData.availableSeats) : Number(formData.totalSeats),
          isFree: formData.isFree,
          image: imageUrl,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        router.push("/events");
      } else {
        setFormError(data.message || "Unable to create event.");
      }
    } catch (err) {
      setFormError("Unable to create event. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fafaf9] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#0f172a]">Create Event</h1>
            <p className="font-source text-gray-600 mt-1">
              Publish a new event and make it visible to attendees.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => router.push("/events")}
              className="rounded-md bg-white border border-gray-300 px-5 py-3 text-sm font-semibold text-[#0f172a] hover:bg-gray-50 transition-colors duration-200"
            >
              Back to Events
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-white border border-gray-200 p-8 shadow-sm">
          {formError && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Event Title
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                placeholder="Enter the event title"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {loadingCategories && <p className="mt-2 text-sm text-gray-500">Loading categories...</p>}
              {!loadingCategories && categories.length === 0 && (
                <p className="mt-2 text-sm text-red-600">
                  No event categories are available yet. Please ask an admin to add categories or try again later.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                Event Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-2">
                Event Time
              </label>
              <input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                placeholder="Event venue or city"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                  Ticket Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                  placeholder="0 for free"
                />
              </div>
              <div>
                <label htmlFor="totalSeats" className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Seats
                </label>
                <input
                  id="totalSeats"
                  name="totalSeats"
                  type="number"
                  min="1"
                  value={formData.totalSeats}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                  placeholder="100"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="availableSeats" className="block text-sm font-semibold text-gray-700 mb-2">
                  Available Seats
                </label>
                <input
                  id="availableSeats"
                  name="availableSeats"
                  type="number"
                  min="0"
                  value={formData.availableSeats}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                  placeholder="Leave empty to use total seats"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <input
                    id="isFree"
                    name="isFree"
                    type="checkbox"
                    checked={formData.isFree}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isFree: e.target.checked }))}
                    className="h-4 w-4 rounded border-gray-300 text-[#0f172a] focus:ring-[#0f172a]"
                  />
                  Free event
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  When checked, the event will be marked as free regardless of ticket price.
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                Event Image
              </label>
              <input
                id="image"
                name="image"
                type="text"
                value={formData.image}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                placeholder="https://example.com/event-image.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Or upload a file below and it will be saved to Cloudinary.
              </p>
            </div>
            <div>
              <label htmlFor="imageFile" className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Image
              </label>
              <input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-700"
              />
              {imagePreview && (
                <div className="mt-4 w-full max-w-xs overflow-hidden rounded-lg border border-gray-200">
                  <img src={imagePreview} alt="Preview" className="object-cover w-full h-56" />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                placeholder="Describe the event details"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => router.push("/events")}
                className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-md bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1e293b] disabled:opacity-60"
              >
                {submitting ? "Publishing..." : "Publish Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
