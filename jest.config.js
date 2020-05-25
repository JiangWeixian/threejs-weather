module.exports = {
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*'],
  coverageDirectory: './jest/coverage',
  preset: 'ts-jest',
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  testRegex: '/__test__/.+\\.test\\.tsx?$',
  verbose: false,
  setupFiles: ['<rootDir>/test/setupTests.ts'],
}
