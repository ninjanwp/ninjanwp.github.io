import { motion } from "framer-motion";

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
            stroke="#e5e5e5"
            strokeWidth="2"
            opacity={0.3}
          />

          {/* Browser controls */}
          <motion.g opacity={0.3}>
            <circle cx="40" cy="25" r="4" fill="#e5e5e5" />
            <circle cx="55" cy="25" r="4" fill="#e5e5e5" />
            <circle cx="70" cy="25" r="4" fill="#e5e5e5" />
            <rect
              x="85"
              y="21"
              width="140"
              height="8"
              rx="4"
              fill="#e5e5e5"
              opacity={0.2}
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
              fill="#e5e5e5"
              opacity={0.15}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Navigation items */}
            <motion.g opacity={0.3}>
              {[0, 1, 2, 3].map((i) => (
                <motion.rect
                  key={i}
                  x={35 + i * 45}
                  y="45"
                  width="35"
                  height="6"
                  rx="2"
                  fill="#e5e5e5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
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
                    fill="#e5e5e5"
                    opacity={0.1}
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
                      fill="#e5e5e5"
                      opacity={0.3}
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
