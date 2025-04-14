/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Theme colors
        background: '#000',
        card: 'rgba(17, 17, 17, 0.8)', // Dark card color that works well on the near-black background
        accent: "rgb(var(--accent))",
        'accent-dark': '#4ade80',
        success: '#22c55e',
        error: '#ef4444',
        muted: 'rgba(255, 255, 255, 0.5)',
        custom: {
          orange: {
            50: "#fff7e6",
            100: "#ffebcc",
            200: "#ffd699",
            300: "#ffc266",
            400: "#ffad33",
            500: "#ff9900", // your base color
            600: "#e68a00",
            700: "#cc7a00",
            800: "#b36b00",
            900: "#995c00",
          },
          blue: {
            50: "#e6f7ff",
            100: "#cceeff",
            200: "#99ddff",
            300: "#66ccff",
            400: "#33bbff",
            500: "#00aaff", // your base color
            600: "#0099e6",
            700: "#0088cc",
            800: "#0077b3",
            900: "#006699",
          },
          green: {
            50: "#e6ffe6",
            100: "#ccffcc",
            200: "#99ff99",
            300: "#66ff66",
            400: "#33ff33",
            500: "#00ff00", // your base color
            600: "#00e600",
            700: "#00cc00",
            800: "#00b300",
            900: "#009900",
          },
          red: {
            50: "#ffe6e6",
            100: "#ffcccc",
            200: "#ff9999",
            300: "#ff6666",
            400: "#ff3333",
            500: "#ff0000", // your base color
            600: "#e60000",
            700: "#cc0000",
            800: "#b30000",
            900: "#990000",
          },
        },
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(255, 255, 255, 0.1)',
        'inner-glow': 'inset 0 0 20px 5px rgba(255, 255, 255, 0.05)',
      },
      backdropBlur: {
        'glass': '10px',
      },
    },
  },
  plugins: [
    function ({ addBase, addUtilities }) {
      addBase({
        ":root": {
          "--accent": "255 255 255", // Default green accent color RGB values
          "--background": "#000", // Default background color
        },
      });
      
      // Add custom glass card utility
      addUtilities({
        '.glass-card': {
          'background': 'rgba(255, 255, 255, 0.05)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          'border-radius': '16px',
          'box-shadow': 'inset 0 0 20px 5px rgba(255, 255, 255, 0.05)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
        },
      });
    },
  ],
};
