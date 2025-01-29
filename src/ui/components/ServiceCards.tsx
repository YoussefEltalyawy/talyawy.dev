import React, { useState } from "react";

// Types
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

// Services Data
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

// Service Card Component
const ServiceCard: React.FC<{
  service: Service;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ service, isOpen, onToggle }) => {
  const { number, title, description, features } = service;

  return (
    <div className="border-b border-brand-olive/70">
      <button
        onClick={onToggle}
        className="w-full text-left py-8 group relative"
      >
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="text-5xl md:text-6xl font-semibold text-brand-olive transition-colors duration-300 ease-in-out group-hover:opacity-80">
            ({number})
          </div>
          <div className="space-y-4 flex-grow">
            <h3 className="text-5xl md:text-6xl font-bold text-brand-olive group-hover:opacity-80 transition-opacity duration-300">
              {title}
            </h3>
            <div
              className={`transform transition-all duration-500 ease-in-out overflow-hidden ${
                isOpen
                  ? "max-h-[500px] opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 -translate-y-4"
              }`}
            >
              <p className="text-lg md:text-xl leading-relaxed text-brand-olive pb-8 transition-opacity duration-300">
                {description}
              </p>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="flex items-center gap-3 md:gap-4 transform transition-all duration-300"
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
          className={`absolute left-0 bottom-0 h-0.5 bg-brand-olive transform transition-all duration-500 ease-in-out ${
            isOpen ? "w-full scale-x-100" : "w-0 scale-x-0"
          }`}
        />
      </button>
    </div>
  );
};

// Main ServiceCards Component
const ServiceCards = () => {
  const [openServiceId, setOpenServiceId] = useState<string | null>(
    "web-development"
  );

  const toggleService = (serviceId: string) => {
    setOpenServiceId(openServiceId === serviceId ? null : serviceId);
  };

  return (
    <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
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

export default ServiceCards;