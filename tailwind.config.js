/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: "var(--ifm-color-primary)",
        accent: "#00000030",
        borderColor: "var(--ifm-toc-border-color)"
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
