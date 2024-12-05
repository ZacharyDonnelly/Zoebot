/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      backgroundColor: {
        lilacGreenGradient:
          "radial-gradient(123.6% 44.95% at 18.27% 32.33%, #E2FBF8 0%, #D8FFFA 16.5%, #D8CAFF 52%, #BCA4FE 100%)",
      },
    },
  },
  plugins: [],
};
