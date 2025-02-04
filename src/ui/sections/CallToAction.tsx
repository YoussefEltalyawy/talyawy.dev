"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Mail } from "lucide-react";
import { ANIMATION_CONFIG } from "@/lib/animation-config";
import { animateElements, createScrollTrigger } from "@/lib/animation-utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CallToAction: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textWrapperRef.current || !buttonRef.current || !circleRef.current) return;

    // Text animation setup
    textWrapperRef.current.innerHTML = `
      <div class="overflow-hidden"><div class="line">LET'S WORK</div></div>
      <div class="overflow-hidden"><div class="line">TOGETHER</div></div>
    `;

    const lines = textWrapperRef.current.querySelectorAll(".line");
    const buttonContent = buttonRef.current.querySelectorAll(".button-element");

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center+=20%",
        end: "bottom center",
        toggleActions: "play none none reverse",
      }
    });

    // Text animation
    const textAnimation = animateElements({
      elements: lines,
      fromVars: {
        y: 100,
        opacity: 0,
        filter: ANIMATION_CONFIG.blur.start
      },
      toVars: {
        duration: ANIMATION_CONFIG.duration.extraSlow,
        stagger: ANIMATION_CONFIG.stagger.text,
        ease: ANIMATION_CONFIG.ease.smooth,
        filter: ANIMATION_CONFIG.blur.end
      }
    });

    // Circle animation
    const circleAnimation = gsap.timeline()
      .set(circleRef.current, {
        scale: 1.5,
        opacity: 0,
        willChange: "transform, opacity"
      })
      .to(circleRef.current, {
        scale: 1,
        opacity: 0.7,
        duration: ANIMATION_CONFIG.duration.slow,
        ease: ANIMATION_CONFIG.ease.gentle,
        onComplete: () => {
          gsap.set(circleRef.current, { willChange: "auto" });
        }
      });

    // Button animation
    const buttonAnimation = animateElements({
      elements: buttonContent,
      fromVars: {
        y: 100,
        opacity: 0,
        filter: ANIMATION_CONFIG.blur.start
      },
      toVars: {
        duration: ANIMATION_CONFIG.duration.medium,
        stagger: ANIMATION_CONFIG.stagger.text,
        ease: ANIMATION_CONFIG.ease.smooth,
        filter: ANIMATION_CONFIG.blur.end
      }
    });

    // Combine all animations
    tl.add(textAnimation)
      .add(circleAnimation, "-=1")
      .add(buttonAnimation, "-=1.4");

    // Mouse movement effect
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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-brand-beige flex items-center 
                 overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16"
    >
      {/* Enhanced Blurry Olive Circle */}
      <div
        ref={circleRef}
        className="absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px]   
                   md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] 
                   bg-gradient-to-br from-brand-olive to-brand-olive/40
                   rounded-full blur-[100px] sm:blur-[120px] md:blur-[140px] 
                   pointer-events-none transition-all duration-500 ease-out
                   mix-blend-screen"
      />

      {/* Content container */}
      <div className="relative z-10 w-full max-w-8xl mx-auto">
        <div className="flex flex-col gap-16 sm:gap-20 md:gap-24">
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
              className="group relative inline-flex items-center gap-6 sm:gap-8
                       p-6 sm:p-8 rounded-3xl w-full max-w-[800px] md:max-w-none
                       border border-brand-beige/10 backdrop-blur-sm
                       hover:border-brand-beige/20 hover:bg-brand-beige/5 
                       transition-all duration-500 ease-out"
            >
              <div className="button-element flex-shrink-0 overflow-hidden">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center
                              bg-gradient-to-br from-brand-olive/20 to-brand-beige/5
                              rounded-2xl group-hover:scale-105 transition-transform duration-500">
                  <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-brand-beige
                                 group-hover:scale-110 transition-all duration-500" />
                </div>
              </div>

              <div className="button-element flex flex-col overflow-hidden flex-grow">
                <span className="text-sm sm:text-base uppercase tracking-widest 
                               text-brand-beige/60 mb-2 font-light">
                  Available for new projects
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight
                               text-brand-beige text-left transition-colors duration-500
                               group-hover:text-white">
                  talyawy@proton.me
                </span>
              </div>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100
                            bg-gradient-to-r from-brand-olive/10 to-transparent
                            rounded-3xl transition-opacity duration-500" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
