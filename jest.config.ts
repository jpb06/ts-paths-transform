import type { Config } from '@jest/types';

const options: Config.InitialOptions = {
  logHeapUsage: true,
  transform: {
    '^.+\\.ts$': ['@swc/jest', {}],
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!<rootDir>/node_modules/',
    '!<rootDir>/dist/',
    '!<rootDir>/src/**/index.ts',
  ],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
};

export default options;
