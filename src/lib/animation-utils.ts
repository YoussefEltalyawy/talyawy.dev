import gsap from "gsap";
import { ANIMATION_CONFIG } from "./animation-config";
import { ScrollTrigger } from "gsap/all";

// Helper to detect mobile
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

interface AnimateElementsProps {
  elements: gsap.TweenTarget;
  fromVars?: gsap.TweenVars;
  toVars?: gsap.TweenVars;
  stagger?: number;
  duration?: number;
  ease?: string;
  willChange?: string[];
  useBlur?: boolean;
}

export const animateElements = ({
  elements,
  fromVars = {},
  toVars = {},
  stagger,
  duration = ANIMATION_CONFIG.duration.medium,
  ease = ANIMATION_CONFIG.ease.smooth,
  willChange = ["transform", "opacity"],
  useBlur = true
}: AnimateElementsProps) => {
  const mobile = isMobile();
  const targets = gsap.utils.toArray(elements);
  
  // Determine stagger based on device
  const defaultStagger = mobile 
    ? ANIMATION_CONFIG.stagger.mobile.text 
    : ANIMATION_CONFIG.stagger.desktop.text;
  
  const finalStagger = stagger ?? defaultStagger;

  // Optimize performance by batching GPU-accelerated properties
  const optimizedWillChange = mobile 
    ? willChange.filter(prop => prop !== 'filter') // Remove filter on mobile if present
    : willChange;

  // Set will-change
  gsap.set(targets, {
    willChange: optimizedWillChange.join(", ")
  });

  // Create timeline with reduced memory footprint
  const tl = gsap.timeline({
    onComplete: () => {
      // Clean up will-change
      gsap.set(targets, { 
        willChange: "auto",
        clearProps: mobile ? "filter" : "" // Clear filter props on mobile after animation
      });
    }
  });

  // Get blur settings based on device
  const blurConfig = mobile 
    ? ANIMATION_CONFIG.blur.mobile 
    : ANIMATION_CONFIG.blur.desktop;

  // Set initial state
  const initialState = {
    opacity: ANIMATION_CONFIG.defaults.opacity.from,
    y: mobile ? ANIMATION_CONFIG.defaults.y.from * 0.7 : ANIMATION_CONFIG.defaults.y.from, // Reduced travel on mobile
    ...(useBlur && !mobile ? { filter: blurConfig.start } : {}),
    ...fromVars
  };

  tl.set(targets, initialState);

  // Animate to final state with optimized settings
  const finalState = {
    opacity: ANIMATION_CONFIG.defaults.opacity.to,
    y: ANIMATION_CONFIG.defaults.y.to,
    duration: mobile ? duration * 0.8 : duration, // Slightly faster on mobile
    stagger: finalStagger,
    ease,
    ...(useBlur && !mobile ? { filter: blurConfig.end } : {}),
    ...toVars
  };

  tl.to(targets, finalState);

  return tl;
};

export const createScrollTrigger = (
  trigger: Element,
  animation: gsap.core.Timeline,
  options = {}
) => {
  const mobile = isMobile();
  
  return ScrollTrigger.create({
    trigger,
    start: mobile ? "top center+=10%" : "top center+=20%", // Adjusted trigger point for mobile
    toggleActions: "play none none reverse",
    animation,
    // Optimize performance on mobile
    fastScrollEnd: mobile,
    preventOverlaps: true,
    ...options
  });
}; 