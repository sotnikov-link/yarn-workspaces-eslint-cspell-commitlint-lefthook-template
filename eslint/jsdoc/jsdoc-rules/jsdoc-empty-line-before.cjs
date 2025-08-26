/**
 * Rule: jsdoc-empty-line-before
 * JSDoc with empty line before
 * Example: const previous = 'variable';
 * / **
 *  Good example
 *  /
 */
const checkJsdocEmptyLineBefore = (context, comment) => {
  const sourceCode = context.getSourceCode();
  const previousToken = sourceCode.getTokenBefore(comment);

  if (
    previousToken && // Check for a single newline, which means no empty line
    comment.loc.start.line - previousToken.loc.end.line === 1
  ) {
    context.report({
      node: comment,
      message: 'JSDoc with empty line before',
      fix: (fixer) => fixer.insertTextBefore(comment, '\n'),
    });
  }
};

module.exports = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'JSDoc with empty line before',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
  },
  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      Program() {
        const comments = sourceCode.getAllComments();

        for (const comment of comments) {
          if (comment.type === 'Block' && comment.value.startsWith('*')) {
            // This is a JSDoc comment
            checkJsdocEmptyLineBefore(context, comment);
          }
        }
      },
    };
  },
};
