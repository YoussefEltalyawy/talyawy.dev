import gsap from "gsap";
import { ANIMATION_CONFIG } from "./animation-config";
import { ScrollTrigger } from "gsap/all";

interface AnimateElementsProps {
  elements: gsap.TweenTarget;
  fromVars?: gsap.TweenVars;
  toVars?: gsap.TweenVars;
  stagger?: number;
  duration?: number;
  ease?: string;
  willChange?: string[];
}

export const animateElements = ({
  elements,
  fromVars = {},
  toVars = {},
  stagger = ANIMATION_CONFIG.stagger.text,
  duration = ANIMATION_CONFIG.duration.medium,
  ease = ANIMATION_CONFIG.ease.smooth,
  willChange = ["transform", "opacity"]
}: AnimateElementsProps) => {
  const targets = gsap.utils.toArray(elements);
  
  // Set will-change
  gsap.set(targets, {
    willChange: willChange.join(", ")
  });

  // Create timeline
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(targets, { willChange: "auto" });
    }
  });

  // Set initial state
  tl.set(targets, {
    opacity: ANIMATION_CONFIG.defaults.opacity.from,
    y: ANIMATION_CONFIG.defaults.y.from,
    ...fromVars
  });

  // Animate to final state
  tl.to(targets, {
    opacity: ANIMATION_CONFIG.defaults.opacity.to,
    y: ANIMATION_CONFIG.defaults.y.to,
    duration,
    stagger,
    ease,
    ...toVars
  });

  return tl;
};

export const createScrollTrigger = (
  trigger: Element,
  animation: gsap.core.Timeline,
  options = {}
) => {
  return ScrollTrigger.create({
    trigger,
    start: "top center+=20%",
    toggleActions: "play none none reverse",
    animation,
    ...options
  });
}; 