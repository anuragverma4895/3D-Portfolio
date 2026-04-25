import type { TMotion } from "../types";
import { Variants } from "framer-motion";

export const textVariant = () => {
  return {
    hidden: {
      y: -30,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
};

export const fadeIn = (
  direction: TMotion["direction"],
  type: TMotion["type"],
  delay: TMotion["delay"],
  duration: TMotion["duration"]
): Variants => {
  // Cap delay and duration for snappier feel
  const cappedDelay = Math.min(delay, 0.3);
  const cappedDuration = Math.min(duration, 0.6);

  return {
    hidden: {
      x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
      y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type || "tween",
        delay: cappedDelay,
        duration: cappedDuration,
        ease: "easeOut",
      },
    },
  };
};

export const zoomIn = (
  delay: TMotion["delay"],
  duration: TMotion["duration"]
) => {
  return {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay: Math.min(delay, 0.3),
        duration: Math.min(duration, 0.5),
        ease: "easeOut",
      },
    },
  };
};

export const slideIn = (
  direction: TMotion["direction"],
  type: TMotion["type"],
  delay: TMotion["delay"],
  duration: TMotion["duration"]
) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: type || "tween",
        delay: Math.min(delay, 0.2),
        duration: Math.min(duration, 0.6),
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };
};
