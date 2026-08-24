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
        dark: {
          950: '#04070D',
          900: '#070B14',
          850: '#090E1A',
          800: '#0B1120',
          750: '#0E1626',
          700: '#111827',
          650: '#131C2E',
          600: '#151D2F',
          500: '#1E293B',
          400: '#334155',
        },
        brand: {
          indigo: '#6366F1',
          violet: '#8B5CF6',
          purple: '#9333EA',
          lightViolet: '#A78BFA',
          cyan: '#22D3EE',
          darkViolet: '#4C1D95',
          fuchsia: '#D946EF',
        },
        accent: {
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
          cyan: '#22D3EE',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#CBD5E1',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(99, 102, 241, 0.3)',
        'glow': '0 0 30px -5px rgba(99, 102, 241, 0.45)',
        'glow-lg': '0 0 50px -10px rgba(139, 92, 246, 0.55)',
        'glow-cyan': '0 0 30px -5px rgba(34, 211, 238, 0.45)',
        'glow-amber': '0 0 30px -5px rgba(245, 158, 11, 0.45)',
        'glow-emerald': '0 0 30px -5px rgba(34, 197, 94, 0.45)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.8)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'floatReverse 6s ease-in-out infinite',
        'gradient': 'gradient 8s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'spin-slow': 'spin 12s linear infinite',
        'radar-sweep': 'radar 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      borderColor: {
        DEFAULT: 'rgba(148, 163, 184, 0.12)',
        subtle: 'rgba(148, 163, 184, 0.12)',
        highlight: 'rgba(99, 102, 241, 0.3)',
      }
    },
  },
  plugins: [],
}
