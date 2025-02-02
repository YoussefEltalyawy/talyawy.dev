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
        " text-brand-beige will-change-transform",
        align === "right" ? "lg:text-right" : "text-left",
        className
      )}
    >
      {children}
    </p>
  </div>
));

TextReveal.displayName = "TextReveal";
