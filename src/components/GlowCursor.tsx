import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CIRCLE_SIZE = 1; // Default shape size
const HOVER_PADDING = 5; // Extra size on hover
const glowColors = ["#e7e5e4", "#d6d3d1", "#a8a29e", "#78716c"];

export const GlowCursor: React.FC = () => {
  const [lastKnownMousePosition, setLastKnownMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for cursor X/Y
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth interpolation
  const springConfig = { damping: 30, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const springWidth = useSpring(CIRCLE_SIZE, springConfig);
  const springHeight = useSpring(CIRCLE_SIZE, springConfig);

  // Add new useEffect for initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const centerX = window.innerWidth / 2;
      mouseX.set(centerX);
      mouseY.set(0);
      setLastKnownMousePosition({ x: centerX, y: 0 });
    }
  }, []); // Run once on mount

  useEffect(() => {
    let isFirstMove = true;

    const updateMousePosition = (e: MouseEvent) => {
      if (isFirstMove) {
        isFirstMove = false;
        setIsVisible(true);
      }

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

    window.addEventListener("mousemove", updateMousePosition, {
      passive: true,
    });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mouseX, mouseY, springWidth, springHeight, lastKnownMousePosition]);

  // Central styling logic for the glow shape
  const getShapeStyle = () => ({
    position: useMotionValue("fixed"),
    top: 0,
    left: 0,
    width: springWidth, // spring-driven width
    height: springHeight, // spring-driven height
    x: springX, // spring-driven X
    y: springY, // spring-driven Y

    // Shift the element’s origin to its center
    translateX: "-50%",
    translateY: "-50%",

    opacity: isVisible ? 1 : 0,
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

    transition: "background-color 0.3s ease",
    pointerEvents: useMotionValue("none"),
  });

  return (
    <div
      className="fixed inset-0 pointer-events-none hidden sm:block"
      style={{ opacity: isVisible ? 1 : 0, zIndex: 100 }}
    >
      {/* The custom glow cursor shape */}
      <motion.div className="pointer-events-none" style={getShapeStyle()} />
    </div>
  );
};
