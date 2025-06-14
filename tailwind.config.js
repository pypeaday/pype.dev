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
        // Gruvbox Dark Inspired Palette
        'primary-dark': '#282828',    // Gruvbox main background (bg)
        'primary-light': '#3c3836',   // Gruvbox slightly lighter background (bg1)
        'text-main': '#ebdbb2',       // Gruvbox main foreground (fg)
        'text-heading': '#fabd2f',    // Gruvbox bright yellow (for headings)
        'text-subtle': '#a89984',     // Gruvbox lighter grey (derived for subtle text)
        'border-color': '#504945',    // Gruvbox medium grey (bg2, for borders)

        'accent-warm': '#d65d0e',     // Gruvbox orange (Primary Call to Action, Warm Links)
        'accent-cool': '#458588',     // Gruvbox blue (Secondary Accent, Cool Links)
        'accent-green': '#98971a',    // Gruvbox green (Success, Positive Feedback)
        'accent-red': '#cc241d',      // Gruvbox red (Error, Danger)
        'accent-yellow': '#d79921',   // Gruvbox yellow (Warnings, Highlights)
        'accent-purple': '#b16286',   // Gruvbox purple (Special Highlights)

        // Code Block Specifics (Gruvbox syntax)
        'code-background': '#282828', // Gruvbox main background (bg)
        'code-text': '#ebdbb2',       // Gruvbox main foreground (fg)
        'code-keyword': '#fb4934',    // Gruvbox bright red
        'code-function': '#fabd2f',   // Gruvbox bright yellow
        'code-string': '#b8bb26',     // Gruvbox bright green
        'code-comment': '#928374',    // Gruvbox grey (comments)
        'code-variable': '#83a598',   // Gruvbox bright blue/aqua (variables)
        'code-operator': '#fe8019',   // Gruvbox bright orange (operators)

        // --- Mapping to your existing theme names (used by typography plugin) ---
        'link': '#d65d0e',            // Gruvbox orange (accent-warm)
        'link-hover': '#fe8019',      // Gruvbox bright orange (for hover)
        'keyword': '#fb4934',         // code-keyword
        'function': '#fabd2f',        // code-function
        'string': '#b8bb26',          // code-string
        'comment': '#928374',         // code-comment
        'variable': '#83a598',        // code-variable
        'operator': '#fe8019',        // code-operator
        'error': '#cc241d',           // Gruvbox red (accent-red)
        'warning': '#d79921',         // Gruvbox yellow (accent-yellow)
        'info': '#458588',            // Gruvbox blue (accent-cool)
        'success': '#98971a',         // Gruvbox green (accent-green)
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
              borderLeftColor: theme('colors.accent-cool'), // Gruvbox blue for border
              borderLeftWidth: '0.25rem',
              backgroundColor: theme('colors.primary-light'), // Gruvbox bg1 for background
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
              // Inline code with Gruvbox style
              color: theme('colors.accent-green'), // Gruvbox green for text
              fontWeight: '500',
              padding: '0.2em 0.4em',
              margin: '0',
              fontSize: '85%',
              backgroundColor: theme('colors.primary-light'), // Gruvbox bg1 for background
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