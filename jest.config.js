const path = require('path')

module.exports = {
  preset: 'ts-jest',
  rootDir: __dirname,
  globals: {
    __VUE2__: false,
  },
  collectCoverage: true,
  collectCoverageFrom: ['**/__test__/**'],
  coverageDirectory: path.resolve(__dirname, 'coverage'),
  coverageReporters: ['html', 'text'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  watchPathIgnorePatterns: ['node_modules'],
  testMatch: ['<rootDir>/__test__/**/*spec.[jt]s?(x)'],
  setupFiles: [
    '<rootDir>/__test__/setup/setupComposition.ts',
    '<rootDir>/__test__/setup/setupTest.ts',
  ],
}
