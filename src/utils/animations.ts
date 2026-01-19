import { type Variants } from 'framer-motion'

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const slideInFromLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
}

export const slideInFromRight: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
}

export const slideInFromTop: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

export const slideInFromBottom: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

export const scaleIn: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const transition = {
  duration: 0.3,
  ease: [0.43, 0.13, 0.23, 0.96],
}
