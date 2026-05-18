"use client";

import { useState, useEffect } from "react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", image: "" });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://localhost:9090/api/categories");
      const data = await response.json();
      if (response.ok) {
        setCategories(data.data || []);
      } else {
        setError(data.message || "Unable to load categories");
      }
    } catch (err) {
      setError("Unable to load categories");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "", image: "" });
    setFormError("");
    setShowModal(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name || "", description: category.description || "", image: category.image || "" });
    setFormError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!formData.name.trim()) {
      setFormError("Category name is required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setFormError("Authentication token is missing. Please log in again.");
      return;
    }

    setSubmitting(true);

    try {
      const method = editingCategory ? "PUT" : "POST";
      const url = editingCategory
        ? `http://localhost:9090/api/categories/${editingCategory._id}`
        : "http://localhost:9090/api/categories";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setShowModal(false);
        fetchCategories();
      } else {
        setFormError(data.message || "Unable to save category");
      }
    } catch (err) {
      setFormError("Unable to save category. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (categoryId) => {
    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (!confirmed) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:9090/api/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        fetchCategories();
      } else {
        alert(data.message || "Unable to delete category");
      }
    } catch (err) {
      alert("Unable to delete category. Please try again.");
    }
  };

  const truncate = (value, maxLength) => {
    if (!value) return "";
    return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#0f172a]">Categories</h1>
          </div>
          <div>
            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center justify-center rounded-md bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#1e293b]"
            >
              Add Category
            </button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-xl bg-white p-10 text-center text-sm text-gray-600 shadow-sm">
            Loading categories...
          </div>
        ) : (
          <>
            {error ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                {error}
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-[#fafaf9]">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">#</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Description</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {categories.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-10 text-center text-gray-600">
                          No categories found.
                        </td>
                      </tr>
                    ) : (
                      categories.map((category, index) => (
                        <tr key={category._id}>
                          <td className="whitespace-nowrap px-6 py-4 text-gray-700">{index + 1}</td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#0f172a]">{category.name}</td>
                          <td className="px-6 py-4 text-gray-600">{truncate(category.description, 80)}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                category.isActive ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {category.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">
                            <button
                              type="button"
                              onClick={() => openEditModal(category)}
                              className="mr-2 rounded-md border border-[#0f172a] px-3 py-2 text-sm text-[#0f172a] transition-colors duration-200 hover:bg-[#f8fafc]"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(category._id)}
                              className="rounded-md border border-red-500 px-3 py-2 text-sm text-red-600 transition-colors duration-200 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[#0f172a]">
                {editingCategory ? "Edit Category" : "Add Category"}
              </h2>
              <button type="button" onClick={closeModal} className="text-sm font-semibold text-gray-500 hover:text-gray-900">
                Cancel
              </button>
            </div>
            {formError ? (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                {formError}
              </div>
            ) : null}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Category Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                    placeholder="Enter category name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="4"
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                    placeholder="Write a short description"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-md bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Saving..." : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
