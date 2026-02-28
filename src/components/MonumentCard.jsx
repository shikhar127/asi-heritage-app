import { Link } from "react-router-dom";

export default function MonumentCard({ monument }) {
  const { id, name, city, state, category, description, image, pricing, unesco, tags } = monument;

  return (
    <Link to={`/monument/${id}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="relative h-48 overflow-hidden bg-stone-200">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = "https://placehold.co/400x300/d4c7b0/4a382b?text=" + encodeURIComponent(name); }}
        />
        {unesco && (
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            UNESCO
          </span>
        )}
        <span className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
          {category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-stone-900 text-base leading-tight mb-1 line-clamp-2">{name}</h3>
        <p className="text-stone-500 text-sm mb-3">
          {city}, {state}
        </p>
        <p className="text-stone-600 text-sm line-clamp-2 mb-4">{description}</p>

        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
          <div>
            <p className="text-xs text-stone-500">Indian</p>
            <p className="font-bold text-orange-600">
              {pricing.indian === 0 ? "Free" : `₹${pricing.indian}`}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-stone-500">Foreign</p>
            <p className="font-bold text-stone-700">₹{pricing.foreign}</p>
          </div>
          <span className="text-xs text-orange-600 font-medium group-hover:underline">View & Book →</span>
        </div>
      </div>
    </Link>
  );
}
