"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Services() {
  const servicesRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Initial states
    gsap.set(servicesRef.current, {
      yPercent: 100,
      borderRadius: "32px 32px 0 0",
    });

    gsap.set([headingRef.current, textRef.current], {
      opacity: 0,
      y: 50,
    });

    // Overlay slide up animation
    gsap.to(servicesRef.current, {
      yPercent: 0,
      borderRadius: 0,
      duration: 1,
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 1,
      },
    });

    // Content animations
    gsap.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top center+=40%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.2,
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top center+=20%",
        toggleActions: "play none none reverse",
      },
    });

    // Blur animation for hero section
    gsap.to("#hero-section", {
      filter: "blur(10px)",
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top bottom",
        end: "top center",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={servicesRef}
      className="fixed top-0 left-0 w-full min-h-screen bg-brand-beige will-change-transform p-10"
      style={{ zIndex: 10 }}
    >
      <h2
        ref={headingRef}
        className="text-4xl md:text-5xl lg:text-7xl text-brand-olive mb-12"
      >
        HOW I CAN HELP YOU /
      </h2>
    </section>
  );
}

export default Services;
