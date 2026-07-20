"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface Accessory {
  tag: string;
  name: string;
  desc: string;
  image: string;
}

export default function AccessoriesCarousel({ items }: { items: Accessory[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const scrollBy = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth / 3;
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  return (
    <div
      className="relative -mx-[6vw] sm:-mx-[10vw] px-[6vw] sm:px-[10vw]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        ref={trackRef}
        className="flex gap-8 overflow-x-auto scroll-smooth"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`.acc-track::-webkit-scrollbar{display:none}`}</style>
        {items.map((a) => (
          <div
            key={a.name}
            className="group acc-track flex-shrink-0"
            style={{
              scrollSnapAlign: "start",
              width: "calc((100% - 4rem) / 3)",
              minWidth: "220px",
            }}
          >
            <div className="relative aspect-square overflow-hidden bg-mid">
              <Image
                src={a.image}
                alt={a.name}
                fill
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
            </div>
            <div className="pt-5">
              <p className="text-[0.58rem] tracking-[0.22em] uppercase text-gold/80 mb-2">
                {a.tag}
              </p>
              <h3 className="font-serif text-base sm:text-lg mb-3 leading-tight text-cream">
                {a.name}
              </h3>
              <a
                href="tel:0450670239"
                className="text-[0.65rem] tracking-[0.15em] uppercase text-cream border border-cream/25 px-4 py-2 inline-block group-hover:bg-gold group-hover:text-black group-hover:border-gold transition-all duration-500"
              >
                Enquire &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>

      <button
        aria-label="Previous"
        onClick={() => scrollBy(-1)}
        className="absolute left-0 sm:left-2 top-[35%] -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 border border-cream/20 text-cream flex items-center justify-center backdrop-blur-sm transition-all duration-500"
        style={{ opacity: hover ? 1 : 0, pointerEvents: hover ? "auto" : "none" }}
      >
        &larr;
      </button>
      <button
        aria-label="Next"
        onClick={() => scrollBy(1)}
        className="absolute right-0 sm:right-2 top-[35%] -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 border border-cream/20 text-cream flex items-center justify-center backdrop-blur-sm transition-all duration-500"
        style={{ opacity: hover ? 1 : 0, pointerEvents: hover ? "auto" : "none" }}
      >
        &rarr;
      </button>
    </div>
  );
}
