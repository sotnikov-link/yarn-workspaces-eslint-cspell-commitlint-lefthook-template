const displayNameRule = require('../rules/display-name-match.cjs');

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
const displayNameCustom = {
  files: ['**/*.tsx'],
  plugins: {
    custom: {
      rules: {
        'react-display-name': displayNameRule,
      },
    },
  },
  rules: {
    'custom/react-display-name': 'warn',
  },
};

module.exports = displayNameCustom;
