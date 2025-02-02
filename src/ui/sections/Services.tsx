"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ServiceCards from "../components/ServiceCards";
import { useGSAP } from "@gsap/react";
import { ANIMATION_CONFIG } from "@/lib/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Services() {
  const servicesRef = useRef<HTMLElement>(null);
  const headingWrapperRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!headingWrapperRef.current || !servicesRef.current) return;

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

    //Animations
    gsap.set(spans, {
      y: 100,
      opacity: 0,
      filter: "blur(8px)",
    });

    // Heading animation
    gsap.to(spans, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: ANIMATION_CONFIG.duration,
      stagger: ANIMATION_CONFIG.stagger,
      ease: ANIMATION_CONFIG.ease,
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top center+=40%",
        toggleActions: "play none none reverse",
      },
    });

    // Border radius animation
    gsap.fromTo(
      servicesRef.current,
      { borderRadius: "64px" },
      {
        borderRadius: "0px",
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
      }
    );

    // Hero section blur effect
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
      className="w-full min-h-screen bg-brand-beige will-change-transform px-10 pt-20 overflow-hidden"
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
