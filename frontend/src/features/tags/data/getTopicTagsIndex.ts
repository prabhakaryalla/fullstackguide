import { getRelatedTopicsKeywordIndex } from '../../related-topics/data/getRelatedTopicsKeywordIndex'
import { getAllSearchableTopics } from '../../search/data/getAllSearchableTopics'
import { TAG_DEFINITIONS } from './tagDefinitions'

let tagsIndexPromise: Promise<Map<string, string[]>> | null = null

async function buildTagsIndex(): Promise<Map<string, string[]>> {
  const keywordIndex = await getRelatedTopicsKeywordIndex()
  const index = new Map<string, string[]>()

  for (const { topic } of getAllSearchableTopics()) {
    const words = keywordIndex.get(topic.id) ?? new Set<string>()
    const tagIds = TAG_DEFINITIONS.filter(
      (tag) => tag.keywords.filter((keyword) => words.has(keyword)).length >= (tag.minMatches ?? 1),
    ).map((tag) => tag.id)
    index.set(topic.id, tagIds)
  }

  return index
}

// Lazily derives Map<topicId, tagId[]> once per browser session, reusing the
// existing related-topics keyword index rather than re-scanning any content,
// and caches it so repeat calls (across /tags, a topic page, and a menu's
// topic list) never rebuild it.
export function getTopicTagsIndex(): Promise<Map<string, string[]>> {
  if (!tagsIndexPromise) {
    tagsIndexPromise = buildTagsIndex()
  }
  return tagsIndexPromise
}
