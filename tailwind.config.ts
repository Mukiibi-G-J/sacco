import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Outfit', 'sans-serif'],
    },
    extend: {
      colors: {
        // Primary Colors
        "dark-teal": "#005151",
        "accent-yellow": "#ffbf3f",
        "secondary-yellow": "#e8a115",
        "primary-accent": "#1a938a",
        
        // Text Colors
        "main-text": "#060b1e",
        "body-text": "#3b4a46",
        
        // Background Colors
        "soft-bg": "#f7f7f7",
        "soft-teal-bg": "#eafaf8",
        
        // Border Colors
        "stroke": "#e5e5e5",
        "light-stroke": "#e4e4e4",
        
        // State Colors
        "success": "#10b981",
        "error": "#ef4444",
        "warning": "#f59e0b",
        "info": "#3b82f6",
      },
      fontSize: {
        "display-2": ["88px", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-3": ["64px", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "display-4": ["56px", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      spacing: {
        // Base unit: 4px
        "0.5": "2px",
        "1": "4px",
        "1.5": "6px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "15": "60px",
        "16": "64px",
      },
      gap: {
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "6": "24px",
      },
      borderRadius: {
        "sm": "0.25rem", // 4px
        "md": "0.375rem", // 6px
        "lg": "0.5rem", // 8px
        "xl": "0.75rem", // 12px
      },
      boxShadow: {
        "small": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "medium": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        "large": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      transitionDuration: {
        "fast": "150ms",
        "default": "300ms",
        "slow": "500ms",
        "very-slow": "700ms",
      },
      screens: {
        "mobile": { "max": "767px" },
        "tablet": { "min": "768px", "max": "991px" },
        "desktop": { "min": "992px" },
        "large-desktop": { "min": "1200px" },
      },
    },
  },
  plugins: [],
};

export default config;
