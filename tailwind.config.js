/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#faf3eb',
        matcha: {
          light: '#c8d5b9',
          DEFAULT: '#b5c4a1',
          dark: '#8a9e78',
          text: '#8fb573',
        },
        strawberry: {
          DEFAULT: '#f2a7b0',
          light: '#f8c8ce',
        },
        warm: {
          gray: '#4a4a4a',
        },
      },
    },
  },
  plugins: [],
}
