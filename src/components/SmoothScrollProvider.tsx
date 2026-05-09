"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });



    const tickerHandler = (time: number) => {
      lenis.raf(time * 1000);
    };



    gsap.ticker.add(tickerHandler);

    // Reset scroll position on refresh
    window.scrollTo(0, 0);

    return () => {
      gsap.ticker.remove(tickerHandler);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

