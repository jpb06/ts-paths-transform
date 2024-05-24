import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html', 'lcov', 'json-summary'],
      all: true,
      include: ['src/**/*.ts'],
      exclude: [
        'src/tests',
        '**/index.ts',
        '**/*.d.ts',
        '**/*.type.ts',
        '**/*.test.ts',
      ],
    },
  },
});
