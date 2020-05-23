const path = require('path')

module.exports = {
  verbose: true,
  collectCoverage: true,
  globals: {
    NODE_ENV: 'test',
  },
  testEnvironment: 'jsdom',
  rootDir: path.resolve(__dirname, '../'),
  moduleFileExtensions: ['tsx', 'jsx', 'js', 'ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
    '^.+\\.(css)$': '<rootDir>/node_modules/jest-css-modules',
  },
  setupFiles: ['jest-localstorage-mock', '<rootDir>/test/jest.setup.js'],
}
