const {
  extendLinesBetweenClassMembers,
  extendPaddingLineBetweenStatements,
} = require('./utils.cjs');

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
const javascript = {
  files: ['**/*.{js,cjs,mjs}'],

  plugins: {
    react: require('eslint-plugin-react'),
  },

  /**
   * @type {import('eslint').Linter.RulesRecord}
   */
  rules: {
    'lines-between-class-members': extendLinesBetweenClassMembers(),

    'padding-line-between-statements': extendPaddingLineBetweenStatements(),

    'react/jsx-newline': [
      'warn',
      {
        prevent: true,
        // otherwise Prettier formats different: div*2 and p>div*2 (Emmet)

        // cspell:ignore multilines
        // allowMultilines: true, // will be added next versions
      },
    ],
  },
};

module.exports = javascript;
