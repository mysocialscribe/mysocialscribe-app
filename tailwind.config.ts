import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

import svgToDataUri from 'mini-svg-data-uri'
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'color-1': 'hsl(var(--color-1))',
        'color-2': 'hsl(var(--color-2))',
        'color-3': 'hsl(var(--color-3))',
        'color-4': 'hsl(var(--color-4))',
        'color-5': 'hsl(var(--color-5))',
      },
      borderRadius: {},
      animation: {
        rainbow: 'rainbow var(--speed, 2s) infinite linear',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        rainbow: {
          '0%': { 'background-position': '0%' },
          '100%': { 'background-position': '200%' },
        },
      },
    },
    keyframes: {
      spotlight: {
        '0%': {
          opacity: '0',
          transform: 'translate(-72%, -62%) scale(0.5)',
        },
        '100%': {
          opacity: '1',
          transform: 'translate(-50%,-40%) scale(1)',
        },
      },
    },
    plugins: [
      addVariablesForColors,
      function ({ matchUtilities, theme }: any) {
        matchUtilities(
          {
            'bg-dot-thick': (value: any) => ({
              backgroundImage: `url("${svgToDataUri(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
              )}")`,
            }),
          },
          {
            values: flattenColorPalette(theme('backgroundColor')),
            type: 'color',
          }
        )
      },
      tailwindcssAnimate,
    ],
  },
} satisfies Config

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme('colors'))
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ':root': newVars,
  })
}
