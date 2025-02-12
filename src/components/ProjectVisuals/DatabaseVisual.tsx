import { motion } from "framer-motion";

export const DatabaseVisual = () => {
  const tables = [
    { x: 20, y: 20, width: 100, height: 70 },
    { x: 140, y: 20, width: 100, height: 70 },
    { x: 80, y: 110, width: 100, height: 70 },
  ];

  // Calculate middle points of table sides
  const getTableMidpoint = (table: (typeof tables)[0]) => ({
    left: table.x,
    right: table.x + table.width,
    middle: table.y + table.height / 2,
  });

  const bottomTable = getTableMidpoint(tables[2]);
  const leftTopTable = getTableMidpoint(tables[0]);
  const rightTopTable = getTableMidpoint(tables[1]);

  // Updated connection paths to meet tables at their middle height
  const connections = [
    // Left top table to right top table (horizontal)
    "M120 55 H140",
    // Right top table to bottom table (right side)
    `M190 90 V${bottomTable.middle} H${bottomTable.right}`,
    // Left top table to bottom table (left side)
    `M70 90 V${bottomTable.middle} H${bottomTable.left}`,
  ];

  return (
    <div className="h-full flex items-center justify-center">
      <div className="relative w-full h-full">
        <svg className="w-full h-full" viewBox="0 0 260 200">
          {/* Connection lines with joints */}
          {connections.map((path, i) => (
            <motion.path
              key={i}
              d={path}
                  stroke="#d8b4fe"
                  fill={"none"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0.1 }}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}

          {/* Tables */}
          {tables.map((table, i) => (
            <motion.g key={i}>
              {/* Table container */}
              <motion.rect
                x={table.x}
                y={table.y}
                width={table.width}
                height={table.height}
                rx="4"
                fill="none"
                stroke="#d8b4fe"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: i * 0.2 }}
              />

              {/* Header rectangle */}
              <motion.rect
                x={table.x + 10}
                y={table.y + 10}
                width={table.width - 20}
                height={8}
                rx="2"
                fill="#d8b4fe"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />

              {/* Content rectangles */}
              {[0, 1, 2].map((j) => (
                <motion.rect
                  key={j}
                  x={table.x + 10}
                  y={table.y + 25 + j * 12}
                  width={(table.width - 20) * 0.8}
                  height={6}
                  rx="2"
                  fill="#d8b4fe"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  transition={{ delay: i * 0.2 + j * 0.1 }}
                />
              ))}
            </motion.g>
          ))}
        </svg>
      </div>
    </div>
  );
};
