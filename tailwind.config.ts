import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        pjGray: 'var(--color-pjGray)',
        pjYellow: 'var(--color-pjYellow)',
        pjOrange: 'var(--color-pjOrange)',
        pjSoftGray: 'var(--color-pjSoftGray)',
        pjSoftYellow: 'var(--color-pjSoftYellow)',
        pjSoftBlue: 'var(--color-pjSoftBlue)',
        pjSoftGreen: 'var(--color-pjSoftGreen)',
      },
    },
  },
  plugins: [],
  important: true,
}

export default config
