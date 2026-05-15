export default function CategoryBadge({ category }) {
  const categoryStyles = {
    Music: "bg-purple-100 text-purple-800",
    Tech: "bg-blue-100 text-blue-800",
    Sports: "bg-orange-100 text-orange-800",
    Business: "bg-gray-100 text-gray-800",
    Art: "bg-pink-100 text-pink-800",
    Food: "bg-amber-100 text-amber-800",
    Entertainment: "bg-red-100 text-red-800",
  };

  const style = categoryStyles[category] || "bg-gray-100 text-gray-800";

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-source font-semibold ${style}`}>
      {category}
    </span>
  );
}
