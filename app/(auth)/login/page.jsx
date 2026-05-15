"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // This will be connected to API later
    console.log("Login attempted with:", { email, password });
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container-max">
        <div className="max-w-md mx-auto">
          {/* Card */}
          <div className="card p-8">
            <h1 className="font-playfair text-3xl font-bold text-[#0f172a] mb-2">
              Welcome Back
            </h1>
            <p className="font-source text-gray-600 mb-8">
              Sign in to your Eventra account
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block font-source text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field"
                  required
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link href="#" className="font-source text-sm text-[#b8960c] hover:text-[#0f172a] transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn-primary w-full">
                Sign In
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 pt-6 border-t border-[#e7e5e4]">
              <p className="font-source text-center text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-medium text-[#b8960c] hover:text-[#0f172a] transition-colors">
                  Register now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
