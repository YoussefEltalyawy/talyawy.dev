import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ServiceCards from "../components/ServiceCards";
import { useGSAP } from "@gsap/react";
import { ANIMATION_CONFIG } from "@/lib/animation-config";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { animateElements, createScrollTrigger } from "@/lib/animation-utils";

// Register GSAP plugins only once on the client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Services() {
  const servicesRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useGSAP(() => {
    if (!servicesRef.current || !headingRef.current) return;

    // Setup heading text
    const headingText = "SERVICES I OFFER";
    headingRef.current.innerHTML = headingText.split(" ").map(word => 
      `<div class="inline-block overflow-hidden mr-[0.25em]">
        <span class="inline-block">${word}</span>
      </div>`
    ).join("");

    // Optimize heading animation
    const spans = headingRef.current.querySelectorAll("span");
    const headingAnimation = animateElements({
      elements: spans,
      fromVars: {
        y: 100,
        opacity: 0,
        filter: ANIMATION_CONFIG.blur.start
      },
      toVars: {
        duration: ANIMATION_CONFIG.duration.slow,
        ease: ANIMATION_CONFIG.ease.textReveal,
        filter: ANIMATION_CONFIG.blur.end
      }
    });

    createScrollTrigger(servicesRef.current, headingAnimation);

    // Optimize border radius animation for desktop
    if (!isMobile) {
      const borderAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1
        }
      });

      gsap.set(servicesRef.current, {
        borderRadius: "48px",
        willChange: "border-radius"
      });

      borderAnimation.to(servicesRef.current, {
        borderRadius: "0px",
        ease: "none",
        onComplete: () => {
          gsap.set(servicesRef.current, { willChange: "auto" });
        }
      });
    }
  }, [isMobile]);

  return (
    <section
      ref={servicesRef}
      className="w-full min-h-screen bg-brand-beige px-10 pt-20 overflow-hidden"
    >
      <h2
        ref={headingRef}
        className="text-4xl md:text-5xl lg:text-7xl text-brand-olive mb-12"
      />
      <ServiceCards />
    </section>
  );
}

export default Services;