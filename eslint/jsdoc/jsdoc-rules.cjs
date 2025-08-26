/**
 * JSDoc Rules Collection
 * Replaces regex/invalid-jsdoc functionality with separate rules
 */

const jsdocMultiline = require('./jsdoc-rules/jsdoc-multiline.cjs');
const jsdocEmptyLineBefore = require('./jsdoc-rules/jsdoc-empty-line-before.cjs');
const jsdocNoEmptyStart = require('./jsdoc-rules/jsdoc-no-empty-start.cjs');
const jsdocSpaceAfterAsterisk = require('./jsdoc-rules/jsdoc-space-after-asterisk.cjs');
const jsdocMultipleEmptyLines = require('./jsdoc-rules/jsdoc-multiple-empty-lines.cjs');
const jsdocEmptyLineAfter = require('./jsdoc-rules/jsdoc-empty-line-after.cjs');
const jsdocNoEmptyEnd = require('./jsdoc-rules/jsdoc-no-empty-end.cjs');

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
const jsdocRules = {
  files: ['**/*.js'],
  plugins: {
    custom: {
      rules: {
        'jsdoc-multiline': jsdocMultiline,
        'jsdoc-empty-line-before': jsdocEmptyLineBefore,
        'jsdoc-no-empty-start': jsdocNoEmptyStart,
        'jsdoc-space-after-asterisk': jsdocSpaceAfterAsterisk,
        'jsdoc-multiple-empty-lines': jsdocMultipleEmptyLines,
        'jsdoc-empty-line-after': jsdocEmptyLineAfter,
        'jsdoc-no-empty-end': jsdocNoEmptyEnd,
      },
    },
  },
  rules: {
    'custom/jsdoc-multiline': 'warn',
    'custom/jsdoc-empty-line-before': 'warn',
    'custom/jsdoc-no-empty-start': 'warn',
    'custom/jsdoc-space-after-asterisk': 'warn',
    'custom/jsdoc-multiple-empty-lines': 'warn',
    'custom/jsdoc-empty-line-after': 'warn',
    'custom/jsdoc-no-empty-end': 'warn',
  },
};

module.exports = jsdocRules;
