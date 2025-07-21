import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        pjGray: 'var(--color-pjGray)',
      },
    },
  },
  plugins: [],
  important: true,
}

export default config
