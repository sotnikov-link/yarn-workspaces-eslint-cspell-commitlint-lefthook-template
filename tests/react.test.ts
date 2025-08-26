import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { useEslintFixtures } from './use-eslint-fixtures';

describe('React rules', () => {
  const fixtures = useEslintFixtures();

  beforeAll(() => {
    fixtures.setup();
  });

  afterAll(() => {
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
    it('should report error for type instead of interface and fix it', async () => {
      // 1. Check that ESLint finds the error
      const lintResult = await fixtures.lintFile('react/bad-props-type.tsx', {
        ruleId: 'custom/react-props-interface',
      });

      expect(lintResult.errors).toHaveLength(1);

      expect(lintResult.errors[0].message).toBe(
        'Use interface for React Component Props',
      );

      // 2. Apply autofix
      const fixResult = await fixtures.lintFile('react/bad-props-type.tsx', {
        fix: true,
      });

      // 3. Check the result
      expect(fixResult.output).toMatchInlineSnapshot(`
        "export interface InputProps {
          type: number; // Example Content
        }
        "
      `);
    });

    it('should not report error for types not ending with Props', async () => {
      const lintResult = await fixtures.lintFile('react/good-other-type.tsx', {
        ruleId: 'custom/react-props-interface',
      });

      expect(lintResult.errors).toHaveLength(0);
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
});
