import 'eslint-plugin-only-warn';
import cspell from '@cspell/eslint-plugin/recommended';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import auto from 'eslint-config-canonical/configurations/auto.js';
import { recommended as canonical } from 'eslint-config-canonical/configurations/canonical.js';
import { recommended as json } from 'eslint-config-canonical/configurations/json.js';
import { recommended as node } from 'eslint-config-canonical/configurations/node.js';
import { recommended as prettier } from 'eslint-config-canonical/configurations/prettier.js';
import { recommended as react } from 'eslint-config-canonical/configurations/react.js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tsLint from 'typescript-eslint';
import { cspellOptions } from './eslint/cspell-options.js';
import emptyLinesJs from './eslint/empty-lines/javascript.cjs';
import emptyLinesTs from './eslint/empty-lines/typescript.cjs';
import formatJsdoc from './eslint/jsdoc.cjs';
import reactDisplayName from './eslint/react/display-name.cjs';
import reactProps from './eslint/react/props.cjs';

// eslint-disable-next-line import/no-default-export
export default tsLint.config(
  ...auto,
  emptyLinesJs,
  emptyLinesTs,
  formatJsdoc,
  reactProps,
  reactDisplayName,
  eslintPluginPrettierRecommended,

  {
    ...cspell,
    rules: {
      ...cspell.rules,
      '@cspell/spellchecker': ['warn', cspellOptions],
    },
  },

  {
    ...prettier,
    // files: [...prettier.files, '**/*.json'],
    rules: {
      'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
    },
  },

  {
    ...node,
    rules: {
      'import/no-default-export': 'warn',
    },
  },

  {
    ...canonical,
    rules: {
      'canonical/sort-keys': 'off',
      'unicorn/filename-case': 'warn',
      // 'canonical/filename-match-exported': ['warn', { transforms: 'kebab' }],
      'canonical/filename-match-exported': [0],
    },
  },

  {
    ...json,
    rules: {
      'jsonc/sort-keys': 'off',
      'jsonc/object-curly-spacing': 'off',
    },
  },

  {
    plugins: {
      'unused-imports': unusedImports,
      '@typescript-eslint': tsPlugin,
    },

    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },

  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          // The default grouping, but with no blank lines.
          // https://github.com/lydell/eslint-plugin-simple-import-sort/blob/24befb6cd5d7701a87eb2b655e3f0de8115441b9/examples/.eslintrc.js#L99
          groups: [['^\\u0000', '^node:', '^@?\\w', '^', '^\\.']],
        },
      ],
    },
  },

  {
    ...react,
    plugins: {
      ...react.plugins,
      'react-refresh': reactRefresh,
    },

    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'react/display-name': 'warn', // for easy debugging
      'react/jsx-sort-props': 'off',
      'react/jsx-sort-default-props': 'off',
      'react/sort-default-props': 'off',
      'react/jsx-handler-names': 'off',
      'react/forbid-component-props': 'off',
    },
  },

  {
    ignores: ['.yarn/**', 'yarn.lock', 'node_modules/**'],
  },
);
