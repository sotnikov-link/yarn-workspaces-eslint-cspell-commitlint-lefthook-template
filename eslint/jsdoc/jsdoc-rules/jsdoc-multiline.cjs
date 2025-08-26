/**
 * Rule: jsdoc-multiline
 * JSDoc should be multi-line (not single-line)
 * Example: / ** Bad example * /
 */
const checkJsdocMultiline = (context, comment) => {
  const sourceCode = context.getSourceCode();
  const text = sourceCode.getText(comment);

  // if the comment is a single line, it's a candidate for being reformatted.
  if (!text.includes('\n')) {
    context.report({
      node: comment,
      message: 'JSDoc is always a block comment',
      fix(fixer) {
        // Extract content between /** and */
        const content = text.slice(3, -2).trim();
        // Reconstruct as a multi-line block comment
        const newText = `/**\n * ${content}\n */`;

        return fixer.replaceText(comment, newText);
      },
    });
  }
};

module.exports = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'JSDoc should be multi-line (not single-line)',
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
            checkJsdocMultiline(context, comment);
          }
        }
      },
    };
  },
};
