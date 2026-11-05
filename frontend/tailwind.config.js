/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Main supermarket emerald
          600: '#059669', // Primary buttons & headings
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        citrus: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Amber deal highlights
          600: '#d97706',
        },
        coral: {
          500: '#f97316', // Orange discount tags
          600: '#ea580c',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px -1px rgba(0, 0, 0, 0.05), 0 1px 3px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 12px 24px -4px rgba(16, 185, 129, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'drawer': '-4px 0 24px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'pulse-subtle': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

