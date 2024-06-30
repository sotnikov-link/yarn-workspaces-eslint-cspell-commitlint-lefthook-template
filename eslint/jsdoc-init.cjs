// @ts-expect-error @types/eslint-plugin-regex doesn't exist
const { addRegexRuleName } = require('eslint-plugin-regex');

/**
 * Separated file with `addRegexRuleName` resolves problem:
 *
 * ```log
 * Error: Cannot read config file: /your-package/packages/eslint-config/prettier/jsdoc.cjs
 * Error: "invalid-jsdoc" already defined as eslint-plugin-regex rule name
 * Referenced from: /your-package/packages/eslint-config/prettier.cjs
 *     at addRegexRuleName (/your-package/node_modules/eslint-plugin-regex/lib/index.js:12:15)
 *     at Object.<anonymous> (/your-package/packages/eslint-config/prettier/jsdoc.cjs:7:1)
 *     at Module._compile (node:internal/modules/cjs/loader:1159:14)
 *     at Module._extensions..js (node:internal/modules/cjs/loader:1213:10)
 *     at Module.load (node:internal/modules/cjs/loader:1037:32)
 *     at Module._load (node:internal/modules/cjs/loader:878:12)
 *     at Module.require (node:internal/modules/cjs/loader:1061:19)
 *     at module.exports [as default] (/your-package/node_modules/import-fresh/index.js:32:59)
 *     at loadJSConfigFile (/your-package/node_modules/@eslint/eslintrc/dist/eslintrc.cjs:2562:47)
 *     at loadConfigFile (/your-package/node_modules/@eslint/eslintrc/dist/eslintrc.cjs:2646:20)
 * ```
 */
addRegexRuleName('invalid-jsdoc');
