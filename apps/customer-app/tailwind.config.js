/** @type {import('tailwindcss').Config} */
const path = require('path');
const pathAppFolder = path.join(__dirname, "./app/**/*.{js,ts,jsx,tsx,mdx}");
const pathAppSubFolder = path.join(__dirname, "./app/**/**/*.{js,ts,jsx,tsx,mdx}");
const pathBase = path.join(__dirname, "./app/*.{js,ts,jsx,tsx,mdx}");
const pathPackages = path.join(__dirname, "../../packages/ui/src/components/ui/*.{js,ts,jsx,tsx,mdx}");
const pathComponentsFolder = path.join(__dirname, "./components/*.{js,ts,jsx,tsx,mdx}");
const pathComponentsSubFolder = path.join(__dirname, "./components/**/*.{js,ts,jsx,tsx,mdx}");

module.exports = {
  content: [
    pathAppFolder,
    pathAppSubFolder,
    pathBase,
    pathPackages,
    pathComponentsSubFolder,
    pathComponentsFolder
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
        xxl: "calc(var(--radius) + 4px)",
        xl: "calc(var(--radius) + 2px)",
        xs: "calc(var(--radius) - 8px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        jump: {
          '50%': { transform: 'translateY(-250px)' },
          '0%, 100%': { transform: 'translateY(0)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(-50px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        'jump-out': {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
          '30%': {
            opacity: '1',
            transform: 'translateY(-250px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'scale-to-250px': {
          '0%': {

            height: 'full',
            opacity: 1,
            // transform: 'translateY(100)'
          },
          '20%': {

            height: 'full',
            opacity: 1,
            // transform: 'translateY(200)'
          },
          '30%': {

            height: 'full',
            opacity: 1,
            // transform: 'translateY(300)'
          },
          '40%': {

            height: 'full',
            opacity: 1,
            // transform: 'translateY(200)'
          },
          '50%': {

            height: 'full',
            opacity: 1,
            // transform: 'translateY(100)'
          },
          '60%': {

            height: 'full',
            opacity: 1,
            // transform: 'translateY(200)'
          },
          '70%': {

            height: 'full',
            opacity: 1,
            // transform: 'translateY(300)'
          },
          '80%': {

            height: 'full',
            opacity: 1,
            // transform: 'translateY(200)'
          },
          '90%': {

            height: 'full',
            opacity: 1,
            // transform: 'translateY(100)'
          },

          '100%': {
            height: '5000', // Target height
            opacity: 1,
            // transform: 'translateY(100)'
          }
        },
        "shine-pulse": {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          to: {
            "background-position": "0% 0%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "jump": "jump 1500ms ease-in-out 500ms 1 normal both",
        "fade-up": "fadeUp 1000ms ease-in-out 500ms 1 reverse both",
        'jump-out': 'jump-out 2s ease-in-out 500ms 1 reverse both',
        'scale-250': 'scale-to-250px 1200ms ease-in 0ms 1 both',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

