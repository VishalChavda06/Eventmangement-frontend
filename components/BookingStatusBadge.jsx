export default function BookingStatusBadge({ status }) {
  const statusStyles = {
    Confirmed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
    Completed: "bg-blue-100 text-blue-800",
  };

  const style = statusStyles[status] || "bg-gray-100 text-gray-800";

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-source font-semibold ${style}`}>
      {status}
    </span>
  );
}
