/**
 * lines-between-class-members
 * @see https://eslint.org/docs/latest/rules/lines-between-class-members
 */
const extendLinesBetweenClassMembers = (options = {}) => {
  /**
   * @type {import('eslint').Linter.RuleEntry}
   */
  const linesBetweenClassMembers = ['warn', 'always', options];

  return linesBetweenClassMembers;
};

/**
 * padding-line-between-statements
 * @see https://eslint.org/docs/latest/rules/padding-line-between-statements
 */
const extendPaddingLineBetweenStatements = (
  /**
   * @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e2b9da8fb35c15e466701a91d6757d49a229decf/types/eslint/rules/stylistic-issues.d.ts#L1566
   * @type {Array<{ blankLine: "any" | "never" | "always"; } & Record<"prev" | "next", string | string[]>>}
   */
  options = [],
) => {
  /**
   * @type {import('eslint').Linter.RuleEntry}
   */
  const paddingLineBetweenStatements = [
    'warn',

    // Separated Import Group
    { blankLine: 'always', prev: '*', next: 'import' },
    { blankLine: 'always', prev: 'import', next: '*' },
    { blankLine: 'never', prev: 'import', next: 'import' },

    // Separated Export Group
    { blankLine: 'always', prev: '*', next: 'export' },
    { blankLine: 'always', prev: 'export', next: '*' },
    { blankLine: 'any', prev: 'export', next: 'export' },

    // Separated Singleline Variable Group
    { blankLine: 'always', prev: '*', next: 'singleline-var' },
    { blankLine: 'always', prev: 'singleline-var', next: '*' },
    { blankLine: 'any', prev: 'singleline-var', next: 'singleline-var' },
    { blankLine: 'always', prev: '*', next: 'singleline-let' },
    { blankLine: 'always', prev: 'singleline-let', next: '*' },
    { blankLine: 'any', prev: 'singleline-let', next: 'singleline-let' },
    { blankLine: 'always', prev: '*', next: 'singleline-const' },
    { blankLine: 'always', prev: 'singleline-const', next: '*' },
    { blankLine: 'any', prev: 'singleline-const', next: 'singleline-const' },

    // Always Before
    {
      blankLine: 'always',
      prev: '*',
      next: [
        'break',
        'throw',
        'return',
        'directive',
        'multiline-expression',
        // 'multiline-block-like', // enough block-like?

        // equals to 'try', 'class', 'switch', 'function'
        'block-like',

        // switch-case
        'case',
        'default',

        // multiline variable group
        'multiline-var',
        'multiline-let',
        'multiline-const',
      ],
    },

    // Always After
    {
      blankLine: 'always',
      prev: [
        'directive',
        'block-like',
        'multiline-var',
        'multiline-let',
        'multiline-const',
        'multiline-expression',
        // 'multiline-block-like', // enough block-like?
      ],
      next: '*',
    },

    ...options,
  ];

  return paddingLineBetweenStatements;
};

module.exports = {
  extendLinesBetweenClassMembers,
  extendPaddingLineBetweenStatements,
};
