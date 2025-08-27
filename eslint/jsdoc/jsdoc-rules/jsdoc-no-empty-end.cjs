/**
 * Rule: jsdoc-no-empty-end
 * JSDoc ends without empty line
 * Example: / **
 *  Good example
 *
 *  /
 */
const normalize = (/** @type {string} */ line) =>
  line.replace(/^\s*\*\s?/u, '').trim();

const checkJsdocNoEmptyEnd = (
  /** @type {import('eslint').Rule.RuleContext} */ context,
  /** @type {any} */ comment,
) => {
  const lines = comment.value.split('\n');
  const contentLines = lines.slice(1, -1);

  // Find last non-empty line
  let lastContentIndex = contentLines.length - 1;

  while (
    lastContentIndex >= 0 &&
    normalize(contentLines[lastContentIndex]) === ''
  ) {
    lastContentIndex--;
  }

  // if there were trailing empty lines
  if (lastContentIndex < contentLines.length - 1) {
    context.report({
      node: comment,
      message: 'JSDoc ends without empty line',
      fix(/** @type {import('eslint').Rule.RuleFixer} */ fixer) {
        // calculate the range of the trailing empty lines and remove them
        const startOffset = lines
          .slice(0, lastContentIndex + 2)
          .join('\n').length;

        const start = comment.range[0] + 3 + startOffset;
        const end = comment.range[1] - 2;

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
      description: 'JSDoc ends without empty line',
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
            checkJsdocNoEmptyEnd(context, comment);
          }
        }
      },
    };
  },
};
