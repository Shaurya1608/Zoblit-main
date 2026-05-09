"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const steps = [
  {
    number: "01",
    title: "Search & Discover",
    description: "Our AI-driven search helps you find properties that match your lifestyle, not just your budget.",
    stat: "2500+",
    label: "Active Listings",
  },
  {
    number: "02",
    title: "Tour & Experience",
    description: "Book instant 3D tours or physical viewings with a single click. No phone calls, no hassle.",
    stat: "150k",
    label: "Virtual Tours Taken",
  },
  {
    number: "03",
    title: "Close & Celebrate",
    description: "Digital contracts and instant verification make closing as smooth as the search.",
    stat: "98%",
    label: "Customer Satisfaction",
  },
];

export default function StepReveal() {
  const container = useRef<HTMLDivElement>(null);
  const leftCol = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Pining the whole section is easier with Scrub, but the user wants the left side pinned.
      // Actually, ScrollTrigger pin: true on the trigger is common for this effect.
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      });

      // Animate steps sequentially
      steps.forEach((_, idx) => {
        if (idx === 0) return;
        
        // Fade out previous step
        tl.to(`.step-item-${idx - 1}`, {
          opacity: 0,
          y: -50,
          duration: 0.5,
        }, ">"); // Starts after previous animation

        // Fade in current step
        tl.from(`.step-item-${idx}`, {
          y: 50,
          opacity: 0,
          duration: 1,
        }, "<+=0.2"); // Starts slightly after the fade out begins
      });


      // Counter animation with proxy pattern
      const counters = container.current?.querySelectorAll(".counter");
      counters?.forEach((counter) => {
        const target = counter.getAttribute("data-target") || "0";
        const numericTarget = parseInt(target.replace(/[^0-9]/g, ""));
        const suffix = target.replace(/[0-9]/g, "");
        
        const obj = { val: 0 };
        gsap.to(obj, {
          val: numericTarget,
          duration: 2,
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
          },
          onUpdate: function() {
            if (counter) counter.textContent = Math.floor(obj.val) + suffix;
          }
        });
      });

    },
    { scope: container }
  );

  return (
    <section ref={container} className="bg-zinc-950 text-white overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-screen flex flex-col md:flex-row gap-20 items-center">
        {/* Left Pinned Column */}
        <div ref={leftCol} className="w-full md:w-1/2 space-y-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-blue-500">The Process</h2>
          <h3 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            Real Estate <br /> <span className="text-zinc-800">Rewired</span>
          </h3>
          <p className="text-xl text-zinc-400 max-w-md">
            We've reimagined every step to ensure your journey is as elegant as your destination.
          </p>
        </div>

        <div className="w-full md:w-1/2 relative h-[60vh] flex items-center">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`step-item-${idx} absolute inset-0 flex flex-col justify-center space-y-6 bg-zinc-950 ${idx === 0 ? "opacity-100" : "opacity-0"}`}
            >

              <span className="text-zinc-800 font-black text-9xl leading-none">{step.number}</span>
              <h4 className="text-4xl font-bold">{step.title}</h4>
              <p className="text-zinc-400 text-lg max-w-md">{step.description}</p>
              
              <div className="pt-8">
                <div className="text-6xl font-black text-white counter" data-target={step.stat}>0</div>
                <p className="text-sm text-zinc-500 uppercase tracking-widest mt-2">{step.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

