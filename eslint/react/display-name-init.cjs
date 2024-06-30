// @ts-expect-error @types/eslint-plugin-regex doesn't exist
const { addRegexRuleName } = require('eslint-plugin-regex');

/**
 * Separated file with `addRegexRuleName` resolves problem in VS Code Extension
 * Eslint: `Error: "invalid-react-display-name" already defined
 * as eslint-plugin-regex rule name`
 */
addRegexRuleName('invalid-react-display-name');
