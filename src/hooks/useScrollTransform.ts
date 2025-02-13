import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

type ScrollTransformConfig = {
  start?: [number, number]; // [startOffset, endOffset] for start range
  scale?: [number, number]; // [initialScale, finalScale]
  y?: [number, number]; // [initialY, finalY]
  x?: [number, number]; // [initialX, finalX]
  opacity?: [number, number]; // [initialOpacity, finalOpacity]
};

export const useScrollTransform = (config: ScrollTransformConfig = {}) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const transforms: Record<string, MotionValue> = {};

  if (config.scale) {
    transforms.scale = useTransform(scrollYProgress, [0, 1], config.scale);
  }

  if (config.y) {
    transforms.y = useTransform(scrollYProgress, [0, 1], config.y);
  }

  if (config.x) {
    transforms.x = useTransform(scrollYProgress, [0, 1], config.x);
  }

  if (config.opacity) {
    transforms.opacity = useTransform(scrollYProgress, [0, 1], config.opacity);
  }

  return { ref, ...transforms };
};
