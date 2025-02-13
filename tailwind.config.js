/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
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
    },
  },
  plugins: [],
};
