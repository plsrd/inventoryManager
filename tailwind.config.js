module.exports = {
  content: ['./views/*.pug'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#b197ef',

          secondary: '#1d2682',

          accent: '#52d3a0',

          neutral: '#222B3F',

          'base-100': '#E6E4E7',

          info: '#72D9F8',

          success: '#18C988',

          warning: '#fbbf24',

          error: '#FA0511',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
