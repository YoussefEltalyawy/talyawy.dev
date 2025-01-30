"use client";
import Hero from "@/ui/sections/Hero";
import Services from "@/ui/sections/Services";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

function Home() {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    lenis.current = new Lenis({
      duration: 0.6, // Control the duration of the scroll
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // Cubic easing for smooth stop
      smoothWheel: true,
    });

    const animate = (time: number) => {
      lenis.current?.raf(time); // Safely access lenis.current
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      lenis.current?.destroy(); // Safely call destroy
      lenis.current = null; // Reset reference to null
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
    </main>
  );
}
export default Home;