export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    medium: 0.6,
    slow: 0.9,
    extraSlow: 1.2
  },
  ease: {
    smooth: "power3.out",
    snappy: "power4.out",
    bounce: "elastic.out(1, 0.3)",
    gentle: "power2.inOut",
    textReveal: "power4.out"
  },
  stagger: {
    text: 0.08,
    elements: 0.15,
    cards: 0.2
  },
  blur: {
    start: "blur(8px)",
    end: "blur(0px)"
  },
  defaults: {
    opacity: {
      from: 0,
      to: 1
    },
    y: {
      from: 100,
      to: 0
    }
  }
}; 