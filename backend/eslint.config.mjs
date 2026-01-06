import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Your custom ESLint configuration
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['.node_modules/*', '.dist/*'],
    languageOptions: {
      globals: {
        ...globals.browser,
        process: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
  },

  // ESLint recommended configs
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // Prettier recommended configuration
  eslintPluginPrettierRecommended,
]
