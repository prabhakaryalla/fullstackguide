import { getAllSearchableTopics } from './getAllSearchableTopics'

let contentIndexPromise: Promise<Map<string, string>> | null = null

async function buildContentIndex(): Promise<Map<string, string>> {
  const index = new Map<string, string>()

  const response = await fetch(`${import.meta.env.BASE_URL}search/content-index.json`)
  const byMarkdownPath: Record<string, string> = await response.json()

  for (const { topic } of getAllSearchableTopics()) {
    const raw = byMarkdownPath[topic.markdownPath]
    if (raw) {
      index.set(topic.id, raw)
    }
  }

  return index
}

// Lazily fetches the pre-generated content-index.json (public/search/content-index.json,
// produced by scripts/generate-search-content-index.mjs) once per browser session — a single
// static asset fetch instead of ~4,200 separate module requests, which measured 18-30s.
export function getAllTopicContentIndex(): Promise<Map<string, string>> {
  if (!contentIndexPromise) {
    contentIndexPromise = buildContentIndex()
  }
  return contentIndexPromise
}

