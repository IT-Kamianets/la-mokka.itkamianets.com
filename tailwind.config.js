/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#FFA11B',
        'dark-bg': '#232323',
        'card-bg': '#2d2d2d',
        'text-main': '#d6d6d6',
      },
      fontFamily: {
        sans: ['Oxygen', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
