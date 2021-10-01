export const rightBubbleVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    x: 80,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
  },
};

export const leftBubbleVariants = {
  start: {
    opacity: 0,
    scale: 0,
    x: -40,
    y: 40,
  },
  end: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
  },
};

export const BubbleTransition = {
  type: 'spring',
  stiffness: 250,
  damping: 20,
  ease: 'easeInOut',
  // delay: 0.1,
};

export const dotContainerVariants = {
  start: { transition: { staggerChildren: 0.2 } },
  end: { transition: { staggerChildren: 0.2 } },
};

export const dotVariants = {
  start: { opacity: 0.2 },
  end: { opacity: 0.8 },
};

export const dotTransition = {
  duration: 0.8,
  repeat: Infinity,
  repeatType: 'reverse',
  ease: 'easeInOut',
};
