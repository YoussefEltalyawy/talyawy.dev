import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ServiceCards from "../components/ServiceCards";
import { useGSAP } from "@gsap/react";
import { ANIMATION_CONFIG } from "@/lib/types";
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

  useGSAP(() => {
    const services = servicesRef.current;
    const headingWrapper = headingWrapperRef.current;

    if (!services || !headingWrapper) return;

    // Create heading elements with proper markup
    const words = HEADING_TEXT.split(" ")
      .map(
        (word, index, arr) => `
      <div class="inline-block overflow-hidden${
        index !== arr.length - 1 ? " mr-[0.25em]" : ""
      }">
        <span class="inline-block">${word}</span>
      </div>
    `
      )
      .join("");

    headingWrapper.innerHTML = words;

    const spans = headingWrapper.querySelectorAll("span");
    const initialSpanStyles = {
      y: isMobile ? 20 : 100,
      opacity: 0,
      filter: isMobile ? "none" : "blur(8px)",
    };

    // Create a context for better memory management
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(spans, initialSpanStyles);

      // Main timeline for heading animation
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: services,
          start: "top center+=40%",
          toggleActions: "play none none reverse",
        },
        defaults: {
          duration: ANIMATION_CONFIG.duration,
          ease: ANIMATION_CONFIG.ease,
        },
      });

      // Heading animation
      mainTimeline.to(spans, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: isMobile ? 0.05 : ANIMATION_CONFIG.stagger,
        onStart: () => {
          spans.forEach((span) => {
            if (span instanceof HTMLElement) {
              span.style.willChange = "transform, opacity, filter";
            }
          });
        },
        onComplete: () => {
          spans.forEach((span) => {
            if (span instanceof HTMLElement) {
              span.style.willChange = "auto";
            }
          });
        },
      });

      if (!isMobile) {
        // Desktop-only animations
        const borderRadiusTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: services,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        });

        borderRadiusTimeline.fromTo(
          services,
          { borderRadius: "64px" },
          { borderRadius: "0px", clearProps: "borderRadius" }
        );

        // Hero section blur effect
        const heroSection = document.querySelector("#hero-section");
        if (heroSection instanceof HTMLElement) {
          const blurTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: services,
              start: "top bottom",
              end: "top center",
              scrub: 1,
            },
          });

          gsap.set(heroSection, { willChange: "filter" });
          blurTimeline.fromTo(
            heroSection,
            { filter: "blur(0px)" },
            {
              filter: "blur(10px)",
              onComplete: () => {
                if (heroSection instanceof HTMLElement) {
                  heroSection.style.willChange = "auto";
                }
              },
            }
          );
        }
      }

      // Service cards animation
      gsap.utils
        .toArray<HTMLElement>(".service-card")
        .forEach((card, index) => {
          gsap.from(card, {
            opacity: 0,
            y: isMobile ? 20 : 50,
            duration: isMobile ? 0.4 : 0.8,
            delay: index * (isMobile ? 0.1 : 0.2),
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            clearProps: "all",
          });
        });
    }, services);

    // Cleanup function
    return () => {
      ctx.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

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
