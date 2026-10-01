import { describe, it, expect, vi } from 'vitest'
import { getTopicTagsIndex } from '../../src/features/tags/data/getTopicTagsIndex'

vi.mock('../../src/features/tags/data/tagDefinitions', () => ({
  TAG_DEFINITIONS: [
    { id: 'databases', label: 'Databases', keywords: ['database', 'schema'], minMatches: 2 },
    { id: 'caching', label: 'Caching', keywords: ['cache', 'redis'] },
  ],
}))

vi.mock('../../src/features/related-topics/data/getRelatedTopicsKeywordIndex', () => ({
  getRelatedTopicsKeywordIndex: () =>
    Promise.resolve(
      new Map([
        ['incidental-mention', new Set(['database', 'unrelated'])],
        ['real-db-topic', new Set(['database', 'schema'])],
        ['single-hit-default-tag', new Set(['cache'])],
      ]),
    ),
}))

vi.mock('../../src/features/search/data/getAllSearchableTopics', () => ({
  getAllSearchableTopics: () => [
    { topic: { id: 'incidental-mention', slug: 'incidental-mention', title: 'x', markdownPath: 'x.md' }, menuId: 'x', menuLabel: 'X' },
    { topic: { id: 'real-db-topic', slug: 'real-db-topic', title: 'x', markdownPath: 'x.md' }, menuId: 'x', menuLabel: 'X' },
    { topic: { id: 'single-hit-default-tag', slug: 'single-hit-default-tag', title: 'x', markdownPath: 'x.md' }, menuId: 'x', menuLabel: 'X' },
  ],
}))

describe('getTopicTagsIndex minMatches threshold', () => {
  it('does not apply a tag on a single incidental keyword hit when minMatches is 2', async () => {
    const index = await getTopicTagsIndex()
    expect(index.get('incidental-mention')).not.toContain('databases')
  })

  it('applies the tag once 2 distinct keywords are matched', async () => {
    const index = await getTopicTagsIndex()
    expect(index.get('real-db-topic')).toContain('databases')
  })

  it('still applies a tag with no minMatches on a single keyword hit', async () => {
    const index = await getTopicTagsIndex()
    expect(index.get('single-hit-default-tag')).toContain('caching')
  })
})
