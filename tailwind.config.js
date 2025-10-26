/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#ff8901",
        secondary: "#fb923c",
        text_primary:"#090909",
        text_secondary: "#171717",
        'puma-red': '#E41E26',
        'adidas-blue': '#0066CC',
        'nike-orange': '#FF6B00',
        'reebok-red': '#E41E26',
        'ua-purple': '#5D0FBA',
        'chanel-black': '#000000',
        customPurple: '#800080',

      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-5px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

