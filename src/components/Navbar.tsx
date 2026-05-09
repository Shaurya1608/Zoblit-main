"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Hide when scrolling down past 60px, show when scrolling back up
      if (currentY > lastScrollY && currentY > 60) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-transparent py-8 ${
        hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-black tracking-tighter uppercase text-zinc-950">
          Zoblit
        </Link>

        <div className="hidden md:flex gap-10 text-sm font-bold uppercase tracking-widest text-zinc-950">
          <Link href="#" className="hover:text-zinc-600 transition-colors">Search</Link>
          <Link href="#" className="hover:text-zinc-600 transition-colors">Buy</Link>
          <Link href="#" className="hover:text-zinc-600 transition-colors">Sell</Link>
          <Link href="#" className="hover:text-zinc-600 transition-colors">Agents</Link>
        </div>

        <button className="px-6 py-2 border-2 border-zinc-950 text-zinc-950 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-zinc-950 hover:text-white transition-colors">
          Sign In
        </button>
      </div>
    </nav>
  );
}
