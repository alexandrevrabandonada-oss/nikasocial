// @ts-check
/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  {
    ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/.turbo/**'],
  },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off', // TypeScript handles this
    },
  },
]

export default config
