export type TopicComplexity = 'Easy' | 'Medium' | 'Hard' | 'Unknown'
export type ComplexityFilter = 'All' | 'Easy' | 'Medium' | 'Hard'

export const COMPLEXITY_FILTER_OPTIONS: readonly ComplexityFilter[] = ['All', 'Easy', 'Medium', 'Hard']

export interface Topic {
  id: string
  slug: string
  title: string
  markdownPath: string
  complexity?: TopicComplexity
  category?: string
}

export interface TopicConfig {
  menuId: string
  topics: Topic[]
}

export interface MenuStatistics {
  totalTopics: number
  easyTopics: number
  mediumTopics: number
  hardTopics: number
  unknownTopics: number
}

export type DominantComplexityLabel = 'Easy' | 'Medium' | 'Hard' | 'Mixed' | 'Unknown'

export interface MenuTileSummary {
  menuId: string
  menuLabel: string
  navigationTarget: string
  stats: MenuStatistics
  dominantComplexity: DominantComplexityLabel
}

export interface AdjacentTopicSlugs {
  previousTopicSlug: string | null
  nextTopicSlug: string | null
}

export interface NavigationControlState {
  previousEnabled: boolean
  nextEnabled: boolean
  showControls: boolean
}
