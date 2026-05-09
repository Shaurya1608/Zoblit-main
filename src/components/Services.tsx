"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const services = [
  {
    title: "BUY",
    subtitle: "A Home",
    description: "Find your place with an immersive photo experience and the most listings.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop",
    color: "from-blue-500/20 to-transparent",
  },
  {
    title: "SELL",
    subtitle: "A Home",
    description: "No matter what path you take to sell your home, we can help you navigate a successful sale.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    color: "from-purple-500/20 to-transparent",
  },
  {
    title: "RENT",
    subtitle: "A Home",
    description: "We're creating a seamless online experience – from shopping on the largest rental network to applying.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
    color: "from-emerald-500/20 to-transparent",
  },
];

export default function Services() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      // Heading reveal
      tl.from(".services-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
      });

      // Cards sequential reveal
      tl.from(".service-card", {
        scale: 0.8,
        opacity: 0,
        y: 100,
        stagger: 1, // High stagger for sequential feel
        duration: 2,
        ease: "power2.out",
      });
    },
    { scope: container }
  );

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const img = card.querySelector("img");
    gsap.to(card, { scale: 1.03, duration: 0.3 });
    gsap.to(img, { scale: 1.08, duration: 0.3 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const img = card.querySelector("img");
    gsap.to(card, { scale: 1, duration: 0.3 });
    gsap.to(img, { scale: 1, duration: 0.3 });
  };

  return (
    <section ref={container} className="h-screen flex items-center px-4 md:px-8 bg-white text-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-20 services-heading">
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-blue-500 mb-4">Our Services</h2>
          <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-zinc-950">What We Do.</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="service-card relative group cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.color} group-hover:opacity-80 transition-opacity`} />
                <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-black/90 to-transparent">
                  <h3 className="text-[6rem] md:text-[8rem] font-black leading-none tracking-tighter text-white opacity-80 group-hover:opacity-100 transition-opacity">
                    {service.title}
                  </h3>
                  <p className="text-xl font-bold text-blue-500 mb-4 uppercase tracking-widest">{service.subtitle}</p>
                  <p className="text-zinc-300 text-lg leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center text-white font-semibold gap-2 group-hover:text-blue-400 transition-colors">
                    Learn more
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

