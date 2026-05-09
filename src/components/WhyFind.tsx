"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function WhyFind() {
  const container = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => { });
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(videoRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative flex flex-col items-center"
    >
      {/* Spacer to delay content until hero animation finishes */}
      <div className="h-[200vh] w-full pointer-events-none" />

      <div className="relative w-full py-24 px-4 md:px-8 bg-white text-zinc-950 flex flex-col items-center">
        {/* Decorative Cloud */}
        <div className="absolute -top-[40vh] left-0 w-full h-[60vh] pointer-events-none z-0 mix-blend-screen opacity-100">
          <Image
            src="/Cloud-png/single-cloud.png"
            alt="Cloud Decoration"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">Why Find?</h2>
            <p className="text-lg text-zinc-600 max-w-3xl mx-auto font-medium">
              Discover a platform designed for the modern era. We've re-imagined every
              step of the journey to ensure transparency, speed, and elegance.
            </p>
          </div>

          <div className="relative aspect-video w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 bg-zinc-100">
            <video
              key="why-find-video"
              ref={videoRef}
              src="/video/why-find1.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              onCanPlay={(e) => e.currentTarget.play()}
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
