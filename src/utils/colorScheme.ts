// Centralized color scheme for the entire portfolio
// Change colors here to update the entire design

export const colorScheme = {
  // Background colors for portfolio sections
  backgrounds: {
    hero: "bg-black",
    webDev: "bg-blue-700",
    mobileDev: "bg-purple-700", 
    dataAnalysis: "bg-emerald-700",
    uiDesign: "bg-rose-700",
    devOps: "bg-orange-600",
    footer: "bg-black"
  },

  // Text colors
  text: {
    primary: "text-black",
    secondary: "text-black",
    light: "text-white",
    lightSecondary: "text-white/80",
    accent: "text-yellow-100",
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
    text: "text-yellow-100",
    border: "border-black"
  },

  // Large number colors
  numbers: {
    text: "text-yellow-100"
  },

  // Icon colors
  icons: {
    opacity: "text-black/20"
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
