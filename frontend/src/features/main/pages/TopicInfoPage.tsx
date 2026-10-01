import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import ToggleButton from '@mui/material/ToggleButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import WestRoundedIcon from '@mui/icons-material/WestRounded'
import EastRoundedIcon from '@mui/icons-material/EastRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded'
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded'
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded'
import TopicMarkdownContent from '../components/TopicMarkdownContent'
import { loadTopicMarkdown } from '../data/loadTopicMarkdown'
import { resolveAdjacentTopicSlugs } from '../data/resolveAdjacentTopicSlugs'
import { useTopicProgress } from '../../progress/hooks/useTopicProgress'
import { useBookmarks } from '../../bookmarks/hooks/useBookmarks'
import RelatedTopicsSection from '../../related-topics/components/RelatedTopicsSection'
import TagChipList from '../../tags/components/TagChipList'
import { useTopicTags } from '../../tags/hooks/useTopicTags'
import type { NavigationControlState, TopicConfig } from '../model/types'
import awsTopics from '../data/aws-topics.json'
import azureTopics from '../data/azure-topics.json'
import dotnetTopics from '../data/dotnet-topics.json'
import csharpTopics from '../data/csharp-topics.json'
import csharpProgramsTopics from '../data/csharp-programs-topics.json'
import databaseTopics from '../data/database-topics.json'
import aiTopics from '../data/ai-topics.json'
import angularTopics from '../data/angular-topics.json'
import designPatternsTopics from '../data/design-patterns-topics.json'
import javascriptTopics from '../data/javascript-topics.json'
import javascriptProgramsTopics from '../data/javascript-programs-topics.json'
import reactJsTopics from '../data/react-js-topics.json'
import sqlTopics from '../data/sql-topics.json'
import sqlProgramsTopics from '../data/sql-programs-topics.json'
import microservicesTopics from '../data/microservices-topics.json'
import systemDesignTopics from '../data/system-design-topics.json'
import leetCodeTopics from '../data/leet-code-topics.json'

// Static lookup — mirrors MainPage; Vite requires literal import paths
const topicConfigMap: Record<string, TopicConfig> = {
  aws: awsTopics as TopicConfig,
  azure: azureTopics as TopicConfig,
  dotnet: dotnetTopics as TopicConfig,
  csharp: csharpTopics as TopicConfig,
  'csharp-programs': csharpProgramsTopics as TopicConfig,
  cosmos: databaseTopics as TopicConfig,
  ai: aiTopics as TopicConfig,
  angular: angularTopics as TopicConfig,
  'design-patterns': designPatternsTopics as TopicConfig,
  javascript: javascriptTopics as TopicConfig,
  'javascript-programs': javascriptProgramsTopics as TopicConfig,
  'react-js': reactJsTopics as TopicConfig,
  sql: sqlTopics as TopicConfig,
  'sql-programs': sqlProgramsTopics as TopicConfig,
  microservices: microservicesTopics as TopicConfig,
  'system-design': systemDesignTopics as TopicConfig,
  'leet-code': leetCodeTopics as TopicConfig,
}

// Glob all markdown files as raw strings — must be a static literal pattern
type Status = 'loading' | 'ready' | 'unavailable'

export default function TopicInfoPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { menuSlug = '', topicSlug = '' } = useParams<{ menuSlug: string; topicSlug: string }>()
  const navigate = useNavigate()
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('loading')

  const config = topicConfigMap[menuSlug]
  const topics = config?.topics ?? []
  const topic = config?.topics.find((t) => t.slug === topicSlug)
  const { previousTopicSlug, nextTopicSlug } = resolveAdjacentTopicSlugs(topics, topicSlug)
  const { isCompleted, toggleCompletion } = useTopicProgress()
  const completed = Boolean(topic) && isCompleted(menuSlug, topicSlug)
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const bookmarked = Boolean(topic) && isBookmarked(menuSlug, topicSlug)
  const { tagIds } = useTopicTags(topic?.id ?? '')

  const navigationState: NavigationControlState = {
    previousEnabled: Boolean(previousTopicSlug) && status !== 'unavailable',
    nextEnabled: Boolean(nextTopicSlug) && status !== 'unavailable',
    showControls: Boolean(topic),
  }

  useEffect(() => {
    let active = true

    if (!topic) {
      if (active) {
        setStatus('unavailable')
      }
      return
    }

    setStatus('loading')
    loadTopicMarkdown(topic)
      .then((raw) => {
        if (!active) {
          return
        }
        if (raw === null) {
          setStatus('unavailable')
          return
        }
        setContent(raw)
        setStatus('ready')
      })
      .catch(() => {
        if (active) {
          setStatus('unavailable')
        }
      })

    return () => {
      active = false
    }
  }, [topic])

  // Reset scroll position when navigating between topics so the new page opens at the top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [menuSlug, topicSlug])

  // Let ArrowRight/ArrowLeft mirror the Next/Previous Fab buttons — desktop only
  useEffect(() => {
    if (isMobile) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (!navigationState.showControls) {
        return
      }

      if (event.key === 'ArrowRight' && navigationState.nextEnabled && nextTopicSlug) {
        navigate(`/${menuSlug}/${nextTopicSlug}`)
      } else if (event.key === 'ArrowLeft' && navigationState.previousEnabled && previousTopicSlug) {
        navigate(`/${menuSlug}/${previousTopicSlug}`)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    isMobile,
    menuSlug,
    navigate,
    navigationState.nextEnabled,
    navigationState.previousEnabled,
    navigationState.showControls,
    nextTopicSlug,
    previousTopicSlug,
  ])

  return (
    <Box sx={{ p: 3, pb: 3, maxWidth: 1200, mx: 'auto', minHeight: '100%' }}>
      <Button
        onClick={() => navigate(`/${menuSlug}`)}
        sx={{ mb: 2 }}
        variant="text"
        color="inherit"
        size="small"
      >
        ← Back to {menuSlug}
      </Button>

      {status === 'loading' && <CircularProgress size={24} />}

      {status === 'unavailable' && (
        <Typography color="text.secondary">Content unavailable</Typography>
      )}

      {navigationState.showControls && (
        <>
          <Tooltip title="Previous topic" placement="right">
            <span
              style={{
                position: 'fixed',
                left: 16,
                bottom: 24,
                zIndex: theme.zIndex.appBar - 1,
              }}
            >
              <Fab
                size="medium"
                disabled={!navigationState.previousEnabled}
                onClick={() => {
                  if (previousTopicSlug) {
                    navigate(`/${menuSlug}/${previousTopicSlug}`)
                  }
                }}
                sx={{
                  bgcolor: (t) => (t.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.85)'),
                  color: (t) => (t.palette.mode === 'dark' ? t.palette.common.white : t.palette.text.primary),
                  border: '1px solid',
                  borderColor: (t) => (t.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.12)'),
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  boxShadow: 3,
                  '&:hover': {
                    bgcolor: (t) => (t.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 1)'),
                  },
                  '&.Mui-disabled': {
                    bgcolor: (t) => (t.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.5)'),
                    color: (t) => (t.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.28)' : 'rgba(0, 0, 0, 0.26)'),
                    borderColor: (t) => (t.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'),
                  },
                }}
                aria-label="Previous"
              >
                <WestRoundedIcon />
              </Fab>
            </span>
          </Tooltip>

          <Tooltip title="Next topic" placement="left">
            <span
              style={{
                position: 'fixed',
                right: 16,
                bottom: 24,
                zIndex: theme.zIndex.appBar - 1,
              }}
            >
              <Fab
                size="medium"
                disabled={!navigationState.nextEnabled}
                onClick={() => {
                  if (nextTopicSlug) {
                    navigate(`/${menuSlug}/${nextTopicSlug}`)
                  }
                }}
                sx={{
                  bgcolor: (t) => (t.palette.mode === 'dark' ? t.palette.primary.dark : t.palette.primary.main),
                  color: (t) => t.palette.getContrastText(t.palette.mode === 'dark' ? t.palette.primary.dark : t.palette.primary.main),
                  border: '1px solid',
                  borderColor: (t) => (t.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.16)' : 'transparent'),
                  boxShadow: 3,
                  '&:hover': {
                    bgcolor: (t) => (t.palette.mode === 'dark' ? t.palette.primary.main : t.palette.primary.dark),
                  },
                  '&.Mui-disabled': {
                    bgcolor: (t) => (t.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.12)'),
                    color: (t) => (t.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.28)' : 'rgba(0, 0, 0, 0.26)'),
                  },
                }}
                aria-label="Next"
              >
                <EastRoundedIcon />
              </Fab>
            </span>
          </Tooltip>
        </>
      )}

      {Boolean(topic) && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 2 }}>
          <ToggleButton
            value="bookmarked"
            selected={bookmarked}
            onChange={() => toggleBookmark(menuSlug, topicSlug)}
            size="small"
            color="primary"
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this topic'}
          >
            {bookmarked ? <BookmarkRoundedIcon fontSize="small" sx={{ mr: 1 }} /> : <BookmarkBorderRoundedIcon fontSize="small" sx={{ mr: 1 }} />}
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </ToggleButton>
          <ToggleButton
            value="completed"
            selected={completed}
            onChange={() => toggleCompletion(menuSlug, topicSlug)}
            size="small"
            color="success"
            aria-label={completed ? 'Mark as not complete' : 'Mark as complete'}
          >
            {completed ? <CheckCircleRoundedIcon fontSize="small" sx={{ mr: 1 }} /> : <RadioButtonUncheckedRoundedIcon fontSize="small" sx={{ mr: 1 }} />}
            {completed ? 'Completed' : 'Mark as complete'}
          </ToggleButton>
        </Box>
      )}

      {topic && tagIds.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <TagChipList tagIds={tagIds} onTagClick={(tagId) => navigate(`/tags/${tagId}`)} />
        </Box>
      )}

      {status === 'ready' && content && <TopicMarkdownContent content={content} />}

      {topic && <RelatedTopicsSection topic={topic} />}
    </Box>
  )
}
