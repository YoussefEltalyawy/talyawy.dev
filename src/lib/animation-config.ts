export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.25,
    medium: 0.5,
    slow: 0.75,
    extraSlow: 1
  },
  ease: {
    smooth: "power2.out",
    snappy: "power2.out",
    bounce: "back.out(1.2)",
    gentle: "power1.inOut",
    textReveal: "power2.out"
  },
  stagger: {
    mobile: {
      text: 0.04,
      elements: 0.08,
      cards: 0.12
    },
    desktop: {
      text: 0.08,
      elements: 0.15,
      cards: 0.2
    }
  },
  blur: {
    mobile: {
      start: "blur(4px)",
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
      from: 50,
      to: 0
    }
  }
}; 