"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ServiceCards from "../components/ServiceCards";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Services() {
  const servicesRef = useRef<HTMLElement>(null);
  const headingWrapperRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingWrapperRef.current) return;

    const headingText = "SERVICES I OFFER";
    const words = headingText.split(" ");

    headingWrapperRef.current.innerHTML = words
      .map(
        (word, index) => `
        <div class="inline-block overflow-hidden${
          index !== words.length - 1 ? " mr-[0.25em]" : ""
        }">
          <span class="inline-block will-change-transform">
            ${word}
          </span>
        </div>
      `
      )
      .join("");

    const spans = headingWrapperRef.current.querySelectorAll("span");

    // Initial states
    gsap.set(spans, {
      y: 100,
      opacity: 0,
      filter: "blur(8px)",
    });

    // Word-by-word animation
    gsap.to(spans, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top center+=40%",
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
      className="w-full min-h-screen bg-brand-beige will-change-transform p-10"
    >
      <h2
        ref={headingWrapperRef}
        className="text-4xl md:text-5xl lg:text-7xl text-brand-olive mb-12"
      />
      <ServiceCards />
    </section>
  );
}

export default Services;
