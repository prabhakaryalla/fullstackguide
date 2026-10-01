const STOPWORDS = new Set([
  'this', 'that', 'these', 'those', 'with', 'from', 'which', 'while', 'where', 'when', 'what',
  'your', 'their', 'there', 'here', 'have', 'has', 'had', 'been', 'being', 'will', 'would',
  'could', 'should', 'shall', 'must', 'about', 'above', 'after', 'again', 'against', 'because',
  'before', 'below', 'between', 'both', 'each', 'either', 'into', 'more', 'most', 'other',
  'over', 'same', 'some', 'such', 'than', 'then', 'through', 'under', 'until', 'very', 'they',
  'them', 'were', 'only', 'also', 'like', 'used', 'using', 'uses', 'does', 'doing', 'done',
  'able', 'just', 'need', 'want', 'make', 'made', 'many', 'much', 'well', 'even', 'still',
])

const MIN_WORD_LENGTH = 4

// Derives a topic's "significant" vocabulary — lowercase, punctuation-stripped, short/filler
// words excluded — used to score relatedness between topics via set intersection.
export function extractSignificantWords(text: string): Set<string> {
  const words = text.toLowerCase().split(/[^a-z0-9]+/)
  const significant = new Set<string>()

  for (const word of words) {
    if (word.length >= MIN_WORD_LENGTH && !STOPWORDS.has(word)) {
      significant.add(word)
    }
  }

  return significant
}
