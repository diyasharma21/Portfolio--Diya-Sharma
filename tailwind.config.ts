import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette: Warm ivory + muted sage + dusty teal accents
        ivory: {
          50: "#FDFBF7",
          100: "#F8F4EC",
          200: "#F0EAD8",
          300: "#E5DBc6",
        },
        sage: {
          100: "#E8EDE6",
          200: "#D2DDD0",
          300: "#BACAB7",
          400: "#8FA98B",
          500: "#6B8E6A",
          600: "#4E6E4D",
        },
        teal: {
          100: "#E0EDEC",
          200: "#BDD8D6",
          300: "#8BBAB7",
          400: "#5E9B97",
          500: "#3D7D7A",
        },
        stone: {
          50: "#FAFAF9",
          100: "#F5F5F4",
          200: "#E7E5E4",
          300: "#D6D3D1",
          400: "#A8A29E",
          500: "#78716C",
          600: "#57534E",
          700: "#44403C",
          800: "#292524",
          900: "#1C1917",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
