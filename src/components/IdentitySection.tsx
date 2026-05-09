"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function IdentitySection() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Scroll-to-fill text effect
      const lines = textRef.current?.querySelectorAll(".reveal-text span");
      lines?.forEach((line) => {
        gsap.to(line, {
          color: "#000000",
          duration: 1,
          scrollTrigger: {
            trigger: line,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        });
      });

      // Chevron images parallax
      gsap.from(".chevron-img", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".chevron-grid",
          start: "top 75%",
        },
      });

      gsap.to(".chevron-img img", {
        scale: 1.2,
        scrollTrigger: {
          trigger: ".chevron-grid",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="py-32 px-4 md:px-8 bg-white text-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div ref={textRef} className="max-w-5xl mb-32">
          <h2 className="reveal-text text-5xl md:text-8xl font-black tracking-tight leading-[1.1]">
            <span className="block text-zinc-300">This isn't just about</span>
            <span className="block text-zinc-300">real estate. It's about</span>
            <span className="block text-zinc-300">the morning light in your</span>
            <span className="block text-zinc-300">kitchen and the peace</span>
            <span className="block text-zinc-300">of finding where you belong.</span>
          </h2>
        </div>

        <div className="chevron-grid grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070&auto=format&fit=crop",
          ].map((src, idx) => (
            <div
              key={idx}
              className="chevron-img relative aspect-[3/4] overflow-hidden bg-zinc-100"
              style={{
                clipPath: "polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0% 100%, 20% 50%)",
              }}
            >
              <Image
                src={src}
                alt={`Lifestyle ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
