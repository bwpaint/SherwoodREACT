const path = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(__dirname, 'src/**/*.{ts,tsx,mdx}'),
  ],
  theme: {
    extend: {
      colors: {
        gallery: {
          teal: '#1AAFB0',
          'teal-dark': '#0E8B8B',
          'teal-deep': '#0A6B6B',
          ivory: '#FDF6EC',
          'ivory-warm': '#F5EDD8',
          'ivory-input': '#FAF7F2',
          gold: '#C9A84C',
          'gold-dark': '#A8893C',
          'gold-light': '#E8C97A',
          espresso: '#2C1810',
          brown: '#3D2B1A',
          'brown-mid': '#5A3E2B',
          'brown-light': '#7A5C44',
          cream: '#FDF6EC',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        editorial: ['var(--font-editorial)', 'Georgia', 'serif'],
      },
      transitionTimingFunction: {
        'gallery-out': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
}
