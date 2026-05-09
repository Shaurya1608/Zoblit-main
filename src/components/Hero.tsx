"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {


  const wrapperRef = useRef<HTMLElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Page load animations
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.6,
      });

      gsap.from(ctaRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.9,
      });

      gsap.from(arrowRef.current, {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: "power2.out",
        delay: 1.2,
      });

      // Continuous arrow bounce
      gsap.to(arrowRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Scroll animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=300%", // Reduced for faster animation
          scrub: 1, // Snappier response
        },
      });

      tl.fromTo([titleRef.current, subtitleRef.current, ctaRef.current, arrowRef.current], 
        { opacity: 1, y: 0 },
        {
          y: -100,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "none",
        }, 
        0
      );

      // Layer 2: House moves UP aggressively to touch the top
      tl.to(".layer-house", { y: "-100vh", ease: "none", duration: 1 }, 0);

      // Layer 4: Cloud Front moves UP faster
      tl.to(".layer-cloud-front", { y: "-60vh", ease: "none", duration: 1 }, 0);

      // Layer 5: Smoke moves UP fast, fades to 0
      tl.to(".layer-smoke", { y: "-100vh", opacity: 0, ease: "none", duration: 1 }, 0);

    });

  return (
    <section ref={wrapperRef} className="relative w-full h-[400vh] bg-zinc-950 mb-[-300vh]">
      <div
        ref={container}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      >
        {/* Layer 1: Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/sunset3.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Layer 3: Cloud Back */}
      <div className="layer-cloud-back absolute inset-0 z-[1] pointer-events-none will-change-transform opacity-100 mix-blend-screen">
        <Image
          src="/Cloud-png/single-cloud.png"
          alt="Cloud Back"
          fill
          unoptimized
          className="object-cover scale-110 translate-y-[-6vh]"
        />
      </div>

      {/* Layer 2: House */}
      <div className="layer-house absolute inset-0 z-[2] pointer-events-none will-change-transform">
        <Image
          src="/only-house2.png"
          alt="Modern Building"
          fill
          className="object-contain object-bottom scale-[2.2] md:scale-[1.5] origin-bottom translate-y-[60vh] md:translate-y-[80vh]"
          priority
        />
      </div>

      {/* Layer 4: Cloud Front */}
       <div className="layer-cloud-front absolute inset-0 z-[3] pointer-events-none will-change-transform opacity-0 mix-blend-screen">
        <Image
          src="/Cloud-png/single-cloud.png"
          alt="Cloud Front"
          fill
          unoptimized
          className="object-cover scale-125 translate-y-[10vh]"
        />
      </div> 






      {/* Layer 5: Smoke */}
      <div className="layer-smoke absolute inset-0 z-[4] pointer-events-none will-change-transform mix-blend-screen">
        <Image
          src="/Cloud-png/illustration-with-transparent-white-clouds/smoke3.png"
          alt="Smoke"
          fill
          className="object-cover opacity-70 scale-[1.5] origin-bottom"
        />
      </div>







      {/* Content Overlay */}
      <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center text-center px-4 pointer-events-none -translate-y-[5vh] md:-translate-y-[10vh]">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-[7vw] font-black leading-[1.1] tracking-tighter text-black uppercase drop-shadow-2xl md:whitespace-nowrap"
        >
          Find What Moves You
        </h1>
        <p
          ref={subtitleRef}
          className="mt-6 text-sm md:text-base text-zinc-800 max-w-xl font-medium drop-shadow-lg"
        >
          A new era of real estate. Seamless, elegant, and focused on you.
        </p>
        <div className="mt-8 pointer-events-auto flex flex-col items-center">
          <button
            ref={ctaRef}
            className="group flex items-center gap-3 px-8 py-4 bg-zinc-950 text-white font-bold rounded-full hover:bg-zinc-800 transition-all shadow-xl uppercase tracking-widest text-sm"
          >
            Find Properties
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <svg className="w-4 h-4 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
          
          <div ref={arrowRef} className="mt-12 text-white/50">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}


