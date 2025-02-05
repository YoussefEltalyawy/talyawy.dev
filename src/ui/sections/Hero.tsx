import React, { useRef, useLayoutEffect, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextReveal } from "@/ui/components/TextReveal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import clsx from "clsx";

const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    medium: 0.5,
    slow: 0.7,
    extraSlow: 0.9
  },
  ease: {
    smooth: "power2.out",
    gentle: "power1.inOut",
    snappy: "power3.out",
    textReveal: "power2.out"
  },
  stagger: {
    text: 0.08,
    elements: 0.15
  }
};

export const Hero: React.FC = () => {
  const scopeRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  // Create refs outside of useMemo
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);

  const textRefs = useMemo(() => ({
    name: nameRef,
    role: roleRef,
    location: locationRef,
    line1: line1Ref,
    line2: line2Ref,
    line3: line3Ref,
  }), []);

  const isMobile = useMediaQuery("(max-width: 767px)");

  // Set initial states
  useLayoutEffect(() => {
    if (!scopeRef.current) return;

    // Hide all text elements
    Object.values(textRefs).forEach(ref => {
      if (ref.current) {
        gsap.set(ref.current, {
          autoAlpha: 0,
          y: isMobile ? 15 : 30,
          filter: ref === textRefs.name ? "blur(8px)" : "none"
        });
      }
    });

    // Set circle initial state
    if (circleRef.current) {
      gsap.set(circleRef.current, {
        autoAlpha: 0,
        scale: 0.2,
        transformOrigin: "left bottom",
      });
    }
  }, [isMobile, textRefs]);

  // Main animation
  useGSAP(() => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      // Reset any existing animations
      gsap.killTweensOf(Object.values(textRefs).map(ref => ref.current));
      gsap.killTweensOf(circleRef.current);

      if (isMobile) {
        // Mobile animations - simple and sequential
        const duration = 0.5;
        const ease = "power2.out";

        gsap.to(circleRef.current, {
          autoAlpha: 0.6,
          scale: 1,
          duration: ANIMATION_CONFIG.duration.slow,
          ease: ANIMATION_CONFIG.ease.gentle,
        });

        gsap.to(textRefs.name.current, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: duration,
          delay: 0.2,
          ease: ease,
        });

        const bioElements = [textRefs.role.current, textRefs.location.current];
        bioElements.forEach((el, i) => {
          gsap.to(el, {
            autoAlpha: 1,
            y: 0,
            duration: duration,
            delay: 0.3 + (i * 0.1),
            ease: ease,
          });
        });

        const descElements = [textRefs.line1.current, textRefs.line2.current, textRefs.line3.current];
        descElements.forEach((el, i) => {
          gsap.to(el, {
            autoAlpha: 1,
            y: 0,
            duration: duration,
            delay: 0.5 + (i * 0.1),
            ease: ease,
          });
        });
      } else {
        // Desktop animations - dynamic and overlapping
        const tl = gsap.timeline();

        // Circle animation
        tl.to(circleRef.current, {
          autoAlpha: 0.8,
          scale: 1,
          duration: ANIMATION_CONFIG.duration.extraSlow,
          ease: ANIMATION_CONFIG.ease.gentle,
        });

        // Name animation with blur
        tl.to(textRefs.name.current, {
          autoAlpha: 1,
          y: 0,
          duration: ANIMATION_CONFIG.duration.slow,
          ease: ANIMATION_CONFIG.ease.textReveal,
          filter: "blur(0px)",
        }, "-=0.4");

        // Bio animations
        tl.to([textRefs.role.current, textRefs.location.current], {
          autoAlpha: 1,
          y: 0,
          duration: ANIMATION_CONFIG.duration.medium,
          stagger: ANIMATION_CONFIG.stagger.text,
          ease: ANIMATION_CONFIG.ease.textReveal,
        }, "-=0.3");

        // Description animations
        tl.to([textRefs.line1.current, textRefs.line2.current, textRefs.line3.current], {
          autoAlpha: 1,
          y: 0,
          duration: ANIMATION_CONFIG.duration.medium,
          stagger: ANIMATION_CONFIG.stagger.text,
          ease: ANIMATION_CONFIG.ease.textReveal,
        }, "-=0.2");
      }
    }, scopeRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={scopeRef}
      id="home"
      className="fixed min-h-screen w-full bg-black overflow-hidden"
    >
      {/* Background circle */}
      <div
        ref={circleRef}
        className={clsx(
          "absolute bottom-0 left-0",
          "w-96 h-96 lg:w-[400px] lg:h-[400px]",
          "bg-brand-olive/60 rounded-full opacity-0",
          "transform-gpu",
          isMobile
            ? "blur-[60px] md:blur-[80px]"
            : "blur-[60px] md:blur-[120px]"
        )}
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
                         tracking-tight opacity-0 transform-gpu"
                style={{ filter: "blur(8px)" }}
              >
                talyawy
              </h1>
            </div>
            <div className="-space-y-1.5">
              <TextReveal ref={textRefs.role} className="opacity-0 transform-gpu">
                <span className="font-light">Full-Stack </span>
                <span className="font-normal">Web Developer & Designer</span>
              </TextReveal>
              <TextReveal ref={textRefs.location} className="opacity-0 transform-gpu">
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
                  className="text-base md:text-2xl leading-tight opacity-0 transform-gpu"
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
