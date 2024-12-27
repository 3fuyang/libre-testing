// @ts-check
import react from '@eslint-react/eslint-plugin'
import pluginJs from '@eslint/js'
import pluginRouter from '@tanstack/eslint-plugin-router'
import * as tsParser from '@typescript-eslint/parser'
import reactCompiler from 'eslint-plugin-react-compiler'
import hooksPlugin from 'eslint-plugin-react-hooks'
import tailwind from 'eslint-plugin-tailwindcss'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      'node_modules',
      'dist',
      'public',
      '.prettierrc.mjs',
      'app/components/ui',
      'app/hooks/use-toast.ts',
    ],
  },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  ...tailwind.configs['flat/recommended'],
  {
    plugins: {
      // @ts-expect-error Hooks plugin is not typed
      'react-hooks': hooksPlugin,
    },
  },
  {
    plugins: {
      'react-compiler': reactCompiler,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
    },
  },
  {
    plugins: {
      '@tanstack/router': pluginRouter,
    },
    rules: {
      '@tanstack/router/create-route-property-order': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...react.configs.recommended,
    languageOptions: {
      parser: tsParser,
    },
  },
)
