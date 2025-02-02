// Shared types and interfaces
export interface Project {
  id: number;
  title: string;
  category: string;
  brief: string;
  video: string;
  tags: string[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  features: ServiceFeature[];
}

export interface ServiceFeature {
  id: string;
  name: string;
}

// Shared animation constants
export const ANIMATION_CONFIG = {
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.1,
};
