import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MONUMENTS } from "../data/monuments";
import MonumentCard from "../components/MonumentCard";

const FEATURED_IDS = ["taj-mahal", "red-fort", "qutub-minar", "ajanta-caves", "hampi", "konark-sun-temple", "amer-fort", "sanchi-stupa", "mahabalipuram", "dholavira"];

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/monuments?q=${encodeURIComponent(query.trim())}`);
  };

  const featured = MONUMENTS.filter((m) => FEATURED_IDS.includes(m.id));

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-orange-950 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1280px-Taj_Mahal_%28Edited%29.jpeg')] bg-cover bg-center" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-orange-300 text-sm font-semibold tracking-widest uppercase mb-3">Archaeological Survey of India</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Explore & Book Tickets<br />to India's Heritage
          </h1>
          <p className="text-stone-300 text-lg mb-8 max-w-xl mx-auto">
            Browse all 143 ticketed ASI monuments, check prices, and book your visit in seconds.
          </p>
          <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by monument, city, or state..."
              className="flex-1 px-4 py-3 rounded-xl text-stone-900 text-base outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button type="submit" className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl font-semibold transition-colors">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-orange-600 text-white py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 text-center">
          {[
            { value: "119+", label: "Monuments Listed" },
            { value: "25", label: "ASI Circles" },
            { value: "40+", label: "UNESCO Sites" },
            { value: "₹10–1100", label: "Ticket Range" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-orange-200 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Monuments */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Must-Visit Monuments</h2>
            <p className="text-stone-500 text-sm mt-1">Iconic heritage sites across India</p>
          </div>
          <a href="/monuments" className="text-orange-600 text-sm font-medium hover:underline">View all →</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((m) => (
            <MonumentCard key={m.id} monument={m} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-stone-50 border-t border-stone-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">How to Book Your Ticket</h2>
          <p className="text-stone-500 text-sm mb-10">Simple 4-step process via the official ASI portal</p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {[
              { step: "1", icon: "🔍", title: "Find Monument", desc: "Search or browse by state, category, or name" },
              { step: "2", icon: "📅", title: "Choose Date & Slot", desc: "Pick your visit date and preferred time slot" },
              { step: "3", icon: "💳", title: "Pay Securely", desc: "Pay via UPI, card, or netbanking on ASI portal" },
              { step: "4", icon: "📥", title: "Download PDF", desc: "Get your e-ticket via email and download the PDF" },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl mb-3">{s.icon}</div>
                <p className="font-semibold text-stone-800 mb-1">{s.title}</p>
                <p className="text-stone-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-4">
          <span className="text-2xl">ℹ️</span>
          <div>
            <p className="font-semibold text-blue-900 mb-1">About Ticket Prices</p>
            <p className="text-blue-700 text-sm">Prices shown are approximate and may vary by monument. Children under 15 are typically free for Indian citizens. SAARC/BIMSTEC nationals get concessional rates. Final prices are shown at checkout on the official ASI portal. A ₹5–₹50 convenience fee may apply for online booking.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
