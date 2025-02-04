import React from "react";
import clsx from "clsx";

interface TextRevealProps {
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}

export const TextReveal = React.forwardRef<
  HTMLParagraphElement,
  TextRevealProps
>(({ children, align = "left", className }, ref) => (
  <div className="overflow-hidden">
    <p
      ref={ref}
      className={clsx(
        "text-brand-beige will-change-[transform,opacity] translate-y-[40px] opacity-0",
        align === "right" ? "lg:text-right" : "text-left",
        className
      )}
      style={{
        backfaceVisibility: "hidden",
        perspective: "1000px",
        WebkitFontSmoothing: "antialiased",
        transform: "translate3d(0, 40px, 0)",
      }}
    >
      {children}
    </p>
  </div>
));

TextReveal.displayName = "TextReveal";
