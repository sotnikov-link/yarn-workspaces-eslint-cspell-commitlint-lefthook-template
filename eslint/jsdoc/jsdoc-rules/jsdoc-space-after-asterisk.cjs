/**
 * Rule: jsdoc-space-after-asterisk
 * JSDoc with space after asterisk
 * Example: / **
 *  Good example
 *  /
 */
const checkJsdocSpaceAfterAsterisk = (
  /** @type {import('eslint').Rule.RuleContext} */ context,
  /** @type {any} */ comment,
) => {
  const lines = comment.value.split('\n');

  let offset = 4; // Start after /**\n

  for (let index = 1; index < lines.length - 1; index++) {
    const line = lines[index];

    if (
      /^\s*\*/u.test(line) &&
      !/^\s*\*\s/u.test(line) &&
      line.trim() !== '*'
    ) {
      const currentOffset = offset;
      const currentLine = line;

      context.report({
        node: comment,
        message: 'JSDoc line contains space after asterisk',
        fix(/** @type {import('eslint').Rule.RuleFixer} */ fixer) {
          const starMatch = currentLine.match(/^\s*\*/u);

          if (starMatch) {
            const starIndex = currentOffset + starMatch[0].length;

            return fixer.insertTextAfterRange([starIndex - 1, starIndex], ' ');
          }

          return null;
        },
      });

      break;
    }

    offset += line.length + 1; // +1 for the newline
  }
};

module.exports = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'JSDoc with space after asterisk',
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
            checkJsdocSpaceAfterAsterisk(context, comment);
          }
        }
      },
    };
  },
};
