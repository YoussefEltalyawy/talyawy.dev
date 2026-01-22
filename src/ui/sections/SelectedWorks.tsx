import React, { useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectCursor from "../components/ProjectCursor";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery"; // Adjust the import path as needed

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
  link: string;
  placeholder: string;
}

// Sample projects data with placeholder image URL added
const projects: Project[] = [
  {
    id: 1,
    title: "Fizzi",
    category: "3D Landing Page",
    brief:
      "A modern landing page for an imaginary beverage product. The project showcases a perfect blend of 3D elements and web design, featuring custom 3D models created in Blender, an engaging UI designed in Figma, and smooth animations implemented with Next.js.",
    video: "/fizzi-showcase.mp4",
    tags: ["NEXT.JS", "3D MODELING", "BLENDER", "FIGMA", "UI DESIGN", "GSAP"],
    link: "https://fizzi.vercel.app/",
    placeholder: "/fizzi-placeholder.png",
  },
  {
    id: 2,
    title: "Salty Cai.",
    category: "Shopify & E-Commerce",
    brief:
      "A fully customized e-commerce website for an Egyptian fashion brand that blends old-money aesthetics with streetwear. Built using Shopify's Hydrogen framework, the project covered design, SEO, and full-stack development.",
    video: "/salty-showcase.mp4",
    tags: [
      "SHOPIFY",
      "E-COMMERCE",
      "REACT",
      "HYDROGEN",
      "FULL-STACK",
      "WEB DESIGN",
    ],
    link: "https://saltyeg.com/",
    placeholder: "/salty-placeholder.png",
  },
  {
    id: 3,
    title: "Ankh",
    category: "Productivity SaaS App",
    brief:
      "An elegant productivity application that combines task management, note-taking, and time tracking functionalities in one seamless interface. Features drag-and-drop task organization, sleek dark-themed design, and comprehensive productivity tools. Built with a full-stack approach using Supabase for backend and Kinde for authentication.",
    video: "/ankh-showcase.mp4",
    tags: [
      "NEXT.JS",
      "SUPABASE",
      "KINDE AUTH",
      "FIGMA",
      "FULL-STACK",
      "DRAG & DROP",
    ],
    link: "https://ankhbytalyawy.vercel.app/",
    placeholder: "/ankh-placecholder.png",
  },
  {
    id: 4,
    title: "Woke.eg",
    category: "Shopify & E-Commerce",
    brief:
      "A fully customized e-commerce theme for WOKE, a movement-driven clothing brand that challenges the monotony of routine life. The website embodies the brand's philosophy of self-discovery and empowerment through thoughtful design and seamless user experience. Built using Shopify Liquid with a design-first approach prototyped in Figma, the project delivers a cohesive digital presence that reflects WOKE's deeper message woven into every embroidered piece and carefully curated photoshoot.",
    video: "/woke-showcase.mp4",
    tags: [
      "SHOPIFY",
      "E-COMMERCE",
      "LIQUID",
      "WEB DESIGN",
    ],
    link: "https://woke-eg.com/",
    placeholder: "/salty-placeholder.png",
  },
];

// This component displays a placeholder image until the video has loaded.
const VideoWithPlaceholder: React.FC<{
  src: string;
  placeholder: string;
  className?: string;
}> = ({ src, placeholder, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <Image
          src={placeholder}
          alt="Loading video"
          fill
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setLoaded(true)}
        className={`${className} transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
};

const SelectedWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const staticDigitRef = useRef<HTMLSpanElement>(null);
  const changingDigitRef = useRef<HTMLSpanElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  // Use the provided useMediaQuery hook to detect desktop
  const isDesktop = useMediaQuery("(min-width: 1024px)");

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
      id="work"
      ref={sectionRef}
      className="relative min-h-screen bg-brand-olive text-brand-beige px-4 sm:px-6 md:px-8 lg:px-10 py-12 md:py-16 lg:py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(202,190,182,0.03),transparent)] pointer-events-none" />
      <ProjectCursor isVisible={activeProject !== null} />
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
            <Link
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block project-card group"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div
                className="overflow-hidden bg-black/20 relative rounded-lg mb-6 md:mb-8 
                             transform transition-transform duration-700 ease-out hover:scale-[1.01]"
              >
                <div
                  className="absolute inset-0 bg-brand-olive/20 mix-blend-overlay transition-opacity duration-300 
                               group-hover:opacity-0"
                />
                {/* Mobile indicator overlay */}
                {!isDesktop && (
                  <div className="absolute bottom-4 right-4 z-10 bg-brand-beige text-brand-olive px-3 py-1 rounded text-sm transform transition-transform duration-300 hover:scale-95">
                    View Live Preview
                  </div>
                )}
                {/* Video with placeholder */}
                <VideoWithPlaceholder
                  src={project.video}
                  placeholder={project.placeholder}
                  className="w-full h-full object-contain"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-brand-olive/40 to-transparent opacity-60 
                               transition-opacity duration-300 group-hover:opacity-30"
                />
              </div>

              <div className="space-y-6 transform transition-all duration-500">
                <p
                  className="text-xs sm:text-sm uppercase tracking-widest text-brand-beige/60 
                             transition-colors duration-300 group-hover:text-brand-beige/80"
                >
                  {project.category}
                </p>

                <h3
                  className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight 
                             transition-colors duration-300 group-hover:text-brand-beige"
                >
                  {project.title}
                </h3>

                <p
                  className="text-base sm:text-lg text-brand-beige/80 leading-relaxed max-w-3xl 
                             transition-opacity duration-300 group-hover:text-brand-beige"
                >
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
