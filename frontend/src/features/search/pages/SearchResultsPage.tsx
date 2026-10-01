import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import TopicList from '../../main/components/TopicList'
import { getAllSearchableTopics } from '../data/getAllSearchableTopics'
import { extractContentSnippet } from '../data/extractContentSnippet'
import { useGlobalTopicSearch } from '../hooks/useGlobalTopicSearch'
import { useContentSearchResults } from '../hooks/useContentSearchResults'
import type { SearchResultEntry } from '../model/types'

export default function SearchResultsPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [keyword, setKeyword] = useState(searchParams.get('q') ?? '')

  const allTopics = useMemo(() => getAllSearchableTopics(), [])
  const titleMatches = useGlobalTopicSearch(allTopics, keyword)
  const { status: contentStatus, matches: contentMatches, contentIndex } = useContentSearchResults(keyword)

  const entries: SearchResultEntry[] = useMemo(() => {
    const titleMatchIds = new Set(titleMatches.map((entry) => entry.topic.id))
    const titleEntries: SearchResultEntry[] = titleMatches.map((topic) => ({ topic }))
    const contentOnlyEntries: SearchResultEntry[] = contentMatches
      .filter((entry) => !titleMatchIds.has(entry.topic.id))
      .map((entry) => ({
        topic: entry,
        snippet: extractContentSnippet(contentIndex?.get(entry.topic.id) ?? '', keyword),
      }))
    return [...titleEntries, ...contentOnlyEntries]
  }, [titleMatches, contentMatches, contentIndex, keyword])

  const menuIdByTopicId = useMemo(() => new Map(entries.map((entry) => [entry.topic.topic.id, entry.topic.menuId])), [entries])
  const snippetByTopicId = useMemo(() => new Map(entries.map((entry) => [entry.topic.topic.id, entry.snippet])), [entries])

  function handleKeywordChange(next: string) {
    setKeyword(next)
    setSearchParams(next ? { q: next } : {}, { replace: true })
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Search
      </Typography>
      <TextField
        label="Search topics"
        variant="outlined"
        size="small"
        fullWidth
        slotProps={{ inputLabel: { shrink: true } }}
        value={keyword}
        onChange={(e) => handleKeywordChange(e.target.value)}
        inputProps={{ 'aria-label': 'Search topics' }}
        sx={{ mb: 3 }}
      />
      {contentStatus === 'loading' && (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }} aria-label="Loading more results">
          <CircularProgress size={16} />
          <Typography variant="body2" color="text.secondary">
            Loading more results…
          </Typography>
        </Stack>
      )}
      <TopicList
        topics={entries.map((entry) => entry.topic.topic)}
        onTopicClick={(topic) => {
          const menuId = menuIdByTopicId.get(topic.id)
          if (menuId) navigate(`/${menuId}/${topic.slug}`)
        }}
        emptyMessage="No topics match your search"
        getSnippet={(topic) => snippetByTopicId.get(topic.id)}
      />
    </Box>
  )
}
