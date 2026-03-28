import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          card: "var(--bg-card)",
        },
        border: {
          subtle: "var(--border-subtle)",
          glow: "#8b5cf633",
        },
        neon: {
          cyan: "#8b5cf6",    // accent-violet — primary
          purple: "#f472b6",  // accent-rose — secondary
          pink: "#fb923c",    // accent-amber — tertiary
        },
        text: {
          primary: "var(--text-primary)",
          muted: "var(--text-muted)",
          accent: "#8b5cf6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-pattern":
          "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(139,92,246,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(244,114,182,0.06) 0%, transparent 60%)",
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "slide-in-left": "slide-in-left 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "aurora-1": "aurora-1 18s ease-in-out infinite",
        "aurora-2": "aurora-2 22s ease-in-out infinite",
        "aurora-3": "aurora-3 26s ease-in-out infinite",
        "word-in": "word-in 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
        "word-out": "word-out 0.35s ease-in forwards",
        "progress-shimmer": "progress-shimmer 1.5s ease infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(139,92,246,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(139,92,246,0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-50px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(50px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "aurora-1": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "25%": { transform: "translate(4%, -6%) scale(1.08)" },
          "50%": { transform: "translate(-5%, 4%) scale(0.94)" },
          "75%": { transform: "translate(6%, 2%) scale(1.04)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%": { transform: "translate(-6%, 5%) scale(1.06)" },
          "66%": { transform: "translate(5%, -4%) scale(0.96)" },
        },
        "aurora-3": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "40%": { transform: "translate(5%, 7%) scale(1.1)" },
          "80%": { transform: "translate(-4%, -5%) scale(0.92)" },
        },
        "word-in": {
          "0%": { clipPath: "inset(0 0 100% 0)", transform: "translateY(12px)", opacity: "0" },
          "100%": { clipPath: "inset(0 0 0% 0)", transform: "translateY(0)", opacity: "1" },
        },
        "word-out": {
          "0%": { clipPath: "inset(0 0 0% 0)", transform: "translateY(0)", opacity: "1" },
          "100%": { clipPath: "inset(100% 0 0% 0)", transform: "translateY(-10px)", opacity: "0" },
        },
        "progress-shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
