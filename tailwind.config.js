/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Oficial ROURA 1940
        roura: {
          navy: {
            DEFAULT: '#2F4156',
            light: '#3D546F',
            dark: '#1E2A38',
            deep: '#151E28',
          },
          teal: {
            DEFAULT: '#567C8D',
            light: '#7299AA',
            dark: '#3F5D6B',
            soft: '#EAF0F3',
          },
          sky: {
            DEFAULT: '#C8D9E6',
            light: '#EBF1F7',
            dark: '#A6BFD3',
          },
          beige: {
            DEFAULT: '#F5EFEB',
            light: '#FAF7F5',
            dark: '#E7DDD7',
            deep: '#D6C7BD',
          },
          white: '#FFFFFF',
        },
        // Mapeo retrocompatible para componentes existentes
        vintage: {
          50: '#F5EFEB',   // Beige base
          100: '#EAE1DB',  // Beige pergamino
          200: '#D8CBC3',  // Beige border
          300: '#C8D9E6',  // Sky Blue border / accents
          400: '#7299AA',  // Teal light
          500: '#567C8D',  // Teal default
          600: '#3F5D6B',  // Teal dark
          700: '#3D546F',  // Navy light
          800: '#2F4156',  // Navy default
          900: '#1E2A38',  // Navy dark
          950: '#151E28',  // Navy deep
        },
        tweed: {
          light: '#E6F0EB',
          DEFAULT: '#3B7A57', // Sage / Emerald green (favorable)
          dark: '#24523A',
        },
        rust: {
          light: '#FCEBEA',
          DEFAULT: '#C0392B', // Terracotta / Crimson red (desfavorable)
          dark: '#851C11',
        },
        denim: {
          light: '#EBF1F7',
          DEFAULT: '#567C8D', // Mapeado a Teal
          dark: '#2F4156',   // Mapeado a Navy
        },
        brass: {
          light: '#EBF1F7',
          DEFAULT: '#567C8D', // Mapeado a Teal elegante
          dark: '#2F4156',   // Mapeado a Navy
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        roura: '0 2px 10px rgba(47, 65, 86, 0.05), 0 1px 3px rgba(47, 65, 86, 0.04)',
        'roura-lg': '0 10px 25px -3px rgba(47, 65, 86, 0.08), 0 4px 6px -2px rgba(47, 65, 86, 0.04)',
        vintage: '0 2px 10px rgba(47, 65, 86, 0.05), 0 1px 3px rgba(47, 65, 86, 0.04)',
        'vintage-lg': '0 10px 25px -3px rgba(47, 65, 86, 0.08), 0 4px 6px -2px rgba(47, 65, 86, 0.04)',
      }
    },
  },
  plugins: [],
};
