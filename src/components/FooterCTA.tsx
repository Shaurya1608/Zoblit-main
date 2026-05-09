"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function FooterCTA() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".footer-brand", {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".footer-brand",
          start: "top 90%",
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="bg-black text-white pt-40 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 mb-32">
          <div className="space-y-12">
            <h2 className="text-6xl md:text-8xl font-black leading-none tracking-tighter uppercase">
              Get Started <br /> With Zoblit.
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <button className="px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all uppercase tracking-widest text-sm">
                Find Properties
              </button>
              <button className="px-10 py-5 border border-zinc-800 text-white font-bold rounded-full hover:bg-zinc-900 transition-all uppercase tracking-widest text-sm">
                Contact Us
              </button>
            </div>
          </div>

          <div className="space-y-12">
            <p className="text-2xl text-zinc-400 leading-relaxed max-w-md">
              Subscribe to our newsletter for curated collections and the latest market insights.
            </p>
            <div className="relative max-w-md">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border-b border-zinc-800 py-6 text-xl focus:border-white transition-colors outline-none"
              />
              <button className="absolute right-0 bottom-6 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

          </div>
        </div>

        <div className="footer-brand mb-20">
          <h1 className="text-[20vw] font-black leading-none tracking-[calc(-0.05em)] text-zinc-900 uppercase select-none">
            Zoblit
          </h1>
        </div>

        <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-600 text-sm font-bold uppercase tracking-widest">
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <p>© 2026 Zoblit. All rights reserved.</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </section>
  );
}

