import React from "react";

const ServiceCards = () => {
  return (
    <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-12">
        {/* Card 1 */}
        <div className="border-b border-brand-olive pb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="text-4xl md:text-5xl font-semibold text-brand-olive">
              (01)
            </div>
            <div className="space-y-4 flex-grow">
              <h3 className="text-2xl md:text-4xl font-bold text-brand-olive">
                Web Development
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-brand-olive">
                A website developed to captivate and convert can elevate your
                brand to new heights. My custom-coded sites are meticulously
                crafted to reflect your unique identity, delivering seamless
                experiences with a focus on animation—keeping your audience
                engaged and returning.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 md:gap-4">
                  <span className="text-sm md:text-base text-brand-olive opacity-70">
                    01
                  </span>
                  <span className="text-base md:text-lg font-semibold text-brand-olive">
                    CMS Integration
                  </span>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <span className="text-sm md:text-base text-brand-olive opacity-70">
                    02
                  </span>
                  <span className="text-base md:text-lg font-semibold text-brand-olive">
                    Motion & Animations
                  </span>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <span className="text-sm md:text-base text-brand-olive opacity-70">
                    03
                  </span>
                  <span className="text-base md:text-lg font-semibold text-brand-olive">
                    3D Development
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="border-b border-brand-olive pb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="text-4xl md:text-5xl font-semibold text-brand-olive">
              (02)
            </div>
            <div className="space-y-4 flex-grow">
              <h3 className="text-2xl md:text-4xl font-bold text-brand-olive">
                Web Design
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-brand-olive">
                Amplify your online presence with a website that truly connects
                with your audiences feelings and desires. I design stunning,
                high-converting sites that align with your business goals,
                helping you stand out and scale effectively.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 md:gap-4">
                  <span className="text-sm md:text-base text-brand-olive opacity-70">
                    01
                  </span>
                  <span className="text-base md:text-lg font-semibold text-brand-olive">
                    Responsive Design
                  </span>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <span className="text-sm md:text-base text-brand-olive opacity-70">
                    02
                  </span>
                  <span className="text-base md:text-lg font-semibold text-brand-olive">
                    Wireframing
                  </span>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <span className="text-sm md:text-base text-brand-olive opacity-70">
                    03
                  </span>
                  <span className="text-base md:text-lg font-semibold text-brand-olive">
                    UX Writing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="border-b border-brand-olive pb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="text-4xl md:text-5xl font-semibold text-brand-olive">
              (03)
            </div>
            <div className="space-y-4 flex-grow">
              <h3 className="text-2xl md:text-4xl font-bold text-brand-olive">
                SEO
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-brand-olive">
                Your website deserves to be seen. I optimize your online
                presence to elevate your visibility in search results, helping
                your business attract the right audience and stand out in the
                digital landscape.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 md:gap-4">
                  <span className="text-sm md:text-base text-brand-olive opacity-70">
                    01
                  </span>
                  <span className="text-base md:text-lg font-semibold text-brand-olive">
                    Technical SEO
                  </span>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <span className="text-sm md:text-base text-brand-olive opacity-70">
                    02
                  </span>
                  <span className="text-base md:text-lg font-semibold text-brand-olive">
                    On-Page Optimization
                  </span>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <span className="text-sm md:text-base text-brand-olive opacity-70">
                    03
                  </span>
                  <span className="text-base md:text-lg font-semibold text-brand-olive">
                    SEO Audits & Analysis
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCards;
