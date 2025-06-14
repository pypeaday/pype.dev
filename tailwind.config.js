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
        // --- Base Nord Tones ---
        'nord-polar-night-0': '#2E3440', // nord0 - Deepest background
        'nord-polar-night-1': '#3B4252', // nord1 - Main content background
        'nord-polar-night-2': '#434C5E', // nord2 - Elevated surfaces, borders
        'nord-polar-night-3': '#4C566A', // nord3 - Subtle text, placeholder, subdued comments

        'nord-snow-storm-0': '#D8DEE9',  // nord4 - Main foreground/text
        'nord-snow-storm-1': '#E5E9F0',  // nord5 - Brighter foreground
        'nord-snow-storm-2': '#ECEFF4',  // nord6 - Headings, very bright text

        // --- Nord Frost Accents (Blues/Cyans) ---
        'nord-frost-0': '#8FBCBB',       // nord7 - Cyan/Teal
        'nord-frost-1': '#88C0D0',       // nord8 - Light Blue (Primary Accent)
        'nord-frost-2': '#81A1C1',       // nord9 - Medium Blue
        'nord-frost-3': '#5E81AC',       // nord10 - Dark Blue (Secondary Accent)

        // --- Nord Aurora Accents (Warm & Expressive) ---
        'nord-aurora-red': '#BF616A',    // nord11
        'nord-aurora-orange': '#D08770', // nord12
        'nord-aurora-yellow': '#EBCB8B', // nord13
        'nord-aurora-green': '#A3BE8C',  // nord14
        'nord-aurora-purple': '#B48EAD', // nord15

        // --- Tokyo Night Tones (for specific highlights/elements) ---
        'tokyo-bg-alt': '#24283B',       // Dark blue, good for code blocks or focused areas
        'tokyo-fg': '#c0caf5',           // Main text alternative (brighter than nord-snow-storm-0)
        'tokyo-fg-alt': '#a9b1d6',       // Secondary text, UI text
        'tokyo-comment': '#b4f9f8',      // Bright cyan for comments

        'tokyo-red': '#f7768e',
        'tokyo-orange': '#ff9e64',
        'tokyo-yellow': '#e0af68',
        'tokyo-green': '#9ece6a',
        'tokyo-teal': '#73daca',
        'tokyo-blue': '#7dcfff',
        'tokyo-blue-alt': '#7aa2f7',     // Often for functions
        'tokyo-purple': '#bb9af7',       // Often for keywords

        // --- Mapping to your existing theme names (used by typography plugin) ---
        'primary-dark': '#2E3440',    // nord0 (Nord Polar Night)
        'primary-light': '#3B4252',   // nord1 (Nord Polar Night)
        'text-main': '#D8DEE9',       // nord4 (Nord Snow Storm)
        'text-heading': '#ECEFF4',    // nord6 (Nord Snow Storm)
        'accent-warm': '#D08770',     // nord12 (Nord Aurora Orange)
        'accent-cool': '#88C0D0',     // nord8 (Nord Frost Light Blue)
        'accent-green': '#A3BE8C',    // nord14 (Nord Aurora Green)

        // --- Additional semantic names for the crossover theme (using direct hex for clarity/safety) ---
        'link': '#88C0D0',            // nord8 (Nord Frost Light Blue)
        'link-hover': '#8FBCBB',      // nord7 (Nord Frost Cyan/Teal)
        'keyword': '#bb9af7',         // Tokyo Night Purple
        'function': '#7aa2f7',        // Tokyo Night Blue Alt
        'string': '#A3BE8C',          // nord14 (Nord Aurora Green)
        'comment': '#b4f9f8',         // Tokyo Night Comment (Bright Cyan)
        'variable': '#D8DEE9',        // nord4 (Nord Snow Storm)
        'operator': '#81A1C1',        // nord9 (Nord Frost Medium Blue)
        'error': '#BF616A',           // nord11 (Nord Aurora Red)
        'warning': '#EBCB8B',         // nord13 (Nord Aurora Yellow)
        'info': '#88C0D0',            // nord8 (Nord Frost Light Blue)
        'success': '#A3BE8C',         // nord14 (Nord Aurora Green)
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
              padding: '0.2em 0.4em',
              margin: '0',
              fontSize: '85%',
              backgroundColor: theme('colors.primary-light'),
              borderRadius: '0.3em',
            },
            hr: {
              borderColor: theme('colors.accent-cool'),
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