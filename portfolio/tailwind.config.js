/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C9A227",
        dark: "#0B0B0F",
        card: "#1A1A1F",
      },
    },
  },
  plugins: [],
}