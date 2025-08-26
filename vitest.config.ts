import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 60_000,
    include: ['tests/**/*.{test,spec}.{js,ts}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    environment: 'node',
    setupFiles: [],
    globals: true,
    reporters: [
      [
        'default',
        {
          summary: false,
        },
      ],
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'json', 'html', 'lcov'],
      include: [
        // Include custom ESLint rules for coverage reporting
        // These rules are tested in tests/jsdoc.test.ts and tests/react.test.ts
        'eslint/**/*.cjs',
      ],
      exclude: [
        'node_modules/**',
        'dist/**',
        'coverage/**',
        'tests/**',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        'packages/**',
        '**/fixtures/**',
        '**/empty-lines/**',
      ],
    },
  },
});
