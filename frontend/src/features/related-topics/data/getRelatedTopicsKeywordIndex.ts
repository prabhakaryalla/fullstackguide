import { getAllTopicContentIndex } from '../../search/data/getAllTopicContentIndex'
import { getAllSearchableTopics } from '../../search/data/getAllSearchableTopics'
import { extractSignificantWords } from './extractSignificantWords'

let keywordIndexPromise: Promise<Map<string, Set<string>>> | null = null

async function buildKeywordIndex(): Promise<Map<string, Set<string>>> {
  const contentIndex = await getAllTopicContentIndex()
  const index = new Map<string, Set<string>>()

  for (const { topic } of getAllSearchableTopics()) {
    const content = contentIndex.get(topic.id) ?? ''
    index.set(topic.id, extractSignificantWords(`${topic.title} ${content}`))
  }

  return index
}

// Lazily derives the shared keyword index once per browser session (built on top of
// getAllTopicContentIndex's own session-cached fetch) and caches it so repeat calls
// (across every topic page visited in a session) never rebuild it.
export function getRelatedTopicsKeywordIndex(): Promise<Map<string, Set<string>>> {
  if (!keywordIndexPromise) {
    keywordIndexPromise = buildKeywordIndex()
  }
  return keywordIndexPromise
}
