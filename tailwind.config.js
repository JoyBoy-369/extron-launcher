/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        customFont: ["MB CORPS", "sans-serif"],
        // Add more custom font families as needed
      },
    },
  },
  plugins: [],
};
