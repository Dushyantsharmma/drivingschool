/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0B1C2D',
        'gold': '#F5B301',
        'orange': '#FF8C1A',
        'dark-gray': '#1E1E1E',
        'banner-navy': '#1B2951', // Darker navy from banner
        'banner-yellow': '#F5B301', // Yellow from banner
        'banner-orange': '#FF8C1A', // Orange gradient
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-banner': 'linear-gradient(135deg, #0B1C2D 0%, #1B2951 50%, #F5B301 100%)',
        'gradient-orange': 'linear-gradient(135deg, #FF8C1A 0%, #F5B301 100%)',
        'hero-pattern': "url('/banner-hero.jpg')",
      },
      boxShadow: {
        'glow': '0 0 20px rgba(245, 179, 1, 0.3)',
        'card': '0 10px 30px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 60px rgba(11, 28, 45, 0.15)',
        'glow-yellow': '0 0 20px rgba(245, 179, 1, 0.4)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          md: '2rem',
          lg: '2rem',
          xl: '3rem',
          '2xl': '4rem',
        },
      },
      spacing: {
        'section-padding': 'clamp(2rem, 5vw, 4rem)',
      },
    },
    screens: {
      'xs': '320px',
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}