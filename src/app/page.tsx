// page.tsx
"use client";
import CallToAction from "@/ui/sections/CallToAction";
import Hero from "@/ui/sections/Hero";
import SelectedWorks from "@/ui/sections/SelectedWorks";
import Services from "@/ui/sections/Services";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

function Home() {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    // Only enable Lenis on desktop
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      lenis.current = new Lenis({
        duration: 0.6,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
      });

      const animate = (time: number) => {
        lenis.current?.raf(time);
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }

    return () => {
      lenis.current?.destroy();
      lenis.current = null;
    };
  }, []);

  return (
    <main className="relative font-[family-name:var(--font-league-spartan)]">
      <div className="h-screen">
        <Hero />
      </div>
      <div className="relative">
        <Services />
      </div>
      <div className="relative">
        <SelectedWorks />
      </div>
      <div className="relative">
        <CallToAction />
      </div>
    </main>
  );
}
export default Home;
