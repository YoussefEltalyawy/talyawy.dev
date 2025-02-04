export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    medium: 0.4,
    slow: 0.6,
    extraSlow: 0.8
  },
  ease: {
    smooth: "power2.out",
    snappy: "power3.out",
    bounce: "back.out(1.2)",
    gentle: "power1.inOut",
    textReveal: "power2.out"
  },
  stagger: {
    mobile: {
      text: 0.03,
      elements: 0.06,
      cards: 0.09
    },
    desktop: {
      text: 0.08,
      elements: 0.15,
      cards: 0.2
    }
  },
  blur: {
    mobile: {
      start: "blur(2px)",
      end: "blur(0px)"
    },
    desktop: {
      start: "blur(8px)",
      end: "blur(0px)"
    }
  },
  defaults: {
    opacity: {
      from: 0,
      to: 1
    },
    y: {
      from: 40,
      to: 0
    }
  }
}; 