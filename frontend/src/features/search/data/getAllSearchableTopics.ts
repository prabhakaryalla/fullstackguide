import { getTopicConfigMap } from '../../main/data/getMenuTopicSource'
import { getSortedMenuItems } from '../../landing/data/getSortedMenuItems'
import type { SearchableTopic } from '../model/types'

export function getAllSearchableTopics(): SearchableTopic[] {
  const menuLabelById = new Map(getSortedMenuItems().map((item) => [item.id, item.label]))
  const topicConfigMap = getTopicConfigMap()

  return Object.entries(topicConfigMap).flatMap(([menuId, config]) =>
    config.topics.map((topic) => ({
      topic,
      menuId,
      menuLabel: menuLabelById.get(menuId) ?? menuId,
    })),
  )
}
