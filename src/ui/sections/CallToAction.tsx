"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Mail } from "lucide-react";
import { ANIMATION_CONFIG } from "@/lib/animation-config";
import { animateElements, createScrollTrigger } from "@/lib/animation-utils";
import { throttle } from "lodash";

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

    // Optimize mouse movement effect
    const handleMouseMove = throttle((e: MouseEvent) => {
      if (!sectionRef.current || !circleRef.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
      const x = (clientX - left - width / 2) * 0.15;
      const y = (clientY - top - height / 2) * 0.15;

      gsap.to(circleRef.current, {
        x,
        y,
        duration: ANIMATION_CONFIG.duration.medium,
        ease: ANIMATION_CONFIG.ease.gentle,
      });
    }, 1000/60); // Throttle to 60fps

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
      {/* Blurry Olive Circle */}
      <div
        ref={circleRef}
        className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px]   
                   md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] 
                   bg-gradient-to-br from-brand-olive/60 to-brand-olive/40 
                   rounded-full blur-[100px] sm:blur-[120px] md:blur-[140px] 
                   pointer-events-none transition-all duration-300 ease-out"
      />

      {/* Content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-12 sm:gap-16 md:gap-20">
          {/* Text section */}
          <div
            ref={textWrapperRef}
            className="text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[7vw] 
                       font-bold leading-[0.95] tracking-tight text-center
                       md:text-left uppercase"
          />
          {/* Full-width email button */}
          <div className="flex justify-center md:justify-start px-4 overflow-hidden">
            <a
              ref={buttonRef}
              href="mailto:talyawy@proton.me"
              className="group inline-flex items-center gap-4 sm:gap-6
                       p-4 sm:p-6 rounded-2xl w-full max-w-[800px] md:max-w-none
                       md:w-full hover:bg-brand-beige/5 transition-colors duration-300"
            >
              <div className="button-element flex-shrink-0 overflow-hidden">
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center
                              bg-brand-beige/5 rounded-xl">
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-brand-beige
                             transition-all duration-300" />
                </div>
              </div>

              <div className="button-element flex flex-col overflow-hidden flex-grow">
                <span className="text-xs sm:text-sm uppercase tracking-widest text-brand-beige/60 mb-1">
                  Available for new projects
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight
                           truncate text-brand-beige text-left">
                  talyawy@proton.me
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
