/**
 * Jest Configuration
 * For Drag & Drop File Upload Project
 * 
 * @type {import('@jest/types').Config.InitialOptions}
 */

module.exports = {
  // Test environment - use node instead of jsdom temporarily
  testEnvironment: 'node',

  // Test match patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js'
  ],

  // Module paths
  moduleDirectories: ['node_modules', '.'],

  // Verbose output
  verbose: true,

  // Timeout for tests (ms)
  testTimeout: 10000,

  // Clear mocks between tests
  clearMocks: true,

  // Reset mocks between tests
  resetMocks: true,

  // Restore mocks between tests
  restoreMocks: true
};
