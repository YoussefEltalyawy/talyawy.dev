import React, { useState, useRef, useCallback, memo } from "react";
import gsap from "gsap";
import { Service } from "@/lib/types";
import { ChevronDown } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";

const services: Service[] = [
  {
    id: "web-development",
    number: "01",
    title: "Web Development",
    description:
      "A website developed to captivate and convert can elevate your brand to new heights. My custom-coded sites are meticulously crafted to reflect your unique identity, delivering seamless experiences with a focus on animation—keeping your audience engaged and returning.",
    features: [
      { id: "cms", name: "CMS Integration" },
      { id: "motion", name: "Motion & Animations" },
      { id: "3d", name: "3D Development" },
    ],
  },
  {
    id: "web-design",
    number: "02",
    title: "Web Design",
    description:
      "Amplify your online presence with a website that truly connects with your audiences feelings and desires. I design stunning, high-converting sites that align with your business goals, helping you stand out and scale effectively.",
    features: [
      { id: "responsive", name: "Responsive Design" },
      { id: "wireframe", name: "Wireframing" },
      { id: "ux", name: "UX Writing" },
    ],
  },
  {
    id: "seo",
    number: "03",
    title: "Search Engine Optimization",
    description:
      "Your website deserves to be seen. I optimize your online presence to elevate your visibility in search results, helping your business attract the right audience and stand out in the digital landscape.",
    features: [
      { id: "technical", name: "Technical SEO" },
      { id: "onpage", name: "On-Page Optimization" },
      { id: "audit", name: "SEO Audits & Analysis" },
    ],
  },
];

interface ServiceCardProps {
  service: Service;
  isOpen: boolean;
  onToggle: () => void;
}

const ServiceCard = memo(({ service, isOpen, onToggle }: ServiceCardProps) => {
  const { number, title, description, features } = service;
  const contentRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.Context | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const animateContent = useCallback(() => {
    if (isMobile) return; // Skip GSAP animations on mobile
    if (!contentRef.current || !underlineRef.current || !chevronRef.current) return;

    // Kill previous animations if they exist
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Desktop animations
    animationRef.current = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      timeline
        .to(chevronRef.current, {
          rotation: isOpen ? 180 : 0,
          duration: 0.6,
          ease: "power3.inOut",
        })
        .to(
          contentRef.current,
          {
            height: isOpen ? "auto" : 0,
            duration: 0.8,
            ease: "power3.inOut",
            onStart: () => {
              if (contentRef.current) {
                contentRef.current.style.opacity = "1";
              }
            },
          },
          "-=0.4"
        )
        .to(
          underlineRef.current,
          {
            opacity: isOpen ? 1 : 0,
            duration: 0.6,
          },
          "-=0.4"
        );

      if (isOpen && contentRef.current) {
        const features = contentRef.current.querySelectorAll(".feature-item");
        timeline.from(
          features,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [isOpen, isMobile]);

  React.useEffect(() => {
    animateContent();
  }, [isOpen, animateContent]);

  if (isMobile) {
    return (
      <AccordionItem value={service.id} className="border-none">
        <AccordionTrigger className="py-8 px-6 hover:no-underline group">
          <div className="flex items-start gap-6 relative w-full">
            <div className="text-3xl font-light text-brand-olive/60 transition-colors duration-300 group-hover:text-brand-olive/80">
              {number}
            </div>
            <h3 className="text-3xl font-semibold text-brand-olive transition-colors duration-300 text-left">
              {title}
            </h3>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6">
          <p className="text-lg leading-relaxed text-brand-olive/80 mb-12 font-light">
            {description}
          </p>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="feature-item flex items-center gap-4 group/feature"
              >
                <span className="text-sm text-brand-olive/50 font-light transition-colors duration-300 group-hover/feature:text-brand-olive/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg text-brand-olive/90 font-medium transition-colors duration-300 group-hover/feature:text-brand-olive">
                  {feature.name}
                </span>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <div className="service-card group">
      <button
        onClick={onToggle}
        className="w-full text-left py-8 relative focus:outline-none 
                 focus-visible:ring-2 focus-visible:ring-brand-olive/50 
                 focus-visible:ring-offset-2 transition-colors duration-300
                 hover:bg-brand-olive/5 rounded-2xl px-6 sm:px-8"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col md:flex-row items-start gap-6 relative pr-12">
          <div
            className="text-3xl md:text-4xl lg:text-5xl font-light text-brand-olive/60 
                     transition-colors duration-300 group-hover:text-brand-olive/80"
          >
            {number}
          </div>

          <div className="space-y-4 flex-grow">
            <h3
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-brand-olive 
                       transition-colors duration-300"
            >
              {title}
            </h3>

            <div
              ref={contentRef}
              className="overflow-hidden"
              style={{ height: 0 }}
            >
              <div className="py-8">
                <p className="text-lg md:text-xl leading-relaxed text-brand-olive/80 mb-12 
                           font-light max-w-4xl">
                  {description}
                </p>

                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div
                      key={feature.id}
                      className="feature-item flex items-center gap-4 md:gap-6 group/feature"
                    >
                      <span className="text-sm md:text-base text-brand-olive/50 font-light
                                   transition-colors duration-300 
                                   group-hover/feature:text-brand-olive/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg md:text-xl text-brand-olive/90 font-medium
                                   transition-colors duration-300 
                                   group-hover/feature:text-brand-olive">
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chevron icon */}
          <div
            ref={chevronRef}
            className="absolute right-0 top-3"
          >
            <ChevronDown
              className="w-6 h-6 text-brand-olive/60 transition-colors duration-300
                       group-hover:text-brand-olive"
            />
          </div>
        </div>

        <div
          ref={underlineRef}
          className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-brand-olive/80 
                   to-brand-olive/20 opacity-0 w-full transform-gpu rounded-full"
        />
      </button>
    </div>
  );
});

ServiceCard.displayName = "ServiceCard";

const ServiceCards = () => {
  const [openServiceId, setOpenServiceId] = useState<string>("web-development");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleService = useCallback((serviceId: string) => {
    setOpenServiceId((prev) => (prev === serviceId ? "" : serviceId));
  }, []);

  if (isMobile) {
    return (
      <div className="max-w-[95%] mx-auto">
        <Accordion type="single" defaultValue="web-development" collapsible>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isOpen={openServiceId === service.id}
              onToggle={() => toggleService(service.id)}
            />
          ))}
        </Accordion>
      </div>
    );
  }

  return (
    <div className="max-w-[95%] mx-auto">
      <div className="space-y-4">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isOpen={openServiceId === service.id}
            onToggle={() => toggleService(service.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(ServiceCards);
