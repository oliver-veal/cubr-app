const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    screens: {
      "xs": "480px",
      ...defaultTheme.screens,
    },
    colors: {
      white: "#fff",
      black: "#000",
      transparent: "transparent",
      "near-black": "#151515",
      light: "rgba(255, 255, 255, 0.75)",
      primary: "#FF469F",
      red: "#e80000",
      green: "#23cc00",
      purple: "#6F3D7E",
      blue: "#2AC8EC",
    },
    fontWeight: {
      semibold: 500,
      bold: 600,
      extrabold: 700,
    },
    fontFamily: {
      "sans": "Gilroy",
    },
  },
  plugins: [],
};
