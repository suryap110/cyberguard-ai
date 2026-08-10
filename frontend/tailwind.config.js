/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#080B11",
          surface: "#0F1420",
          card: "#161D2F",
          border: "#232D42",
          accent: "#38BDF8",
          primary: "#0284C7",
          electric: "#00F0FF",
          safe: "#10B981",
          warning: "#F59E0B",
          high: "#F97316",
          critical: "#EF4444",
          text: "#F8FAFC",
          muted: "#94A3B8"
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'cyber-glow': '0 0 25px rgba(56, 189, 248, 0.15)',
        'red-glow': '0 0 25px rgba(239, 68, 68, 0.25)',
        'electric-glow': '0 0 30px rgba(0, 240, 255, 0.2)'
      }
    },
  },
  plugins: [],
}
