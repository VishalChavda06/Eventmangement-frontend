import Link from "next/link";

// Dummy notifications data
const notifications = [
  {
    id: 1,
    type: "reminder",
    title: "Event Reminder: Tech Innovation Summit 2026",
    message: "Your event starts in 5 days! Make sure to download your e-ticket.",
    date: "May 15, 2026",
    read: false,
  },
  {
    id: 2,
    type: "confirmation",
    title: "Booking Confirmed",
    message: "Your booking for Jazz in the Park has been confirmed.",
    date: "May 10, 2026",
    read: false,
  },
  {
    id: 3,
    type: "update",
    title: "Event Update: Business Leaders Conference",
    message: "The event location has been changed to New York, NY.",
    date: "May 5, 2026",
    read: true,
  },
  {
    id: 4,
    type: "cancelled",
    title: "Event Cancelled",
    message: "Unfortunately, Startup Pitch Competition has been cancelled.",
    date: "April 28, 2026",
    read: true,
  },
];

function getNotificationIcon(type) {
  const icons = {
    reminder: "🔔",
    confirmation: "✓",
    update: "ℹ️",
    cancelled: "✕",
  };
  return icons[type] || "•";
}

function getNotificationColor(type) {
  const colors = {
    reminder: "bg-blue-100 text-blue-800",
    confirmation: "bg-green-100 text-green-800",
    update: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return colors[type] || "bg-gray-100 text-gray-800";
}

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container-max">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="font-source text-[#b8960c] hover:text-[#0f172a] transition-colors mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="font-playfair text-4xl font-bold text-[#0f172a]">Notifications</h1>
          <p className="font-source text-gray-600 mt-2">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>

        {/* Notifications List */}
        <div className="max-w-2xl space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`card p-6 ${!notification.read ? "bg-blue-50" : ""}`}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg ${getNotificationColor(
                      notification.type
                    )}`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-playfair font-bold text-gray-900">
                        {notification.title}
                        {!notification.read && (
                          <span className="inline-block ml-2 w-2 h-2 bg-[#b8960c] rounded-full"></span>
                        )}
                      </h3>
                      <span className="font-source text-xs text-gray-500">
                        {notification.date}
                      </span>
                    </div>
                    <p className="font-source text-gray-600">
                      {notification.message}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="flex-shrink-0">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card p-12 text-center">
              <p className="font-source text-gray-600">
                No notifications yet. Stay tuned for updates!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
