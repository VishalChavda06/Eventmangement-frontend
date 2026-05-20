'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();

  // State
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch analytics on mount
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (!token || !user) {
          router.push('/');
          return;
        }

        const parsedUser = JSON.parse(user);
        if (parsedUser.role !== 'admin') {
          router.push('/');
          return;
        }

        const response = await fetch(
          'http://localhost:9090/api/admin/analytics',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (response.ok) {
          setAnalytics(data.data);
        } else {
          setError(data.message || 'Failed to fetch analytics');
        }
      } catch (err) {
        setError('Error fetching analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [router]);

  // Stat card component
  const StatCard = ({ label, value, icon, accentColor }) => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-2">{label}</p>
          <p className={`text-3xl font-bold ${accentColor}`}>{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf9] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600 text-center">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-[#0f172a] font-serif mb-8">
          Admin Dashboard
        </h1>

        {/* Error state */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        {analytics && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard
                label="Total Users"
                value={analytics.totalUsers.toLocaleString()}
                icon="👥"
                accentColor="text-[#0f172a]"
              />
              <StatCard
                label="Total Events"
                value={analytics.totalEvents.toLocaleString()}
                icon="📅"
                accentColor="text-[#0f172a]"
              />
              <StatCard
                label="Total Bookings"
                value={analytics.totalBookings.toLocaleString()}
                icon="🎫"
                accentColor="text-[#0f172a]"
              />
              <StatCard
                label="Confirmed Bookings"
                value={analytics.confirmedBookings.toLocaleString()}
                icon="✓"
                accentColor="text-green-600"
              />
              <StatCard
                label="Cancelled Bookings"
                value={analytics.cancelledBookings.toLocaleString()}
                icon="✕"
                accentColor="text-red-600"
              />
              <StatCard
                label="Total Revenue"
                value={`$${analytics.totalRevenue.toLocaleString()}`}
                icon="💰"
                accentColor="text-[#b8960c]"
              />
            </div>

            {/* Quick Links */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#0f172a] font-serif mb-4">
                Quick Links
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/admin/users"
                  className="bg-[#0f172a] text-white rounded-md px-4 py-2.5 font-semibold text-center hover:bg-[#1e293b] transition-colors duration-200"
                >
                  Manage Users
                </Link>
                <Link
                  href="/admin/bookings"
                  className="bg-[#0f172a] text-white rounded-md px-4 py-2.5 font-semibold text-center hover:bg-[#1e293b] transition-colors duration-200"
                >
                  Manage Bookings
                </Link>
                <Link
                  href="/admin/events"
                  className="bg-[#0f172a] text-white rounded-md px-4 py-2.5 font-semibold text-center hover:bg-[#1e293b] transition-colors duration-200"
                >
                  Manage Events
                </Link>
                <Link
                  href="/admin/categories"
                  className="bg-[#0f172a] text-white rounded-md px-4 py-2.5 font-semibold text-center hover:bg-[#1e293b] transition-colors duration-200"
                >
                  Manage Categories
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
