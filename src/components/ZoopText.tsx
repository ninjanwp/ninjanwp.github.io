import React from "react";
import { motion, useInView } from "framer-motion";
import { FiLink2 } from "react-icons/fi";

export enum ZoopVariant {
  ON_HOVER = "onHover",
  WHEN_VISIBLE = "whenVisible",
}

interface ZoopTextProps {
  children: React.ReactNode;
  variant?: ZoopVariant;
}

const DURATION = 0.2;
const DELAY_MULTIPLIER = 0.03;
const TYPE = "";
const DAMPING = 15;

const TEXT_COLOR = "";
const HOVER_TEXT_COLOR = "";
const TEXT_SIZE = "";

const ZoopText: React.FC<ZoopTextProps> = ({
  children,
  variant = ZoopVariant.ON_HOVER,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref);
  const text = React.Children.toArray(children).join("");
  const characters = [...text.split("")];

  const getVariants = (
    index: number
  ): Record<string, { y: string; transition: typeof transition }> => {
    const transition = {
      duration: DURATION,
      delay: index * DELAY_MULTIPLIER,
      type: TYPE,
      damping: DAMPING,
    };

    if (variant === ZoopVariant.WHEN_VISIBLE) {
      return {
        hidden: { y: "100%", transition },
        visible: { y: "0%", transition },
      };
    }

    return {
      rest: { y: "0%", transition },
      hover: { y: "-100%", transition },
    };
  };

  const getHiddenVariants = (index: number) => {
    const transition = {
      duration: DURATION,
      delay: index * DELAY_MULTIPLIER,
      type: TYPE,
      damping: DAMPING,
    };

    return {
      rest: { y: "100%", transition },
      hover: { y: "0%", transition },
    };
  };

  return (
    <motion.div
      ref={ref}
      className="relative inline-flex items-center whitespace-nowrap"
      {...(variant === ZoopVariant.ON_HOVER
        ? {
            initial: "rest",
            whileHover: "hover",
            animate: "rest",
          }
        : {
            initial: "hidden",
            animate: isInView ? "visible" : "hidden",
          })}
    >
      <motion.p
        className={`overflow-hidden whitespace-nowrap ${
          variant === ZoopVariant.ON_HOVER
            ? "leading-[1] uppercase"
            : "leading-tight"
        }`}
      >
        {characters.map((char, index) => (
          <span key={index} className={`inline-block relative tracking-wide ${TEXT_SIZE}`}>
            {variant === ZoopVariant.ON_HOVER && (
              <motion.span
                className={`block ${TEXT_COLOR}`}
                variants={getVariants(index)}
              >
                {char}
              </motion.span>
            )}
            <motion.span
              className={`${
                variant === ZoopVariant.ON_HOVER ? "absolute bottom-0" : ""
              } block ${HOVER_TEXT_COLOR}`}
              variants={
                variant === ZoopVariant.ON_HOVER
                  ? getHiddenVariants(index)
                  : getVariants(index)
              }
            >
              {char}
            </motion.span>
          </span>
        ))}
      </motion.p>
      {variant === ZoopVariant.ON_HOVER && (
        <FiLink2 className="ml-[0.5ch]" />
      )}
    </motion.div>
  );
};

export default ZoopText;
