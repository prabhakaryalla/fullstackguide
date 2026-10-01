import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import TopicMarkdownContent from '../../main/components/TopicMarkdownContent'
import { loadTopicMarkdown } from '../../main/data/loadTopicMarkdown'
import { getMenuTopicSource } from '../../main/data/getMenuTopicSource'
import { useTopicSearch } from '../../main/hooks/useTopicSearch'
import { useTopicProgress } from '../../progress/hooks/useTopicProgress'
import { isFlashcardEligibleMenu } from '../data/flashcardEligibleMenus'
import { useFlashcardSession } from '../hooks/useFlashcardSession'
import type { ComplexityFilter } from '../../main/model/types'

type ContentStatus = 'loading' | 'ready' | 'unavailable'

export default function FlashcardSessionPage() {
  const { menuSlug = '' } = useParams<{ menuSlug: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const eligible = isFlashcardEligibleMenu(menuSlug)

  const allTopics = eligible ? getMenuTopicSource(menuSlug) : []
  const query = searchParams.get('q') ?? ''
  const complexity = (searchParams.get('complexity') as ComplexityFilter | null) ?? 'All'
  const topics = useTopicSearch(allTopics, query, complexity)

  const { currentTopic, currentIndex, revealed, isComplete, reveal, next, previous } = useFlashcardSession(topics)
  const { isCompleted, toggleCompletion } = useTopicProgress()
  const [content, setContent] = useState<string | null>(null)
  const [contentStatus, setContentStatus] = useState<ContentStatus>('loading')

  useEffect(() => {
    let active = true

    if (!currentTopic) {
      return
    }

    setContentStatus('loading')
    loadTopicMarkdown(currentTopic)
      .then((raw) => {
        if (!active) {
          return
        }
        if (raw === null) {
          setContentStatus('unavailable')
          return
        }
        setContent(raw)
        setContentStatus('ready')
      })
      .catch(() => {
        if (active) {
          setContentStatus('unavailable')
        }
      })

    return () => {
      active = false
    }
  }, [currentTopic])

  function handleGotIt() {
    if (currentTopic && !isCompleted(menuSlug, currentTopic.slug)) {
      toggleCompletion(menuSlug, currentTopic.slug)
    }
    next()
  }

  if (!eligible || topics.length === 0) {
    return (
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Alert severity="info">Flashcards are unavailable for this menu.</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate(`/${menuSlug}`)}>
          ← Back to {menuSlug}
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto', minHeight: '100%' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4" component="h1">
          Flashcards
        </Typography>
        <Button onClick={() => navigate(`/${menuSlug}`)} variant="text" color="inherit" size="small">
          Exit
        </Button>
      </Stack>

      {!isComplete && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Card {currentIndex + 1} of {topics.length}
        </Typography>
      )}

      {isComplete && (
        <Paper variant="outlined" sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            You've reviewed every card
          </Typography>
          <Button variant="contained" onClick={() => navigate(`/${menuSlug}`)}>
            Back to topic list
          </Button>
        </Paper>
      )}

      {!isComplete && currentTopic && (
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            {currentTopic.title}
          </Typography>

          {!revealed && (
            <Button variant="contained" onClick={reveal}>
              Show Answer
            </Button>
          )}

          {revealed && (
            <>
              {contentStatus === 'loading' && <CircularProgress size={24} />}
              {contentStatus === 'unavailable' && (
                <Typography color="text.secondary">Content unavailable</Typography>
              )}
              {contentStatus === 'ready' && content && <TopicMarkdownContent content={content} />}

              <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                <Button variant="contained" color="success" onClick={handleGotIt}>
                  Got it
                </Button>
                <Button variant="outlined" onClick={next}>
                  Still learning
                </Button>
              </Stack>
            </>
          )}
        </Paper>
      )}

      <Stack direction="row" spacing={2} sx={{ mt: 3 }} justifyContent="center">
        <Button onClick={previous} disabled={currentIndex === 0}>
          Previous
        </Button>
        <Button onClick={next} disabled={isComplete}>
          Next
        </Button>
      </Stack>
    </Box>
  )
}
