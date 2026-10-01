// Generic backup/restore for every `fullstack-guide.*` localStorage key
// (bookmarks, progress, interview notes/history, candidate info, theme,
// etc.) — deliberately storage-shape-agnostic: each feature's own reader
// already validates/guards its own value shape on load, so this module only
// ever needs to move opaque strings around, never interpret them.
const STORAGE_KEY_PREFIX = 'fullstack-guide.'
const EXPORT_FORMAT_VERSION = 1

export interface AppDataExport {
  formatVersion: number
  exportedAt: number
  data: Record<string, string>
}

export function buildAppDataExport(): AppDataExport {
  const data: Record<string, string> = {}
  for (let i = 0; i < window.localStorage.length; i += 1) {
    const key = window.localStorage.key(i)
    if (!key || !key.startsWith(STORAGE_KEY_PREFIX)) {
      continue
    }
    const value = window.localStorage.getItem(key)
    if (value !== null) {
      data[key] = value
    }
  }
  return { formatVersion: EXPORT_FORMAT_VERSION, exportedAt: Date.now(), data }
}

export function countExportableEntries(appData: AppDataExport): number {
  return Object.keys(appData.data).length
}

export function serializeAppDataExport(appData: AppDataExport): string {
  return JSON.stringify(appData, null, 2)
}

// Returns null for anything that isn't a plausible backup file — callers
// should show a friendly "not a valid backup file" message rather than crash.
export function parseAppDataExport(raw: string): AppDataExport | null {
  try {
    const parsed: unknown = JSON.parse(raw)
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return null
    }
    const candidate = parsed as Partial<AppDataExport>
    if (candidate.data === null || typeof candidate.data !== 'object' || Array.isArray(candidate.data)) {
      return null
    }
    return {
      formatVersion: typeof candidate.formatVersion === 'number' ? candidate.formatVersion : 0,
      exportedAt: typeof candidate.exportedAt === 'number' ? candidate.exportedAt : 0,
      data: candidate.data as Record<string, string>,
    }
  } catch {
    return null
  }
}

// Only ever writes keys under our own prefix, and only string values — a
// crafted/corrupted file can't inject arbitrary localStorage keys or
// non-string junk this way. Each feature's own reader still separately
// validates its own JSON shape the next time it loads, so a malformed value
// for one key degrades to that feature's empty state instead of crashing.
export function applyAppDataExport(appData: AppDataExport): number {
  let importedCount = 0
  for (const [key, value] of Object.entries(appData.data)) {
    if (!key.startsWith(STORAGE_KEY_PREFIX) || typeof value !== 'string') {
      continue
    }
    try {
      window.localStorage.setItem(key, value)
      importedCount += 1
    } catch {
      // Best-effort — storage may be disabled/full/quota-exceeded for this one key.
    }
  }
  return importedCount
}

export function buildBackupFileName(appData: AppDataExport): string {
  const datePart = new Date(appData.exportedAt).toISOString().slice(0, 10)
  return `fullstackguide-backup-${datePart}.json`
}

export function downloadAppDataExport(): void {
  const appData = buildAppDataExport()
  const blob = new Blob([serializeAppDataExport(appData)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = buildBackupFileName(appData)
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}
