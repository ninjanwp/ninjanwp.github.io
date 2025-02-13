import { motion, MotionValue, useTransform } from "framer-motion";

interface AnimatedCharacterProps {
  character: string;
  index: number;
  scrollProgress: MotionValue<number>;
  isHighlighted?: boolean;
}

export const AnimatedCharacter = ({
  character,
  index,
  scrollProgress,
  isHighlighted,
}: AnimatedCharacterProps) => {
  const opacity = useTransform(
    scrollProgress,
    [0.1 + index * 0.002, 0.15 + index * 0.002],
    [0.2, 1]
  );

  return (
    <motion.span
      style={{ opacity }}
      className={isHighlighted ? "font-black" : ""}
    >
      {character}
    </motion.span>
  );
};
