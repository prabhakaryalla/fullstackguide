import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import TopicList from '../../main/components/TopicList'
import { getAllSearchableTopics } from '../data/getAllSearchableTopics'
import { useGlobalTopicSearch } from '../hooks/useGlobalTopicSearch'

export default function SearchResultsPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [keyword, setKeyword] = useState(searchParams.get('q') ?? '')

  const allTopics = useMemo(() => getAllSearchableTopics(), [])
  const results = useGlobalTopicSearch(allTopics, keyword)
  const menuIdByTopicId = useMemo(() => new Map(results.map((entry) => [entry.topic.id, entry.menuId])), [results])

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
      <TopicList
        topics={results.map((entry) => entry.topic)}
        onTopicClick={(topic) => {
          const menuId = menuIdByTopicId.get(topic.id)
          if (menuId) navigate(`/${menuId}/${topic.slug}`)
        }}
        emptyMessage="No topics match your search"
      />
    </Box>
  )
}
