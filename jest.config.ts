// jest.config.ts
import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  modulePathIgnorePatterns: ['dist'],
  coverageDirectory: './coverage/',
  collectCoverage: true,
};
export default config;
