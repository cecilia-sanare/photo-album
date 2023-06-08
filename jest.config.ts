import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  roots: ['<rootDir>/app'],
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: './tsconfig.test.json'
    }]
  },

  collectCoverageFrom: [
    '<rootDir>/app/**/*'
  ],

  coveragePathIgnorePatterns: [
    '__tests__'
  ],

  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect'
  ],

  moduleNameMapper: {
    '\\.(scss)$': '<rootDir>/__tests__/identity-obj-proxy-esm.js'
  }
};

export default jestConfig;