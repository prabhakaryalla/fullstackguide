import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    // Default (5000ms) is too tight for tests exercising the full-text search
    // content index under full-parallel-suite CPU contention (measured to
    // occasionally exceed even 15000ms) — see repo memory notes.
    testTimeout: 20000,
  },
})
