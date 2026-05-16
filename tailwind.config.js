/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1c3a5e',
          deep: '#0f2942',
        },
        cardinal: '#8C1515',
        sky: {
          light: '#d4e9f0',
        },
        cream: '#fbfaf6',
      },
    },
  },
  plugins: [],
};
