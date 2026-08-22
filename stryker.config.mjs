/** @type {import('@stryker-mutator/api/core').StrykerOptions} */
export default {
  mutate: ['src/**/*.ts', '!src/index.ts'],
  testRunner: 'vitest',
  checkers: ['typescript'],
  coverageAnalysis: 'perTest',
  reporters: ['clear-text', 'progress', 'html'],
  reportFileName: 'reports/mutation.html',
  thresholds: {
    high: 80,
    low: 60,
    break: 70,
  },
};
