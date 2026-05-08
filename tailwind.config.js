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
        nasa: {
          blue: '#0032A0',
          red: '#E03C31',
          black: '#000000',
          gray: '#111111',
          lightGray: '#1F1F1F',
        }
      },
      backgroundImage: {
        'mission-gradient': 'radial-gradient(circle at center, #1a1a2e 0%, #0f0f1a 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
