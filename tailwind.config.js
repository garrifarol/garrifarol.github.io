/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'pri-color': 'var(--pri-color)',
        'sec-color': 'var(--sec-color)',
        'ter-color': 'var(--ter-color)',
        'qua-color': 'var(--qua-color)'
      }
    },
  },
  plugins: [],
}

