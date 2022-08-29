const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        tardis: '#000097',
        error: colors.red['500'],
        header: colors.sky['700'],
      },
    },
  },
  safelist: ['greenbtn', 'bluebtn', 'redbtn', 'yellowbtn'],
  plugins: [require('@tailwindcss/forms')],
};
