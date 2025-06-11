/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#003362',
          light: '#0A4A7F',
          dark: '#002345',
          hover: '#00284D'
        },
        secondary: {
          DEFAULT: '#64748b',
          light: '#94a3b8',
          dark: '#475569',
          hover: '#334155'
        },
        accent: {
          DEFAULT: '#8b5cf6',
          light: '#a78bfa',
          dark: '#7c3aed',
          hover: '#6d28d9'
        },
        surface: {
          DEFAULT: '#FFFFFF',
          100: '#F8FAFC',
          200: '#F1F5F9'
        },
        midnight: '#0F172A',
        cetacean: '#1E293B'
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
        'card': '0.5rem'
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
          borderRadius: '0.375rem',
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
          backgroundColor: '#FFFFFF',
          color: '#003362',
          fontWeight: '600',
          padding: '0.625rem 1.25rem',
          borderRadius: '0.375rem',
          border: '1px solid #E2E8F0',
          transition: 'all 0.2s',
          '&:hover': {
            backgroundColor: '#F8FAFC',
            borderColor: '#CBD5E1'
          },
          '&:focus': {
            outline: 'none',
            boxShadow: '0 0 0 3px rgba(0, 51, 98, 0.2)'
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
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '1.5rem',
          transition: 'box-shadow 0.2s',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }
        }
      })
    }
  ],
}