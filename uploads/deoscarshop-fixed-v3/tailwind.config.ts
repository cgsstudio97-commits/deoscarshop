import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0a0a0a",
        cream: "#f5f0e8",
        gold: "#c9a96e",
        "gold-light": "#e8d5a3",
        white: "#fefefe",
        mid: "#1a1a1a",
        "text-light": "#8a8070",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.2em",
        widest3: "0.25em",
        widest4: "0.3em",
        widest5: "0.35em",
      },
    },
  },
  plugins: [],
};
export default config;
