// Centralized color scheme for the entire portfolio
// Change colors here to update the entire design

export const colorScheme = {
  // Background colors for portfolio sections
  backgrounds: {
    hero: "bg-black",
    webDev: "bg-neutral-900",
    mobileDev: "bg-neutral-900", 
    dataAnalysis: "bg-neutral-900",
    uiDesign: "bg-neutral-900",
    devOps: "bg-neutral-900",
    footer: "bg-black"
  },

  // Text colors
  text: {
    primary: "text-white",
    secondary: "text-white",
    light: "text-white",
    lightSecondary: "text-white/80",
    accent: "text-white",
    muted: "text-black/30"
  },

  // Button colors
  buttons: {
    primary: {
      bg: "bg-transparent",
      text: "text-black",
      border: "border-black",
      hover: {
        bg: "hover:bg-black",
        text: "hover:text-white"
      }
    }
  },

  // Skill tag colors
  skillTags: {
    bg: "bg-black",
    text: "text-white",
    border: "border-black"
  },

  // Large number colors
  numbers: {
    text: "text-white"
  },

  // Icon colors
  icons: {
    opacity: "text-red-700"
  }
};

// Helper function to get background color by section index
export const getBackgroundColor = (index: number): string => {
  const backgrounds = [
    colorScheme.backgrounds.webDev,
    colorScheme.backgrounds.mobileDev,
    colorScheme.backgrounds.dataAnalysis,
    colorScheme.backgrounds.devOps,
    colorScheme.backgrounds.uiDesign
  ];
  return backgrounds[index] || colorScheme.backgrounds.webDev;
};
