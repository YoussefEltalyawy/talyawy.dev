"use client";
import React, { useRef, useLayoutEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Mail } from "lucide-react";
import { ANIMATION_CONFIG } from "@/lib/animation-config";
import { animateElements, createScrollTrigger } from "@/lib/animation-utils";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CallToAction: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const isMobile = useIsMobile();

  // Pre-hide elements to prevent flash
  useLayoutEffect(() => {
    if (!textWrapperRef.current || !buttonRef.current || !circleRef.current) return;

    // Set initial text state
    textWrapperRef.current.innerHTML = `
      <div class="overflow-hidden"><div class="line will-change-[transform,opacity]">LETS WORK</div></div>
      <div class="overflow-hidden"><div class="line will-change-[transform,opacity]">TOGETHER</div></div>
    `;

    gsap.set([
      textWrapperRef.current.querySelectorAll(".line"),
      buttonRef.current.querySelectorAll(".button-element"),
      circleRef.current
    ], {
      opacity: 0,
      y: isMobile ? 30 : 40,
    });
  }, [isMobile]);

  useGSAP(() => {
    if (!sectionRef.current || !textWrapperRef.current || !buttonRef.current || !circleRef.current) return;

    const lines = textWrapperRef.current.querySelectorAll(".line");
    const buttonContent = buttonRef.current.querySelectorAll(".button-element");

    // Create master timeline
    const tl = gsap.timeline({
      paused: true,
    });

    // Text animation
    const textAnimation = animateElements({
      elements: lines,
      duration: ANIMATION_CONFIG.duration.extraSlow,
      ease: ANIMATION_CONFIG.ease.textReveal,
      useBlur: !isMobile,
      willChange: ["transform", "opacity"],
    });

    // Circle animation
    const circleAnimation = gsap.timeline()
      .set(circleRef.current, {
        scale: 1.5,
        opacity: 0,
      })
      .to(circleRef.current, {
        scale: 1,
        opacity: isMobile ? 0.6 : 0.8,
        duration: ANIMATION_CONFIG.duration.slow,
        ease: ANIMATION_CONFIG.ease.gentle,
      });

    // Button animation
    const buttonAnimation = animateElements({
      elements: buttonContent,
      duration: ANIMATION_CONFIG.duration.medium,
      ease: ANIMATION_CONFIG.ease.smooth,
      useBlur: !isMobile,
      stagger: 0.1,
    });

    // Build the sequence
    tl.add(textAnimation)
      .add(circleAnimation, "-=1")
      .add(buttonAnimation, "-=0.8");

    // Create scroll trigger
    createScrollTrigger(sectionRef.current, tl, {
      start: "top center+=20%",
    });

    // Mouse movement effect - only on desktop
    if (!isMobile && sectionRef.current) {
      let rafId: number;
      let isMoving = false;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;

      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      const updatePosition = () => {
        if (!isMoving || !circleRef.current) return;

        currentX = lerp(currentX, targetX, 0.1);
        currentY = lerp(currentY, targetY, 0.1);

        gsap.set(circleRef.current, {
          x: currentX,
          y: currentY,
          force3D: true,
        });

        rafId = requestAnimationFrame(updatePosition);
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!sectionRef.current || !circleRef.current) return;

        const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
        targetX = (e.clientX - left - width / 2) * 0.15;
        targetY = (e.clientY - top - height / 2) * 0.15;

        if (!isMoving) {
          isMoving = true;
          rafId = requestAnimationFrame(updatePosition);
        }
      };

      const handleMouseLeave = () => {
        isMoving = false;
        cancelAnimationFrame(rafId);

        if (circleRef.current) {
          gsap.to(circleRef.current, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      };

      sectionRef.current.addEventListener("mousemove", handleMouseMove);
      sectionRef.current.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        if (sectionRef.current) {
          sectionRef.current.removeEventListener("mousemove", handleMouseMove);
          sectionRef.current.removeEventListener("mouseleave", handleMouseLeave);
        }
        cancelAnimationFrame(rafId);
      };
    }
  }, [isMobile]);

  return (
    <section
    id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-black text-brand-beige flex items-center 
                 overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16"
    >
      {/* Background circle */}
      <div
        ref={circleRef}
        className="absolute w-[300px] h-[300px] sm:w-[600px] sm:h-[600px]   
                   md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] 
                   bg-gradient-to-br from-brand-olive to-brand-olive/40
                   rounded-full blur-[60px] md:blur-[120px] lg:blur-[140px] 
                   pointer-events-none transform-gpu
                   mix-blend-screen opacity-60 sm:opacity-80"
      />

      {/* Content container */}
      <div className="relative z-10 w-full max-w-8xl mx-auto">
        <div className="flex flex-col gap-12 sm:gap-16 md:gap-20 lg:gap-24">
          {/* Text section */}
          <div
            ref={textWrapperRef}
            className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] 
                       font-bold leading-[0.9] tracking-tighter text-center
                       md:text-left uppercase"
          />
          {/* Email button */}
          <div className="flex justify-center md:justify-start overflow-hidden">
            <a
              ref={buttonRef}
              href="mailto:talyawy@proton.me"
              className="group relative inline-flex items-center gap-4 sm:gap-6 md:gap-8
                       p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl w-full max-w-[800px] md:max-w-none
                       border border-brand-beige/30 backdrop-blur-sm transform-gpu
                       hover:border-brand-beige/40 hover:bg-brand-beige/5 
                       transition-all duration-500 ease-out"
            >
              <div className="button-element flex-shrink-0 overflow-hidden transform-gpu opacity-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center
                              bg-gradient-to-br from-brand-olive/20 to-brand-beige/5
                              rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform duration-500">
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-brand-beige
                                 group-hover:scale-110 transition-all duration-500" />
                </div>
              </div>

              <div className="button-element flex flex-col overflow-hidden flex-grow transform-gpu opacity-0">
                <span className="text-xs sm:text-sm md:text-base uppercase tracking-widest 
                               text-brand-beige/60 mb-1 sm:mb-2 font-light">
                  Available for new projects
                </span>
                <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight
                               text-brand-beige text-left transition-colors duration-500
                               group-hover:text-white">
                  talyawy@proton.me
                </span>
              </div>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100
                            bg-gradient-to-r from-brand-olive/10 to-transparent
                            rounded-2xl sm:rounded-3xl transition-opacity duration-500" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
