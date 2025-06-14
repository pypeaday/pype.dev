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
        // Twilight Cove Palette
        'primary-dark': '#262B34',    // Dark, cool slate gray (Main page background)
        'primary-light': '#343D46',   // Slightly lighter gray (Cards/elements)
        'text-main': '#A7B5C5',       // Soft, light gray (Main body text)
        'text-heading': '#EAE0C8',    // Pale, sandy color (Headings)
        'text-subtle': '#6A7C8E',     // Muted, darker gray (Subtle/secondary text)
        'border-color': '#434E5A',    // Border color slightly lighter than background

        'accent-warm': '#D37C5F',     // Muted, dusky orange (Primary call to action, warm links)
        'accent-cool': '#608A9F',     // Desaturated sea blue (Secondary accent, cool links)
        'accent-green': '#6A8A82',    // Dark, muted seafoam green (Success, positive feedback)
        'accent-red': '#B86A6A',      // Dusky, muted red (Error, danger)
        'accent-yellow': '#EADDAF',   // Soft, pale moonlight yellow (Warnings, highlights)
        'accent-purple': '#8A799C',   // Deep, dusky purple (Special highlights)

        // Code Block Specifics
        'code-background': '#21252B', // Slightly deeper dark gray (Code block background)
        'code-text': '#A7B5C5',       // Soft, light gray (Default code text)
        'code-keyword': '#D37C5F',    // Muted, dusky orange (Keywords)
        'code-function': '#EADDAF',   // Pale moonlight yellow (Function names)
        'code-string': '#6A8A82',     // Muted seafoam green (Strings)
        'code-comment': '#6A7C8E',    // Muted, darker gray (Comments)
        'code-variable': '#608A9F',   // Desaturated sea blue (Variables)
        'code-operator': '#A7B5C5',   // Soft, light gray (Operators)

        // --- Mapping to your existing theme names (used by typography plugin) ---
        'link': '#D37C5F',            // accent-warm (Muted, dusky orange)
        'link-hover': '#EAE0C8',      // text-heading (Pale, sandy color for hover)
        'keyword': '#D37C5F',         // code-keyword
        'function': '#EADDAF',        // code-function
        'string': '#6A8A82',          // code-string
        'comment': '#6A7C8E',         // code-comment
        'variable': '#608A9F',        // code-variable
        'operator': '#A7B5C5',        // code-operator
        'error': '#B86A6A',           // accent-red
        'warning': '#EADDAF',         // accent-yellow
        'info': '#608A9F',            // accent-cool
        'success': '#6A8A82',         // accent-green
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
              color: theme('colors.link'),
              '&:hover': {
                color: theme('colors.link-hover'),
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
              backgroundColor: theme('colors.code-background'),
              color: theme('colors.code-text'),
              padding: theme('padding.4'),
              borderRadius: theme('borderRadius.lg'),
              fontSize: '0.9rem',
              overflowX: 'auto', // Add this for sensible horizontal scrolling if content is still too wide
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            blockquote: {
              color: theme('colors.text-subtle'),
              borderLeftColor: theme('colors.accent-cool'), // Desaturated sea blue for border
              borderLeftWidth: '0.25rem',
              backgroundColor: theme('colors.primary-light'), // Lighter gray for background
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
              // Inline code with Twilight Cove style
              color: theme('colors.accent-green'), // Muted seafoam green for text
              fontWeight: '500',
              padding: '0.2em 0.4em',
              margin: '0',
              fontSize: '85%',
              backgroundColor: theme('colors.primary-light'), // Lighter gray for background
              borderRadius: '0.3em',
            },
            hr: {
              borderColor: theme('colors.border-color'), // Using the defined border-color (Desaturated Aqua/Teal)
              borderTopWidth: '1px',
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.8'),
            },
            ul: {
              listStyleType: 'disc',
              paddingLeft: '1.5rem',
            },
            ol: {
              listStyleType: 'decimal',
              paddingLeft: '1.5rem',
            },
            li: {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
            },
            'li > p': {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
            },
            'li > ul': {
              marginTop: '0.5rem',
            },
            'li > ol': {
              marginTop: '0.5rem',
            },
          },
        },
      }),
    },
  },
};