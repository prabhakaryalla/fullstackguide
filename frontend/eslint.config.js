import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactPlugin from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'build', 'coverage', 'node_modules', '**/*.min.js', '.env*'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.strict],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      react: reactPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
)
