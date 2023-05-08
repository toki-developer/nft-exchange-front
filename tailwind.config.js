/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        textcolor: { main: "#FFFFFF", sub: "#FFFFFFA3" },
        bgcolor: "#0E1116",
      },
    },
  },
  plugins: [],
};
