/**
 * Rule: jsdoc-empty-line-after
 * JSDoc with empty line after
 * Example: / **
 *  Good example
 *  /
 *
 * function example() {}
 */
const checkJsdocEmptyLineAfter = (context, comment) => {
  const sourceCode = context.getSourceCode();
  const nextToken = sourceCode.getTokenAfter(comment);

  if (
    nextToken &&
    nextToken.type !== 'Block' && // don't add lines between comments
    // Check for more than one newline
    nextToken.loc.start.line - comment.loc.end.line > 1
  ) {
    context.report({
      node: comment,
      message: 'JSDoc without empty line after',
      fix(fixer) {
        // Replace the range between the comment and the next token with a single newline
        return fixer.replaceTextRange(
          [comment.range[1], nextToken.range[0]],
          '\n',
        );
      },
    });
  }
};

module.exports = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'JSDoc with empty line after',
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
            checkJsdocEmptyLineAfter(context, comment);
          }
        }
      },
    };
  },
};
