/** @type {import('tailwindcss').Config} */
/*
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

*/
// tailwind.config.js
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'app-bg': '#121212',
        'card-bg': '#1E1E1E',
        'text-primary': '#FFFFFF',
        'text-secondary': '#B0B0B0',
        'accent-blue': '#4A90E2',
        'forecast-bar': '#FFD700',
      }
    },
  },
  plugins: [],
}