/**
 * Rule: jsdoc-no-empty-start
 * JSDoc starts without empty line
 * Example: / **
 *
 *  Bad example
 *  /
 */
const normalize = (/** @type {string} */ line) =>
  line.replace(/^\s*\*\s?/u, '').trim();

const checkJsdocNoEmptyStart = (
  /** @type {import('eslint').Rule.RuleContext} */ context,
  /** @type {any} */ comment,
) => {
  const lines = comment.value.split('\n');
  const contentLines = lines.slice(1, -1);

  let firstContentIndex = 0;

  while (
    firstContentIndex < contentLines.length &&
    normalize(contentLines[firstContentIndex]) === ''
  ) {
    firstContentIndex++;
  }

  if (firstContentIndex > 0) {
    context.report({
      node: comment,
      message: 'JSDoc starts without empty line',
      fix(/** @type {import('eslint').Rule.RuleFixer} */ fixer) {
        // Find start range of the first empty line content
        const startOffset = lines.slice(0, 1).join('\n').length + 1; // After /**\n
        const start = comment.range[0] + 3 + startOffset;

        // Find end range of the last empty line content
        const endOffset = lines
          .slice(0, firstContentIndex + 1)
          .join('\n').length;

        const end = comment.range[0] + 3 + endOffset;

        return fixer.removeRange([start, end]);
      },
    });
  }
};

module.exports = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'JSDoc starts without empty line',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
  },
  create(/** @type {import('eslint').Rule.RuleContext} */ context) {
    const sourceCode = context.getSourceCode();

    return {
      Program() {
        const comments = sourceCode.getAllComments();

        for (const comment of comments) {
          if (comment.type === 'Block' && comment.value.startsWith('*')) {
            // This is a JSDoc comment
            checkJsdocNoEmptyStart(context, comment);
          }
        }
      },
    };
  },
};
