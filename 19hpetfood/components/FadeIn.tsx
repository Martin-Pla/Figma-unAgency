"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Duration in seconds — keep within 0.4–0.6 */
  duration?: number;
  as?: "div" | "section";
};

export default function FadeIn({
  children,
  className,
  delay = 0,
  y = 20,
  duration = 0.5,
  as = "div",
}: FadeInProps) {
  const reduce = useReducedMotion();
  const MotionTag = as === "section" ? motion.section : motion.div;
  const safeDuration = Math.min(0.6, Math.max(0.4, duration));

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      transition={{
        duration: safeDuration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
