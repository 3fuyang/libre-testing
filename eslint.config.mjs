// @ts-check
import react from '@eslint-react/eslint-plugin'
import pluginJs from '@eslint/js'
import * as tsParser from '@typescript-eslint/parser'
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
      'src/components/ui',
    ],
  },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  pluginJs.configs.recommended,
  tseslint.configs.eslintRecommended,
  ...tailwind.configs['flat/recommended'],
  {
    plugins: {
      // @ts-expect-error
      'react-hooks': hooksPlugin,
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
