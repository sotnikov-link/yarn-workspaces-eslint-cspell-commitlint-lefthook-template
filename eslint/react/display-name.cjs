require('./display-name-init.cjs');

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
const props = {
  files: ['**/*.tsx'],

  plugins: {
    regex: require('eslint-plugin-regex'),
  },

  /**
   * @type {import('eslint').Linter.RulesRecord}
   */
  rules: {
    'regex/invalid-react-display-name': [
      'warn',

      [
        {
          message: 'Use variable name for display name',

          // // Bad example
          // MyComponent.displayName = 'YourComponent'

          // // Good example
          // MyComponent.displayName = 'MyComponent'

          regex: `^((\\w+)\\.displayName = )(?!['"]\\2['"]);?(.*)`,
          replacement: {
            function: `return $[1] + "'" + $[2] + "'"`,
          },
        },
      ],
    ],
  },
};

module.exports = props;
