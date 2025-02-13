import { motion } from "framer-motion";

export const DataGridVisual = () => {
  const grid = {
    cols: 6,
    rows: 4,
    cellSize: 30,
    gap: 4,
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="relative w-full h-full">
        <svg className="w-full h-full" viewBox="0 0 260 180">
          <motion.g>
            {Array.from({ length: grid.rows * grid.cols }).map((_, i) => {
              const col = i % grid.cols;
              const row = Math.floor(i / grid.cols);
              const x = 20 + col * (grid.cellSize + grid.gap);
              const y = 20 + row * (grid.cellSize + grid.gap);

              return (
                <motion.rect
                  key={i}
                  x={x}
                  y={y}
                  width={grid.cellSize}
                  height={grid.cellSize}
                  rx="2"
                  fill="none"
                  stroke="#e5e5e5"
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0.1, 0.3, 0.1], scale: [0, 1, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: (col + row) * 0.1,
                  }}
                />
              );
            })}
          </motion.g>
        </svg>
      </div>
    </div>
  );
};
