import rawGroups from './navigationGroups.json'
import { getSortedMenuItems } from './getSortedMenuItems'
import type { TopNavigationGroup, TopNavigationGroupView } from '../model/types'

export function getTopNavigationTree(): TopNavigationGroupView[] {
  const leafItems = getSortedMenuItems()
  const leafById = new Map(leafItems.map((item) => [item.id, item]))
  const groups = [...(rawGroups.groups as TopNavigationGroup[])].sort((a, b) => a.order - b.order)

  return groups.map((group) => ({
    id: group.id,
    label: group.label,
    order: group.order,
    children: (group.childIds ?? [])
      .map((childId) => leafById.get(childId))
      .filter((item): item is NonNullable<typeof item> => item !== undefined),
  }))
}
