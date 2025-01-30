import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ServiceFeature = {
  id: string;
  name: string;
};

type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  features: ServiceFeature[];
};

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

const ServiceCard: React.FC<{
  service: Service;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ service, isOpen, onToggle }) => {
  const { number, title, description, features } = service;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.6,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-brand-olive/70">
      <button
        onClick={onToggle}
        className="w-full text-left py-8 group relative"
      >
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="text-5xl md:text-6xl font-semibold text-brand-olive transition-all duration-500 ease-in-out group-hover:opacity-80 transform group-hover:scale-[0.98]">
            ({number})
          </div>
          <div className="space-y-4 flex-grow">
            <h3 className="text-5xl md:text-6xl font-semi-bold text-brand-olive group-hover:opacity-80 transition-all duration-500 ease-in-out transform group-hover:scale-[0.98]">
              {title}
            </h3>
            <div
              ref={contentRef}
              className="overflow-hidden"
              style={{ height: 0 }}
            >
              <p className="text-lg md:text-xl leading-relaxed text-brand-olive pb-8 transition-all duration-500">
                {description}
              </p>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="flex items-center gap-3 md:gap-4 transform transition-all duration-500"
                  >
                    <span className="text-base md:text-lg text-brand-olive opacity-70">
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
          className={`absolute left-0 bottom-0 h-0.5 bg-brand-olive transform origin-left transition-all duration-700 ease-in-out ${
            isOpen ? "w-full scale-x-100" : "w-0 scale-x-0"
          }`}
        />
      </button>
    </div>
  );
};

const ServiceCards = () => {
  const [openServiceId, setOpenServiceId] = useState<string | null>(
    "web-development"
  );
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.children;
    const triggers: ScrollTrigger[] = [];

    Array.from(cards).forEach((card, index) => {
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setOpenServiceId(services[index].id);
        },
        onEnterBack: () => {
          setOpenServiceId(services[index].id);
        },
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  const toggleService = (serviceId: string) => {
    setOpenServiceId(openServiceId === serviceId ? null : serviceId);
  };

  return (
    <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
      <div ref={cardsRef} className="space-y-8">
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

export default ServiceCards;
