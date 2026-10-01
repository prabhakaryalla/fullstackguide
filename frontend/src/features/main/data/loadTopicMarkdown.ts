import type { Topic } from '../model/types'

// Glob all markdown files as raw strings — must be a static literal pattern
const markdownModules = import.meta.glob('../content/**/*.md', {
  query: '?raw',
  import: 'default',
})

// Lazily loads exactly one topic's raw markdown, one topic at a time (used by
// TopicInfoPage and the flashcard session) — distinct from the search feature's
// getAllTopicContentIndex, which needs every topic's content at once via a
// build-time static asset.
export async function loadTopicMarkdown(topic: Topic): Promise<string | null> {
  const key = `../content/${topic.markdownPath}`
  const loader = markdownModules[key]
  if (!loader) {
    return null
  }
  try {
    return (await loader()) as string
  } catch {
    return null
  }
}
