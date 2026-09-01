import { useEffect, useMemo, useRef, useState } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TopicCard from './TopicCard'
import type { Topic } from '../model/types'

interface TopicListProps {
  topics: Topic[]
  onTopicClick: (topic: Topic) => void
  emptyMessage?: string
}

const INITIAL_RENDER_BATCH = 120
const RENDER_BATCH_INCREMENT = 120
const LARGE_LIST_THRESHOLD = 300

export default function TopicList({ topics, onTopicClick, emptyMessage = 'No topics available' }: TopicListProps) {
  const [renderedCount, setRenderedCount] = useState(INITIAL_RENDER_BATCH)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setRenderedCount(INITIAL_RENDER_BATCH)
  }, [topics])

  const isLargeList = topics.length > LARGE_LIST_THRESHOLD
  const hasMore = isLargeList && renderedCount < topics.length
  const renderedTopics = useMemo(
    () => (isLargeList ? topics.slice(0, renderedCount) : topics),
    [isLargeList, renderedCount, topics],
  )

  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setRenderedCount((previous) => Math.min(previous + RENDER_BATCH_INCREMENT, topics.length))
        }
      },
      { rootMargin: '300px 0px' },
    )

    observer.observe(loadMoreRef.current)

    return () => {
      observer.disconnect()
    }
  }, [hasMore, topics.length])

  if (topics.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ mt: 4 }}>
        {emptyMessage}
      </Typography>
    )
  }

  return (
    <>
      <Grid container spacing={2}>
        {renderedTopics.map((topic) => (
          <Grid key={topic.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <TopicCard topic={topic} onClick={onTopicClick} />
          </Grid>
        ))}
      </Grid>

      {isLargeList && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Showing {renderedTopics.length} of {topics.length} topics
          </Typography>
        </Box>
      )}

      {hasMore && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => setRenderedCount((previous) => Math.min(previous + RENDER_BATCH_INCREMENT, topics.length))}
          >
            Load More Topics
          </Button>
        </Box>
      )}

      {hasMore && <Box ref={loadMoreRef} sx={{ height: 1 }} />}
    </>
  )
}
