import { type UserConfig } from '@commitlint/types';
import { RuleConfigSeverity as Level } from '@commitlint/types';
import { readdirSync } from 'fs';

const packageDirectoryList: string[] = [];

try {
  for (const item of readdirSync('./packages', { withFileTypes: true })) {
    if (item.isDirectory()) {
      packageDirectoryList.push(item.name);
    }
  }
} catch (error) {
  // eslint-disable-next-line no-console
  console.warn({ warning: error });
}

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(commit) => commit.startsWith('Pull request #')],
  rules: {
    'scope-empty': [Level.Error, 'never'],
    'scope-enum': [Level.Error, 'always', ['root', ...packageDirectoryList]],
  },
};

export default Configuration;
