import React, { useRef } from "react";
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
  video: string; // Changed from 'image' to 'video'
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Salty Cai.",
    category: "Shopify & E-Commerce",
    brief:
      " A fully customized e-commerce website for an Egyptian fashion brand that blends old-money aesthetics with streetwear. Built using Shopify’s Hydrogen framework, the project covered design, SEO, and full-stack development.",
    video: "/Salty-Home.mp4", // Updated to use video
    tags: ["SHOPIFY", "E-COMMERCE", "REACT", "HYDROGEN",'FULL-STACK', 'WEB DESIGN'],
  },
  {
    id: 2,
    title: "SOGAI™ Case Studies",
    category: "AI Research Platform",
    brief:
      "Exploring the intersection of generative AI and creative industries through interactive case studies.",
    video: "/api/placeholder/800/500", // Updated to use video
    tags: ["UI/UX", "DEVELOPMENT", "2024"],
  },
];

const SelectedWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const staticDigitRef = useRef<HTMLSpanElement>(null);
  const changingDigitRef = useRef<HTMLSpanElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !headingRef.current || !projectsRef.current)
      return;

    // Heading animation
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

    // Project number animations
    const projectElements = projectsRef.current.children;

    [...projectElements].forEach((project, index) => {
      ScrollTrigger.create({
        trigger: project,
        start: "top center",
        end: "bottom center",
        onEnter: () => updateDigit(index + 1, "down"),
        onEnterBack: () => updateDigit(index + 1, "up"),
      });
    });

    function updateDigit(number: number, direction: "up" | "down") {
      if (!changingDigitRef.current) return;

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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#001000] text-brand-beige px-10 py-20"
    >
      <h2
        ref={headingRef}
        className="text-4xl md:text-5xl lg:text-7xl text-brand-beige mb-20"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative">
        {/* Fixed number counter */}
        <div className="lg:sticky lg:top-20 h-fit">
          <div className="flex text-[200px] lg:text-[300px] font-semibold leading-none">
            <span ref={staticDigitRef} className="block">
              0
            </span>
            <span ref={changingDigitRef} className="block overflow-hidden">
              1
            </span>
          </div>
        </div>

        {/* Scrolling projects */}
        <div ref={projectsRef} className="space-y-40">
          {projects.map((project) => (
            <div key={project.id} className="project-card space-y-6">
              <div className="aspect-video overflow-hidden bg-black/20 relative">
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm opacity-80">{project.category}</p>
                  <h3 className="text-4xl font-light">{project.title}</h3>
                </div>
                <p className="text-lg opacity-90">{project.brief}</p>
                <div className="flex gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm border border-brand-beige/20 rounded-full"
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
