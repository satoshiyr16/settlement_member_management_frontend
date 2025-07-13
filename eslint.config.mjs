import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      'build/',
      '.next/',
      'node_modules/',
      '*.log',
      '.env',
      '.eslintrc.json',
      'prettier.config.json',
      'next.config.ts',
      'tsconfig.json',
      'tailwind.config.ts',
      '.DS_Store',
      '.git/',
    ],
    rules: {
      'import/order': 'error',
      'no-console': ['error', { allow: ['error'] }],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'react/prop-types': 'off',
      semi: ['error', 'never'],
      'no-extra-semi': 'error',
    },
  },
]

export default eslintConfig
