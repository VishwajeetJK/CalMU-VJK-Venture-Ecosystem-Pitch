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
        creamy: "#fdfdf6",
        "calmu-black": "#000000",
        lime: "#d9f99d",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "lime-glow": "0 0 20px rgba(217, 249, 157, 0.5)",
        "lime-glow-lg": "0 0 40px rgba(217, 249, 157, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
