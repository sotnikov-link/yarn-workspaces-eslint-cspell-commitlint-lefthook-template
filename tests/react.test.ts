import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useEslintFixtures } from './use-eslint-fixtures';

describe('React rules', () => {
  const fixtures = useEslintFixtures();

  beforeEach(() => {
    fixtures.setup();
  });

  afterEach(() => {
    fixtures.cleanup();
  });

  describe('Display name rule', () => {
    it('should fix mismatched displayName', async () => {
      // 1. Check that ESLint finds the error
      const lintResult = await fixtures.lintFile(
        'react/bad-display-name-mismatch.tsx',
        {
          ruleId: 'custom/react-display-name',
        },
      );

      expect(lintResult.errors).toHaveLength(1);

      expect(lintResult.errors[0].message).toBe(
        'Use variable name for display name',
      );

      // 2. Apply autofix
      const fixResult = await fixtures.lintFile(
        'react/bad-display-name-mismatch.tsx',
        {
          fix: true,
        },
      );

      // 3. Check the result
      expect(fixResult.output).toMatchInlineSnapshot(`
        "export const MyComponent = () => null;

        MyComponent.displayName = 'MyComponent';
        "
      `);
    });
  });

  describe('Props type rule', () => {
    it('should report error for type instead of interface', async () => {
      // 1. Check that ESLint finds the error
      const lintResult = await fixtures.lintFile('react/bad-props-type.tsx', {
        ruleId: 'regex/invalid-react-props-type',
      });

      expect(lintResult.errors).toHaveLength(1);

      expect(lintResult.errors[0].message).toBe(
        'Use interface for React Component Props',
      );

      // Note: This rule doesn't have autofix according to TODO.md
      // So we only test that it reports the error
    });
  });

  describe('Correct React code', () => {
    it('should not report errors for correct React code', async () => {
      const lintResult = await fixtures.lintFile('react/good-correct.tsx', {
        ruleId: 'custom/react-display-name',
      });

      expect(lintResult.errors).toHaveLength(0);
    });
  });
}, 10_000);
