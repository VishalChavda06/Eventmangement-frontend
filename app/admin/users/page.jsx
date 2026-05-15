import Link from "next/link";

// Dummy users data
const users = [
  { id: 1, name: "Sarah Johnson", email: "sarah@example.com", role: "User", joinDate: "May 10, 2026", status: "Active" },
  { id: 2, name: "Michael Chen", email: "michael@example.com", role: "Organizer", joinDate: "May 9, 2026", status: "Active" },
  { id: 3, name: "Emma Wilson", email: "emma@example.com", role: "User", joinDate: "May 8, 2026", status: "Active" },
  { id: 4, name: "David Brown", email: "david@example.com", role: "User", joinDate: "May 7, 2026", status: "Inactive" },
  { id: 5, name: "Lisa Anderson", email: "lisa@example.com", role: "Organizer", joinDate: "May 6, 2026", status: "Active" },
];

export default function AdminUsersPage() {
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const organizers = users.filter((u) => u.role === "Organizer").length;

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container-max">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="font-source text-[#b8960c] hover:text-[#0f172a] transition-colors mb-4 inline-block">
            ← Back to Admin
          </Link>
          <h1 className="font-playfair text-4xl font-bold text-[#0f172a]">Manage Users</h1>
          <p className="font-source text-gray-600 mt-2">
            {users.length} total users • {activeUsers} active • {organizers} organizers
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6">
            <p className="font-source text-sm text-gray-600 mb-2">Total Users</p>
            <p className="font-playfair text-3xl font-bold text-[#b8960c]">
              {users.length}
            </p>
          </div>
          <div className="card p-6">
            <p className="font-source text-sm text-gray-600 mb-2">Active Users</p>
            <p className="font-playfair text-3xl font-bold text-[#b8960c]">
              {activeUsers}
            </p>
          </div>
          <div className="card p-6">
            <p className="font-source text-sm text-gray-600 mb-2">Organizers</p>
            <p className="font-playfair text-3xl font-bold text-[#b8960c]">
              {organizers}
            </p>
          </div>
        </div>

        {/* Users Table */}
        <div className="card p-6">
          {/* Desktop Table */}
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full font-source text-sm">
              <thead>
                <tr className="border-b border-[#e7e5e4]">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Role</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Join Date</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-[#e7e5e4] hover:bg-[#f5f5f4] transition-colors">
                    <td className="py-4 px-4 text-gray-900">{user.name}</td>
                    <td className="py-4 px-4 text-gray-600">{user.email}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{user.joinDate}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="font-source text-sm text-[#b8960c] hover:text-[#0f172a] transition-colors">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {users.map((user) => (
              <div key={user.id} className="bg-[#f5f5f4] p-4 rounded-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="font-source text-sm text-gray-600">{user.email}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {user.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600 mb-3">
                  <p>
                    <span className="font-semibold">Role:</span> {user.role}
                  </p>
                  <p>
                    <span className="font-semibold">Joined:</span> {user.joinDate}
                  </p>
                </div>
                <button className="font-source text-sm text-[#b8960c] hover:text-[#0f172a] transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
