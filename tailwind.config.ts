import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ZENEIO Brand Colors
        zeneio: {
          black: '#0A0A0A',
          dark: '#111111',
          darker: '#0D0D0D',
          gray: '#1A1A1A',
          'gray-light': '#2A2A2A',
          'gray-border': 'rgba(255,255,255,0.08)',
          accent: '#81D8D0',       // Tiffany Blue
          'accent-dark': '#5BBFB6',
          'accent-light': '#A8E8E2',
          purple: '#9B87F5',
          pink: '#F472B6',
          white: '#FFFFFF',
          'white-dim': '#E5E5E5',
          muted: '#888888',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display': ['4rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'heading-1': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'heading-2': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-3': ['1.5rem', { lineHeight: '1.3' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        caption: ['0.75rem', { lineHeight: '1.4' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        'screen-xl': '1440px',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.3)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.4)',
        'glow-accent': '0 0 30px rgba(129,216,208,0.2)',
        'glow-purple': '0 0 30px rgba(155,135,245,0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 25s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // Brand gradients
        'brand-primary': 'linear-gradient(135deg, #81D8D0, #9B87F5)',
        'brand-dark': 'linear-gradient(135deg, #1A1A1A, #0A0A0A)',
        'brand-card': 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
      },
      // Responsive breakpoints (default + custom)
      screens: {
        'xs': '480px',
        'sm': '640px',   // Mobile landscape
        'md': '768px',   // Tablet portrait
        'lg': '1024px',  // Tablet landscape / Small desktop
        'xl': '1280px',  // Desktop
        '2xl': '1536px', // Large desktop
      },
    },
  },
  plugins: [],
};
export default config;
