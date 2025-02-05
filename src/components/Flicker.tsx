import React from "react";
import { motion } from "framer-motion";

interface FlickerProps {
  children: React.ReactNode;
  hoverOnly?: boolean;
}

const Flicker: React.FC<FlickerProps> = ({ children, hoverOnly = false }) => {
  const flickerVariants = {
    flicker: {
      opacity: [1, 0.5, 1, 0.2, 1, 0.8, 1, 0.4, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  return (
    <motion.span
      variants={flickerVariants}
      animate={hoverOnly ? "rest" : ["flicker"]}
      whileHover={hoverOnly ? ["flicker"] : undefined}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
};

export default Flicker;
