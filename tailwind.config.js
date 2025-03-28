// tailwind.config.js
const { heroui } = require("@heroui/theme");
const withMT = require("@material-tailwind/html/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./node_modules/@heroui/theme/dist/components/(button|navbar|ripple|spinner).js",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glow: {
          "0%, 100%": { filter: "drop-shadow(0 0 30px #00FFFF)" },
          "50%": { filter: "drop-shadow(0 0 40px #00FFFF)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        glow: "glow 1.5s infinite alternate ease-in-out",
        float: "float 3s infinite ease-in-out",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
});
