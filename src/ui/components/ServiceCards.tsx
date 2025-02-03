import React, { useState, useRef, useCallback, memo } from "react";
import gsap from "gsap";
import { Service } from "@/lib/types";

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
  const animationRef = useRef<gsap.Context | null>(null);

  const animateContent = useCallback(() => {
    if (!contentRef.current || !underlineRef.current) return;

    // Kill previous animations if they exist
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Create a new animation context
    animationRef.current = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      if (contentRef.current && underlineRef.current) {
        timeline
          .to(contentRef.current, {
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
            duration: 0.6,
          })
          .to(
            underlineRef.current,
            {
              opacity: isOpen ? 1 : 0,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.3"
          ); // Slight overlap for smoother feel

        // Animate features with stagger if opening
        if (isOpen && contentRef.current) {
          const features = contentRef.current.querySelectorAll(".feature-item");
          timeline.from(
            features,
            {
              y: 20,
              opacity: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.2"
          );
        }
      }
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [isOpen]);

  React.useEffect(() => {
    animateContent();
  }, [isOpen, animateContent]);

  return (
    <div className="service-card border-b border-brand-olive/70">
      <button
        onClick={onToggle}
        className="w-full text-left py-8 relative focus:outline-none 
                 focus-visible:ring-2 focus-visible:ring-brand-olive/50 
                 focus-visible:ring-offset-2"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-brand-olive 
                        transition-colors duration-300"
          >
            ({number})
          </div>

          <div className="space-y-4 flex-grow">
            <h3
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-brand-olive 
                          transition-colors duration-300"
            >
              {title}
            </h3>

            <div
              ref={contentRef}
              className="overflow-hidden"
              style={{ height: 0, opacity: 0 }}
            >
              <p className="text-lg md:text-xl leading-relaxed text-brand-olive/90 pb-8">
                {description}
              </p>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="feature-item flex items-center gap-3 md:gap-4 
                             transition-transform duration-300"
                  >
                    <span className="text-base md:text-lg text-brand-olive/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg md:text-xl font-semibold text-brand-olive">
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          ref={underlineRef}
          className="absolute left-0 bottom-0 h-0.5 bg-brand-olive opacity-0 
                   w-full transform-gpu"
        />
      </button>
    </div>
  );
});

ServiceCard.displayName = "ServiceCard";

const ServiceCards = () => {
  const [openServiceId, setOpenServiceId] = useState<string>("web-development");

  const toggleService = useCallback((serviceId: string) => {
    setOpenServiceId((prev) => (prev === serviceId ? "" : serviceId));
  }, []);

  return (
    <div className="max-w-[95%] mx-auto">
      <div className="space-y-8">
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
