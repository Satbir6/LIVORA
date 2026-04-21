/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        livora: {
          brown: '#A77445',
          blue: '#1E3A52',
          ink: '#122330',
          light: '#F8F4EE',
          dark: '#2C2A28',
          beige: '#E7D9C6',
          gold: '#CEAB80',
          grey: '#6E6A66',
          sand: '#F2E7D9',
        },
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'serif'],
        subheading: ['Sora', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 16px 40px rgba(18, 35, 48, 0.14)',
        soft: '0 8px 26px rgba(18, 35, 48, 0.08)',
      },
      letterSpacing: {
        premium: '0.02em',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        reveal: 'reveal 650ms ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

