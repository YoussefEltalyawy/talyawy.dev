import React from "react";

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
    title: "SEO",
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
const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const { number, title, description, features } = service;

  return (
    <div className="border-b border-brand-olive pb-8">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="text-4xl md:text-5xl font-semibold text-brand-olive">
          ({number})
        </div>
        <div className="space-y-4 flex-grow">
          <h3 className="text-2xl md:text-4xl font-bold text-brand-olive">
            {title}
          </h3>
          <p className="text-base md:text-lg leading-relaxed text-brand-olive">
            {description}
          </p>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="flex items-center gap-2 md:gap-4"
              >
                <span className="text-sm md:text-base text-brand-olive opacity-70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base md:text-lg font-semibold text-brand-olive">
                  {feature.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main ServiceCards Component
const ServiceCards = () => {
  return (
    <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-12">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServiceCards;
