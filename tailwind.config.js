/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e40876',
      },
      screens: {
        xxl: '1997px', // Custom breakpoint for extra-extra-large screens
      },
      spacing: {
        '56rem': '56rem', // Add spacing for 29rem if not available
      },
    },
  },
  plugins: [],
};