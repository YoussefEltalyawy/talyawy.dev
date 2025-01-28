"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function Hero() {
  const circleRef = useRef(null);
  const textRefs = {
    name: useRef(null),
    role: useRef(null),
    location: useRef(null),
    line1: useRef(null),
    line2: useRef(null),
    line3: useRef(null),
  };

  useEffect(() => {
    // Circle animation
    gsap.set(circleRef.current, {
      scale: 0.2,
      opacity: 0,
    });

    gsap.to(circleRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.8,
      ease: "power2.out",
      transformOrigin: "left bottom",
    });

    // Text animations
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    // Starting positions for text elements with blur
    gsap.set(
      [
        textRefs.name.current,
        textRefs.role.current,
        textRefs.location.current,
        textRefs.line1.current,
        textRefs.line2.current,
        textRefs.line3.current,
      ],
      {
        y: 100,
        opacity: 0,
        filter: "blur(8px)",
      }
    );

    // Enhanced animations with blur effect
    tl.to(textRefs.name.current, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
    })
      .to(
        [textRefs.role.current, textRefs.location.current],
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 0.8,
        },
        "-=0.7"
      )
      .to(
        [
          textRefs.line1.current,
          textRefs.line2.current,
          textRefs.line3.current,
        ],
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.15,
          duration: 1,
          ease: "power4.out", // Smoother easing for text reveal
        },
        "-=0.4"
      );
  }, [textRefs.line1, textRefs.line2, textRefs.line3, textRefs.location, textRefs.name, textRefs.role]);

  return (
    <section
      id="hero-section"
      className="relative h-full w-full bg-black overflow-hidden"
    >
      {/* Background blur effect with animation */}
      <div
        ref={circleRef}
        className="absolute bottom-0 left-0 w-96 h-96 bg-brand-olive/60 rounded-full blur-[120px] lg:w-[400px] lg:h-[400px]"
      />

      {/* Main content container */}
      <div className="absolute bottom-24 w-full px-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          {/* Left column - Name and title */}
          <div>
            <div className="overflow-hidden">
              <h1
                ref={textRefs.name}
                className="text-5xl md:text-7xl lg:text-9xl font-semibold text-brand-beige will-change-transform"
              >
                talyawy
              </h1>
            </div>
            <div className="-space-y-1.5">
              <div className="overflow-hidden">
                <p
                  ref={textRefs.role}
                  className="text-brand-beige text-base lg:text-lg will-change-transform"
                >
                  <span className="font-light">Full-Stack </span>
                  <span className="font-normal">Web Developer & Designer</span>
                </p>
              </div>
              <div className="overflow-hidden">
                <p
                  ref={textRefs.location}
                  className="text-brand-beige text-base lg:text-lg will-change-transform"
                >
                  <span className="font-light">Based In </span>
                  <span className="font-normal">Giza, Egypt</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Hero text split into lines */}
          <div className="lg:max-w-lg lg:mr-10">
            <div className="flex flex-col gap-1 lg:gap-2">
              <div className="overflow-hidden">
                <p
                  ref={textRefs.line1}
                  className="text-2xl text-left lg:text-right text-brand-beige will-change-transform"
                >
                  I craft pixel-perfect web experiences for creators,
                </p>
              </div>
              <div className="overflow-hidden -mt-3">
                <p
                  ref={textRefs.line2}
                  className="text-2xl text-left lg:text-right text-brand-beige will-change-transform"
                >
                  startups, and entrepreneurs to boost revenue and
                </p>
              </div>
              <div className="overflow-hidden -mt-3">
                <p
                  ref={textRefs.line3}
                  className="text-2xl text-left lg:text-right text-brand-beige will-change-transform"
                >
                  stand out in a crowded market.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
