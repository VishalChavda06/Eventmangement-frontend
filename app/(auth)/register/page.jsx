"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, role } = formData;

    // Client-side validation
    if (!name || !email || !password || !confirmPassword || !role) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      console.log("[Register] POST http://localhost:9090/api/auth/register", { name, email, role });
      const response = await fetch("http://localhost:9090/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();
      console.log("[Register] response", response.status, response.url, data);

      if (response.ok) {
        // After registration, go to login so the user can sign in.
        router.push("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
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

            {error && <div className="text-red-500 mb-4">{error}</div>}

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
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="input-field pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-14-14zM2 10a8.974 8.974 0 0113.882 2.9 1 1 0 11-1.768.934A6.974 6.974 0 002 10zm16.464-4.536a1 1 0 00-1.414-1.414A9.012 9.012 0 002.05 7.114 1 1 0 003.464 8.528 7.012 7.012 0 0118.464 5.464zm2.36 7.192a1 1 0 11-1.768.934A8.974 8.974 0 016.118 2.9 1 1 007.882 2.032 10.974 10.974 0 0120.824 12.656z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block font-source text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="input-field pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-14-14zM2 10a8.974 8.974 0 0113.882 2.9 1 1 0 11-1.768.934A6.974 6.974 0 002 10zm16.464-4.536a1 1 0 00-1.414-1.414A9.012 9.012 0 002.05 7.114 1 1 0 003.464 8.528 7.012 7.012 0 0118.464 5.464zm2.36 7.192a1 1 0 11-1.768.934A8.974 8.974 0 016.118 2.9 1 1 007.882 2.032 10.974 10.974 0 0120.824 12.656z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
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
                  <option value="user">Attendee</option>
                  <option value="organizer">Event Organizer</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
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