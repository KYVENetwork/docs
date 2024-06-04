/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: "var(--ifm-color-primary)",
        accent: "#00000030",
        borderColor: "var(--ifm-toc-border-color)",
      },
      transitionTimingFunction: {
        sal: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
