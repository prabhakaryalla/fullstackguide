import type { TopNavigationGroupView } from '../../features/landing/model/types'

export function resolveSelectedMenuId(pathname: string, knownIds: Set<string>): string | null {
  const [firstSegment] = pathname.split('/').filter(Boolean)
  if (!firstSegment) {
    return null
  }

  return knownIds.has(firstSegment) ? firstSegment : null
}

// Maps a resolved leaf menu id to the top-level nav group that should show as active:
// its parent group if nested under one, or the leaf id itself if it is a standalone group.
export function resolveActiveTopNavigationGroupId(
  leafId: string | null,
  groups: TopNavigationGroupView[],
): string | null {
  if (!leafId) {
    return null
  }

  const parentGroup = groups.find((group) => group.children.some((child) => child.id === leafId))
  if (parentGroup) {
    return parentGroup.id
  }

  return groups.some((group) => group.id === leafId) ? leafId : null
}

