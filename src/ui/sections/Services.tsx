import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ServiceCards from "../components/ServiceCards";
import { useGSAP } from "@gsap/react";
import { ANIMATION_CONFIG } from "@/lib/animation-config";
import { animateElements, createScrollTrigger } from "@/lib/animation-utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Register GSAP plugins only once on the client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HEADING_TEXT = "SERVICES I OFFER";

function Services() {
  const servicesRef = useRef<HTMLElement>(null);
  const headingWrapperRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Pre-hide elements to prevent flash
  useLayoutEffect(() => {
    if (!headingWrapperRef.current) return;
    gsap.set(headingWrapperRef.current.querySelectorAll("span"), {
      opacity: 0,
      y: 40,
    });
  }, []);

  useGSAP(() => {
    const services = servicesRef.current;
    const headingWrapper = headingWrapperRef.current;

    if (!services || !headingWrapper) return;

    // Create heading elements with proper markup and performance attributes
    const words = HEADING_TEXT.split(" ")
      .map(
        (word, index, arr) => `
      <div class="inline-block overflow-hidden${index !== arr.length - 1 ? " mr-[0.25em]" : ""}">
        <span class="inline-block will-change-[transform,opacity]">${word}</span>
      </div>
    `
      )
      .join("");

    headingWrapper.innerHTML = words;

    const spans = headingWrapper.querySelectorAll("span");

    // Create a context for better memory management
    const ctx = gsap.context(() => {
      // Main timeline for heading animation with optimized settings
      const mainTimeline = gsap.timeline({
        paused: true,
        defaults: {
          duration: isMobile ? ANIMATION_CONFIG.duration.medium : ANIMATION_CONFIG.duration.slow,
          ease: ANIMATION_CONFIG.ease.textReveal,
        },
      });

      // Heading animation using optimized animateElements
      const headingAnimation = animateElements({
        elements: spans,
        duration: isMobile ? ANIMATION_CONFIG.duration.medium : ANIMATION_CONFIG.duration.slow,
        ease: ANIMATION_CONFIG.ease.textReveal,
        useBlur: !isMobile,
        willChange: ["transform", "opacity"],
      });

      mainTimeline.add(headingAnimation);

      // Create scroll trigger with optimized settings
      createScrollTrigger(services, mainTimeline, {
        start: isMobile ? "top center+=10%" : "top center+=30%",
      });

      if (!isMobile) {
        // Border radius animation - only on desktop with optimized performance
        const borderRadiusTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: services,
            start: "top bottom",
            end: "top top",
            scrub: 1,
            onEnter: () => {
              if (services instanceof HTMLElement) {
                services.style.willChange = "border-radius";
              }
            },
            onLeave: () => {
              if (services instanceof HTMLElement) {
                services.style.willChange = "auto";
              }
            },
          },
        });

        gsap.set(services, {
          borderRadius: "48px",
        });

        borderRadiusTimeline.to(services, {
          borderRadius: "0px",
          ease: "none",
        });

        // Hero section blur effect - only on desktop with optimized performance
        const heroSection = document.querySelector("#home");
        if (heroSection instanceof HTMLElement) {
          const blurTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: services,
              start: "top bottom",
              end: "top center",
              scrub: 1,
              onEnter: () => {
                if (heroSection instanceof HTMLElement) {
                  heroSection.style.willChange = "filter";
                }
              },
              onLeave: () => {
                if (heroSection instanceof HTMLElement) {
                  heroSection.style.willChange = "auto";
                }
              },
            },
          });

          blurTimeline.fromTo(
            heroSection,
            { filter: "blur(0px)" },
            { filter: "blur(8px)" }
          );
        }
      }
    }, services);

    // Cleanup function
    return () => {
      ctx.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  return (
    <section
      id="services"
      ref={servicesRef}
      className="w-full min-h-screen bg-brand-beige px-6 sm:px-10 pt-20 overflow-hidden"
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