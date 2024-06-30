// @ts-expect-error @types/eslint-plugin-regex doesn't exist
const { addRegexRuleName } = require('eslint-plugin-regex');

/**
 * Separated file with `addRegexRuleName` resolves problem in VS Code Extension
 * Eslint: `Error: "invalid-react-props-type" already defined
 * as eslint-plugin-regex rule name`
 */
addRegexRuleName('invalid-react-props-type');
