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
            pre: {
              backgroundColor: theme('colors.primary-dark'),
              color: theme('colors.text-main'),
              padding: theme('padding.4'),
              borderRadius: theme('borderRadius.lg'),
              width: '80%',
              marginLeft: 'auto',
              marginRight: 'auto',
              fontSize: '0.9rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
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
            img: {
              borderRadius: theme('borderRadius.lg'),
              boxShadow: theme('boxShadow.lgc'),
              borderWidth: '2px',
              borderColor: theme('colors.white'),
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.6'),
            },
            code: { 
              color: theme('colors.accent-warm'),
              fontWeight: '500',
            },
          }
        },
        invert: {
          css: {
            // Add any specific dark mode overrides for typography elements here if needed.
            // For example, if default prose-invert link colors are not suitable:
            // a: {
            //   color: theme('colors.accent-cool'),
            //   '&:hover': {
            //     color: theme('colors.accent-green'),
            //   },
            // },
            img: {
              borderColor: theme('colors.gray.600'),
            },
            // If inline code needs specific dark mode styling, add it here:
            // code: {
            //   color: theme('colors.someOtherColorForDarkCode'),
            // },
          },
        },
      }),
    },
  },
};