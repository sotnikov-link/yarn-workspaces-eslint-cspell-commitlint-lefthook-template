const {
  extendLinesBetweenClassMembers,
  extendPaddingLineBetweenStatements,
} = require('./utils.cjs');

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
const typescript = {
  // extends: [require.resolve('./javascript.cjs')],

  files: ['**/*.{ts,tsx}'],

  plugins: {
    '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
  },

  rules: {
    // https://typescript-eslint.io/rules/lines-between-class-members/
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members':
      extendLinesBetweenClassMembers({
        exceptAfterOverload: true,
      }),

    // https://typescript-eslint.io/rules/padding-line-between-statements
    'padding-line-between-statements': 'off',
    '@typescript-eslint/padding-line-between-statements':
      extendPaddingLineBetweenStatements([
        // Always Before
        {
          blankLine: 'always',
          prev: '*',
          next: ['type', 'interface'],
        },

        // Always After
        {
          blankLine: 'always',
          prev: ['type', 'interface'],
          next: '*',
        },

        // https://github.com/gajus/eslint-config-canonical/blob/9553ce3c70d0ca51758af6b764f9f38932c1db7b/configurations/typescript-compatibility.js#L86
        {
          blankLine: 'always',
          next: '*',
          prev: 'multiline-block-like',
        },
      ]),
  },
};

module.exports = typescript;
