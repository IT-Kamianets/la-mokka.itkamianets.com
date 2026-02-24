/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#C8A96E',
        'dark-bg': '#0a0a0a',
        'card-bg': '#161616',
        'text-main': '#f0ece4',
      },
      fontFamily: {
        sans: ['Oxygen', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'ultra': '0.35em',
        'widest': '0.2em',
      },
    },
  },
  plugins: [],
};
