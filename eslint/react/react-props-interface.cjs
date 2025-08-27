/**
 * Custom ESLint rule to enforce interface usage for React props types
 */
module.exports = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Use interface for React Component Props',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
  },
  create(/** @type {import('eslint').Rule.RuleContext} */ context) {
    return {
      TSTypeAliasDeclaration(/** @type {any} */ node) {
        // Check if the type name ends with 'Props'
        if (
          node.id.name.endsWith('Props') && // Check if it's an object type
          node.typeAnnotation.type === 'TSTypeLiteral'
        ) {
          context.report({
            node,
            message: 'Use interface for React Component Props',
            fix(/** @type {import('eslint').Rule.RuleFixer} */ fixer) {
              const sourceCode = context.getSourceCode();
              const typeKeyword = sourceCode.getFirstToken(node);
              // @ts-expect-error
              const typeName = sourceCode.getTokenAfter(typeKeyword);
              // @ts-expect-error
              const equalsToken = sourceCode.getTokenAfter(typeName);

              // Replace 'type' with 'interface' and remove '=' and ';'
              if (typeKeyword && typeName && equalsToken) {
                return [
                  fixer.replaceText(typeKeyword, 'interface'),
                  fixer.remove(equalsToken),
                ];
              }

              return null;
            },
          });
        }
      },
    };
  },
};
