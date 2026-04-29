import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  safelist: [
    // text colors
    "text-emerald-600",
    "text-amber-600",
    "text-yellow-600",
    "text-red-600",
    "text-indigo-600",
    "text-blue-600",
    "text-green-600",
    "text-rose-600",
    "text-slate-600",
    "text-cyan-600",

    // border colors
    "border-emerald-600",
    "border-amber-600",
    "border-yellow-600",
    "border-red-600",
    "border-indigo-600",
    "border-blue-600",
    "border-green-600",
    "border-rose-600",
    "border-slate-600",
    "border-cyan-600",
  ],

  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1A2F",
          light: "#142845",
          dark: "#061020",
        },
        gold: {
          DEFAULT: "#C9A86A",
          light: "#D9BE8F",
          dark: "#A88A4F",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        serif: ["var(--font-merriweather)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },

  plugins: [],
};

export default config;