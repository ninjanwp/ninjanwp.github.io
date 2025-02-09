import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CIRCLE_SIZE = 15; // Default shape size
const HOVER_PADDING = 10; // Extra size on hover
const glowColors = ["#ff4400", "#ff6b35", "#ff2200", "#ff3300"];

export const GlowCursor: React.FC = () => {
  const [lastKnownMousePosition, setLastKnownMousePosition] = useState({
    x: 0,
    y: 0,
  });

  // Motion values for cursor X/Y
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth interpolation
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const springWidth = useSpring(CIRCLE_SIZE, springConfig);
  const springHeight = useSpring(CIRCLE_SIZE, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setLastKnownMousePosition({ x: e.clientX, y: e.clientY });

      const element = document.elementFromPoint(e.clientX, e.clientY);
      updateCursorPosition(e.clientX, e.clientY, element);
    };

    const handleScroll = () => {
      // Use last known mouse position to recalculate after scroll
      const element = document.elementFromPoint(
        lastKnownMousePosition.x,
        lastKnownMousePosition.y
      );
      updateCursorPosition(
        lastKnownMousePosition.x,
        lastKnownMousePosition.y,
        element
      );
    };

    const updateCursorPosition = (
      x: number,
      y: number,
      element: Element | null
    ) => {
      const hoverable = element?.closest(".hoverable");

      if (hoverable) {
        const rect = hoverable.getBoundingClientRect();
        mouseX.set(rect.left + rect.width / 2);
        mouseY.set(rect.top + rect.height / 2);
        springWidth.set(rect.width + HOVER_PADDING * 2);
        springHeight.set(rect.height + HOVER_PADDING * 2);
      } else {
        mouseX.set(x);
        mouseY.set(y);
        springWidth.set(CIRCLE_SIZE);
        springHeight.set(CIRCLE_SIZE);
      }
    };

    document.body.style.cursor = "none";

    window.addEventListener("mousemove", updateMousePosition, {
      passive: true,
    });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("scroll", handleScroll);
      document.body.style.cursor = "default";
    };
  }, [mouseX, mouseY, springWidth, springHeight, lastKnownMousePosition]);

  // Central styling logic for the glow shape
  const getShapeStyle = () => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: springWidth, // spring-driven width
    height: springHeight, // spring-driven height
    x: springX, // spring-driven X
    y: springY, // spring-driven Y

    // Shift the element’s origin to its center
    translateX: "-50%",
    translateY: "-50%",

    opacity: 1,
    padding: `${HOVER_PADDING}px`, // Extra padding on hover
    backgroundColor: `${glowColors[0]}10`,
    border: `1px solid ${glowColors[0]}`,
    borderRadius: "15px", // Always square

    // Multiple glow layers
    boxShadow: `
      0 0 5px ${glowColors[0]},
      0 0 10px ${glowColors[1]},
      0 0 15px ${glowColors[2]},
      inset 0 0 20px ${glowColors[3]}80,
      inset 0 0 5px ${glowColors[2]}
    `,

    zIndex: 999999, // Increased z-index
    transition: "background-color 0.3s ease",
    pointerEvents: "none",
  });

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 999999,
        isolation: "isolate",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {/* The custom glow cursor shape */}
      <motion.div className="pointer-events-none" style={getShapeStyle()} />
    </div>
  );
};
