import { motion } from "framer-motion";
import { VISUAL_COLORS } from "../../utils/visualConstants";

export const PhoneVisual = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="relative w-full h-full">
        <svg className="w-full h-full" viewBox="0 0 260 180">
          <motion.g
            animate={{
              rotate: [0, 0, 90, 90],
              scale: [0.5, 1, 1, 10],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              times: [0, 0.3, 0.7, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ originX: "50%", originY: "50%" }}
          >
            {/* Phone frame */}
            <motion.rect
              x="80"
              y="10"
              width="100"
              height="160"
              rx="20"
              fill="none"
              stroke={VISUAL_COLORS.stroke}
              strokeWidth="2"
              opacity={VISUAL_COLORS.mediumOpacity}
            />

            {/* Notch */}
            <rect
              x="115"
              y="20"
              width="30"
              height="6"
              rx="3"
              fill={VISUAL_COLORS.fill}
              opacity={VISUAL_COLORS.mediumOpacity}
            />

            {/* Screen content */}
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                x="95"
                y={40 + i * 30}
                width="70"
                height="20"
                rx="4"
                fill={VISUAL_COLORS.fill}
                opacity={VISUAL_COLORS.lowOpacity}
              />
            ))}
          </motion.g>
        </svg>
      </div>
    </div>
  );
};
