/** @type {import('tailwindcss').Config} */
export default {
  content: ["./pages/**/*.vue", "./components/**/*.vue"],
  theme: {
    extend: {},
    screens: {
      sm: "425px",
      md: { min: "426px" },
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
