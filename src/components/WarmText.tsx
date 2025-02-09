import React from "react";
import './FontSwitch.css'; // Reuse the same animations

interface WarmTextProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
}

export const WarmText: React.FC<WarmTextProps> = ({
  children,
  intensity,
}) => {
  const getIntensityStyles = () => {
    const intensityMap = {
      low: {
        glowStrength: '1px',
        brightness: 1.05,
        shake: 'microShake'
      },
      medium: {
        glowStrength: '2px',
        brightness: 1.1,
        shake: 'shake'
      },
      high: {
        glowStrength: '3px',
        brightness: 1.15,
        shake: 'shakeAlt'
      }
    };

    const { glowStrength, brightness, shake } = intensityMap[intensity || 'medium'];

    return {
      display: 'inline-block',
      verticalAlign: 'baseline',
      fontFamily: 'monospace',
      fontWeight: 'bold',
      color: '#ff4400',
      textShadow: `
        0 0 ${glowStrength} #ff4400,
        0 0 ${parseInt(glowStrength) * 1.5}px #ff2200,
        0 0 ${parseInt(glowStrength) * 2}px #ff1100
      `,
      filter: `brightness(${brightness})`,
      animation: `${shake} ${200 + Math.random() * 100}ms ease-in-out infinite, glow 600ms ease-in-out infinite`,
    
    };
  };

  return (
    <span>
      {React.Children.toArray(children).map((char, index) => (
        <span
          key={index}
          style={getIntensityStyles() as React.CSSProperties}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
