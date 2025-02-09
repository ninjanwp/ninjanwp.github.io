import React, { useState, useEffect } from "react";
import './FontSwitch.css'; // Add this import

interface FontSwitchProps {
  children: React.ReactNode;
  interval?: number;
  charDelay?: number;
  defaultFont?: string;
}

export const FontSwitch: React.FC<FontSwitchProps> = ({
  children,
  interval = 3000,
  charDelay = 25, // Reduced delay
  defaultFont = "inherit",
}) => {
  const text = React.Children.toArray(children).join("");
  const [characters, setCharacters] = useState<string[]>([]);
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const chars = text.split("");
    setCharacters(chars);

    const glitchEffect = () => {
      setActiveIndices(new Set());

      chars.forEach((_, index) => {
        setTimeout(() => {
          setActiveIndices((prev) => new Set([...prev, index]));

          setTimeout(() => {
            setActiveIndices((prev) => {
              const updated = new Set([...prev]);
              updated.delete(index);
              return updated;
            });
          }, 200);
        }, index * charDelay);
      });
    };

    const intervalId = setInterval(glitchEffect, interval);
    return () => clearInterval(intervalId);
  }, [text, interval, charDelay]);

  const getGlitchStyle = (isActive: boolean) => {
    const baseStyle = {
      display: 'inline-block',
      verticalAlign: 'baseline',
    };

    if (!isActive) {
      return {
        ...baseStyle,
        fontFamily: defaultFont,
        animation: 'microShake 200ms ease-in-out infinite',
      };
    }
    
    const glowColors = ['#ff4400', '#ff6b35', '#ff2200', '#ff3300'];
    const randomGlowColor = glowColors[Math.floor(Math.random() * glowColors.length)];
    
    return {
      ...baseStyle,
      fontFamily: 'serif',
      fontStyle: 'italic',
      transform: `
        translateY(${Math.random() * 15 - 7}px) 
        translateX(${Math.random() * 8 - 4}px)
        rotate(${Math.random() * 20 - 10}deg)
        skew(${Math.random() * 40 - 20}deg)
        scale(${0.6 + Math.random() * 0.8})
      `,
      opacity: 0.7 + Math.random() * 0.3,
      color: '#ff3300',
      textShadow: `
        0 0 5px ${randomGlowColor},
        0 0 10px ${randomGlowColor},
        0 0 15px #ff2200,
        0 0 20px #ff1100,
        0 0 25px #ff0000,
        ${Math.random() * 6 - 3}px ${Math.random() * 6 - 3}px 30px rgba(255,30,0,0.8)
      `,
      transition: 'none',
      fontWeight: 'bold',
      filter: `brightness(${1.2 + Math.random() * 0.3})`,
      animation: `${Math.random() > 0.5 ? 'shake' : 'shakeAlt'} ${Math.random() * 100 + 50}ms ease-in-out infinite, glow ${Math.random() * 200 + 300}ms ease-in-out infinite`,
    };
  };

  return (
    <span style={{ display: 'inline' }}>
      {characters.map((char, index) => (
        <span
          key={index}
          style={getGlitchStyle(activeIndices.has(index)) as React.CSSProperties}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
