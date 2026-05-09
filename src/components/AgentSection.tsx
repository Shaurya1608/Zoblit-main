"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AgentSection() {
  const container = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Split parallax
      gsap.to(".agent-img-left", {
        y: -100,
        scrollTrigger: {
          trigger: container.current,
          scrub: 1.5,
          start: "top bottom",
          end: "bottom top",
        },
      });

      gsap.to(".agent-img-right", {
        y: 100,
        scrollTrigger: {
          trigger: container.current,
          scrub: 1.5,
          start: "top bottom",
          end: "bottom top",
        },
      });

      // Word-by-word reveal
      const words = headingRef.current?.innerText.split(" ");
      if (headingRef.current && words) {
        headingRef.current.innerHTML = words
          .map((word) => `<span class="inline-block opacity-0 translate-y-4">${word}&nbsp;</span>`)
          .join("");
        
        gsap.to(headingRef.current.querySelectorAll("span"), {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
          },
        });
      }
    },
    { scope: container }
  );

  return (
    <section ref={container} className="agent-section py-32 px-4 md:px-8 bg-zinc-50 text-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative aspect-[4/5] w-full max-w-md mx-auto md:ml-0">
            <div className="agent-img-left relative w-full h-full rounded-3xl overflow-hidden shadow-2xl z-10 will-change-transform">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
                alt="Agent collaboration"
                fill
                className="object-cover"
              />
            </div>
            <div className="agent-img-right absolute -right-12 -bottom-12 w-2/3 h-2/3 rounded-3xl overflow-hidden shadow-2xl z-0 will-change-transform border-8 border-white">
              <Image
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop"
                alt="Professional agent"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-8">
            <h2 ref={headingRef} className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tighter">
              Real Estate, Rewired For The Best Agents.
            </h2>
            <p className="text-xl text-white-600 max-w-lg">
              We empower agents with the tools they need to provide a superior experience to their clients. Modern technology meets human expertise.
            </p>
            <div className="flex gap-4 pt-4">
              <button className="px-8 py-4 bg-zinc-950 text-white rounded-full font-semibold hover:bg-zinc-800 transition-colors">
                Join As An Agent
              </button>
              <button className="px-8 py-4 border border-zinc-200 rounded-full font-semibold hover:bg-zinc-100 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
