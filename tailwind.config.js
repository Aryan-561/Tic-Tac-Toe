/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubix: ['Rubik', 'sans-serif'],
        ubuntu:['Ubuntu', 'sans-serif'],
        arimo:['Arimo', 'sans-serif'],
        
      },
      screens:{
        'xs':'400px',
        ...defaultTheme.screens,
      }
    },
  },
  plugins: [],
}

