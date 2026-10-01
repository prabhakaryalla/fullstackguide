import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Rating from '@mui/material/Rating'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import TopicMarkdownContent from '../../main/components/TopicMarkdownContent'
import { loadTopicMarkdown } from '../../main/data/loadTopicMarkdown'
import { getMenuTopicSource } from '../../main/data/getMenuTopicSource'
import { getSortedMenuItems } from '../../landing/data/getSortedMenuItems'
import { useFlashcardSession } from '../../flashcards/hooks/useFlashcardSession'
import { useInterviewNotes } from '../../interview-notes/hooks/useInterviewNotes'
import { useAdhocQuestions } from '../../adhoc-questions/hooks/useAdhocQuestions'
import { ADHOC_MENU_ID, ADHOC_MENU_LABEL, adhocQuestionToTopic } from '../../adhoc-questions/data/adhocQuestionToTopic'
import CandidateDetailsForm from '../components/CandidateDetailsForm'
import { useCandidateInfo } from '../hooks/useCandidateInfo'
import { useActiveInterview } from '../hooks/useActiveInterview'
import { useCompletedInterviews } from '../hooks/useCompletedInterviews'
import { useLastCompletedInterview } from '../hooks/useLastCompletedInterview'
import { useInterviewHistory } from '../hooks/useInterviewHistory'
import { buildRunCompletionKey } from '../data/completedInterviewsStorage'
import { generateRunId } from '../data/generateRunId'
import type { Topic, TopicComplexity } from '../../main/model/types'

type ContentStatus = 'loading' | 'ready' | 'unavailable'

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

function formatElapsed(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export default function InterviewRunPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const menuIds = useMemo(() => {
    const raw = searchParams.get('menus') ?? searchParams.get('menu') ?? ''
    return raw.split(',').filter(Boolean)
  }, [searchParams])
  const items = searchParams.get('items') ?? ''
  const customIds = useMemo(() => (searchParams.get('custom') ?? '').split(',').filter(Boolean), [searchParams])
  // Identifies this specific interview occurrence, so ratings/notes never
  // bleed into a later session touching the same topics — normally already
  // set by the Builder, but generated here too as a safety net for older/
  // hand-crafted links that predate this param.
  const runId = searchParams.get('run') ?? ''
  // Scoped to this run (not just the question-set content) so regenerating an
  // identical combination never makes a brand-new, never-conducted run look
  // already completed just because some earlier run had the same questions.
  const sessionKey = useMemo(() => buildRunCompletionKey(runId, items, customIds), [runId, items, customIds])
  useEffect(() => {
    if (runId) {
      return
    }
    setSearchParams(
      (prev) => {
        if (prev.get('run')) {
          return prev
        }
        const params = new URLSearchParams(prev)
        params.set('run', generateRunId())
        return params
      },
      { replace: true },
    )
  }, [runId, setSearchParams])
  // "at" (current question position) is run-page-only state, not part of the
  // session definition — strip it before handing the query off to other pages.
  const sessionQuery = useMemo(() => {
    const params = new URLSearchParams(searchParams)
    params.delete('at')
    return params.toString()
  }, [searchParams])

  // Restores the interviewer's place on remount (e.g. navigating away via the
  // top nav and back, or a browser refresh) instead of always restarting at
  // question 1 — the position previously only lived in React state, so it
  // was silently lost the moment this page unmounted.
  const initialIndexParam = Number.parseInt(searchParams.get('at') ?? '', 10)
  const initialIndex = Number.isFinite(initialIndexParam) && initialIndexParam >= 0 ? initialIndexParam : 0

  const { getQuestion, addQuestion } = useAdhocQuestions()

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

  const customTopics: Topic[] = useMemo(
    () => customIds.map((id) => getQuestion(id)).filter((q) => q !== undefined).map(adhocQuestionToTopic),
    [customIds, getQuestion],
  )

  const topics: Topic[] = useMemo(() => {
    const bySlug = new Map(pool.map((topic) => [`${topicMenuMap.get(topic.id)}:${topic.slug}`, topic]))
    const resolved = items
      .split(',')
      .map((item) => bySlug.get(item))
      .filter((topic): topic is Topic => topic !== undefined)

    // Ask questions topic-area by topic-area, in the order areas were selected,
    // rather than however the session happened to order them (random-mix
    // generation deliberately shuffles across areas) — each area's own
    // relative order is preserved. Ad-hoc questions always run last, as their
    // own "Custom Questions" group.
    const grouped = menuIds.flatMap((menuId) => resolved.filter((topic) => topicMenuMap.get(topic.id) === menuId))
    return [...grouped, ...customTopics]
  }, [pool, topicMenuMap, items, menuIds, customTopics])

  const { currentTopic, currentIndex, revealed, isComplete, reveal, hide, next, previous, goTo } = useFlashcardSession(
    topics,
    initialIndex,
  )
  const [content, setContent] = useState<string | null>(null)
  const [contentStatus, setContentStatus] = useState<ContentStatus>('loading')
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const { getNote, setRating, setNoteText, setSkipped, markAsked } = useInterviewNotes()
  const { setActiveInterview, clearActiveInterview } = useActiveInterview()
  const { markCompleted } = useCompletedInterviews()
  const { setLastCompletedInterview } = useLastCompletedInterview()
  const { getCandidateInfo } = useCandidateInfo()
  const { addHistoryEntry } = useInterviewHistory()
  const [addQuestionOpen, setAddQuestionOpen] = useState(false)
  const [newQuestionTitle, setNewQuestionTitle] = useState('')
  const [newQuestionDetail, setNewQuestionDetail] = useState('')
  const [showCompletionReminder, setShowCompletionReminder] = useState(false)
  const pendingJumpToNewQuestionRef = useRef(false)

  // Keeps the URL's "at" in step with the current question so the position
  // survives navigating away and back (e.g. via the top nav) instead of
  // always restarting at question 1 — call this alongside whatever moved
  // `currentIndex` (never from a `useEffect` on currentIndex: two separate
  // setSearchParams calls in the same event would race, since react-router's
  // updater always reads from the same render's searchParams snapshot).
  function syncIndexToUrl(index: number) {
    setSearchParams(
      (prev) => {
        if (prev.get('at') === String(index)) {
          return prev
        }
        const params = new URLSearchParams(prev)
        params.set('at', String(index))
        return params
      },
      { replace: true },
    )
  }

  function handlePrevious() {
    previous()
    syncIndexToUrl(Math.max(0, currentIndex - 1))
  }

  function handleNext() {
    next()
    syncIndexToUrl(Math.min(currentIndex + 1, topics.length))
  }

  function handleJumpToArea(index: number) {
    goTo(index)
    syncIndexToUrl(index)
  }

  // Lets the interviewer deliberately finish early, without stepping Next
  // through every remaining question — reuses the same "index reached the
  // end" mechanic `isComplete` already checks for.
  function handleMarkComplete() {
    goTo(topics.length)
    syncIndexToUrl(topics.length)
  }

  // One entry per distinct area actually present in this session (in the same
  // topic-wise order `topics` is grouped by), pointing at that area's first
  // question index — lets the interviewer jump straight there instead of
  // clicking Next through every remaining question in the current area.
  const areaJumpOptions = useMemo(() => {
    const seenMenuIds = new Set<string>()
    const options: { menuId: string; label: string; firstIndex: number }[] = []
    topics.forEach((topic, index) => {
      const menuId = topicMenuMap.get(topic.id) ?? ''
      if (!seenMenuIds.has(menuId)) {
        seenMenuIds.add(menuId)
        options.push({ menuId, label: resolveMenuLabel(menuId), firstIndex: index })
      }
    })
    return options
  }, [topics, topicMenuMap])
  const currentMenuId = currentTopic ? (topicMenuMap.get(currentTopic.id) ?? '') : ''
  const noteEntry = currentTopic ? getNote(runId, currentMenuId, currentTopic.slug) : { rating: 0, note: '' }

  useEffect(() => {
    let active = true

    if (!currentTopic) {
      return
    }

    // Ad-hoc questions carry no markdown file — show the interviewer's own
    // typed notes/expected-answer text directly instead of trying to load one.
    if (currentMenuId === ADHOC_MENU_ID) {
      const detail = getQuestion(currentTopic.id)?.detail ?? ''
      setContent(detail)
      setContentStatus(detail ? 'ready' : 'unavailable')
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
  }, [currentTopic, currentMenuId, getQuestion])

  // A simple per-question stopwatch so the interviewer can gauge pacing —
  // resets whenever the current question changes.
  useEffect(() => {
    setElapsedSeconds(0)
    if (isComplete) {
      return
    }
    const interval = setInterval(() => setElapsedSeconds((previous) => previous + 1), 1000)
    return () => clearInterval(interval)
  }, [currentIndex, isComplete])

  // Record every question in this session as "asked" once, so the builder can
  // later exclude/de-prioritize them for a different candidate. Keyed on the
  // raw `items` string (not the derived `topics` array) so this fires exactly
  // once per distinct session, not on every re-render.
  useEffect(() => {
    if (topics.length === 0) {
      return
    }
    markAsked(topics.map((topic) => ({ menuId: topicMenuMap.get(topic.id) ?? '', slug: topic.slug })))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  // Lets the interviewer wander off to browse other topics via the top nav
  // and still find their way back to this exact question — cleared once the
  // interview is finished, since there's nothing left to resume. Reaching the
  // end also permanently records this session's content as completed, which
  // is what unlocks Print / Export on the Session Review page.
  useEffect(() => {
    if (topics.length === 0) {
      return
    }
    if (isComplete) {
      clearActiveInterview()
      markCompleted(sessionKey)
      // Remembers this exact run (menus/items/custom/run, via `sessionQuery`)
      // so the interviewer can find their way back to review/print it later
      // — e.g. from the Builder page — without needing the original URL.
      setLastCompletedInterview({ search: sessionQuery, totalQuestions: topics.length })
      // Unlike the pointer above (which only ever tracks the ONE most recent
      // run), this accumulates so a past candidate's session is still
      // reachable after a later, different interview completes.
      addHistoryEntry({
        runId,
        search: sessionQuery,
        candidateName: getCandidateInfo(runId).name,
        totalQuestions: topics.length,
      })
      setShowCompletionReminder(true)
      return
    }
    setActiveInterview({ search: searchParams.toString(), currentIndex, totalQuestions: topics.length })
  }, [
    searchParams,
    currentIndex,
    topics.length,
    isComplete,
    setActiveInterview,
    clearActiveInterview,
    markCompleted,
    sessionKey,
    setLastCompletedInterview,
    sessionQuery,
    runId,
    getCandidateInfo,
    addHistoryEntry,
  ])

  // Defensive guard: the completion reminder should never be showing while
  // the interview is verifiably not complete (e.g. a transient render where
  // `currentIndex` briefly outran a not-yet-updated `topics` array).
  useEffect(() => {
    if (!isComplete) {
      setShowCompletionReminder(false)
    }
  }, [isComplete])

  function handleExit() {
    // Session Review shows exactly what's in this session (topics, custom
    // questions, completion status) — its own "Start interview" button now
    // resumes at the right question via the active-interview pointer, so
    // this is a real "pause and come back" destination, not a dead end.
    navigate(`/interview-builder/session?${sessionQuery}`)
  }

  function handlePrintExport() {
    setShowCompletionReminder(false)
    navigate(`/interview-builder/print?${sessionQuery}`)
  }

  function handleAddQuestion() {
    if (!newQuestionTitle.trim()) {
      return
    }
    const question = addQuestion({ title: newQuestionTitle, detail: newQuestionDetail })
    const nextCustomIds = [...customIds, question.id]
    // Land on the newly-added question right away, once it's actually present
    // in `topics` (see the effect below) — ad-hoc questions always append to
    // the end, so this "insert in the middle of the interview" jumps straight
    // to it rather than merely queuing it for later.
    pendingJumpToNewQuestionRef.current = true
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev)
        params.set('custom', nextCustomIds.join(','))
        return params
      },
      { replace: true },
    )
    setNewQuestionTitle('')
    setNewQuestionDetail('')
    setAddQuestionOpen(false)
  }

  // `topics` only grows to include a newly-added ad-hoc question once the
  // `custom` URL param write above actually lands — a separate, and
  // sometimes later-committing, state update than this component's local
  // `currentIndex`. Jumping eagerly (in the same tick as the URL write)
  // left a one-render window where `currentIndex` could momentarily exceed
  // the still-stale `topics.length`, which the completion-detection effect
  // misread as "interview finished". Deferring the jump to here, keyed off
  // `topics.length` itself, guarantees it only fires once the new question
  // is actually present.
  useEffect(() => {
    if (!pendingJumpToNewQuestionRef.current) {
      return
    }
    pendingJumpToNewQuestionRef.current = false
    const newIndex = topics.length - 1
    goTo(newIndex)
    syncIndexToUrl(newIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics.length])

  if (topics.length === 0) {
    return (
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        <Alert severity="info">This interview session is unavailable or has expired.</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate('/interview-builder')}>
          ← Build a new session
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto', minHeight: '100%' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4" component="h1">
          Live Interview
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button onClick={() => setAddQuestionOpen(true)} variant="outlined" size="small">
            + Add question
          </Button>
          {!isComplete && (
            <Button onClick={handleMarkComplete} variant="outlined" color="success" size="small">
              Mark complete
            </Button>
          )}
          <Button onClick={handleExit} variant="text" color="inherit" size="small">
            Exit
          </Button>
        </Stack>
      </Stack>

      <CandidateDetailsForm runId={runId} />

      {!isComplete && (
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }} flexWrap="wrap">
          <Typography variant="body2" color="text.secondary">
            Question {currentIndex + 1} of {topics.length}
          </Typography>
          <Chip
            icon={<TimerOutlinedIcon fontSize="small" />}
            label={formatElapsed(elapsedSeconds)}
            size="small"
            variant="outlined"
          />
          {areaJumpOptions.length > 1 && (
            <TextField
              select
              size="small"
              label="Jump to topic area"
              value={currentTopic ? (topicMenuMap.get(currentTopic.id) ?? '') : ''}
              onChange={(e) => {
                const option = areaJumpOptions.find((area) => area.menuId === e.target.value)
                if (option) handleJumpToArea(option.firstIndex)
              }}
              sx={{ minWidth: 200, ml: 'auto' }}
              inputProps={{ 'aria-label': 'Jump to topic area' }}
            >
              {areaJumpOptions.map((option) => (
                <MenuItem key={option.menuId} value={option.menuId}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Stack>
      )}

      {isComplete && (
        <Paper variant="outlined" sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Interview complete — you've gone through every question
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap>
            <Button variant="outlined" onClick={handleExit}>
              Back to session
            </Button>
            <Button variant="outlined" onClick={handlePrintExport}>
              Print / Export
            </Button>
            <Button variant="contained" onClick={() => navigate('/interview-builder')}>
              Build another session
            </Button>
          </Stack>
        </Paper>
      )}

      {!isComplete && currentTopic && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
              <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1} sx={{ mb: 2 }}>
                <Typography variant="h5" component="h2">
                  {currentTopic.title}
                </Typography>
                <Chip
                  label={currentTopic.complexity ?? 'Unknown'}
                  size="small"
                  color={complexityColor[currentTopic.complexity ?? 'Unknown']}
                />
              </Stack>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                {resolveMenuLabel(currentMenuId)}
              </Typography>

              <Button variant={revealed ? 'outlined' : 'contained'} onClick={revealed ? hide : reveal}>
                {revealed ? 'Hide answer' : 'Reveal answer'}
              </Button>

              {!revealed && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Rate and take notes on the candidate's spoken answer any time — you don't need to reveal this
                  question's answer first.
                </Typography>
              )}

              {revealed && (
                <Box sx={{ mt: 2 }}>
                  {contentStatus === 'loading' && <CircularProgress size={24} />}
                  {contentStatus === 'unavailable' && (
                    <Typography color="text.secondary">
                      {currentMenuId === ADHOC_MENU_ID ? 'No notes added for this ad-hoc question.' : 'Content unavailable'}
                    </Typography>
                  )}
                  {contentStatus === 'ready' && content && <TopicMarkdownContent content={content} />}
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            {/* Stays in view while the (potentially long) revealed content on
                the left is scrolled, so rating/notes are never a scroll away. */}
            <Paper
              variant="outlined"
              sx={{ p: 3, borderRadius: 2, position: { md: 'sticky' }, top: { md: 88 } }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="subtitle2">Interviewer notes</Typography>
                {!noteEntry.skipped && (
                  <Button
                    size="small"
                    color="inherit"
                    onClick={() => setSkipped(runId, currentMenuId, currentTopic.slug, true)}
                  >
                    Skip question
                  </Button>
                )}
              </Stack>

              {noteEntry.skipped ? (
                <Stack spacing={1} alignItems="flex-start">
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    Marked as skipped — this question won't be shown as asked on the printed sheet.
                  </Typography>
                  <Button size="small" onClick={() => setSkipped(runId, currentMenuId, currentTopic.slug, false)}>
                    Ask it after all
                  </Button>
                </Stack>
              ) : (
                <>
                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                    <Rating
                      value={noteEntry.rating || null}
                      onChange={(_event, value) => setRating(runId, currentMenuId, currentTopic.slug, value ?? 0)}
                    />
                    {noteEntry.rating > 0 && (
                      <Typography variant="body2" color="text.secondary">
                        {noteEntry.rating}/5
                      </Typography>
                    )}
                  </Stack>
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    placeholder="Notes on the candidate's answer…"
                    value={noteEntry.note}
                    onChange={(e) => setNoteText(runId, currentMenuId, currentTopic.slug, e.target.value)}
                    inputProps={{ 'aria-label': 'Interviewer notes' }}
                  />
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}

      <Stack direction="row" spacing={2} sx={{ mt: 3 }} justifyContent="center">
        <Button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </Button>
        {/* Stops one question short of the end — completing is only ever
            triggered by the explicit "Mark complete" button below, never by
            an extra Next click, so it can't happen by accident. */}
        <Button onClick={handleNext} disabled={currentIndex >= topics.length - 1}>
          Next
        </Button>
      </Stack>

      <Dialog open={addQuestionOpen} onClose={() => setAddQuestionOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add an ad-hoc question</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Question"
              fullWidth
              autoFocus
              value={newQuestionTitle}
              onChange={(e) => setNewQuestionTitle(e.target.value)}
              inputProps={{ 'aria-label': 'Ad-hoc question title' }}
            />
            <TextField
              label="Notes / expected answer (optional)"
              fullWidth
              multiline
              minRows={3}
              value={newQuestionDetail}
              onChange={(e) => setNewQuestionDetail(e.target.value)}
              inputProps={{ 'aria-label': 'Ad-hoc question notes' }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddQuestionOpen(false)}>Cancel</Button>
          <Button variant="contained" disabled={!newQuestionTitle.trim()} onClick={handleAddQuestion}>
            Ask now
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showCompletionReminder} onClose={() => setShowCompletionReminder(false)} fullWidth maxWidth="sm">
        <DialogTitle>Interview complete</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            The ratings and notes from this interview only live in this browser — there's no server copy. Print or
            export a record now so you don't lose it.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCompletionReminder(false)}>Not now</Button>
          <Button variant="contained" onClick={handlePrintExport}>
            Print / Export
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
