import { describe, it, expect } from 'vitest'
import { getAllSearchableTopics } from '../../src/features/search/data/getAllSearchableTopics'
import { getTopicConfigMap } from '../../src/features/main/data/getMenuTopicSource'
import { getSortedMenuItems } from '../../src/features/landing/data/getSortedMenuItems'

describe('getAllSearchableTopics', () => {
  it('includes every topic from every menu, with no topics dropped or capped', () => {
    const expectedCount = Object.values(getTopicConfigMap()).reduce(
      (sum, config) => sum + config.topics.length,
      0,
    )
    expect(getAllSearchableTopics()).toHaveLength(expectedCount)
  })

  it('pairs each topic with its owning menuId and the matching menuLabel', () => {
    const menuLabelById = new Map(getSortedMenuItems().map((item) => [item.id, item.label]))
    const searchable = getAllSearchableTopics()

    expect(searchable.length).toBeGreaterThan(0)
    for (const entry of searchable) {
      expect(entry.menuId).toBeTruthy()
      expect(entry.menuLabel).toBe(menuLabelById.get(entry.menuId) ?? entry.menuId)
    }
  })

  it('includes topics from more than one menu area', () => {
    const menuIds = new Set(getAllSearchableTopics().map((entry) => entry.menuId))
    expect(menuIds.size).toBeGreaterThan(1)
  })
})
