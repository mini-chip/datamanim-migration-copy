import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Datamanim 컬러
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          header: "#579aca"
        },

        sidebar: {
          bg: "#f8fafc",
          border: "#e2e8f0",
          text: "#4b5563",
          accent: "#936dff",
          accentHover: "#8b5cf6",
          hover: "#f1f5f9",
          active: "#dbeafe"
        },

        code: {
          lightColor: "#F3F4F5",
          darkColor: "#1e293b",
          text: "#000000",
          border: "#334155"
        }
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ],
        mono: [
          "SFMono-Regular",
          "Consolas",
          "Liberation Mono",
          "Menlo",
          "Courier",
          "monospace"
        ]
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }]
      },
      spacing: {
        "18": "4.5rem",
        "72": "18rem",
        "80": "20rem",
        "96": "24rem"
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
export default config;