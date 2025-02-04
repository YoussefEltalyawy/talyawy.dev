"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const Navigation = () => {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/posts", label: "Posts" },
    { href: "/about", label: "About" },
  ];

  useEffect(() => {
    if (!navRef.current || !highlightRef.current) return;

    const navEl = navRef.current;
    const activeLink = navEl.querySelector(
      `[href="${pathname}"]`
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
  }, [pathname]);

  return (
    <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      <div
        ref={navRef}
        className="
          relative 
          bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full 
          flex space-x-4 shadow-lg items-center
          px-4 py-1 text-xs
          sm:px-8 sm:py-2 sm:text-sm   
           lg:text-base  /* Desktop: increased padding & text size */
        "
      >
        {/* Highlight for the active link */}
        <div
          ref={highlightRef}
          className="
            absolute left-0 bg-white/10 rounded-full pointer-events-none transition-all duration-300 
            -translate-y-1/3
            h-6         /* Mobile highlight height */
            sm:h-8      /* Tablet highlight height */
            z-0
          "
          style={{ width: "0px" }}
        />

        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              relative 
              px-4 py-2 
              font-medium transition-colors duration-200 z-10 
              ${
                pathname === item.href
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }
            `}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
