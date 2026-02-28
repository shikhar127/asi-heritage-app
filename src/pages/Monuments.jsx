import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MONUMENTS, STATES, CATEGORIES, CIRCLES } from "../data/monuments";
import MonumentCard from "../components/MonumentCard";

export default function Monuments() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCircle, setSelectedCircle] = useState("All");
  const [unescoOnly, setUnescoOnly] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, []);

  const filtered = useMemo(() => {
    return MONUMENTS.filter((m) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.city.toLowerCase().includes(q) ||
        m.state.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q));
      const matchesState = selectedState === "All" || m.state === selectedState;
      const matchesCategory = selectedCategory === "All" || m.category === selectedCategory;
      const matchesCircle = selectedCircle === "All" || m.circle === selectedCircle;
      const matchesUnesco = !unescoOnly || m.unesco;
      return matchesQuery && matchesState && matchesCategory && matchesCircle && matchesUnesco;
    });
  }, [query, selectedState, selectedCategory, selectedCircle, unescoOnly]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 mb-1">All ASI Monuments</h1>
        <p className="text-stone-500 text-sm">Browse and book tickets for 143 ticketed monuments across India</p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-stone-200 rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center no-print">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search monuments, cities, states..."
          className="flex-1 min-w-48 px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-400"
        />
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none bg-white"
        >
          <option value="All">All States</option>
          {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none bg-white"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={selectedCircle}
          onChange={(e) => setSelectedCircle(e.target.value)}
          className="px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none bg-white"
        >
          <option value="All">All Circles</option>
          {CIRCLES.map((c) => <option key={c} value={c}>{c} Circle</option>)}
        </select>
        <label className="flex items-center gap-2 text-sm text-stone-600 cursor-pointer">
          <input
            type="checkbox"
            checked={unescoOnly}
            onChange={(e) => setUnescoOnly(e.target.checked)}
            className="accent-orange-500"
          />
          UNESCO only
        </label>
        {(query || selectedState !== "All" || selectedCategory !== "All" || selectedCircle !== "All" || unescoOnly) && (
          <button
            onClick={() => { setQuery(""); setSelectedState("All"); setSelectedCategory("All"); setSelectedCircle("All"); setUnescoOnly(false); }}
            className="text-xs text-red-500 hover:text-red-700 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="text-stone-500 text-sm mb-4">{filtered.length} monument{filtered.length !== 1 ? "s" : ""} found</p>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <p className="text-4xl mb-3">🏛️</p>
          <p className="text-lg font-medium">No monuments found</p>
          <p className="text-sm mt-1">Try a different search or clear filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((m) => (
            <MonumentCard key={m.id} monument={m} />
          ))}
        </div>
      )}
    </div>
  );
}
