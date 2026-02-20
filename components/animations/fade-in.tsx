"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export function FadeIn({ children, delay = 0, className, direction = "up" }: FadeInProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
    rootMargin: "-50px 0px",
  });

  const variants = {
    up: { opacity: 0, y: 40 },
    down: { opacity: 0, y: -40 },
    left: { opacity: 0, x: -40 },
    right: { opacity: 0, x: 40 },
  };

  const animate = {
    opacity: 1,
    y: direction === "up" ? 0 : direction === "down" ? 0 : undefined,
    x: direction === "left" ? 0 : direction === "right" ? 0 : undefined,
  };

  return (
    <motion.div
      ref={ref}
      initial={variants[direction]}
      animate={inView ? animate : variants[direction]}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
