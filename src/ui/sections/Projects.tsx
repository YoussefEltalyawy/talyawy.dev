"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Projects() {
  const projectsRef = useRef<HTMLElement>(null);
  const headingWrapperRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!headingWrapperRef.current) return;

      const headingText = "FEATURED PROJECTS";
      const words = headingText.split(" ");

      headingWrapperRef.current.innerHTML = words
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

      const spans = headingWrapperRef.current.querySelectorAll("span");

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
          trigger: projectsRef.current,
          start: "top center+=40%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: projectsRef }
  );

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A modern e-commerce solution with seamless user experience",
      image:
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "Creative portfolio for a digital artist with 3D elements",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      tags: ["Three.js", "GSAP", "Tailwind"],
    },
    {
      id: 3,
      title: "SaaS Dashboard",
      description: "Analytics dashboard with real-time data visualization",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      tags: ["Vue.js", "D3.js", "Firebase"],
    },
  ];

  return (
    <section
      id="projects-section"
      ref={projectsRef}
      className="w-full min-h-screen bg-brand-olive p-10"
    >
      <h2
        ref={headingWrapperRef}
        className="text-4xl md:text-5xl lg:text-7xl text-brand-beige mb-12"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative overflow-hidden rounded-lg aspect-[4/3]"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
              <h3 className="text-2xl font-bold text-brand-beige mb-2">
                {project.title}
              </h3>
              <p className="text-brand-beige/80 mb-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-brand-beige/20 text-brand-beige text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
