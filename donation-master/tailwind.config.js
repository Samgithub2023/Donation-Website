/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xxsm: "280px",
        xsm: "420px",
        sm: "640px",
        md: "768px",
        smd: "1024px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        gradient1a: "#E0C4FD",
        gradient1b: "#8FC6FD",
        colorPrimary: "#2dc1e4",
        colorSecondary: "#e8ecc7",
      },
      width: {
        4.8: "48%",
        9.8: "98%",
      },
      fontFamily: {
        cabin: ["Cabin"],
      },
    },
  },
  plugins: [],
};
