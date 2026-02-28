import { useState, useRef } from "react";

export default function ImageCarousel({ images, name }) {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const onTouchStart = (e) => { touchStart.current = e.targetTouches[0].clientX; };
  const onTouchMove = (e) => { touchEnd.current = e.targetTouches[0].clientX; };
  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const delta = touchStart.current - touchEnd.current;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    touchStart.current = null;
    touchEnd.current = null;
  };

  const placeholder = `https://placehold.co/800x400/d4c7b0/4a382b?text=${encodeURIComponent(name)}`;

  if (!images || images.length === 0) {
    return (
      <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 mb-6 bg-stone-200">
        <img src={placeholder} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 mb-6 bg-stone-900 select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Images */}
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${name} ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${i === current ? "opacity-100" : "opacity-0"}`}
          onError={(e) => { e.target.src = placeholder; }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Arrows — only show if >1 image */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm transition-colors backdrop-blur-sm"
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm transition-colors backdrop-blur-sm"
            aria-label="Next photo"
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? "bg-white w-3" : "bg-white/50"}`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <span className="absolute top-3 right-3 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
            {current + 1} / {images.length}
          </span>
        </>
      )}
    </div>
  );
}
