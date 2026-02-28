import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MONUMENTS, VISITOR_CATEGORIES } from "../data/monuments";

export default function MonumentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const monument = MONUMENTS.find((m) => m.id === id);

  const [visitorType, setVisitorType] = useState("indian");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  if (!monument) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-4xl mb-3">🏛️</p>
        <h2 className="text-xl font-bold text-stone-900 mb-2">Monument not found</h2>
        <Link to="/monuments" className="text-orange-600 hover:underline text-sm">← Back to all monuments</Link>
      </div>
    );
  }

  const { name, city, state, circle, category, description, image, pricing, unesco, tags, timings, extraNote, bookingUrl, slots } = monument;

  const selectedVisitor = VISITOR_CATEGORIES.find((v) => v.id === visitorType);
  const adultPrice = pricing[selectedVisitor.priceKey] || 0;
  const childPrice = pricing[selectedVisitor.childKey] || 0;
  const total = adults * adultPrice + children * childPrice;

  const handleBook = () => {
    window.open(bookingUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/monuments" className="text-orange-600 text-sm hover:underline mb-4 inline-block no-print">← All Monuments</Link>

      {/* Hero Image */}
      <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 mb-6 bg-stone-200">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = "https://placehold.co/800x400/d4c7b0/4a382b?text=" + encodeURIComponent(name); }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-5 text-white">
          <div className="flex gap-2 mb-1 flex-wrap">
            {unesco && <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">UNESCO World Heritage</span>}
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">{category}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
          <p className="text-white/80 text-sm">{city}, {state} · ASI {circle} Circle</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-stone-100 p-5">
            <h2 className="font-semibold text-stone-900 mb-2">About</h2>
            <p className="text-stone-600 text-sm leading-relaxed">{description}</p>
          </div>

          <div className="bg-white rounded-xl border border-stone-100 p-5">
            <h2 className="font-semibold text-stone-900 mb-3">Visit Information</h2>
            <div className="space-y-2.5">
              <div className="flex gap-3 text-sm">
                <span className="text-stone-400 w-24 shrink-0">Timings</span>
                <span className="text-stone-700">{timings}</span>
              </div>
              <div className="flex gap-3 text-sm">
                <span className="text-stone-400 w-24 shrink-0">Location</span>
                <span className="text-stone-700">{city}, {state}</span>
              </div>
              <div className="flex gap-3 text-sm">
                <span className="text-stone-400 w-24 shrink-0">ASI Circle</span>
                <span className="text-stone-700">{circle} Circle</span>
              </div>
              {slots && (
                <div className="flex gap-3 text-sm">
                  <span className="text-stone-400 w-24 shrink-0">Entry</span>
                  <span className="text-stone-700">Time-slot based entry (select slot while booking)</span>
                </div>
              )}
            </div>
            {extraNote && (
              <div className="mt-3 bg-amber-50 border border-amber-100 rounded-lg p-3 text-sm text-amber-800">
                💡 {extraNote}
              </div>
            )}
          </div>

          {/* Pricing Table */}
          <div className="bg-white rounded-xl border border-stone-100 p-5">
            <h2 className="font-semibold text-stone-900 mb-3">Ticket Prices</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-stone-400 text-xs uppercase border-b border-stone-100">
                  <th className="pb-2 font-medium">Category</th>
                  <th className="pb-2 font-medium text-right">Adult</th>
                  <th className="pb-2 font-medium text-right">Child (&lt;15)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {VISITOR_CATEGORIES.map((vc) => (
                  <tr key={vc.id}>
                    <td className="py-2.5">
                      <p className="font-medium text-stone-800">{vc.label}</p>
                      <p className="text-stone-400 text-xs">{vc.description}</p>
                    </td>
                    <td className="py-2.5 text-right font-semibold text-stone-800">
                      {pricing[vc.priceKey] === 0 ? <span className="text-green-600">Free</span> : `₹${pricing[vc.priceKey]}`}
                    </td>
                    <td className="py-2.5 text-right font-semibold text-green-600">
                      {pricing[vc.childKey] === 0 ? "Free" : `₹${pricing[vc.childKey]}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-stone-400 mt-3">* Prices are approximate. Final price confirmed at checkout on ASI portal.</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="bg-stone-100 text-stone-600 text-xs px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>

        {/* Booking Panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-orange-100 p-5 shadow-sm sticky top-20">
            <h2 className="font-bold text-stone-900 mb-4 text-base">Calculate & Book</h2>

            {/* Visitor Type */}
            <div className="mb-4">
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wide block mb-1.5">Nationality</label>
              <div className="space-y-1.5">
                {VISITOR_CATEGORIES.map((vc) => (
                  <label key={vc.id} className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${visitorType === vc.id ? "border-orange-400 bg-orange-50" : "border-stone-200 hover:bg-stone-50"}`}>
                    <input type="radio" name="visitorType" value={vc.id} checked={visitorType === vc.id} onChange={() => setVisitorType(vc.id)} className="accent-orange-500" />
                    <span className="text-sm font-medium text-stone-800">{vc.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Visitor Count */}
            <div className="mb-4 grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-stone-500 uppercase tracking-wide block mb-1">Adults</label>
                <div className="flex items-center gap-2 border border-stone-200 rounded-lg overflow-hidden">
                  <button onClick={() => setAdults(Math.max(1, adults - 1))} className="px-3 py-2 bg-stone-50 hover:bg-stone-100 text-stone-600 font-bold text-sm transition-colors border-r border-stone-200">−</button>
                  <span className="flex-1 text-center text-sm font-semibold">{adults}</span>
                  <button onClick={() => setAdults(Math.min(20, adults + 1))} className="px-3 py-2 bg-stone-50 hover:bg-stone-100 text-stone-600 font-bold text-sm transition-colors border-l border-stone-200">+</button>
                </div>
                <p className="text-xs text-stone-400 mt-1">{adultPrice === 0 ? "Free" : `₹${adultPrice}/person`}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-stone-500 uppercase tracking-wide block mb-1">Children</label>
                <div className="flex items-center gap-2 border border-stone-200 rounded-lg overflow-hidden">
                  <button onClick={() => setChildren(Math.max(0, children - 1))} className="px-3 py-2 bg-stone-50 hover:bg-stone-100 text-stone-600 font-bold text-sm transition-colors border-r border-stone-200">−</button>
                  <span className="flex-1 text-center text-sm font-semibold">{children}</span>
                  <button onClick={() => setChildren(Math.min(20, children + 1))} className="px-3 py-2 bg-stone-50 hover:bg-stone-100 text-stone-600 font-bold text-sm transition-colors border-l border-stone-200">+</button>
                </div>
                <p className="text-xs text-stone-400 mt-1">{childPrice === 0 ? "Free (under 15)" : `₹${childPrice}/person`}</p>
              </div>
            </div>

            {/* Total */}
            <div className="bg-stone-50 rounded-lg p-3 mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-stone-500">{adults} adult{adults > 1 ? "s" : ""}</span>
                <span className="font-medium">₹{adults * adultPrice}</span>
              </div>
              {children > 0 && (
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-stone-500">{children} child{children > 1 ? "ren" : ""}</span>
                  <span className="font-medium">{childPrice === 0 ? "Free" : `₹${children * childPrice}`}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-stone-200 pt-2 mt-2">
                <span className="font-bold text-stone-900">Estimated Total</span>
                <span className="font-bold text-orange-600 text-lg">₹{total}</span>
              </div>
            </div>

            <button
              onClick={handleBook}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Book on ASI Portal ↗
            </button>
            <p className="text-xs text-stone-400 text-center mt-2">
              Opens official asi.payumoney.com in a new tab
            </p>

            <div className="mt-4 pt-4 border-t border-stone-100">
              <button
                onClick={() => navigate("/my-tickets")}
                className="w-full text-sm text-stone-600 hover:text-orange-600 font-medium py-2 transition-colors"
              >
                📥 View / Download My Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
