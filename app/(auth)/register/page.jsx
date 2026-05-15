"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // This will be connected to API later
    console.log("Registration attempted with:", formData);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container-max">
        <div className="max-w-md mx-auto">
          {/* Card */}
          <div className="card p-8">
            <h1 className="font-playfair text-3xl font-bold text-[#0f172a] mb-2">
              Create Account
            </h1>
            <p className="font-source text-gray-600 mb-8">
              Join Eventra and start exploring events
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block font-source text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input-field"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block font-source text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="input-field"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block font-source text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field"
                  required
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block font-source text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field"
                  required
                />
              </div>

              {/* Role Selector */}
              <div>
                <label htmlFor="role" className="block font-source text-sm font-medium text-gray-700 mb-2">
                  I am a...
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="User">Attendee</option>
                  <option value="Organizer">Event Organizer</option>
                </select>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn-primary w-full">
                Create Account
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 pt-6 border-t border-[#e7e5e4]">
              <p className="font-source text-center text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-[#b8960c] hover:text-[#0f172a] transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
