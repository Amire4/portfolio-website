/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#020617',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
          50: '#f8fafc',
        },
        primary: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      animation: {
        'bounce-slow': 'bounce-slow 2s infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'spin-slower': 'spin-slower 30s linear infinite',
        'float-up': 'float-up 4s ease-out forwards',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
        'spin-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'spin-slower': {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' },
        },
        'float-up': {
          '0%': { transform: 'translateY(0) scale(0)', opacity: '0' },
          '20%': { opacity: '1', transform: 'translateY(-20px) scale(1)' },
          '100%': { transform: 'translateY(-100vh) scale(1.5)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}