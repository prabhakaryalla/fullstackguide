import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { useTheme } from '@mui/material/styles'
import WestRoundedIcon from '@mui/icons-material/WestRounded'
import EastRoundedIcon from '@mui/icons-material/EastRounded'
import MermaidBlock from '../components/MermaidBlock'
import { resolveAdjacentTopicSlugs } from '../data/resolveAdjacentTopicSlugs'
import type { NavigationControlState, TopicConfig } from '../model/types'
import azureTopics from '../data/azure-topics.json'
import dotnetTopics from '../data/dotnet-topics.json'
import csharpTopics from '../data/csharp-topics.json'
import databaseTopics from '../data/database-topics.json'
import aiTopics from '../data/ai-topics.json'
import reactJsTopics from '../data/react-js-topics.json'
import microservicesTopics from '../data/microservices-topics.json'
import systemDesignTopics from '../data/system-design-topics.json'
import leetCodeTopics from '../data/leet-code-topics.json'

// Static lookup — mirrors MainPage; Vite requires literal import paths
const topicConfigMap: Record<string, TopicConfig> = {
  azure: azureTopics as TopicConfig,
  dotnet: dotnetTopics as TopicConfig,
  csharp: csharpTopics as TopicConfig,
  cosmos: databaseTopics as TopicConfig,
  ai: aiTopics as TopicConfig,
  'react-js': reactJsTopics as TopicConfig,
  microservices: microservicesTopics as TopicConfig,
  'system-design': systemDesignTopics as TopicConfig,
  'leet-code': leetCodeTopics as TopicConfig,
}

// Glob all markdown files as raw strings — must be a static literal pattern
const markdownModules = import.meta.glob('../content/**/*.md', {
  query: '?raw',
  import: 'default',
})

type Status = 'loading' | 'ready' | 'unavailable'

export default function TopicInfoPage() {
  const theme = useTheme()
  const { menuSlug = '', topicSlug = '' } = useParams<{ menuSlug: string; topicSlug: string }>()
  const navigate = useNavigate()
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('loading')

  const config = topicConfigMap[menuSlug]
  const topics = config?.topics ?? []
  const topic = config?.topics.find((t) => t.slug === topicSlug)
  const { previousTopicSlug, nextTopicSlug } = resolveAdjacentTopicSlugs(topics, topicSlug)

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

    const key = `../content/${topic.markdownPath}`
    const loader = markdownModules[key]
    if (!loader) {
      if (active) {
        setStatus('unavailable')
      }
      return
    }

    setStatus('loading')
    loader()
      .then((raw) => {
        if (!active) {
          return
        }
        setContent(raw as string)
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

  return (
    <Box sx={{ p: 3, pb: 3, maxWidth: 900, mx: 'auto', minHeight: '100%' }}>
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

      {status === 'ready' && content && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Delegate mermaid fences; render fenced code with language highlighting.
            // react-markdown v9+ no longer passes an `inline` flag, so detect it via the
            // absence of the `language-*` className that only fenced code blocks receive.
            code({ className, children }: { className?: string; children?: ReactNode }) {
              const langMatch = /language-(\w+)/.exec(className ?? '')

              if (!langMatch) {
                return <code className={className}>{children}</code>
              }

              const lang = langMatch[1]
              const code = String(children).trimEnd()

              if (lang === 'mermaid') {
                return <MermaidBlock code={code} />
              }

              const normalizedLang = lang === 'cs' ? 'csharp' : lang

              return (
                <Box
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    overflow: 'hidden',
                    '& pre': { margin: 0 },
                  }}
                >
                  <SyntaxHighlighter
                    language={normalizedLang || 'text'}
                    style={theme.palette.mode === 'dark' ? oneDark : oneLight}
                    showLineNumbers
                    customStyle={{ margin: 0, borderRadius: 0, padding: '1rem' }}
                  >
                    {code}
                  </SyntaxHighlighter>
                </Box>
              )
            },
          }}
        >
          {content}
        </ReactMarkdown>
      )}
    </Box>
  )
}
