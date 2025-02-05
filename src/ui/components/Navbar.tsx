"use client";
import { useRef, useEffect, useState, useMemo } from "react";
import gsap from "gsap";

const Navigation = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("home");

  // Wrap menuItems in useMemo so its reference doesn't change on every render.
  const menuItems = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "services", label: "Services" },
      { id: "work", label: "Work" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const updateHighlight = (sectionId: string) => {
    if (!navRef.current || !highlightRef.current) return;

    const navEl = navRef.current;
    const activeLink = navEl.querySelector(
      `[data-section="${sectionId}"]`
    ) as HTMLElement;

    if (activeLink) {
      const linkRect = activeLink.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();
      const extraPadding = 20;

      gsap.to(highlightRef.current, {
        x: linkRect.left - navRect.left - extraPadding / 2,
        width: linkRect.width + extraPadding,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  useEffect(() => {
    updateHighlight(activeSection);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // If near the top, always set "home" as active.
      if (scrollPosition < 100) {
        if (activeSection !== "home") {
          setActiveSection("home");
          updateHighlight("home");
        }
        return;
      }

      // Determine which section is currently in view.
      const sections = menuItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const currentSection = sections.find((section) => {
        if (!section.element || section.id === "home") return false;
        const rect = section.element.getBoundingClientRect();
        const threshold = window.innerHeight * 0.3;
        return rect.top <= threshold && rect.bottom >= threshold;
      });

      if (currentSection && currentSection.id !== activeSection) {
        setActiveSection(currentSection.id);
        updateHighlight(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Run an initial check.
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, menuItems]);

  // Update highlight when activeSection changes.
  useEffect(() => {
    updateHighlight(activeSection);
  }, [activeSection]);

  return (
    <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      <div
        ref={navRef}
        className="
          relative
          bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full
          flex space-x-4 shadow-lg items-center
          px-4 py-1
          sm:px-8 sm:py-2
          text-base
        "
      >
        {/* Highlighter element */}
        <div
          ref={highlightRef}
          className="
            absolute left-0 bg-white/10 rounded-full pointer-events-none
            transition-all duration-300 -translate-y-1/3
            h-8
            z-0
          "
          style={{ width: "0px" }}
        />
        {menuItems.map((item) => (
          <button
            key={item.id}
            data-section={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`
              relative
              px-2 md:px-4 py-2
              font-medium transition-colors duration-200 z-10
              ${
                activeSection === item.id
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
