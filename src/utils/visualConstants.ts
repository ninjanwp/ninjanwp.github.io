// Extract accent color from Tailwind config

// CSS variable reference for dynamic usage in styles
export const CSS_VARIABLES = {
  accent: "var(--accent)",
  accentRgb: "rgb(var(--accent))",
  accentRgba: (opacity: number) => `rgba(var(--accent), ${opacity})`,
};

export const VISUAL_COLORS = {
  // Use CSS variables for accent colors
  stroke: CSS_VARIABLES.accentRgb,
  fill: CSS_VARIABLES.accentRgb,
  
  // Background color from theme
  background: "#16181C",
  
  // Card color from theme
  card: "#27292E",
  
  // Opacity values commonly used
  highOpacity: 0.4,
  mediumOpacity: 0.3,
  lowOpacity: 0.2,
  veryLowOpacity: 0.1,
};
