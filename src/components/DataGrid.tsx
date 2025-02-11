import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type VisualType = "line" | "bar" | "scatter";

// Animation constants
const TIMING = {
  ANIMATION: 1, // How long each animation takes
  DISPLAY: 0.5, // How long graph stays visible after animating in
  PAUSE: 0, // Gap between graphs
  STAGGER: 0.05, // Delay between elements in sequence
} as const;

// Graph constants
const GRAPH = {
  SIZE: 500,
  GRID_STEPS: 10,
  MAX_Y: 100,
} as const;

const variants = {
  container: {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: TIMING.ANIMATION,
        when: "beforeChildren",
        staggerChildren: TIMING.STAGGER,
      },
    },
    exit: {
      transition: {
        duration: TIMING.ANIMATION,
        when: "afterChildren",
        staggerChildren: TIMING.STAGGER,
      },
    },
  },
  line: {
    initial: {
      pathLength: 0,
      opacity: 1,
    },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: TIMING.ANIMATION, ease: "easeInOut" },
      },
    },
    exit: {
      pathLength: 0,
      opacity: 1,
      transition: {
        pathLength: { duration: TIMING.ANIMATION, ease: "easeInOut" },
      },
    },
  },
  gradient: {
    initial: {
      pathLength: 0,
      opacity: 1,
    },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: TIMING.ANIMATION, ease: "easeInOut" },
      },
    },
    exit: {
      pathLength: 0,
      opacity: 1,
      transition: {
        pathLength: { duration: TIMING.ANIMATION, ease: "easeInOut" },
      },
    },
  },
  gradientRect: {
    initial: { opacity: 0 },
    animate: { opacity: 0.2 },
    exit: { opacity: 0 },
  },
} as const;

// Visual style constants
const STYLE = {
  STROKE_COLOR: "#fff",
  GRID_OPACITY: 0.1,
  STROKE_WIDTH: {
    GRID: "1",
    LINE: "5",
  },
  BAR_WIDTH: 20,
  SCATTER_RADIUS: 8,
  GLOW: {
    id: "glow",
    filter: (
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    ),
  },
} as const;

const GraphLabel = ({ type }: { type: VisualType }) => (
  <motion.div
    initial={{ x: "-50%", opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: "50%", opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="absolute sm:top-0 top-9 sm:left-6 left-3 flex justify-center"
  >
    <span className="text-stone-400 uppercase tracking-widest text-sm">
      // {type}
    </span>
  </motion.div>
);

export const DataGrid = () => {
  const [counter, setCounter] = useState(0);
  const visualType: VisualType = (["line", "bar", "scatter"] as VisualType[])[
    counter % 3
  ];

  const cycleToNext = () => {
    setTimeout(() => {
      setCounter((c) => c + 1);
    }, (TIMING.DISPLAY + TIMING.PAUSE) * 1000);
  };

  // Mock data points for the graph
  const data = [
    { x: 0, y: 10 },
    { x: 50, y: 15 },
    { x: 100, y: 25 },
    { x: 150, y: 20 },
    { x: 200, y: 30 },
    { x: 250, y: 40 },
    { x: 300, y: 35 },
    { x: 350, y: 50 },
    { x: 400, y: 55 },
    { x: 450, y: 65 },
    { x: 500, y: 80 },
  ];

  const [gradientOpacity, setGradientOpacity] = useState(0);

  const renderGrid = (size: number) => {
    return (
      <motion.g filter="url(#glow)" opacity={1}>
        {/* Horizontal grid lines */}
        {Array.from({ length: GRAPH.GRID_STEPS + 1 }).map((_, i) => (
          <motion.line
            key={`h-${i}`}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: STYLE.GRID_OPACITY, pathLength: 1 }}
            exit={{ opacity: 0, pathLength: 0 }}
            transition={{
              duration: TIMING.ANIMATION,
              delay: i * TIMING.STAGGER,
              type: "spring",
              damping: 15,
            }}
            x1="0"
            y1={size * (i / GRAPH.GRID_STEPS)}
            x2={size}
            y2={size * (i / GRAPH.GRID_STEPS)}
            stroke={STYLE.STROKE_COLOR}
            strokeWidth={STYLE.STROKE_WIDTH.GRID}
          />
        ))}
        {/* Vertical grid lines */}
        {Array.from({ length: GRAPH.GRID_STEPS + 1 }).map((_, i) => (
          <motion.line
            key={`v-${i}`}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: STYLE.GRID_OPACITY, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{
              duration: 0.5,
              delay: i * TIMING.STAGGER,
              type: "spring",
              damping: 15,
            }}
            style={{ transformOrigin: "bottom" }}
            x1={size * (i / GRAPH.GRID_STEPS)}
            y1="0"
            x2={size * (i / GRAPH.GRID_STEPS)}
            y2={size}
            stroke={STYLE.STROKE_COLOR}
            strokeWidth={STYLE.STROKE_WIDTH.GRID}
          />
        ))}
      </motion.g>
    );
  };

  const renderVisual = () => {
    const size = GRAPH.SIZE;
    const maxY = GRAPH.MAX_Y;

    const normalizePoint = (point: { x: number; y: number }) => ({
      x: (point.x / 500) * size,
      y: size - (point.y / maxY) * size,
    });

    const sharedSvgProps = {
      className:
        "w-[300px] h-[300px] mt-12 md:mt-0 md:w-[500px] md:h-[500px] overflow-visible",
      viewBox: `0 0 ${size} ${size}`,
    };

    const visualComponents = {
      line: (
        <svg {...sharedSvgProps}>
          <defs>
            {STYLE.GLOW.filter}
            <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#d8b4fe" stopOpacity="1" />
              <stop offset="100%" stopColor="#e9d5ff" stopOpacity="0" />
            </linearGradient>
            <mask id="lineMask">
              <motion.path
                variants={variants.line}
                d={`M ${data
                  .map(normalizePoint)
                  .map((p) => `${p.x} ${p.y}`)
                  .join(" L ")} V ${size} H 0 Z`}
                fill="white"
                onUpdate={({ pathLength = 0 }) => {
                  setGradientOpacity(pathLength === 1 ? 0.2 : 0);
                }}
              />
            </mask>
          </defs>
          {renderGrid(size)}
          <motion.g filter="url(#glow)">
            {/* Main line */}
            <motion.path
              variants={variants.line}
              d={`M ${data
                .map(normalizePoint)
                .map((p) => `${p.x} ${p.y}`)
                .join(" L ")}`}
              fill="none"
              stroke="#d8b4fe"
              strokeWidth={STYLE.STROKE_WIDTH.LINE}
              strokeDasharray="0,1"
            />
            <motion.rect
              initial={{ opacity: 0 }}
              animate={{ opacity: gradientOpacity }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              x="0"
              y="0"
              width={size}
              height={size}
              fill="url(#lineGradient)"
              mask="url(#lineMask)"
            />
          </motion.g>
        </svg>
      ),
      bar: (
        <svg {...sharedSvgProps}>
          <defs>
            {STYLE.GLOW.filter}
            <linearGradient id="barGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#d8b4fe" stopOpacity="1" />
              <stop offset="100%" stopColor="#e9d5ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {renderGrid(size)}
          <motion.g filter="url(#glow)">
            {data.map((d, i) => {
              const point = normalizePoint(d);
              const barHeight = size - point.y;
              return (
                <motion.rect
                  key={i}
                  initial={{ height: 0, y: size }}
                  animate={{ height: barHeight, y: point.y }}
                  exit={{ height: 0, y: size }}
                  transition={{
                    duration: TIMING.ANIMATION,
                    delay: i * TIMING.STAGGER,
                    type: "spring",
                  }}
                  x={point.x - STYLE.BAR_WIDTH / 2}
                  width={STYLE.BAR_WIDTH}
                  fill="url(#barGradient)"
                />
              );
            })}
          </motion.g>
        </svg>
      ),
      scatter: (
        <svg {...sharedSvgProps}>
          <defs>{STYLE.GLOW.filter}</defs>
          {renderGrid(size)}
          <motion.g filter="url(#glow)">
            {data.map((d, i) => {
              const point = normalizePoint(d);
              return (
                <motion.circle
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 1 }}
                  transition={{
                    duration: TIMING.ANIMATION * 0.5,
                    delay: i * TIMING.STAGGER,
                    type: "spring",
                  }}
                  cx={point.x}
                  cy={point.y}
                  r={STYLE.SCATTER_RADIUS}
                  fill="#d8b4fe"
                />
              );
            })}
          </motion.g>
        </svg>
      ),
    };

    return visualComponents[visualType];
  };

  return (
    <motion.div
      className="p-2 md:p-4 overflow-visible relative"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={visualType}
          variants={variants.container}
          initial="initial"
          animate="animate"
          exit="exit"
          onAnimationComplete={(definition) => {
            if (definition === "animate") {
              cycleToNext();
            }
          }}
          className="p-3 md:p-6 relative"
        >
          {renderVisual()}
          <GraphLabel type={visualType} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
