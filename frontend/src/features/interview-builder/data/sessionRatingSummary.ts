import { ADHOC_MENU_ID } from '../../adhoc-questions/data/adhocQuestionToTopic'
import type { InterviewNoteEntry } from '../../interview-notes/model/types'

export interface SessionItemKey {
  menuId: string
  slug: string
}

// Mirrors the `items`/`custom` URL-param parsing already duplicated across the
// Session/Run/Print pages, but only resolves menuId+slug pairs (not full Topic
// objects) since this is purely used to look up per-question interview notes
// for an arbitrary, possibly long-past, session search string.
export function parseSessionItemKeys(search: string): SessionItemKey[] {
  const params = new URLSearchParams(search)
  const itemKeys = (params.get('items') ?? '')
    .split(',')
    .filter(Boolean)
    .map((item) => {
      const [menuId, ...slugParts] = item.split(':')
      return { menuId: menuId ?? '', slug: slugParts.join(':') }
    })
  const customKeys = (params.get('custom') ?? '')
    .split(',')
    .filter(Boolean)
    .map((id) => ({ menuId: ADHOC_MENU_ID, slug: id }))
  return [...itemKeys, ...customKeys]
}

export interface SessionRatingSummary {
  totalCount: number
  ratedCount: number
  skippedCount: number
  averageRating: number | null
}

export function computeSessionRatingSummary(
  runId: string,
  itemKeys: SessionItemKey[],
  getNote: (runId: string, menuId: string, slug: string) => InterviewNoteEntry,
): SessionRatingSummary {
  let sum = 0
  let ratedCount = 0
  let skippedCount = 0
  for (const { menuId, slug } of itemKeys) {
    const note = getNote(runId, menuId, slug)
    if (note.skipped) {
      skippedCount += 1
      continue
    }
    if (note.rating > 0) {
      sum += note.rating
      ratedCount += 1
    }
  }
  return {
    totalCount: itemKeys.length,
    ratedCount,
    skippedCount,
    averageRating: ratedCount > 0 ? sum / ratedCount : null,
  }
}
