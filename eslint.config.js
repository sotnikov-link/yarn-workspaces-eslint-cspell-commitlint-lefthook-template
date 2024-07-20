import antfu from '@antfu/eslint-config';
// @ts-expect-error 7016
import auto from 'eslint-config-canonical/configurations/auto.js';
// import {recommended as jsdoc} from 'eslint-config-canonical/configurations/jsdoc.js'

// MIX ANTFU WITH CANONICAL

export default (async () => {
  const antfuConfig = await antfu({
    formatters: false,
    stylistic: false,
  });

  return [
    {
      ignores: [
        '.yarn/**',
        'yarn.lock',
        '**/node_modules/**',
        'packages/*/dist/**',
      ],
    },
    ...auto,
    ...antfuConfig,
    {
      rules: {
        'canonical/no-import-namespace-destructure': 'off',
      },
    },
  ];
})();

// // REMAP PLUGINS FROM ANTFU TO CANONICAL

// const autoPlugins = new Set(['@babel', 'canonical', 'promise', 'simple-import-sort']);

// export default antfu(
//   {
//     formatters: true,
//     ignores: [
//       '.yarn/**',
//       'yarn.lock',
//       '**/node_modules/**',
//       'packages/*/dist/**',
//     ],
//     react: true,
//     rules: {
//       'antfu/top-level-function': 'off',
//       'jsonc/sort-keys': 'off',
//     },
//     stylistic: {
//       overrides: {
//         'style/arrow-parens': ['warn', 'always'],
//         'style/quote-props': 'off',
//         // 'jsonc/sort-keys': 'off',
//       },
//       semi: true,
//     },
//   },
//   {
//     files: ['**/*.md'],
//     rules: {
//       'no-irregular-whitespace': 'off',
//     },
//   },
// ).append({
//   plugins: auto.reduce(
//     // @ts-expect-error 7060
//     (acc, config) => {
//       const pluginEntries = Object.entries(config.plugins);

//       let result = {};

//       for (const [pluginKey, value] of pluginEntries) {
//         if (autoPlugins.has(pluginKey)) {
//           // @ts-expect-error
//           result[pluginKey] = value
//         }
//       }

//       return ({ ...acc, ...result });
//     }, {}),

//   rules: auto.reduce(
//     // @ts-expect-error 7060
//     (acc, config) => ({ ...acc, ...config.rules }), {}),
// }, {
//   rules: {
//     'canonical/no-import-namespace-destructure': 'off',
//   },
// });

// // ONLY CANONICAL

// export default [
//   {
//     ignores: [
//       '.yarn/**',
//       'yarn.lock',
//       '**/node_modules/**',
//       'packages/*/dist/**',
//     ],
//   },
//   ...auto,
//   {
//     rules: {
//       'canonical/no-import-namespace-destructure': 'off',
//     },
//   },
// ];

// // ONLY ANTFU

// export default antfu(
//   {
//     formatters: true,
//     ignores: [
//       '.yarn/**',
//       'yarn.lock',
//       '**/node_modules/**',
//       'packages/*/dist/**',
//     ],
//     react: true,
//     rules: {
//       'antfu/top-level-function': 'off',
//       'jsonc/sort-keys': 'off',
//     },
//     stylistic: {
//       overrides: {
//         'style/arrow-parens': ['warn', 'always'],
//         'style/quote-props': 'off',
//         // 'jsonc/sort-keys': 'off',
//       },
//       semi: true,
//     },
//   },
//   {
//     files: ['**/*.md'],
//     rules: {
//       'no-irregular-whitespace': 'off',
//     },
//   },
// );
