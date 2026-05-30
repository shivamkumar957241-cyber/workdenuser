"use client";
import React, { ElementType, ReactNode, RefObject } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineContentProps {
  children: ReactNode;
  className?: string;
  animationNum?: number;
  timelineRef?: RefObject<HTMLDivElement | null>;
  customVariants?: Variants;
  as?: ElementType;
  [key: string]: any;
}

export const TimelineContent = ({
  children,
  className = "",
  animationNum = 0,
  customVariants,
  as: Tag = "div",
  ...rest
}: TimelineContentProps) => {
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: -20, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
  };

  const variants = customVariants || defaultVariants;

  // Strip non-DOM props before passing to motion element
  const { timelineRef: _timelineRef, animationNum: _animationNum, customVariants: _cv, ...domProps } = rest;

  return (
    <motion.div
      className={cn(className)}
      custom={animationNum}
      initial="hidden"
      animate="visible"
      variants={variants}
      {...domProps}
    >
      {children}
    </motion.div>
  );
};

export default TimelineContent;
