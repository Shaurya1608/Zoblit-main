"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote: "The most seamless real estate experience I've ever had. The virtual tours were a game changer.",
    author: "Sarah Johnson",
    role: "First-time Homebuyer",
  },
  {
    quote: "Find helped us sell our home in record time. The platform is intuitive and the support is unmatched.",
    author: "Michael Chen",
    role: "Property Seller",
  },
  {
    quote: "As an agent, the tools provided by Find have completely transformed how I interact with my clients.",
    author: "Elena Rodriguez",
    role: "Real Estate Agent",
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const nextIndex = (activeIndex + 1) % testimonials.length;
        const scrollWidth = scrollRef.current.offsetWidth;
        scrollRef.current.scrollTo({
          left: nextIndex * scrollWidth,
          behavior: "smooth",
        });
        setActiveIndex(nextIndex);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.offsetWidth);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  return (
    <section className="py-32 px-4 md:px-8 bg-white text-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-400 mb-4">Testimonials</h2>
          <h3 className="text-4xl md:text-5xl font-bold">What Our Community Says</h3>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
          >
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="w-full flex-shrink-0 snap-center flex flex-col items-center justify-center text-center px-4 md:px-20"
              >
                <div className="max-w-4xl">
                  <p className="text-3xl md:text-5xl font-medium leading-tight mb-12 italic">
                    "{t.quote}"
                  </p>
                  <div>
                    <h4 className="text-xl font-bold">{t.author}</h4>
                    <p className="text-zinc-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  scrollRef.current?.scrollTo({
                    left: idx * scrollRef.current.offsetWidth,
                    behavior: "smooth",
                  });
                  setActiveIndex(idx);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "bg-zinc-950 w-8" : "bg-zinc-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
