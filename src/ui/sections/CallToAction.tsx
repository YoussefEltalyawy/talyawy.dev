"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Mail } from "lucide-react";
import { ANIMATION_CONFIG } from "@/lib/animation-config";
import { animateElements } from "@/lib/animation-utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CallToAction: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const isMobile = window.innerWidth < 768;

  useGSAP(() => {
    if (!sectionRef.current || !textWrapperRef.current || !buttonRef.current || !circleRef.current) return;

    // Text animation setup
    textWrapperRef.current.innerHTML = `
      <div class="overflow-hidden"><div class="line">LET'S WORK</div></div>
      <div class="overflow-hidden"><div class="line">TOGETHER</div></div>
    `;

    const lines = textWrapperRef.current.querySelectorAll(".line");
    const buttonContent = buttonRef.current.querySelectorAll(".button-element");

    // Create master timeline with optimized settings
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: isMobile ? "top center+=10%" : "top center+=20%",
        end: "bottom center",
        toggleActions: "play none none reverse",
      }
    });

    // Text animation with mobile optimization
    const textAnimation = animateElements({
      elements: lines,
      duration: isMobile ? ANIMATION_CONFIG.duration.medium : ANIMATION_CONFIG.duration.extraSlow,
      ease: ANIMATION_CONFIG.ease.textReveal,
      useBlur: !isMobile,
    });

    // Circle animation with reduced complexity on mobile
    const circleAnimation = gsap.timeline()
      .set(circleRef.current, {
        scale: isMobile ? 1.2 : 1.5,
        opacity: 0,
        willChange: "transform, opacity"
      })
      .to(circleRef.current, {
        scale: 1,
        opacity: isMobile ? 0.5 : 0.7,
        duration: isMobile ? ANIMATION_CONFIG.duration.medium : ANIMATION_CONFIG.duration.slow,
        ease: ANIMATION_CONFIG.ease.gentle,
        onComplete: () => {
          gsap.set(circleRef.current, { willChange: "auto" });
        }
      });

    // Button animation with mobile optimization
    const buttonAnimation = animateElements({
      elements: buttonContent,
      duration: ANIMATION_CONFIG.duration.medium,
      ease: ANIMATION_CONFIG.ease.smooth,
      useBlur: !isMobile,
    });

    // Optimized timeline sequencing for mobile
    if (isMobile) {
      tl.add(textAnimation)
        .add(circleAnimation, "-=0.4")
        .add(buttonAnimation, "-=0.6");
    } else {
      tl.add(textAnimation)
        .add(circleAnimation, "-=1")
        .add(buttonAnimation, "-=1.4");
    }

    // Mouse movement effect - only on desktop
    if (!isMobile && sectionRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!sectionRef.current || !circleRef.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
        const x = (clientX - left - width / 2) * 0.15;
        const y = (clientY - top - height / 2) * 0.15;

        gsap.to(circleRef.current, {
          x,
          y,
          duration: 1,
          ease: "power2.out",
        });
      };

      sectionRef.current.addEventListener("mousemove", handleMouseMove);

      return () => {
        if (sectionRef.current) {
          sectionRef.current.removeEventListener("mousemove", handleMouseMove);
        }
      };
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-brand-beige flex items-center 
                 overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16"
    >
      {/* Enhanced Blurry Olive Circle - optimized for mobile */}
      <div
        ref={circleRef}
        className="absolute w-[300px] h-[300px] sm:w-[600px] sm:h-[600px]   
                   md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] 
                   bg-gradient-to-br from-brand-olive to-brand-olive/40
                   rounded-full blur-[60px] sm:blur-[120px] md:blur-[140px] 
                   pointer-events-none transition-all duration-500 ease-out
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
          {/* Enhanced email button */}
          <div className="flex justify-center md:justify-start overflow-hidden">
            <a
              ref={buttonRef}
              href="mailto:talyawy@proton.me"
              className="group relative inline-flex items-center gap-4 sm:gap-6 md:gap-8
                       p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl w-full max-w-[800px] md:max-w-none
                       border border-brand-beige/30 backdrop-blur-sm
                       hover:border-brand-beige/40 hover:bg-brand-beige/5 
                       transition-all duration-500 ease-out"
            >
              <div className="button-element flex-shrink-0 overflow-hidden">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center
                              bg-gradient-to-br from-brand-olive/20 to-brand-beige/5
                              rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform duration-500">
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-brand-beige
                                 group-hover:scale-110 transition-all duration-500" />
                </div>
              </div>

              <div className="button-element flex flex-col overflow-hidden flex-grow">
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
