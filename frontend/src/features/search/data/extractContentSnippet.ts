// Extracts a short plain-text excerpt around the first case-insensitive match of `keyword`.
export function extractContentSnippet(content: string, keyword: string, radius = 60): string {
  const trimmedKeyword = keyword.trim()
  if (!trimmedKeyword) {
    return ''
  }

  const matchIndex = content.toLowerCase().indexOf(trimmedKeyword.toLowerCase())
  if (matchIndex === -1) {
    return ''
  }

  const start = Math.max(0, matchIndex - radius)
  const end = Math.min(content.length, matchIndex + trimmedKeyword.length + radius)
  const slice = content.slice(start, end)
  const collapsed = slice.replace(/\s+/g, ' ').trim()

  const prefix = start > 0 ? '…' : ''
  const suffix = end < content.length ? '…' : ''
  return `${prefix}${collapsed}${suffix}`
}
