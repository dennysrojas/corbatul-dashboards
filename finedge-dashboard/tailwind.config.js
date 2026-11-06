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
        // User requested palette: #eeaeb4, #3f6078, #c2cac4, #d17279
        blush: {
          light: '#fdf4f5',
          100: '#fbe7e9',
          200: '#f8d2d6',
          300: '#f2bdc2',
          DEFAULT: '#eeaeb4', // Primary blush
          dark: '#dc9299',
          600: '#c5787f',
        },
        slate: {
          steel: '#3f6078',     // Deep slate steel blue (contrast & structure)
          'steel-light': '#edf3f7',
          'steel-100': '#dce5ec',
          'steel-200': '#bccddb',
          'steel-300': '#96afc4',
          'steel-400': '#688ca8',
          'steel-dark': '#2d4658',
          'steel-900': '#1b2c38',
        },
        mineral: {
          50: '#fafbfa',
          100: '#f3f5f3',
          200: '#e5e9e6',
          DEFAULT: '#c2cac4',   // Mineral mist / sage ash (borders, pills)
          400: '#a3ada6',
          500: '#7e8a82',
          600: '#5c6760',
        },
        rosewood: {
          light: '#faeaeb',
          100: '#f5d6d8',
          200: '#ecb1b5',
          300: '#e18e94',
          DEFAULT: '#d17279',   // Terracotta rosewood (primary metric & accents)
          dark: '#b9575e',
          800: '#8e3a40',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ],
        mono: [
          '"JetBrains Mono"',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace'
        ],
      },
      boxShadow: {
        minimal: '0 1px 3px 0 rgba(63, 96, 120, 0.04), 0 1px 2px -1px rgba(63, 96, 120, 0.02)',
        'minimal-md': '0 4px 14px -2px rgba(63, 96, 120, 0.06), 0 2px 6px -2px rgba(63, 96, 120, 0.04)',
        'minimal-lg': '0 10px 25px -4px rgba(63, 96, 120, 0.08), 0 4px 10px -3px rgba(63, 96, 120, 0.04)',
      }
    },
  },
  plugins: [],
};
