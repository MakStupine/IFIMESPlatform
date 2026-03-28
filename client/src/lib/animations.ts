import { Variants } from "framer-motion";

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6
    }
  }
};

// Fade in up animation
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0,
    y: 40
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

// Fade in left animation
export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0,
    x: -60
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6
    }
  }
};

// Fade in right animation
export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0,
    x: 60
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6
    }
  }
};

// Staggered container for child elements
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Hover scale effect
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3 }
};
