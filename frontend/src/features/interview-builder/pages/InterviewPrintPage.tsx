import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import { getSortedMenuItems } from '../../landing/data/getSortedMenuItems'
import { getMenuTopicSource } from '../../main/data/getMenuTopicSource'
import { TAG_DEFINITIONS } from '../../tags/data/tagDefinitions'
import { useInterviewNotes } from '../../interview-notes/hooks/useInterviewNotes'
import { useAdhocQuestions } from '../../adhoc-questions/hooks/useAdhocQuestions'
import { ADHOC_MENU_ID, ADHOC_MENU_LABEL, adhocQuestionToTopic } from '../../adhoc-questions/data/adhocQuestionToTopic'
import { useCandidateInfo } from '../hooks/useCandidateInfo'
import { computeSessionRatingSummary } from '../data/sessionRatingSummary'
import type { Topic, TopicComplexity } from '../../main/model/types'

const menuLabelMap = new Map(getSortedMenuItems().map((item) => [item.id, item.label]))

function resolveMenuLabel(menuId: string): string {
  if (menuId === ADHOC_MENU_ID) {
    return ADHOC_MENU_LABEL
  }
  return menuLabelMap.get(menuId) ?? menuId
}

const complexityColor: Record<TopicComplexity, 'success' | 'warning' | 'error' | 'default'> = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'error',
  Unknown: 'default',
}

// Blank ruled lines for handwritten notes when no digital note exists yet.
function BlankNoteLines() {
  return (
    <Box sx={{ mt: 1 }} data-testid="blank-note-lines">
      {[0, 1].map((line) => (
        <Box key={line} sx={{ height: 22, borderBottom: '1px solid', borderColor: 'divider' }} />
      ))}
    </Box>
  )
}

export default function InterviewPrintPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { getNote } = useInterviewNotes()
  const runId = searchParams.get('run') ?? ''
  const { getCandidateInfo } = useCandidateInfo()
  const candidateInfo = getCandidateInfo(runId)
  const hasCandidateInfo = Boolean(
    candidateInfo.name.trim() ||
      candidateInfo.yearsOfExperience.trim() ||
      candidateInfo.skills.trim() ||
      candidateInfo.notes.trim(),
  )

  const menuIds = useMemo(() => {
    const raw = searchParams.get('menus') ?? searchParams.get('menu') ?? ''
    return raw.split(',').filter(Boolean)
  }, [searchParams])
  const tagId = searchParams.get('tag') ?? ''
  const items = searchParams.get('items') ?? ''
  const customIds = useMemo(() => (searchParams.get('custom') ?? '').split(',').filter(Boolean), [searchParams])
  const { getQuestion } = useAdhocQuestions()
  const sessionQuery = searchParams.toString()

  const pool = useMemo(() => menuIds.flatMap((menuId) => getMenuTopicSource(menuId)), [menuIds])
  const topicMenuMap = useMemo(() => {
    const map = new Map<string, string>()
    for (const menuId of menuIds) {
      for (const topic of getMenuTopicSource(menuId)) {
        map.set(topic.id, menuId)
      }
    }
    for (const id of customIds) {
      map.set(id, ADHOC_MENU_ID)
    }
    return map
  }, [menuIds, customIds])

  const topics: Topic[] = useMemo(() => {
    const bySlug = new Map(pool.map((topic) => [`${topicMenuMap.get(topic.id)}:${topic.slug}`, topic]))
    const resolved = items
      .split(',')
      .map((item) => bySlug.get(item))
      .filter((topic): topic is Topic => topic !== undefined)
    const customTopics = customIds.map((id) => getQuestion(id)).filter((q) => q !== undefined).map(adhocQuestionToTopic)
    return [...resolved, ...customTopics]
  }, [pool, topicMenuMap, items, customIds, getQuestion])

  const menuLabel = menuIds.map((id) => menuLabelMap.get(id) ?? id).join(', ')
  const tagLabel = tagId ? TAG_DEFINITIONS.find((tag) => tag.id === tagId)?.label : undefined
  const generatedOn = useMemo(() => new Date().toLocaleDateString(), [])
  const ratingSummary = useMemo(() => {
    const itemKeys = topics.map((topic) => ({ menuId: topicMenuMap.get(topic.id) ?? '', slug: topic.slug }))
    return computeSessionRatingSummary(runId, itemKeys, getNote)
  }, [topics, topicMenuMap, runId, getNote])

  if (topics.length === 0) {
    return (
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Alert severity="info">This interview session is unavailable or has expired.</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate('/interview-builder')}>
          ← Build a new session
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto', bgcolor: 'background.paper', color: 'text.primary' }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3, '@media print': { display: 'none' } }}
      >
        <Button variant="text" color="inherit" size="small" onClick={() => navigate(`/interview-builder/session?${sessionQuery}`)}>
          ← Back to session
        </Button>
        <Button variant="contained" size="small" onClick={() => window.print()}>
          Print / Save as PDF
        </Button>
      </Stack>

      <Typography variant="h4" component="h1" sx={{ mb: 0.5 }}>
        Interview Question Sheet
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {menuLabel} {tagLabel ? `· ${tagLabel}` : ''} · {topics.length} questions · Generated {generatedOn}
      </Typography>

      {hasCandidateInfo && (
        <Box sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
            Candidate
          </Typography>
          <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
            {candidateInfo.name.trim() && (
              <Typography variant="body2">
                <strong>Name:</strong> {candidateInfo.name}
              </Typography>
            )}
            {candidateInfo.yearsOfExperience.trim() && (
              <Typography variant="body2">
                <strong>Experience:</strong> {candidateInfo.yearsOfExperience}
              </Typography>
            )}
            {candidateInfo.skills.trim() && (
              <Typography variant="body2">
                <strong>Skills:</strong> {candidateInfo.skills}
              </Typography>
            )}
          </Stack>
          {candidateInfo.notes.trim() && (
            <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
              <strong>Notes:</strong> {candidateInfo.notes}
            </Typography>
          )}
        </Box>
      )}

      {ratingSummary.ratedCount > 0 && (
        <Box sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
            Overall Rating
          </Typography>
          <Typography variant="body2">
            {ratingSummary.averageRating?.toFixed(1)} / 5 average, based on {ratingSummary.ratedCount} of{' '}
            {ratingSummary.totalCount} question{ratingSummary.totalCount === 1 ? '' : 's'} rated
            {ratingSummary.skippedCount > 0 ? ` (${ratingSummary.skippedCount} skipped)` : ''}
          </Typography>
        </Box>
      )}

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={3}>
        {topics.map((topic, index) => {
          const menuId = topicMenuMap.get(topic.id) ?? ''
          const note = getNote(runId, menuId, topic.slug)
          const adhocDetail = menuId === ADHOC_MENU_ID ? getQuestion(topic.id)?.detail : undefined
          return (
            <Box key={topic.id} sx={{ breakInside: 'avoid' }}>
              <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
                <Typography variant="subtitle1" component="h2">
                  {index + 1}. {topic.title}
                </Typography>
                <Chip
                  label={topic.complexity ?? 'Unknown'}
                  size="small"
                  color={complexityColor[topic.complexity ?? 'Unknown']}
                />
              </Stack>
              <Typography variant="caption" color="text.secondary">
                {resolveMenuLabel(menuId)}
              </Typography>

              {adhocDetail && (
                <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
                  Expected answer: {adhocDetail}
                </Typography>
              )}

              {note.skipped ? (
                <Chip label="Skipped — not asked" size="small" variant="outlined" sx={{ mt: 1 }} />
              ) : (
                <>
                  {note.rating > 0 && (
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      Rating: {note.rating}/5
                    </Typography>
                  )}
                  {note.note ? (
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      Notes: {note.note}
                    </Typography>
                  ) : (
                    <BlankNoteLines />
                  )}
                </>
              )}
            </Box>
          )
        })}
      </Stack>
    </Box>
  )
}
