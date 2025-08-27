/**
 * Rule: jsdoc-multiple-empty-lines
 * JSDoc with multiple empty lines
 * Example: / **
 *  Good example
 *
 *  Another line
 *  /
 */
const normalize = (/** @type {string} */ line) =>
  line.replace(/^\s*\*\s?/u, '').trim();

const checkJsdocMultipleEmptyLines = (
  /** @type {import('eslint').Rule.RuleContext} */ context,
  /** @type {any} */ comment,
) => {
  const lines = comment.value.split('\n');

  let offset = comment.range[0] + 4;

  for (let index = 1; index < lines.length - 2; index++) {
    const currentLine = lines[index];
    const nextLine = lines[index + 1];

    if (normalize(currentLine) === '' && normalize(nextLine) === '') {
      const currentOffset = offset;
      const currentLineLength = currentLine.length;
      const nextLineLength = nextLine.length;

      context.report({
        node: comment,
        message: 'JSDoc can contains only one empty line but many times',
        fix(/** @type {import('eslint').Rule.RuleFixer} */ fixer) {
          const endOfLine = currentOffset + currentLineLength;

          return fixer.removeRange([endOfLine, endOfLine + nextLineLength + 1]);
        },
      });

      break;
    }

    offset += currentLine.length + 1;
  }
};

module.exports = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'JSDoc with multiple empty lines',
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
            checkJsdocMultipleEmptyLines(context, comment);
          }
        }
      },
    };
  },
};
