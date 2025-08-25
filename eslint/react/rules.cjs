const displayNameRule = require('./react-display-name.cjs');
const reactPropsRule = require('./react-props-interface.cjs');

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
const displayNameCustom = {
  files: ['**/*.tsx'],
  plugins: {
    custom: {
      rules: {
        'react-display-name': displayNameRule,
        'react-props-interface': reactPropsRule,
      },
    },
  },
  rules: {
    'custom/react-display-name': 'warn',
    'custom/react-props-interface': 'warn',
  },
};

module.exports = displayNameCustom;
