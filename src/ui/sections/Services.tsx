"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Services() {
  const servicesRef = useRef<HTMLElement>(null);
  const headingWrapperRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingWrapperRef.current) return;

    // Split heading text into words
    const headingText = "SERVICES I OFFER";
    const words = headingText.split(" ");

    // Create word spans with overflow hidden wrappers
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
    gsap.set(servicesRef.current, {
      yPercent: 100,
      borderRadius: "32px 32px 0 0",
    });

    gsap.set(spans, {
      y: 100,
      opacity: 0,
      filter: "blur(8px)",
    });

    gsap.set(textRef.current, {
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
        ref={headingWrapperRef}
        className="text-4xl md:text-5xl lg:text-7xl text-brand-olive mb-12"
      />
    </section>
  );
}

export default Services;
