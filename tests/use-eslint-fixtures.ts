/**
 * ESLint test utilities for testing custom rules
 * @file
 */
import { ESLint } from 'eslint';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from 'fs';
import { join } from 'path';

/**
 * Cached ESLint instances for better performance
 */
const eslintInstances = new Map<boolean, ESLint>();

/**
 * Get or create ESLint instance for specific fix mode
 */
const getESLintInstance = (fix: boolean): ESLint => {
  if (!eslintInstances.has(fix)) {
    eslintInstances.set(
      fix,
      new ESLint({
        overrideConfigFile: join(process.cwd(), 'eslint.config.js'),
        cache: true, // Disable cache to ensure fresh configuration
        fix, // Set fix mode for this instance
        ignore: false, // Disable ignore to check test fixtures
      }),
    );
  }

  const instance = eslintInstances.get(fix);

  if (!instance) {
    throw new Error(`ESLint instance not found for fix mode: ${fix}`);
  }

  return instance;
};

/**
 * Get fixtures directory path
 */
const getFixturesDirectory = (): string => {
  return join(process.cwd(), 'tests', 'fixtures');
};

/**
 * Create unique temporary directory path
 */
const createTemporaryDirectoryPath = (): string => {
  const uniqueId = Math.random().toString(36).slice(7);

  return join(process.cwd(), 'tests', `fixtures-temp-${uniqueId}`);
};

/**
 * Create ESLint fixtures utilities with isolated state
 */
export const useEslintFixtures = () => {
  // Private state for this instance
  let temporaryDirectory: string | null = null;

  /**
   * Copy fixtures to temporary directory
   */
  const setup = (): void => {
    const fixturesDirectory = getFixturesDirectory();

    temporaryDirectory = createTemporaryDirectoryPath();

    // Remove existing temporary directory
    if (existsSync(temporaryDirectory)) {
      try {
        rmSync(temporaryDirectory, { recursive: true, force: true });
      } catch {
        // Ignore cleanup errors
      }
    }

    // Create temporary directory
    mkdirSync(temporaryDirectory, { recursive: true });

    // Copy fixtures to temporary directory
    try {
      cpSync(fixturesDirectory, temporaryDirectory, { recursive: true });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error copying fixtures:', error);

      throw error;
    }
  };

  /**
   * Clean up temporary directory
   */
  const cleanup = (): void => {
    if (temporaryDirectory && existsSync(temporaryDirectory)) {
      try {
        rmSync(temporaryDirectory, { recursive: true, force: true });

        temporaryDirectory = null; // Reset state
      } catch (error) {
        // Ignore cleanup errors
        // eslint-disable-next-line no-console
        console.warn('Warning: Could not clean up temp directory:', error);
      }
    }
  };

  /**
   * Run ESLint on a file
   */
  const lintFile = async (
    filePath: string,
    options: { fix?: boolean; ruleId?: string } = {},
  ): Promise<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any[];
    output?: string;
  }> => {
    if (!temporaryDirectory) {
      throw new Error('Temporary fixtures not set up. Call setup() first.');
    }

    const fullPath = join(temporaryDirectory, filePath);

    // Check if file exists
    if (!existsSync(fullPath)) {
      throw new Error(`File not found: ${fullPath}`);
    }

    const eslint = getESLintInstance(options.fix || false);
    const results = await eslint.lintFiles([fullPath]);
    const messages = results[0]?.messages || [];

    // Filter by ruleId if specified
    const errors = options.ruleId
      ? messages.filter((message) => message.ruleId === options.ruleId)
      : messages;

    if (options.fix) {
      // When fix is enabled, ESLint automatically applies fixes
      // and returns the result in the output field
      const output = results[0]?.output || readFileSync(fullPath, 'utf8');

      return {
        errors,
        output,
      };
    } else {
      return {
        errors,
      };
    }
  };

  /**
   * Get file content from temporary directory
   */
  const getTemporaryFileContent = (filePath: string): string => {
    if (!temporaryDirectory) {
      throw new Error('Temporary fixtures not set up. Call setup() first.');
    }

    const fullPath = join(temporaryDirectory, filePath);

    return readFileSync(fullPath, 'utf8');
  };

  // Return public API
  return {
    setup,
    cleanup,
    lintFile,
    getTemporaryFileContent,
  };
};
