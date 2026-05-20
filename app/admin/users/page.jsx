'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminUsersPage() {
  const router = useRouter();

  // State
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [togglingId, setTogglingId] = useState(null);

  // Fetch all users on mount
  useEffect(() => {
    const fetchUsers = async () => {
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
          'http://localhost:9090/api/admin/users',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUsers(data.data);
        } else {
          setError(data.message || 'Failed to fetch users');
        }
      } catch (err) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  // Handle toggle user status
  const handleToggle = async (userId) => {
    setTogglingId(userId);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:9090/api/admin/users/${userId}/toggle`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Update user in place
        setUsers(
          users.map((user) =>
            user._id === userId
              ? { ...user, isActive: !user.isActive }
              : user
          )
        );
      } else {
        alert(data.message || 'Failed to toggle user status');
      }
    } catch (err) {
      alert('Error toggling user status');
    } finally {
      setTogglingId(null);
    }
  };

  // Role badge component
  const RoleBadge = ({ role }) => {
    const roleColors = {
      admin: 'bg-red-100 text-red-700',
      organizer: 'bg-blue-100 text-blue-700',
      user: 'bg-gray-100 text-gray-700'
    };

    return (
      <span
        className={`inline-block px-3 py-1 rounded text-xs font-medium ${
          roleColors[role] || roleColors.user
        }`}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  // Status badge component
  const StatusBadge = ({ isActive }) => {
    return (
      <span
        className={`inline-block px-3 py-1 rounded text-xs font-medium ${
          isActive
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf9] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600 text-center">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-[#0f172a] font-serif mb-8">
          All Users
        </h1>

        {/* Error state */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Empty state */}
        {users.length === 0 && !error && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <p className="text-gray-600">No users found</p>
          </div>
        )}

        {/* Users table */}
        {users.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">#</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Role</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Joined</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-3 text-gray-900">{index + 1}</td>
                    <td className="px-6 py-3 font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-3 text-gray-600">{user.email}</td>
                    <td className="px-6 py-3">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge isActive={user.isActive} />
                    </td>
                    <td className="px-6 py-3 text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => handleToggle(user._id)}
                        disabled={togglingId === user._id}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                          user.isActive
                            ? 'border border-red-500 text-red-500 hover:bg-red-50'
                            : 'border border-green-500 text-green-500 hover:bg-green-50'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {togglingId === user._id
                          ? 'Updating...'
                          : user.isActive
                          ? 'Deactivate'
                          : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
