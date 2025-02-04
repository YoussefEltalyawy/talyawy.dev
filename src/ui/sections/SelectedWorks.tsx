import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: number;
  title: string;
  category: string;
  brief: string;
  video: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Fizzi",
    category: "Landing",
    brief:
      " A fully customized e-commerce website for an Egyptian fashion brand that blends old-money aesthetics with streetwear. Built using Shopify's Hydrogen framework, the project covered design, SEO, and full-stack development.",
    video: "/fizzi.mp4",
    tags: [
      "NEXT.JS",
      "3D ELEMENTS",
      "GSAP",
    ],
  },
  {
    id: 2,
    title: "Salty Cai.",
    category: "Shopify & E-Commerce",
    brief:
      " A fully customized e-commerce website for an Egyptian fashion brand that blends old-money aesthetics with streetwear. Built using Shopify's Hydrogen framework, the project covered design, SEO, and full-stack development.",
    video: "/Salty-Home.mp4",
    tags: [
      "SHOPIFY",
      "E-COMMERCE",
      "REACT",
      "HYDROGEN",
      "FULL-STACK",
      "WEB DESIGN",
    ],
  },
];

const SelectedWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const staticDigitRef = useRef<HTMLSpanElement>(null);
  const changingDigitRef = useRef<HTMLSpanElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  // @ts-ignore - activeProject is used in mouse events
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  useGSAP(() => {
    if (!sectionRef.current || !headingRef.current || !projectsRef.current)
      return;

    const headingText = "SELECTED WORKS";
    const words = headingText.split(" ");

    headingRef.current.innerHTML = words
      .map(
        (word, index) => `
        <div class="inline-block overflow-hidden${
          index !== words.length - 1 ? " mr-[0.25em]" : ""
        }">
          <span class="inline-block will-change-transform">
            ${word}
          </span>
        </div>
      `
      )
      .join("");

    const spans = headingRef.current.querySelectorAll("span");

    gsap.set(spans, {
      y: 100,
      opacity: 0,
      filter: "blur(8px)",
    });

    gsap.to(spans, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center+=40%",
        toggleActions: "play none none reverse",
      },
    });

    if (isDesktop && projectsRef.current) {
      const projectElements = projectsRef.current.children;

      [...projectElements].forEach((project, index) => {
        ScrollTrigger.create({
          trigger: project,
          start: "top center+=100",
          end: "bottom center-=100",
          onEnter: () => {
            updateDigit(index + 1, "down");
            gsap.to(project, {
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
            });
          },
          onEnterBack: () => {
            updateDigit(index + 1, "up");
            gsap.to(project, {
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
            });
          },
          onLeave: () => {
            gsap.to(project, {
              opacity: 0.6,
              duration: 0.8,
              ease: "power3.in",
            });
          },
          onLeaveBack: () => {
            gsap.to(project, {
              opacity: 0.6,
              duration: 0.8,
              ease: "power3.in",
            });
          },
        });
      });
    }

    function updateDigit(number: number, direction: "up" | "down") {
      if (!changingDigitRef.current || !isDesktop) return;

      const newDigit = number.toString().padStart(2, "0")[1];
      if (changingDigitRef.current.textContent !== newDigit) {
        const tl = gsap.timeline({
          defaults: {
            duration: 0.2,
            ease: "power2.inOut",
          },
        });

        tl.to(changingDigitRef.current, {
          yPercent: direction === "down" ? 100 : -100,
          ease: "power2.in",
        })
          .call(() => {
            if (changingDigitRef.current) {
              changingDigitRef.current.textContent = newDigit;
              gsap.set(changingDigitRef.current, {
                yPercent: direction === "down" ? -100 : 100,
              });
            }
          })
          .to(changingDigitRef.current, {
            yPercent: 0,
            ease: "power2.out",
            duration: 0.2,
          });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isDesktop]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-brand-olive text-brand-beige px-4 sm:px-6 md:px-8 lg:px-10 py-12 md:py-16 lg:py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(202,190,182,0.03),transparent)] pointer-events-none" />
      
      <h2
        ref={headingRef}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-beige tracking-tight mb-12 md:mb-16 lg:mb-20"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 relative">
        {isDesktop && (
          <div className="hidden lg:block lg:sticky lg:top-20 h-fit">
            <div className="flex text-[200px] xl:text-[300px] font-semibold leading-none opacity-80">
              <span ref={staticDigitRef} className="block mix-blend-difference">
                0
              </span>
              <span
                ref={changingDigitRef}
                className="block overflow-hidden mix-blend-difference"
              >
                1
              </span>
            </div>
          </div>
        )}

        <div
          ref={projectsRef}
          className={`space-y-20 md:space-y-32 lg:space-y-40 ${
            !isDesktop ? "col-span-1" : ""
          }`}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card group"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="aspect-video overflow-hidden bg-black/20 relative rounded-lg mb-6 md:mb-8 
                             transform transition-transform duration-700 ease-out hover:scale-[1.02]">
                <div className="absolute inset-0 bg-brand-olive/20 mix-blend-overlay transition-opacity duration-300 
                               group-hover:opacity-0" />
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transform scale-105 transition-transform duration-700 
                           group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-olive/40 to-transparent opacity-60 
                               transition-opacity duration-300 group-hover:opacity-30" />
              </div>
              
              <div className="space-y-6 transform transition-all duration-500">
                <p className="text-xs sm:text-sm uppercase tracking-widest text-brand-beige/60 
                             transition-colors duration-300 group-hover:text-brand-beige/80">
                  {project.category}
                </p>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight 
                             transition-colors duration-300 group-hover:text-brand-beige">
                  {project.title}
                </h3>

                <p className="text-base sm:text-lg text-brand-beige/80 leading-relaxed max-w-3xl 
                             transition-opacity duration-300 group-hover:text-brand-beige">
                  {project.brief}
                </p>

                <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 text-xs tracking-wider text-brand-beige/70
                               bg-brand-beige/5 border border-brand-beige/10 rounded-full
                               transition-all duration-300 hover:bg-brand-beige/10
                               hover:border-brand-beige/20 hover:text-brand-beige
                               transform hover:-translate-y-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
