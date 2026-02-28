import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50 no-print">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🏛️</span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-stone-900">ASI Monuments</p>
            <p className="text-xs text-stone-500">Archaeological Survey of India</p>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <Link to="/" className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive("/") ? "bg-orange-50 text-orange-700" : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"}`}>
            Home
          </Link>
          <Link to="/monuments" className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive("/monuments") ? "bg-orange-50 text-orange-700" : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"}`}>
            All Monuments
          </Link>
          <Link to="/my-tickets" className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive("/my-tickets") ? "bg-orange-50 text-orange-700" : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"}`}>
            My Tickets
          </Link>
        </div>
      </div>
    </nav>
  );
}
