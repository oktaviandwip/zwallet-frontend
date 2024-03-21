/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#",
        secondary: "#",
      },
      backgroundImage: {},
      boxShadow: {
        "shadow-blur": "inset 0 0 0 2000px rgba(27, 27, 27, 0.5)",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
