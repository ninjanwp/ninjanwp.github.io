import { motion } from "framer-motion";
import { VISUAL_COLORS } from "../../utils/visualConstants";

export const WebDesignVisual = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="relative w-full h-full">
        <svg className="w-full h-full" viewBox="0 0 260 180">
          {/* Browser chrome */}
          <motion.rect
            x="20"
            y="10"
            width="220"
            height="160"
            rx="8"
            fill="none"
            stroke={VISUAL_COLORS.stroke}
            strokeWidth="2"
            opacity={VISUAL_COLORS.mediumOpacity}
          />

          {/* Browser controls */}
          <motion.g opacity={VISUAL_COLORS.mediumOpacity}>
            <circle cx="40" cy="25" r="4" fill={VISUAL_COLORS.fill} />
            <circle cx="55" cy="25" r="4" fill={VISUAL_COLORS.fill} />
            <circle cx="70" cy="25" r="4" fill={VISUAL_COLORS.fill} />
            <rect
              x="85"
              y="21"
              width="140"
              height="8"
              rx="4"
              fill={VISUAL_COLORS.fill}
              opacity={VISUAL_COLORS.lowOpacity}
            />
          </motion.g>

          {/* Content area */}
          <motion.g>
            {/* Hero section */}
            <motion.rect
              x="30"
              y="40"
              width="200"
              height="40"
              rx="4"
              fill={VISUAL_COLORS.fill}
              opacity={VISUAL_COLORS.veryLowOpacity}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Navigation items */}
            <motion.g opacity={VISUAL_COLORS.mediumOpacity}>
              {[0, 1, 2, 3].map((i) => (
                <motion.rect
                  key={i}
                  x={35 + i * 45}
                  y="45"
                  width="35"
                  height="6"
                  rx="2"
                  fill={VISUAL_COLORS.fill}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [VISUAL_COLORS.lowOpacity, VISUAL_COLORS.highOpacity, VISUAL_COLORS.lowOpacity] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.g>

            {/* Content columns */}
            <motion.g>
              {[0, 1, 2].map((i) => (
                <motion.g key={i}>
                  <motion.rect
                    x={30 + i * 70}
                    y="90"
                    width="60"
                    height="70"
                    rx="4"
                    fill={VISUAL_COLORS.fill}
                    opacity={VISUAL_COLORS.veryLowOpacity}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  />
                  {[0, 1, 2].map((j) => (
                    <motion.rect
                      key={j}
                      x={35 + i * 70}
                      y={100 + j * 20}
                      width="50"
                      height="6"
                      rx="2"
                      fill={VISUAL_COLORS.fill}
                      opacity={VISUAL_COLORS.mediumOpacity}
                      initial={{ width: 0 }}
                      animate={{ width: 50 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + i * 0.1 + j * 0.1,
                      }}
                    />
                  ))}
                </motion.g>
              ))}
            </motion.g>
          </motion.g>
        </svg>
      </div>
    </div>
  );
};
