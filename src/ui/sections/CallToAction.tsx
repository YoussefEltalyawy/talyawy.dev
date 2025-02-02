"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Mail } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CallToAction: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textWrapperRef.current || !circleRef.current)
      return;

    // Create separate elements for each line
    textWrapperRef.current.innerHTML = `
      <div class="overflow-hidden">
        <div class="line will-change-transform">LETS</div>
      </div>
      <div class="overflow-hidden">
        <div class="line will-change-transform">WORK</div>
      </div>
      <div class="overflow-hidden">
        <div class="line will-change-transform">TOGETHER</div>
      </div>
    `;

    const lines = textWrapperRef.current.querySelectorAll(".line");

    // Initial states
    gsap.set(lines, {
      y: "100%",
      opacity: 0,
    });

    gsap.set(circleRef.current, {
      scale: 1.5,
      opacity: 0,
    });

    gsap.set(buttonRef.current, {
      y: 50,
      opacity: 0,
    });

    // Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center+=20%",
        toggleActions: "play none none reverse",
      },
    });

    // Staggered line animations
    tl.to(lines, {
      y: "0%",
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out",
    })
      .to(
        circleRef.current,
        {
          scale: 1,
          opacity: 0.7,
          duration: 1.8,
          ease: "power2.inOut",
        },
        "-=1"
      )
      .to(
        buttonRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=1.4"
      );

    // Mouse movement effect on circle
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } =
        sectionRef.current!.getBoundingClientRect();
      const x = (clientX - left - width / 2) * 0.15;
      const y = (clientY - top - height / 2) * 0.15;

      gsap.to(circleRef.current, {
        x: x,
        y: y,
        duration: 1,
        ease: "power2.out",
      });
    };

    sectionRef.current.addEventListener("mousemove", handleMouseMove);

    return () => {
      sectionRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-brand-beige flex items-center 
                 overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16"
    >
      {/* Background circle */}
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
        <div className="flex flex-col gap-20 sm:gap-24 md:gap-28 lg:gap-32">
          {/* Text container */}
          <div
            ref={textWrapperRef}
            className="text-[11vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw] 
                       font-bold leading-[0.9] tracking-tight text-left uppercase"
          />

          {/* Email section */}
          <div className="space-y-4">
            <p className="text-xs sm:text-sm uppercase tracking-widest text-brand-beige/60 pl-1">
              Get in touch
            </p>

            <a
              ref={buttonRef}
              href="mailto:talyawy@proton.me"
              className="group inline-block"
            >
              <div className="flex items-center gap-6 sm:gap-8">
                <div
                  className="flex items-center justify-center w-16 h-16 
                              sm:w-20 sm:h-20 md:w-24 md:h-24 
                              bg-brand-beige/5 rounded-2xl
                              group-hover:bg-brand-beige/10 
                              transition-all duration-500 ease-out"
                >
                  <Mail
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
                                 opacity-60 group-hover:opacity-100
                                 transition-all duration-500"
                  />
                </div>

                <div className="flex flex-col items-start gap-2">
                  <span
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
                                 font-semibold tracking-tight
                                 transition-transform duration-500 ease-out
                                 group-hover:translate-x-2"
                  >
                    talyawy@proton.me
                  </span>
                  <div
                    className="h-px w-0 bg-brand-beige/40
                                transition-all duration-700 ease-out
                                group-hover:w-full"
                  />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
