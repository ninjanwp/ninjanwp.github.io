import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

interface ZoopTextProps {
  children: React.ReactNode;
  IconComponent: React.ReactNode;
}

const DURATION = 0.1;
const DELAY_MULTIPLIER = 0.03;
const TYPE = "";
const DAMPING = 15;

const TEXT_COLOR = "text-stone-50";
const HOVER_TEXT_COLOR = "text-orange-500";
const TEXT_SIZE = "text-2xl";

const ZoopText: React.FC<ZoopTextProps> = ({ children, IconComponent }) => {
  const text = React.Children.toArray(children).join("");
  const characters = [...text.split("")]; // Add arrow as last character

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative inline-flex items-center whitespace-nowrap hoverable cursor-none"
    >
      <div className={`${TEXT_COLOR} ${TEXT_SIZE}`}>{IconComponent}</div>

      <motion.p className="overflow-hidden leading-tight invisible md:visible px-2 whitespace-nowrap w-0 md:w-auto">
        {characters.map((char, index) => (
          <span
            key={index}
            className={`inline-block relative font-mono ${TEXT_SIZE}`}
          >
            <motion.span
              className={`block ${TEXT_COLOR} uppercase`}
              variants={{
                rest: {
                  y: 0,
                  transition: {
                    duration: DURATION,
                    delay: index * DELAY_MULTIPLIER,
                    type: TYPE,
                    damping: DAMPING,
                  },
                },
                hover: {
                  y: "-100%",
                  transition: {
                    duration: DURATION,
                    delay: index * DELAY_MULTIPLIER,
                    type: TYPE,
                    damping: DAMPING,
                  },
                },
              }}
            >
              {char === "→" ? "\u00A0" : char}
            </motion.span>
            <motion.span
              className={`block absolute bottom-0 ${HOVER_TEXT_COLOR} uppercase ${
                char === "→" ? "flex items-center" : ""
              }`}
              variants={{
                rest: {
                  y: "100%",
                  transition: {
                    duration: DURATION,
                    delay: index * DELAY_MULTIPLIER,
                    type: TYPE,
                    damping: DAMPING,
                  },
                },
                hover: {
                  y: 0,
                  transition: {
                    duration: DURATION,
                    delay: index * DELAY_MULTIPLIER,
                    type: TYPE,
                    damping: DAMPING,
                  },
                },
              }}
            >
              {char === "→" ? (
                <FiArrowRight className="relative -top-[0.1em]" />
              ) : (
                char
              )}
            </motion.span>
          </span>
        ))}
      </motion.p>
    </motion.div>
  );
};

export default ZoopText;
