import type { NavigationMenuItem } from '../../landing/model/types'
import type { DominantComplexityLabel, MenuStatistics, MenuTileSummary } from '../model/types'
import { getMenuTopicSource } from './getMenuTopicSource'

function resolveDominantComplexity(stats: MenuStatistics): DominantComplexityLabel {
  const knownValues = [stats.easyTopics, stats.mediumTopics, stats.hardTopics]
  const maxValue = Math.max(...knownValues)

  if (maxValue === 0 && stats.unknownTopics > 0) {
    return 'Unknown'
  }

  const topCount = knownValues.filter((value) => value === maxValue && value > 0).length
  if (topCount > 1) {
    return 'Mixed'
  }

  if (stats.easyTopics === maxValue && maxValue > 0) {
    return 'Easy'
  }

  if (stats.mediumTopics === maxValue && maxValue > 0) {
    return 'Medium'
  }

  if (stats.hardTopics === maxValue && maxValue > 0) {
    return 'Hard'
  }

  return 'Unknown'
}

function getMenuStatistics(menuId: string): MenuStatistics {
  const topics = getMenuTopicSource(menuId)

  const stats = topics.reduce<MenuStatistics>(
    (summary, topic) => {
      const complexity = topic.complexity ?? 'Unknown'

      if (complexity === 'Easy') {
        summary.easyTopics += 1
      } else if (complexity === 'Medium') {
        summary.mediumTopics += 1
      } else if (complexity === 'Hard') {
        summary.hardTopics += 1
      } else {
        summary.unknownTopics += 1
      }

      return summary
    },
    {
      totalTopics: topics.length,
      easyTopics: 0,
      mediumTopics: 0,
      hardTopics: 0,
      unknownTopics: 0,
    },
  )

  return stats
}

export function getMenuTileSummaries(menuItems: NavigationMenuItem[]): MenuTileSummary[] {
  return menuItems.map((menuItem) => {
    const stats = getMenuStatistics(menuItem.id)

    return {
      menuId: menuItem.id,
      menuLabel: menuItem.label,
      navigationTarget: `/${menuItem.id}`,
      stats,
      dominantComplexity: resolveDominantComplexity(stats),
    }
  })
}
