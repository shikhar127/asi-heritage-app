/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        saffron: { 50: '#fff8ed', 100: '#ffefd4', 200: '#ffd9a8', 300: '#ffbb70', 400: '#ff8c38', 500: '#f96d1a', 600: '#ea5210', 700: '#c23c0f', 800: '#9a3014', 900: '#7c2a13' },
        heritage: { 50: '#f5f3ef', 100: '#e8e2d8', 200: '#d4c7b0', 300: '#baa480', 400: '#a48660', 500: '#8f6f4a', 600: '#74593d', 700: '#5c4532', 800: '#4a382b', 900: '#3e3026' },
      },
      fontFamily: { serif: ['Georgia', 'Cambria', 'serif'] },
    },
  },
  plugins: [],
}

