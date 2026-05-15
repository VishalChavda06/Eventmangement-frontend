"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href) => pathname === href;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#e7e5e4] shadow-sm">
      <div className="container-max flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="font-playfair text-2xl font-bold text-[#0f172a] hover:text-[#b8960c] transition-colors duration-200">
          Eventra
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-source font-medium transition-all duration-200 pb-1 border-b-2 ${
                isActive(link.href)
                  ? "text-[#b8960c] border-[#b8960c]"
                  : "text-gray-700 border-transparent hover:text-[#b8960c] hover:border-[#b8960c]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex gap-4">
          <Link href="/login" className="btn-outline">
            Login
          </Link>
          <Link href="/register" className="btn-primary">
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#0f172a]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-[#e7e5e4] md:hidden">
            <div className="container-max flex flex-col gap-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-source font-medium ${
                    isActive(link.href) ? "text-[#b8960c]" : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/login" className="btn-outline text-center">
                Login
              </Link>
              <Link href="/register" className="btn-primary text-center">
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
