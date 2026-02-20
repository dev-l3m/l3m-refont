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
        sand: {
          DEFAULT: "#E7E2D6",
          light: "#F0EDE5",
          dark: "#D8D1C4",
        },
        ink: {
          DEFAULT: "#2B1F1A",
          light: "#4A3D35",
        },
        accent: {
          DEFAULT: "#BBA437",
          light: "#FFD700",
          dark: "#FFA000",
        },
        rail: {
          DEFAULT: "#D8D1C4",
          dark: "#C9C1B2",
        },
        muted: {
          DEFAULT: "#6E625A",
          light: "#8A7F77",
        },
        background: "var(--bg-sand)",
        foreground: "var(--ink)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      fontSize: {
        'hero': ['clamp(3.5rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
      },
    },
  },
  plugins: [],
};
export default config;
