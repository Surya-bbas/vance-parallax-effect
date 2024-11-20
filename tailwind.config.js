/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vanceGreen': '#81EBAB',
        'vanceGray': '#111111',
        'vancePurple': '#7C5BDA',
        'vanceComponent': '#222222',

      },
    },
  },
  plugins: [],
}

