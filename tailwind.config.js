import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}', './app.vue'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto']
      },
      colors: {
        primary: {
          DEFAULT: colors.purple[900],
          ...colors.purple
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@headlessui/tailwindcss')]
};
