const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./helpers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          100: "#deffcc",
          200: "#bdff99",
          300: "#9cff66",
          400: "#7bff33",
          500: "#5aff00",
          600: "#48cc00",
          700: "#369900",
          800: "#246600",
          900: "#123300"
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
