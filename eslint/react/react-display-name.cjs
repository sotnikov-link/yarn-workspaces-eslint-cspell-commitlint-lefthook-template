/**
 * Custom ESLint rule to enforce that displayName matches the variable name
 */
module.exports = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Enforce that displayName matches the variable name',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
  },
  create(/** @type {import('eslint').Rule.RuleContext} */ context) {
    return {
      AssignmentExpression(/** @type {any} */ node) {
        // Check if this is a displayName assignment
        if (
          node.left.type === 'MemberExpression' &&
          node.left.property.type === 'Identifier' &&
          node.left.property.name === 'displayName' &&
          node.left.object.type === 'Identifier'
        ) {
          const componentName = node.left.object.name;
          const displayNameValue = node.right;

          // Check if the right side is a string literal
          if (
            displayNameValue.type === 'Literal' &&
            typeof displayNameValue.value === 'string'
          ) {
            const currentDisplayName = displayNameValue.value;

            // If displayName doesn't match component name, report error
            if (currentDisplayName !== componentName) {
              context.report({
                node,
                message: 'Use variable name for display name',
                fix(/** @type {import('eslint').Rule.RuleFixer} */ fixer) {
                  return fixer.replaceText(
                    displayNameValue,
                    `'${componentName}'`,
                  );
                },
              });
            }
          }
        }
      },
    };
  },
};
