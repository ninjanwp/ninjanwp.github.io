import { useState, useRef } from "react";

export const useSpotlight = () => {
  const elementRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return {
    elementRef,
    position,
    opacity,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
};
