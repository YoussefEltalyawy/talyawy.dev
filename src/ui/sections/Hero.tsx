import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextReveal } from "@/ui/components/TextReveal";
import { ANIMATION_CONFIG } from "@/lib/animation-config";
import { animateElements } from "@/lib/animation-utils";
import { useIsMobile } from "@/hooks/useIsMobile";

export const Hero: React.FC = () => {
  const scopeRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const textRefs = {
    name: useRef<HTMLHeadingElement>(null),
    role: useRef<HTMLParagraphElement>(null),
    location: useRef<HTMLParagraphElement>(null),
    line1: useRef<HTMLParagraphElement>(null),
    line2: useRef<HTMLParagraphElement>(null),
    line3: useRef<HTMLParagraphElement>(null),
  };
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      if (!scopeRef.current) return;

      const mainTimeline = gsap.timeline();

      // Set initial states for all elements to ensure they're hidden
      const allTextElements = Object.values(textRefs)
        .map((ref) => ref.current)
        .filter(Boolean);

      gsap.set(allTextElements, {
        y: 100,
        opacity: 0,
        filter: isMobile ? "none" : ANIMATION_CONFIG.blur.desktop.start,
      });

      gsap.set(circleRef.current, {
        scale: 0.2,
        opacity: 0,
      });

      // 1. Circle animation (starts the sequence)
      const circleAnimation = gsap.timeline()
        .to(circleRef.current, {
          scale: 1,
          opacity: isMobile ? 0.6 : 0.8,
          duration: isMobile ? ANIMATION_CONFIG.duration.slow : ANIMATION_CONFIG.duration.extraSlow,
          ease: ANIMATION_CONFIG.ease.gentle,
          transformOrigin: "left bottom",
        });

      // 2. Name animation (the main title)
      const nameAnimation = animateElements({
        elements: textRefs.name.current,
        duration: ANIMATION_CONFIG.duration.extraSlow,
        ease: ANIMATION_CONFIG.ease.textReveal,
        useBlur: !isMobile,
        willChange: ["transform", "opacity", "filter"],
      });

      // 3. Role and location animation (secondary info)
      const bioAnimation = animateElements({
        elements: [textRefs.role.current, textRefs.location.current],
        duration: ANIMATION_CONFIG.duration.medium,
        stagger: isMobile ? ANIMATION_CONFIG.stagger.mobile.text : ANIMATION_CONFIG.stagger.desktop.text,
        ease: ANIMATION_CONFIG.ease.textReveal,
        useBlur: !isMobile,
      });

      // 4. Description lines animation (final elements)
      const descriptionAnimation = animateElements({
        elements: [
          textRefs.line1.current,
          textRefs.line2.current,
          textRefs.line3.current,
        ],
        duration: ANIMATION_CONFIG.duration.medium,
        stagger: isMobile ? ANIMATION_CONFIG.stagger.mobile.text : ANIMATION_CONFIG.stagger.desktop.text,
        ease: ANIMATION_CONFIG.ease.textReveal,
        useBlur: !isMobile,
      });

      // Build the sequence with proper timing
      mainTimeline
        .add(circleAnimation)
        .add(nameAnimation, "-=0.4") // Start name animation before circle finishes
        .add(bioAnimation, "-=0.2") // Start bio slightly before name finishes
        .add(descriptionAnimation, "-=0.1"); // Start description slightly before bio finishes

    },
    { scope: scopeRef, dependencies: [isMobile] }
  );

  return (
    <section
      ref={scopeRef}
      id="hero-section"
      className="fixed min-h-screen w-full bg-black overflow-hidden"
    >
      {/* Background circle */}
      <div
        ref={circleRef}
        className="absolute bottom-0 left-0 w-96 h-96 bg-brand-olive/60 rounded-full 
                   blur-[60px] md:blur-[120px] lg:w-[400px] lg:h-[400px]
                   opacity-0" // Add initial opacity-0 to prevent flash
      />

      {/* Content container */}
      <div className="absolute bottom-28 lg:bottom-26 w-full px-6 md:px-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between max-w-8xl mx-auto">
          {/* Left section */}
          <div className="mb-6 md:mb-12 lg:mb-0">
            <div className="overflow-hidden">
              <h1
                ref={textRefs.name}
                className="text-7xl md:text-8xl lg:text-9xl font-semibold text-brand-beige 
                         will-change-[transform,opacity,filter] tracking-tight
                         opacity-0" // Add initial opacity-0 to prevent flash
              >
                talyawy
              </h1>
            </div>
            <div className="-space-y-1.5">
              <TextReveal ref={textRefs.role} className="opacity-0">
                <span className="font-light">Full-Stack </span>
                <span className="font-normal">Web Developer & Designer</span>
              </TextReveal>
              <TextReveal ref={textRefs.location} className="opacity-0">
                <span className="font-light">Based In </span>
                <span className="font-normal">Giza, Egypt</span>
              </TextReveal>
            </div>
          </div>

          {/* Right section */}
          <div className="flex flex-col gap-0 lg:gap-1 opacity-80">
            {[textRefs.line1, textRefs.line2, textRefs.line3].map(
              (ref, index) => (
                <TextReveal
                  key={index}
                  ref={ref}
                  align="right"
                  className="text-base md:text-2xl leading-tight opacity-0"
                >
                  {index === 0 &&
                    "I craft pixel-perfect web experiences for creators,"}
                  {index === 1 &&
                    "startups, and entrepreneurs to boost revenue and"}
                  {index === 2 && "stand out in a crowded market."}
                </TextReveal>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
