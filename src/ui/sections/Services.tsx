"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ServiceCards from "../components/ServiceCards";
import { useGSAP } from "@gsap/react";
import { ANIMATION_CONFIG } from "@/lib/types";
import { useMediaQuery } from "@/hooks/useMediaQuery";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Services() {
  const servicesRef = useRef<HTMLElement>(null);
  const headingWrapperRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useGSAP(() => {
    if (!headingWrapperRef.current || !servicesRef.current) return;

    // Split heading text into words with proper markup
    const headingText = "SERVICES I OFFER";
    const words = headingText.split(" ");

    headingWrapperRef.current.innerHTML = words
      .map(
        (word, index) => `
          <div class="inline-block overflow-hidden${
            index !== words.length - 1 ? " mr-[0.25em]" : ""
          }">
            <span class="inline-block">
              ${word}
            </span>
          </div>
        `
      )
      .join("");

    const spans = headingWrapperRef.current.querySelectorAll("span");

    // Create a main timeline for better control and performance
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top center+=40%",
        toggleActions: "play none none reverse",
      },
      defaults: {
        duration: ANIMATION_CONFIG.duration,
        ease: ANIMATION_CONFIG.ease,
      },
    });

    if (isMobile) {
      // Simplified mobile animations
      gsap.set(spans, { opacity: 0, y: 20 });

      mainTimeline
        .to(spans, {
          opacity: 1,
          y: 0,
          stagger: 0.05, // Faster stagger on mobile
          duration: 0.5,
          clearProps: "all",
        })
        .add(() => {
          // Simple fade in for service cards on mobile
          gsap.from(".service-card", {
            opacity: 0,
            y: 20,
            duration: 0.4,
            stagger: 0.1,
            scrollTrigger: {
              trigger: ".service-card",
              start: "top 80%",
            },
            clearProps: "all",
          });
        });
    } else {
      // Desktop animations
      gsap.set(spans, {
        y: 100,
        opacity: 0,
        filter: "blur(8px)",
      });

      // Heading animation
      mainTimeline.to(spans, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: ANIMATION_CONFIG.stagger,
        onStart: () => {
          // Apply will-change only during animation
          spans.forEach((span) => {
            span.style.willChange = "transform, opacity, filter";
          });
        },
        onComplete: () => {
          // Clean up will-change after animation
          spans.forEach((span) => {
            span.style.willChange = "auto";
          });
        },
      });

      // Border radius animation with better performance
      const borderRadiusTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
      });

      borderRadiusTimeline.fromTo(
        servicesRef.current,
        { borderRadius: "64px" },
        {
          borderRadius: "0px",
          clearProps: "borderRadius",
        }
      );

      // Hero section blur effect optimization
      const blurTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      });

      const heroSection = document.querySelector("#hero-section");
      if (heroSection) {
        // Apply will-change before animation starts
        heroSection.setAttribute("style", "will-change: filter");

        blurTimeline.fromTo(
          heroSection,
          { filter: "blur(0px)" },
          {
            filter: "blur(10px)",
            onComplete: () => {
              // Remove will-change after animation
              heroSection.setAttribute("style", "will-change: auto");
            },
          }
        );
      }

      // Service cards reveal animation
      const cards = document.querySelectorAll(".service-card");
      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.2,
          clearProps: "all",
        });
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      mainTimeline.kill();
    };
  }, [isMobile]); // Re-run when mobile state changes

  return (
    <section
      ref={servicesRef}
      className="w-full min-h-screen bg-brand-beige px-10 pt-20 overflow-hidden"
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
