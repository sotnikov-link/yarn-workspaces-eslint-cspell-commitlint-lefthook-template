/**
 * @type {import('prettier').Config}
 */
module.exports = {
  singleQuote: true,
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'always',
      },
    },
  ],
};
