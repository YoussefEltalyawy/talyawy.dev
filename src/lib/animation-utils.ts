import gsap from "gsap";
import { ANIMATION_CONFIG } from "./animation-config";
import { ScrollTrigger } from "gsap/all";

// Optimize mobile detection with a single source of truth
let _isMobile: boolean | null = null;
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  if (_isMobile === null) {
    _isMobile = window.innerWidth < 768;
    // Update on resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        _isMobile = window.innerWidth < 768;
      }, 250);
    });
  }
  return _isMobile;
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

// Cache commonly used values
const defaultWillChange = ["transform", "opacity"];

export const animateElements = ({
  elements,
  fromVars = {},
  toVars = {},
  stagger,
  duration = ANIMATION_CONFIG.duration.medium,
  ease = ANIMATION_CONFIG.ease.smooth,
  willChange = defaultWillChange,
  useBlur = true
}: AnimateElementsProps) => {
  const mobile = isMobile();
  const targets = gsap.utils.toArray(elements);
  
  // Early exit for empty targets
  if (!targets.length) return gsap.timeline();

  const finalStagger = stagger ?? (mobile 
    ? ANIMATION_CONFIG.stagger.mobile.text 
    : ANIMATION_CONFIG.stagger.desktop.text);

  // Create a single timeline
  const tl = gsap.timeline({
    paused: true,
  });

  // Simplified animation for mobile
  if (mobile) {
    // Simple fade up animation for mobile
    tl.fromTo(targets, 
      {
        opacity: 0,
        y: 15,
        ...fromVars
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: finalStagger,
        ease: "power1.out",
        ...toVars
      }
    );
  } else {
    // Desktop animation with all features
    const blurConfig = ANIMATION_CONFIG.blur.desktop;

    tl.set(targets, {
      opacity: 0,
      y: ANIMATION_CONFIG.defaults.y.from,
      willChange: willChange.join(", "),
      ...(useBlur ? { filter: blurConfig.start } : {}),
      ...fromVars
    });

    tl.to(targets, {
      opacity: 1,
      y: 0,
      duration: duration,
      stagger: finalStagger,
      ease: ease,
      ...(useBlur ? { filter: blurConfig.end } : {}),
      ...toVars,
      onComplete: () => {
        gsap.set(targets, {
          willChange: "auto",
          clearProps: "filter"
        });
      }
    });
  }

  // Play immediately but allow for manual control
  tl.play();
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
    start: mobile ? "top center+=5%" : "top center+=15%",
    toggleActions: "play none none reverse",
    animation,
    // Optimize performance
    fastScrollEnd: true,
    preventOverlaps: true,
    onEnter: () => {
      // Add will-change only when animation is about to start
      if (trigger instanceof HTMLElement) {
        trigger.style.willChange = mobile ? "transform" : "transform, opacity, filter";
      }
    },
    onLeave: () => {
      // Clean up will-change when scrolled away
      if (trigger instanceof HTMLElement) {
        trigger.style.willChange = "auto";
      }
    },
    ...options
  });
}; 