import antfu from '@antfu/eslint-config';

export default antfu({
  formatters: true,
  react: true,
  stylistic: {
    semi: true,
    overrides: {
      'style/arrow-parens': ['warn', 'always'],
      'style/quote-props': 'off',
      // 'jsonc/sort-keys': 'off',
    },
  },
  rules: {
    'jsonc/sort-keys': 'off',
    'antfu/top-level-function': 'off',
  },
}, { files: ['**/*.md'], rules: {
  'no-irregular-whitespace': 'off',
} });
