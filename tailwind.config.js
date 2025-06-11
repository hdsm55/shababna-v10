/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#003362',
          50: '#e6f0f9',
          100: '#cce0f3',
          200: '#99c2e6',
          300: '#66a3da',
          400: '#3385cd',
          500: '#0066c1',
          600: '#00529a',
          700: '#003d74',
          800: '#00294d',
          900: '#001427',
          light: '#0A4A7F',
          dark: '#002345',
          hover: '#00284D'
        },
        secondary: {
          DEFAULT: '#4f46e5',
          50: '#eeecfe',
          100: '#ddd9fd',
          200: '#bbb3fb',
          300: '#988df9',
          400: '#7667f7',
          500: '#5541f5',
          600: '#4434c4',
          700: '#332793',
          800: '#221a62',
          900: '#110d31',
          light: '#6366f1',
          dark: '#4338ca',
          hover: '#4338ca'
        },
        accent: {
          DEFAULT: '#8b5cf6',
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          light: '#a78bfa',
          dark: '#7c3aed',
          hover: '#6d28d9'
        },
        surface: {
          DEFAULT: '#FFFFFF',
          50: '#fafafa',
          100: '#F8FAFC',
          200: '#F1F5F9',
          300: '#e2e8f0',
          400: '#cbd5e1',
          500: '#94a3b8'
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        midnight: '#0F172A',
        cetacean: '#1E293B',
        success: {
          DEFAULT: '#10b981',
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
        },
        warning: {
          DEFAULT: '#f59e0b',
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          DEFAULT: '#ef4444',
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
        }
      },
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
        almarai: ['Almarai', 'sans-serif'],
        sans: ['Tajawal', 'sans-serif']
      },
      spacing: {
        section: '4rem',
        container: '1.5rem'
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      },
      borderRadius: {
        'card': '0.75rem'
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.btn-primary': {
          backgroundColor: '#8b5cf6',
          color: '#FFFFFF',
          fontWeight: '600',
          padding: '0.625rem 1.25rem',
          borderRadius: '0.5rem',
          transition: 'background-color 0.2s',
          '&:hover': {
            backgroundColor: '#6d28d9'
          },
          '&:focus': {
            outline: 'none',
            boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.4)'
          },
          '&:disabled': {
            opacity: '0.7',
            cursor: 'not-allowed'
          }
        },
        '.btn-secondary': {
          backgroundColor: '#4f46e5',
          color: '#FFFFFF',
          fontWeight: '600',
          padding: '0.625rem 1.25rem',
          borderRadius: '0.5rem',
          transition: 'all 0.2s',
          '&:hover': {
            backgroundColor: '#4338ca'
          },
          '&:focus': {
            outline: 'none',
            boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.4)'
          },
          '&:disabled': {
            opacity: '0.7',
            cursor: 'not-allowed'
          }
        },
        '.section': {
          padding: '4rem 1rem',
          '@screen sm': {
            padding: '4rem 1.5rem'
          },
          '@screen lg': {
            padding: '4rem 2rem'
          }
        },
        '.card-base': {
          backgroundColor: '#FFFFFF',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '1.5rem',
          transition: 'box-shadow 0.2s, transform 0.2s',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            transform: 'translateY(-2px)'
          }
        }
      })
    }
  ],
}