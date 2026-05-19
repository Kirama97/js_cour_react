/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        js: {
          yellow: '#F7DF1E',
          dark: '#1A1A2E',
          mid: '#16213E',
          accent: '#0F3460',
          blue: '#E94560',
        }
      }
    },
  },
  plugins: [],
}
