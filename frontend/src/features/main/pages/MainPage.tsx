import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TopicList from '../components/TopicList'
import TopicSearch from '../components/TopicSearch'
import ResetProgressDialog from '../components/ResetProgressDialog'
import { useTopicSearch } from '../hooks/useTopicSearch'
import type { ComplexityFilter, Topic } from '../model/types'
import { getSortedMenuItems } from '../../landing/data/getSortedMenuItems'
import { getMenuTopicSource } from '../data/getMenuTopicSource'
import { useTopicProgress } from '../../progress/hooks/useTopicProgress'
import { useMenuProgressSummary } from '../../progress/hooks/useMenuProgressSummary'
import { useBookmarks } from '../../bookmarks/hooks/useBookmarks'
import { isFlashcardEligibleMenu } from '../../flashcards/data/flashcardEligibleMenus'
import { getTopicTagsIndex } from '../../tags/data/getTopicTagsIndex'

const menuItems = getSortedMenuItems()
const menuLabelMap = new Map(menuItems.map((item) => [item.id, item.label]))
const knownMenuIds = new Set(menuItems.map((item) => item.id))

export default function MainPage() {
  const { menuSlug = '' } = useParams<{ menuSlug: string }>()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [complexity, setComplexity] = useState<ComplexityFilter>('All')
  const [resetDialogOpen, setResetDialogOpen] = useState(false)
  const deferredQuery = useDeferredValue(searchQuery)

  const isKnownMenu = knownMenuIds.has(menuSlug)
  const allTopics: Topic[] = useMemo(() => (isKnownMenu ? getMenuTopicSource(menuSlug) : []), [isKnownMenu, menuSlug])
  const visibleTopics = useTopicSearch(allTopics, deferredQuery, complexity)
  const pageTitle = menuLabelMap.get(menuSlug) ?? menuSlug.replace(/-/g, ' ')
  const isFiltered = Boolean(searchQuery) || complexity !== 'All'
  const { isCompleted, resetMenuProgress } = useTopicProgress()
  const { completed: completedCount, total: totalCount } = useMenuProgressSummary(menuSlug, allTopics)
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const flashcardsEligible = isFlashcardEligibleMenu(menuSlug)
  const [tagsIndex, setTagsIndex] = useState<Map<string, string[]> | null>(null)

  useEffect(() => {
    let active = true
    getTopicTagsIndex()
      .then((index) => {
        if (active) setTagsIndex(index)
      })
      .catch(() => {
        // Tag indicators are a progressive enhancement — ignore failures.
      })
    return () => {
      active = false
    }
  }, [])

  function handleFlashcardsClick() {
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (complexity !== 'All') params.set('complexity', complexity)
    const suffix = params.toString()
    navigate(`/${menuSlug}/flashcards${suffix ? `?${suffix}` : ''}`)
  }

  useEffect(() => {
    setComplexity('All')
  }, [menuSlug])

  function handleTopicClick(topic: Topic) {
    navigate(`/${menuSlug}/${topic.slug}`)
  }

  return (
    <Box sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5, flexWrap: 'wrap' }}>
        <Typography variant="h4" component="h1" sx={{ textTransform: 'capitalize' }}>
          {pageTitle}
        </Typography>
        {isKnownMenu && (
          // color="primary" omitted — its dark navy tone is unreadable in outlined chips on dark backgrounds
          <Chip label={`${allTopics.length} topics`} size="small" variant="outlined" />
        )}
        {isKnownMenu && totalCount > 0 && (
          <Chip label={`${completedCount}/${totalCount} completed`} size="small" color="success" variant="outlined" />
        )}
        {isKnownMenu && completedCount > 0 && (
          <Button size="small" color="inherit" onClick={() => setResetDialogOpen(true)}>
            Reset progress
          </Button>
        )}
        {isKnownMenu && flashcardsEligible && (
          <Button size="small" variant="outlined" disabled={visibleTopics.length === 0} onClick={handleFlashcardsClick}>
            Flashcards
          </Button>
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
        isTopicCompleted={(topic) => isCompleted(menuSlug, topic.slug)}
        isTopicBookmarked={(topic) => isBookmarked(menuSlug, topic.slug)}
        onToggleBookmark={(topic) => toggleBookmark(menuSlug, topic.slug)}
        getTags={(topic) => tagsIndex?.get(topic.id)}
      />

      <ResetProgressDialog
        open={resetDialogOpen}
        menuLabel={pageTitle}
        completedCount={completedCount}
        onCancel={() => setResetDialogOpen(false)}
        onConfirm={() => {
          resetMenuProgress(menuSlug)
          setResetDialogOpen(false)
        }}
      />
    </Box>
  )
}
