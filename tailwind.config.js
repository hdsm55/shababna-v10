/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#003362', hover: '#002345' },
        secondary: { 
          DEFAULT: '#6366f1', 
          500: '#6366f1', 
          600: '#4f46e5',
          light: '#818cf8',
          dark: '#4338ca',
          contrast: '#ffffff'
        },
        accent: { DEFAULT: '#8b5cf6', hover: '#7c3aed' },
        surface: { DEFAULT: '#FFFFFF', 100: '#F8FAFC' }
      },
      fontFamily: { sans: ['Tajawal', 'sans-serif'] },
      spacing: {
        section: '4rem',
        container: '1.5rem'
      }
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.btn-primary': '@apply bg-accent text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-accent-hover transition-colors duration-200',
        '.btn-secondary': '@apply bg-surface text-primary font-semibold px-6 py-2.5 rounded-lg shadow hover:bg-primary/10 transition-colors duration-200',
        '.section': '@apply px-4 sm:px-container lg:px-8 py-section',
        '.card-base': '@apply bg-surface rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200'
      })
    }
  ],
  corePlugins: { preflight: false }
}