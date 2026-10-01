import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { vi } from 'vitest'

// Content search fetches public/search/content-index.json at runtime (see
// getAllTopicContentIndex.ts); jsdom has no real HTTP server, so tests stub
// global fetch to resolve with the real generated file read directly from disk.
export function stubContentIndexFetch() {
  const raw = readFileSync(join(process.cwd(), 'public', 'search', 'content-index.json'), 'utf-8')
  const parsed = JSON.parse(raw)

  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      json: () => Promise.resolve(parsed),
    }),
  )
}
