import type { AdjacentTopicSlugs, Topic } from '../model/types'

export function resolveAdjacentTopicSlugs(topics: Topic[], currentTopicSlug: string): AdjacentTopicSlugs {
  const currentIndex = topics.findIndex((topic) => topic.slug === currentTopicSlug)

  if (currentIndex < 0) {
    return {
      previousTopicSlug: null,
      nextTopicSlug: null,
    }
  }

  return {
    previousTopicSlug: currentIndex > 0 ? topics[currentIndex - 1]?.slug ?? null : null,
    nextTopicSlug: currentIndex < topics.length - 1 ? topics[currentIndex + 1]?.slug ?? null : null,
  }
}
