/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app.{ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
