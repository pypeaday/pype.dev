/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "templates/**/*.html",
    "markout/**/index.html",
    "static/index.html",
  ],
  safelist: [
  ],
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0D1B2A',
        'primary-light': '#1B263B',
        'text-main': '#C0C5CE',
        'text-heading': '#FFFFFF',
        'accent-warm': '#FFD6A5',
        'accent-cool': '#89C2D9',
        'accent-green': '#64FFDA',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      saturate: {
        25: ".25",
        75: ".75",
      },
      screens: {
        print: { raw: "print" },
      },
      width: {
        128: "32rem",
      },
      boxShadow: {
        xlc: "0 0 60px 15px rgba(0, 0, 0, 0.3)",
        lgc: "0 0 20px 0px rgba(0, 0, 0, 0.3)",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text-main'),
            a: {
              color: theme('colors.accent-green'),
              '&:hover': {
                color: theme('colors.accent-cool'),
              },
            },
            h1: {
              color: theme('colors.text-heading'),
            },
            h2: {
              color: theme('colors.text-heading'),
            },
            h3: {
              color: theme('colors.text-heading'),
            },
            h4: {
              color: theme('colors.text-heading'),
            },
            blockquote: {
              color: theme('colors.text-main'),
              borderLeftColor: theme('colors.accent-warm'),
              borderLeftWidth: '0.25rem',
              backgroundColor: theme('colors.primary-dark'),
              paddingTop: theme('spacing.2'),
              paddingBottom: theme('spacing.2'),
              paddingLeft: theme('spacing.4'),
              paddingRight: theme('spacing.4'),
              fontStyle: 'italic',
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.6'),
            },
            pre: {
              backgroundColor: theme('colors.primary-dark'),
              color: theme('colors.text-main'),
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              color: theme('colors.accent-warm'),
              fontWeight: '500',
            }
          },
        },
      }),
    },
  },
};