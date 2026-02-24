/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#C8A96E',
        'dark-bg': '#111111',
        'card-bg': '#1a1a1a',
        'text-main': '#f0ece4',
      },
      fontFamily: {
        sans: ['Oxygen', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
