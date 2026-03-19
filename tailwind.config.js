/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        shell: '#070a14',
        card: '#101627',
        mist: '#b6c2f5',
        accent: '#6f7cff',
        mint: '#58f2d0',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(18, 29, 68, 0.35)',
        glow: '0 0 30px rgba(111, 124, 255, 0.35)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.06)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 3.2s ease-in-out infinite',
        floaty: 'floaty 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
