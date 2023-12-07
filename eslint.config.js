const eslintConfig = require('@antfu/eslint-config').default

module.exports = eslintConfig(
  {
    ignores: ['**/vite.config.ts'],
  },
  {
    rules: {
      'node/prefer-global/process': 0,
      'no-console': 0,
      'curly': [2, 'multi-line'],
      'style/brace-style': [2, '1tbs', { allowSingleLine: true }],
      'style/max-statements-per-line': [2, { max: 2 }],
    },
  },
)
