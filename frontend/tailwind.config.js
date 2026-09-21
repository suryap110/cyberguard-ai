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
          bg: "#070B14",
          secondaryBg: "#0B1220",
          card: "#101827",
          elevatedCard: "#151F32",
          accent: "#00E5FF",
          violet: "#7C3AED",
          blue: "#3B82F6",
          text: "#F8FAFC",
          secondaryText: "#94A3B8",
          mutedText: "#64748B",
          border: "rgba(148,163,184,0.12)",
          critical: "#FF3B3B",
          high: "#FF7A00",
          medium: "#FACC15",
          low: "#22C55E",
          safe: "#10B981",
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0, 229, 255, 0.25)',
        'violet-glow': '0 0 20px rgba(124, 58, 237, 0.25)',
        'critical-glow': '0 0 20px rgba(255, 59, 59, 0.25)',
        'safe-glow': '0 0 20px rgba(16, 185, 129, 0.25)',
      }
    },
  },
  plugins: [],
}
