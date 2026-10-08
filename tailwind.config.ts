import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '1px',
        xss: '3px',
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(35deg, #ffffff 0%, rgba(128, 128, 128, 0.37) 50%, #f5f5dc 100%)',
      },
      animation: {
        'fade-slide-in': 'fadeSlideIn 0.5s ease-out',
        'fade-slide-out': 'fadeSlideOut 0.2s ease-in',
        'fade-slide-right': 'fadeSlideRight 0.2s ease-out',
        'fade-slide-left': 'fadeSlideLeft 0.2s ease-in',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-fade-pr': 'slideSadePr 0.8s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
        blink: 'blink 3s linear infinite',

        'square-pulse': 'square-pulse 1.2s ease-in-out infinite',
        'pulse-ring':
          'pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'fade-spin': 'fade-spin 0.8s linear infinite',
        'slide-x': 'slide-x 1.5s ease-in-out infinite',
        'bounce-dot': 'bounce-dot 1s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        slideSadePr: {
          '0%': {
            opacity: '0',
            transform: 'translateX(50px)',
            paddingRight: '0px',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
            paddingRight: '20rem',
          },
        },
        fadeSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeSlideOut: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeSlideRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        fadeSlideLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },

        'square-pulse': {
          '0%, 100%': { transform: 'scale(0.8)', opacity: '0.5' },
          '50%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.5)', opacity: '0.8' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'fade-spin': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0.15' },
        },
        'slide-x': {
          '0%, 100%': { left: '4px' },
          '50%': { left: 'calc(100% - 20px)' },
        },
        'bounce-dot': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(-4px)', opacity: '1' },
        },
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'rgb(var(--color-bg-card) / <alpha-value>)',

        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          50: '#e6eeff',
          100: '#ccdcff',
          200: '#99baff',
          300: '#6697ff',
          400: '#3375ff',
          500: '#004ac6',
          600: '#003ba0',
          700: '#002c7a',
          800: '#001e54',
          900: '#000f2e',
          950: '#00071a',
        },

        secondary: {
          DEFAULT: '#F7931E',
          50: '#fff8ed',
          100: '#FFEEE1',
          200: '#FFDCC0',
          300: '#FFB875',
          400: '#fd651e',
          500: '#D57A00',
          600: '#B06400',
          700: '#8D4F00',
          800: '#6B3B00',
          900: '#4B2800',
          950: '#2D1600',
        },

        tertiary: {
          DEFAULT: '#B5AE51',
          50: '#fdfdf6',
          100: '#FDF48F',
          200: '#EEE682',
          300: '#D1CA69',
          400: '#B5AE51',
          500: '#9A9339',
          600: '#7F7922',
          700: '#666005',
          800: '#4D4800',
          900: '#353200',
          950: '#1E1C00',
        },

        neutral: {
          DEFAULT: '#0F172A',
          50: '#f8fafc',
          100: '#EEF0FF',
          200: '#DAE2FD',
          300: '#BEC6E0',
          400: '#A3ABC4',
          500: '#8990A8',
          600: '#6F778E',
          700: '#565E74',
          800: '#3F465C',
          900: '#283044',
          950: '#131B2E',
        },
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          raised: 'rgb(var(--color-surface-raised) / <alpha-value>)',
          subtle: 'rgb(var(--color-surface-subtle) / <alpha-value>)',
        },
        'border-ui': 'rgb(var(--color-border-ui) / <alpha-value>)',
        content: {
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
