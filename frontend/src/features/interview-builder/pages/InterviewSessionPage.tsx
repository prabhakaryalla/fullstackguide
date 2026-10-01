import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import PrintRoundedIcon from '@mui/icons-material/PrintRounded'
import LinkRoundedIcon from '@mui/icons-material/LinkRounded'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import TopicList from '../../main/components/TopicList'
import TopicSearch from '../../main/components/TopicSearch'
import { getSortedMenuItems } from '../../landing/data/getSortedMenuItems'
import { getMenuTopicSource } from '../../main/data/getMenuTopicSource'
import { TAG_DEFINITIONS } from '../../tags/data/tagDefinitions'
import { useAdhocQuestions } from '../../adhoc-questions/hooks/useAdhocQuestions'
import { useInterviewNotes } from '../../interview-notes/hooks/useInterviewNotes'
import CandidateDetailsForm from '../components/CandidateDetailsForm'
import { useCandidateInfo } from '../hooks/useCandidateInfo'
import { useActiveInterview } from '../hooks/useActiveInterview'
import { useCompletedInterviews } from '../hooks/useCompletedInterviews'
import { buildSessionCompletionKey, buildRunCompletionKey } from '../data/completedInterviewsStorage'
import { generateRunId } from '../data/generateRunId'
import { ADHOC_MENU_ID } from '../../adhoc-questions/data/adhocQuestionToTopic'
import { computeSessionRatingSummary } from '../data/sessionRatingSummary'
import type { ComplexityCounts } from '../model/types'
import type { ComplexityFilter, Topic, TopicComplexity } from '../../main/model/types'

// LeetCode is an algorithm-practice menu (~3,780 topics) — excluded from the
// "add from topic list" catalog for the same reason the Builder page excludes
// it: it would dominate an unscoped search.
const EXCLUDED_MENU_IDS = new Set(['leet-code'])
const allMenuItems = getSortedMenuItems().filter(
  (item) => !EXCLUDED_MENU_IDS.has(item.id) && getMenuTopicSource(item.id).length > 0,
)
const globalTopicMenuMap = new Map<string, string>()
for (const item of allMenuItems) {
  for (const topic of getMenuTopicSource(item.id)) {
    globalTopicMenuMap.set(topic.id, item.id)
  }
}

const complexityColor: Record<TopicComplexity, 'success' | 'warning' | 'error' | 'default'> = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'error',
  Unknown: 'default',
}

const menuLabelMap = new Map(getSortedMenuItems().map((item) => [item.id, item.label]))

// Topic areas render as a wrapped chip row (not a run-on comma string) so the
// header stays scannable even when a session spans many areas — overflow
// collapses into a single "+N more" chip with the rest available on hover.
const MAX_VISIBLE_AREA_CHIPS = 6

function parseCount(value: string | null): number {
  const parsed = Number.parseInt(value ?? '', 10)
  return Number.isNaN(parsed) ? 0 : Math.max(0, parsed)
}

export default function InterviewSessionPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [copied, setCopied] = useState(false)

  const menuIds = useMemo(() => {
    const raw = searchParams.get('menus') ?? searchParams.get('menu') ?? ''
    return raw.split(',').filter(Boolean)
  }, [searchParams])
  const tagId = searchParams.get('tag') ?? ''
  const items = searchParams.get('items') ?? ''
  const runId = searchParams.get('run') ?? ''
  const customIds = useMemo(() => (searchParams.get('custom') ?? '').split(',').filter(Boolean), [searchParams])
  const { getQuestion, addQuestion } = useAdhocQuestions()
  const customQuestions = useMemo(
    () => customIds.map((id) => getQuestion(id)).filter((q) => q !== undefined),
    [customIds, getQuestion],
  )
  // Custom/ad-hoc questions live only in this browser's storage — a shared
  // link opened elsewhere resolves the real topic `items` fine (bundled data)
  // but silently can't find these, so surface the gap instead of just quietly
  // showing fewer questions than the link actually contains.
  const missingCustomCount = customIds.length - customQuestions.length
  const [addQuestionOpen, setAddQuestionOpen] = useState(false)
  const [addMode, setAddMode] = useState<'catalog' | 'adhoc'>('catalog')
  const [newQuestionTitle, setNewQuestionTitle] = useState('')
  const [newQuestionDetail, setNewQuestionDetail] = useState('')
  const [catalogAreaId, setCatalogAreaId] = useState('all')
  const [catalogSearch, setCatalogSearch] = useState('')
  const [catalogComplexity, setCatalogComplexity] = useState<ComplexityFilter>('All')
  const [selectedCatalogIds, setSelectedCatalogIds] = useState<Set<string>>(new Set())
  const { isCompleted } = useCompletedInterviews()
  const sessionKey = useMemo(() => buildSessionCompletionKey(items, customIds), [items, customIds])
  // Scoped to this run (not just sessionKey's question-set content) so
  // regenerating an identical combination never makes a brand-new,
  // never-conducted run look already completed just because some earlier,
  // unrelated run happened to land on the same questions.
  const runCompletionKey = useMemo(() => buildRunCompletionKey(runId, items, customIds), [runId, items, customIds])
  const completed = isCompleted(runCompletionKey)

  // If a Live Interview for this exact question set is already in progress
  // (e.g. the interviewer paused via "Exit"), "Start interview" should resume
  // it at the right question instead of silently restarting at question 1.
  const { activeInterview, setActiveInterview } = useActiveInterview()
  const { getCandidateInfo, updateCandidateInfo } = useCandidateInfo()
  const resumeSearch = useMemo(() => {
    if (!activeInterview) {
      return null
    }
    const activeParams = new URLSearchParams(activeInterview.search)
    const activeKey = buildSessionCompletionKey(
      activeParams.get('items') ?? '',
      (activeParams.get('custom') ?? '').split(',').filter(Boolean),
    )
    return activeKey === sessionKey ? activeInterview.search : null
  }, [activeInterview, sessionKey])

  // Editing the list (add/remove) here shouldn't silently break "Resume
  // interview" for a paused run of this exact session — keep its own stored
  // items/menus/custom (and question count) in step with the edit, preserving
  // its `run` id/position so previously-recorded ratings/notes stay reachable.
  function syncActiveInterviewIfResumable(nextItems: string, nextCustomIds: string[], nextMenuIds: string[]) {
    if (!activeInterview || !resumeSearch) {
      return
    }
    const activeParams = new URLSearchParams(activeInterview.search)
    activeParams.set('items', nextItems)
    activeParams.set('menus', nextMenuIds.join(','))
    if (nextCustomIds.length > 0) {
      activeParams.set('custom', nextCustomIds.join(','))
    } else {
      activeParams.delete('custom')
    }
    setActiveInterview({
      search: activeParams.toString(),
      currentIndex: activeInterview.currentIndex,
      totalQuestions: nextItems.split(',').filter(Boolean).length + nextCustomIds.length,
    })
  }

  const counts: ComplexityCounts = {
    Easy: parseCount(searchParams.get('easy')),
    Medium: parseCount(searchParams.get('medium')),
    Hard: parseCount(searchParams.get('hard')),
  }

  // Combined pool across every selected topic area, plus a lookup so each
  // resolved topic (which carries no menu of its own) can still be linked
  // back to its `/${menuId}/${slug}` route.
  const pool = useMemo(() => menuIds.flatMap((menuId) => getMenuTopicSource(menuId)), [menuIds])
  const topicMenuMap = useMemo(() => {
    const map = new Map<string, string>()
    for (const menuId of menuIds) {
      for (const topic of getMenuTopicSource(menuId)) {
        map.set(topic.id, menuId)
      }
    }
    return map
  }, [menuIds])

  const menuLabels = menuIds.map((id) => menuLabelMap.get(id) ?? id)
  const visibleMenuLabels = menuLabels.slice(0, MAX_VISIBLE_AREA_CHIPS)
  const hiddenMenuLabels = menuLabels.slice(MAX_VISIBLE_AREA_CHIPS)
  const tagLabel = tagId ? TAG_DEFINITIONS.find((tag) => tag.id === tagId)?.label : undefined

  const topics: Topic[] = useMemo(() => {
    const bySlug = new Map(pool.map((topic) => [`${topicMenuMap.get(topic.id)}:${topic.slug}`, topic]))
    return items
      .split(',')
      .map((item) => bySlug.get(item))
      .filter((topic): topic is Topic => topic !== undefined)
  }, [pool, topicMenuMap, items])

  // Rolls up the per-question 1-5 ratings captured during Live Interview Mode
  // into one at-a-glance score, so the interviewer doesn't have to open every
  // question to gauge how the candidate did overall.
  const { getNote } = useInterviewNotes()
  const ratingSummary = useMemo(() => {
    const itemKeys = [
      ...topics.map((topic) => ({ menuId: topicMenuMap.get(topic.id) ?? '', slug: topic.slug })),
      ...customQuestions.map((question) => ({ menuId: ADHOC_MENU_ID, slug: question.id })),
    ]
    return computeSessionRatingSummary(runId, itemKeys, getNote)
  }, [topics, topicMenuMap, customQuestions, runId, getNote])

  // Backs the "From topic list" add-question picker — spans every menu in
  // the app (not just this session's own `menuIds`), so the interviewer can
  // pull in a question from a topic area they didn't originally pick.
  const existingKeys = useMemo(() => new Set(items.split(',').filter(Boolean)), [items])

  const catalogPool = useMemo(
    () => (catalogAreaId === 'all' ? allMenuItems.flatMap((item) => getMenuTopicSource(item.id)) : getMenuTopicSource(catalogAreaId)),
    [catalogAreaId],
  )

  // An unscoped, unsearched "All areas" browse would dump every topic in the
  // app into the list — nudge the interviewer to narrow it down first.
  const showCatalogHint = catalogAreaId === 'all' && catalogSearch.trim() === ''

  const visibleCatalogTopics: Topic[] = useMemo(() => {
    let list = catalogPool.filter((topic) => !existingKeys.has(`${globalTopicMenuMap.get(topic.id)}:${topic.slug}`))
    if (catalogComplexity !== 'All') {
      list = list.filter((topic) => topic.complexity === catalogComplexity)
    }
    const query = catalogSearch.trim().toLowerCase()
    if (query) {
      list = list.filter((topic) => topic.title.toLowerCase().includes(query))
    }
    return list
  }, [catalogPool, catalogComplexity, catalogSearch, existingKeys])

  // Sends the interviewer to the Builder pre-filled with this session's own
  // areas/counts/ad-hoc questions so they can tweak before generating a new
  // set, rather than silently rerolling in place with no way to adjust criteria.
  function handleGoToBuilder() {
    const params = new URLSearchParams()
    params.set('menus', menuIds.join(','))
    params.set('easy', String(counts.Easy))
    params.set('medium', String(counts.Medium))
    params.set('hard', String(counts.Hard))
    if (customIds.length > 0) {
      params.set('custom', customIds.join(','))
    }
    navigate(`/interview-builder?${params.toString()}`)
  }

  function handleRemoveTopic(topic: Topic) {
    const key = `${topicMenuMap.get(topic.id)}:${topic.slug}`
    const nextItems = items.split(',').filter((item) => item !== key).join(',')
    const params = new URLSearchParams(searchParams)
    params.set('items', nextItems)
    setSearchParams(params, { replace: true })
    syncActiveInterviewIfResumable(nextItems, customIds, menuIds)
  }

  function handleRemoveCustomQuestion(id: string) {
    const nextCustomIds = customIds.filter((questionId) => questionId !== id)
    const params = new URLSearchParams(searchParams)
    if (nextCustomIds.length > 0) {
      params.set('custom', nextCustomIds.join(','))
    } else {
      params.delete('custom')
    }
    setSearchParams(params, { replace: true })
    syncActiveInterviewIfResumable(items, nextCustomIds, menuIds)
  }

  // Always resets every field, however the dialog closes (Cancel, backdrop/Escape,
  // or a successful add) — otherwise a search/selection left mid-way (never
  // confirmed) would still be sitting there, looking "added", next time it opens.
  function closeAddQuestionDialog() {
    setAddQuestionOpen(false)
    setAddMode('catalog')
    setCatalogAreaId('all')
    setCatalogSearch('')
    setCatalogComplexity('All')
    setSelectedCatalogIds(new Set())
    setNewQuestionTitle('')
    setNewQuestionDetail('')
  }

  function handleAddQuestion() {
    if (!newQuestionTitle.trim()) {
      return
    }
    const question = addQuestion({ title: newQuestionTitle, detail: newQuestionDetail })
    const nextCustomIds = [...customIds, question.id]
    const params = new URLSearchParams(searchParams)
    params.set('custom', nextCustomIds.join(','))
    setSearchParams(params, { replace: true })
    syncActiveInterviewIfResumable(items, nextCustomIds, menuIds)
    closeAddQuestionDialog()
  }

  function toggleCatalogTopic(id: string) {
    setSelectedCatalogIds((previous) => {
      const next = new Set(previous)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  function handleAddFromCatalog() {
    if (selectedCatalogIds.size === 0) {
      return
    }
    const selectedTopics = catalogPool.filter((topic) => selectedCatalogIds.has(topic.id))
    const newKeys = selectedTopics.map((topic) => `${globalTopicMenuMap.get(topic.id)}:${topic.slug}`)
    const newMenuIds = [...new Set(selectedTopics.map((topic) => globalTopicMenuMap.get(topic.id) ?? ''))].filter(
      (id) => !menuIds.includes(id),
    )
    const nextItems = [...items.split(',').filter(Boolean), ...newKeys].join(',')
    const nextMenuIds = newMenuIds.length > 0 ? [...menuIds, ...newMenuIds] : menuIds
    const params = new URLSearchParams(searchParams)
    params.set('items', nextItems)
    if (newMenuIds.length > 0) {
      params.set('menus', nextMenuIds.join(','))
    }
    setSearchParams(params, { replace: true })
    syncActiveInterviewIfResumable(nextItems, customIds, nextMenuIds)
    closeAddQuestionDialog()
  }

  function handleStartOrResume() {
    if (resumeSearch) {
      navigate(`/interview-builder/run?${resumeSearch}`)
      return
    }
    // Not resuming — always mint a fresh run id (never reuse the one baked
    // into this page's own URL) so a retake of an already-completed session
    // can't silently overwrite that attempt's ratings/notes. Candidate
    // details aren't subject to that concern, so carry them forward to the
    // new run id instead of making the interviewer re-enter them.
    const newRunId = generateRunId()
    const existingInfo = getCandidateInfo(runId)
    if (existingInfo.name || existingInfo.yearsOfExperience || existingInfo.skills || existingInfo.notes) {
      updateCandidateInfo(newRunId, existingInfo)
    }
    const params = new URLSearchParams(searchParams)
    params.set('run', newRunId)
    navigate(`/interview-builder/run?${params.toString()}`)
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard access can be unavailable/denied — copying is a convenience, not critical.
    }
  }

  if (topics.length === 0 && customQuestions.length === 0) {
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
    <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto' }}>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" flexWrap="wrap" gap={1.5} sx={{ mb: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Interview Session
          </Typography>
          {menuLabels.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
              {visibleMenuLabels.map((label) => (
                <Chip key={label} label={label} size="small" variant="outlined" />
              ))}
              {hiddenMenuLabels.length > 0 && (
                <Chip
                  label={`+${hiddenMenuLabels.length} more`}
                  size="small"
                  variant="outlined"
                  title={hiddenMenuLabels.join(', ')}
                  sx={{ color: 'text.disabled', borderStyle: 'dashed' }}
                />
              )}
            </Stack>
          )}
        </Box>
        <Button
          onClick={() => navigate('/interview-builder')}
          variant="text"
          color="inherit"
          size="small"
          startIcon={<ArrowBackRoundedIcon fontSize="small" />}
        >
          Back to builder
        </Button>
      </Stack>

      {missingCustomCount > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {missingCustomCount} custom question{missingCustomCount === 1 ? '' : 's'} from this link{' '}
          {missingCustomCount === 1 ? "isn't" : "aren't"} available in this browser — custom questions are only
          saved on the device/browser that created them.
        </Alert>
      )}

      <CandidateDetailsForm runId={runId} />

      <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, mb: 3 }}>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
            <Chip label={`${topics.length + customQuestions.length} questions`} size="small" variant="outlined" />
            {tagLabel && <Chip label={tagLabel} size="small" color="primary" variant="outlined" />}
            {counts.Easy > 0 && <Chip label={`${counts.Easy} Easy`} size="small" color="success" variant="outlined" />}
            {counts.Medium > 0 && <Chip label={`${counts.Medium} Medium`} size="small" color="warning" variant="outlined" />}
            {counts.Hard > 0 && <Chip label={`${counts.Hard} Hard`} size="small" color="error" variant="outlined" />}
            {completed && <Chip label="Completed" size="small" color="success" />}
            {ratingSummary.averageRating !== null && (
              <Chip
                icon={<StarRoundedIcon fontSize="small" />}
                label={`${ratingSummary.averageRating.toFixed(1)} / 5 avg (${ratingSummary.ratedCount} rated)`}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Button
              variant="contained"
              size="small"
              startIcon={<PlayArrowRoundedIcon />}
              onClick={handleStartOrResume}
            >
              {resumeSearch ? 'Resume interview' : completed ? 'Retake interview' : 'Start interview'}
            </Button>
            <Tooltip title={completed ? '' : 'Complete the interview to unlock printing'}>
              <span>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<PrintRoundedIcon />}
                  disabled={!completed}
                  onClick={() => navigate(`/interview-builder/print?${searchParams.toString()}`)}
                >
                  Print / Export
                </Button>
              </span>
            </Tooltip>
            <Button variant="outlined" size="small" startIcon={<LinkRoundedIcon />} onClick={handleCopyLink}>
              {copied ? 'Link copied!' : 'Copy shareable link'}
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<AutorenewRoundedIcon />}
              onClick={handleGoToBuilder}
            >
              Regenerate
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Questions
        </Typography>
        <Button size="small" variant="outlined" onClick={() => setAddQuestionOpen(true)}>
          + Add question
        </Button>
      </Stack>

      {topics.length > 0 && (
        <TopicList
          topics={topics}
          onTopicClick={(topic) => navigate(`/${topicMenuMap.get(topic.id)}/${topic.slug}`)}
          onRemove={handleRemoveTopic}
          emptyMessage="This interview session is unavailable"
        />
      )}

      {customQuestions.length > 0 && (
        <Box sx={{ mt: topics.length > 0 ? 3 : 0 }}>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            Custom Questions
          </Typography>
          <Stack spacing={1.5}>
            {customQuestions.map((question) => (
              <Paper key={question.id} variant="outlined" sx={{ p: 2, borderRadius: 2, position: 'relative' }}>
                <IconButton
                  size="small"
                  aria-label={`Remove ${question.title}`}
                  onClick={() => handleRemoveCustomQuestion(question.id)}
                  sx={{ position: 'absolute', top: 4, right: 4 }}
                >
                  <CloseRoundedIcon fontSize="small" />
                </IconButton>
                <Typography variant="subtitle1" sx={{ pr: 4 }}>
                  {question.title}
                </Typography>
                {question.detail && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
                    {question.detail}
                  </Typography>
                )}
              </Paper>
            ))}
          </Stack>
        </Box>
      )}

      <Dialog
        open={addQuestionOpen}
        onClose={closeAddQuestionDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Add a question</DialogTitle>
        <DialogContent>
          <ToggleButtonGroup
            value={addMode}
            exclusive
            size="small"
            onChange={(_event, value) => value && setAddMode(value)}
            sx={{ mb: 2, mt: 1 }}
          >
            <ToggleButton value="catalog">From our topics</ToggleButton>
            <ToggleButton value="adhoc">Custom question</ToggleButton>
          </ToggleButtonGroup>

          {addMode === 'catalog' ? (
            <>
              <TextField
                select
                label="Topic area"
                size="small"
                fullWidth
                value={catalogAreaId}
                onChange={(e) => setCatalogAreaId(e.target.value)}
                sx={{ mb: 2 }}
              >
                <MenuItem value="all">All areas</MenuItem>
                {allMenuItems.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
              <TopicSearch
                value={catalogSearch}
                onChange={setCatalogSearch}
                complexity={catalogComplexity}
                onComplexityChange={setCatalogComplexity}
              />
              {/* Fixed height (not maxHeight) so the dialog doesn't grow/shrink
                  as the result count changes while searching. */}
              <Box sx={{ height: 320, overflowY: 'auto', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                {showCatalogHint ? (
                  <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                    Pick a topic area or search by title to find questions to add.
                  </Typography>
                ) : (
                  <List dense>
                    {visibleCatalogTopics.length === 0 && (
                      <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                        No matching questions.
                      </Typography>
                    )}
                    {visibleCatalogTopics.slice(0, 200).map((topic) => (
                      <ListItem key={topic.id} disablePadding>
                        <ListItemButton onClick={() => toggleCatalogTopic(topic.id)} dense>
                          <Checkbox
                            edge="start"
                            checked={selectedCatalogIds.has(topic.id)}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-label': `Select ${topic.title}` }}
                          />
                          <ListItemText
                            primary={topic.title}
                            secondary={menuLabelMap.get(globalTopicMenuMap.get(topic.id) ?? '')}
                          />
                          <Chip
                            label={topic.complexity ?? 'Unknown'}
                            size="small"
                            color={complexityColor[topic.complexity ?? 'Unknown']}
                            sx={{ ml: 1 }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </>
          ) : (
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
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddQuestionDialog}>Cancel</Button>
          {addMode === 'catalog' ? (
            <Button variant="contained" disabled={selectedCatalogIds.size === 0} onClick={handleAddFromCatalog}>
              Add {selectedCatalogIds.size > 0 ? selectedCatalogIds.size : ''} selected
            </Button>
          ) : (
            <Button variant="contained" disabled={!newQuestionTitle.trim()} onClick={handleAddQuestion}>
              Add to session
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  )
}
