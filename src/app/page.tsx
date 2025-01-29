"use client";
import Hero from "@/ui/sections/Hero";
import Services from "@/ui/sections/Services";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize Lenis
    lenis.current = new Lenis({
      duration: 0.6,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      // smoothTouch: false,
    });

    function raf(time: number) {
      lenis.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Tell ScrollTrigger to use Lenis instead of default scroll
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return value !== undefined
          ? lenis.current?.scrollTo(value)
          : window.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    // Refresh ScrollTrigger after Lenis updates
    lenis.current.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.current?.destroy(); // Safely call destroy
      lenis.current = null; // Reset reference to null
    };
  }, []);

  return (
    <main className="relative font-[family-name:var(--font-league-spartan)]">
      <div
        id="hero-section"
        className="h-[100vh] sticky top-0"
        style={{ zIndex: 1 }}
      >
        <Hero />
      </div>
      <div className="h-[100vh] -mt-screen">
        <Services />
      </div>
    </main>
  );
}

export default Home;
