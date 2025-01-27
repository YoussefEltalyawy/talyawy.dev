import React from "react";

function Hero() {
  return (
    <section className="hero bg-black w-full h-screen">
      <div
        className="
        absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-olive/40 rounded-full blur-[120px] "
      />
      <div className="text-brand-beige absolute bottom-24 left-10">
        <div>
          <h1 className="text-9xl font-semibold ">talyawy</h1>
          <div>
            <p className="text-brand-beige font-light text-lg">
              Full-Stack{" "}
              <span className="font-normal text-lg">Web Developer & Designer</span>
            </p>
            <p className="text-brand-beige font-light -mt-2">
              Based In <span className="font-normal">Giza, Egypt</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
