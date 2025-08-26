import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { useEslintFixtures } from './use-eslint-fixtures';

describe('JSDoc rules', () => {
  const fixtures = useEslintFixtures();

  beforeAll(() => {
    fixtures.setup();
  });

  afterAll(() => {
    fixtures.cleanup();
  });

  describe('JSDoc as block comment', () => {
    it('should fix single-line JSDoc', async () => {
      // 1. Check that ESLint finds the error
      const lintResult = await fixtures.lintFile('jsdoc/bad-single-line.js', {
        ruleId: 'custom/jsdoc-multiline',
      });

      expect(lintResult.errors).toHaveLength(1);

      expect(lintResult.errors[0].message).toBe(
        'JSDoc is always a block comment',
      );

      // 2. Apply autofix
      const fixResult = await fixtures.lintFile('jsdoc/bad-single-line.js', {
        fix: true,
      });

      // 3. Check the result
      expect(fixResult.output).toMatchInlineSnapshot(`
        "/**
         * Example Content
         */
        export const x = 1;
        "
      `);
    });
  });

  describe('Empty line before JSDoc', () => {
    it('should add empty line before JSDoc', async () => {
      // 1. Check that ESLint finds the error
      const lintResult = await fixtures.lintFile(
        'jsdoc/bad-no-empty-line-before.js',
        {
          ruleId: 'custom/jsdoc-empty-line-before',
        },
      );

      expect(lintResult.errors).toHaveLength(1);
      expect(lintResult.errors[0].message).toBe('JSDoc with empty line before');

      // 2. Apply autofix
      const fixResult = await fixtures.lintFile(
        'jsdoc/bad-no-empty-line-before.js',
        {
          fix: true,
        },
      );

      // 3. Check the result
      expect(fixResult.output).toMatchInlineSnapshot(`
        "export const previous = 'variable';
        
        /**
         * Example Content
         */
        export const x = 1;
        "
      `);
    });
  });

  describe('No empty lines at start of JSDoc', () => {
    it('should remove empty lines at start of JSDoc', async () => {
      // 1. Check that ESLint finds the error
      const lintResult = await fixtures.lintFile(
        'jsdoc/bad-empty-lines-at-start.js',
        {
          ruleId: 'custom/jsdoc-no-empty-start',
        },
      );

      expect(lintResult.errors).toHaveLength(1);

      expect(lintResult.errors[0].message).toBe(
        'JSDoc starts without empty line',
      );

      // 2. Apply autofix
      const fixResult = await fixtures.lintFile(
        'jsdoc/bad-empty-lines-at-start.js',
        {
          fix: true,
        },
      );

      // 3. Check the result
      expect(fixResult.output).toMatchInlineSnapshot(`
        "/**
         * Example Content
         */
        export const x = 1;
        "
      `);
    });
  });

  describe('Space after asterisk', () => {
    it('should add space after asterisk', async () => {
      // 1. Check that ESLint finds the error
      const lintResult = await fixtures.lintFile(
        'jsdoc/bad-no-space-after-star.js',
        {
          ruleId: 'custom/jsdoc-space-after-asterisk',
        },
      );

      expect(lintResult.errors).toHaveLength(1);

      expect(lintResult.errors[0].message).toBe(
        'JSDoc line contains space after asterisk',
      );

      // 2. Apply autofix
      const fixResult = await fixtures.lintFile(
        'jsdoc/bad-no-space-after-star.js',
        {
          fix: true,
        },
      );

      // 3. Check the result
      expect(fixResult.output).toMatchInlineSnapshot(`
        "/**
         * Example Content
         */
        export const x = 1;
        "
      `);
    });
  });

  describe('Multiple empty lines', () => {
    it('should limit consecutive empty lines to one', async () => {
      // 1. Check that ESLint finds the error
      const lintResult = await fixtures.lintFile(
        'jsdoc/bad-multiple-empty-lines.js',
        {
          ruleId: 'custom/jsdoc-multiple-empty-lines',
        },
      );

      expect(lintResult.errors).toHaveLength(1);

      expect(lintResult.errors[0].message).toBe(
        'JSDoc can contains only one empty line but many times',
      );

      // 2. Apply autofix
      const fixResult = await fixtures.lintFile(
        'jsdoc/bad-multiple-empty-lines.js',
        {
          fix: true,
        },
      );

      // 3. Check the result
      expect(fixResult.output).toMatchInlineSnapshot(`
        "/**
         * Example Content
         *
         * One empty line is OK.
         *
         * More two empty lines is bad.
         */
        export const x = 1;
        "
      `);
    });
  });

  describe('No empty line after JSDoc', () => {
    it('should remove empty line after JSDoc', async () => {
      // 1. Check that ESLint finds the error
      const lintResult = await fixtures.lintFile(
        'jsdoc/bad-no-empty-line-after.js',
        {
          ruleId: 'custom/jsdoc-empty-line-after',
        },
      );

      expect(lintResult.errors).toHaveLength(1);

      expect(lintResult.errors[0].message).toBe(
        'JSDoc without empty line after',
      );

      // 2. Apply autofix
      const fixResult = await fixtures.lintFile(
        'jsdoc/bad-no-empty-line-after.js',
        {
          fix: true,
        },
      );

      // 3. Check the result
      expect(fixResult.output).toMatchInlineSnapshot(`
        "/**
         * Example Content
         */
        export const x = 1;
        "
      `);
    });
  });

  describe('No empty line before end of JSDoc', () => {
    it('should remove empty line before end of JSDoc', async () => {
      // 1. Check that ESLint finds the error
      const lintResult = await fixtures.lintFile(
        'jsdoc/bad-empty-line-before-end.js',
        {
          ruleId: 'custom/jsdoc-no-empty-end',
        },
      );

      expect(lintResult.errors).toHaveLength(1);

      expect(lintResult.errors[0].message).toBe(
        'JSDoc ends without empty line',
      );

      // 2. Apply autofix
      const fixResult = await fixtures.lintFile(
        'jsdoc/bad-empty-line-before-end.js',
        {
          fix: true,
        },
      );

      // 3. Check the result
      expect(fixResult.output).toMatchInlineSnapshot(`
        "/**
         * Example Content
         */
        export const x = 1;
        "
      `);
    });
  });

  describe('Correct JSDoc', () => {
    it('should not report errors for correct JSDoc', async () => {
      const lintResult = await fixtures.lintFile('jsdoc/good-correct.js', {
        ruleId: 'custom/jsdoc-multiline',
      });

      expect(lintResult.errors).toHaveLength(0);
    });
  });
});
