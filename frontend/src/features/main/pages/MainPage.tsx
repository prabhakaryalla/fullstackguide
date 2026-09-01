import { useDeferredValue, useMemo, useState } from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import TopicList from '../components/TopicList'
import TopicSearch from '../components/TopicSearch'
import { useTopicSearch } from '../hooks/useTopicSearch'
import type { ComplexityFilter, Topic } from '../model/types'
import { getSortedMenuItems } from '../../landing/data/getSortedMenuItems'
import { getMenuTopicSource } from '../data/getMenuTopicSource'

const menuItems = getSortedMenuItems()
const menuLabelMap = new Map(menuItems.map((item) => [item.id, item.label]))
const knownMenuIds = new Set(menuItems.map((item) => item.id))

export default function MainPage() {
  const { menuSlug = '' } = useParams<{ menuSlug: string }>()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [complexity, setComplexity] = useState<ComplexityFilter>('All')
  const deferredQuery = useDeferredValue(searchQuery)

  const isKnownMenu = knownMenuIds.has(menuSlug)
  const allTopics: Topic[] = useMemo(() => (isKnownMenu ? getMenuTopicSource(menuSlug) : []), [isKnownMenu, menuSlug])
  const visibleTopics = useTopicSearch(allTopics, deferredQuery, complexity)
  const pageTitle = menuLabelMap.get(menuSlug) ?? menuSlug.replace(/-/g, ' ')
  const isFiltered = Boolean(searchQuery) || complexity !== 'All'

  useEffect(() => {
    setComplexity('All')
  }, [menuSlug])

  function handleTopicClick(topic: Topic) {
    navigate(`/${menuSlug}/${topic.slug}`)
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto', height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5, flexWrap: 'wrap' }}>
        <Typography variant="h4" component="h1" sx={{ textTransform: 'capitalize' }}>
          {pageTitle}
        </Typography>
        {isKnownMenu && (
          // color="primary" omitted — its dark navy tone is unreadable in outlined chips on dark backgrounds
          <Chip label={`${allTopics.length} topics`} size="small" variant="outlined" />
        )}
      </Box>

      {!isKnownMenu && (
        <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
          Topic area unavailable
        </Alert>
      )}

      {isKnownMenu && (
        <>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mt: 2, mb: 3 }}>
            <TopicSearch
              value={searchQuery}
              onChange={setSearchQuery}
              complexity={complexity}
              onComplexityChange={setComplexity}
            />
          </Paper>

          {isFiltered && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Showing {visibleTopics.length} of {allTopics.length} topics
            </Typography>
          )}
        </>
      )}

      <TopicList
        topics={visibleTopics}
        onTopicClick={handleTopicClick}
        emptyMessage={isFiltered ? 'No topics match current filters' : 'No topics available'}
      />
    </Box>
  )
}
