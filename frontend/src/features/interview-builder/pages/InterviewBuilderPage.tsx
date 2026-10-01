import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'
import { getSortedMenuItems } from '../../landing/data/getSortedMenuItems'
import { getMenuTopicSource } from '../../main/data/getMenuTopicSource'
import { getTopicTagsIndex } from '../../tags/data/getTopicTagsIndex'
import { TAG_DEFINITIONS } from '../../tags/data/tagDefinitions'
import { useAdhocQuestions } from '../../adhoc-questions/hooks/useAdhocQuestions'
import TopicSearch from '../../main/components/TopicSearch'
import {
  countAvailableByComplexity,
  generateInterviewSession,
} from '../data/generateInterviewSession'
import { generateRunId } from '../data/generateRunId'
import { useLastCompletedInterview } from '../hooks/useLastCompletedInterview'
import { useInterviewHistory } from '../hooks/useInterviewHistory'
import { INTERVIEW_COMPLEXITY_KEYS } from '../model/types'
import type { ComplexityCounts } from '../model/types'
import type { ComplexityFilter, Topic, TopicComplexity } from '../../main/model/types'

// LeetCode is an algorithm-practice menu (~3,780 topics) — including it here would
// dominate "select all" and doesn't fit a complexity/tag-driven interview session.
const EXCLUDED_MENU_IDS = new Set(['leet-code'])
const menuItems = getSortedMenuItems().filter(
  (item) => !EXCLUDED_MENU_IDS.has(item.id) && getMenuTopicSource(item.id).length > 0,
)
const menuLabelMap = new Map(menuItems.map((item) => [item.id, item.label]))

const DEFAULT_COUNTS: ComplexityCounts = { Easy: 2, Medium: 2, Hard: 1 }

const complexityColor: Record<TopicComplexity, 'success' | 'warning' | 'error' | 'default'> = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'error',
  Unknown: 'default',
}

// Topic areas render as a wrapped chip row in the summary sidebar (not a long
// comma string) so it stays scannable even when a session spans many areas —
// overflow collapses into a single "+N more" chip with the rest on hover.
const MAX_VISIBLE_AREA_CHIPS = 6

// Session Review's Regenerate button links here with the session's current
// areas/counts/ad-hoc questions pre-filled via query params, so the
// interviewer can tweak before generating a new set instead of starting from
// a blank form. Absent for the normal "fresh builder" entry points (nav icon,
// "Back to builder"), which fall back to the plain defaults below.
function parsePrefillMenuIds(raw: string | null): string[] | null {
  if (!raw) {
    return null
  }
  const ids = raw.split(',').filter((id) => menuLabelMap.has(id))
  return ids.length > 0 ? ids : null
}

function parsePrefillCounts(searchParams: URLSearchParams): ComplexityCounts | null {
  if (!searchParams.has('easy') && !searchParams.has('medium') && !searchParams.has('hard')) {
    return null
  }
  const parse = (value: string | null) => Math.max(0, Number.parseInt(value ?? '', 10) || 0)
  return {
    Easy: parse(searchParams.get('easy')),
    Medium: parse(searchParams.get('medium')),
    Hard: parse(searchParams.get('hard')),
  }
}

export default function InterviewBuilderPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const prefillMenuIds = parsePrefillMenuIds(searchParams.get('menus'))
  const prefillCounts = parsePrefillCounts(searchParams)
  const prefillCustomIds = searchParams.get('custom')?.split(',').filter(Boolean) ?? null

  const [menuIds, setMenuIds] = useState<string[]>(
    prefillMenuIds ?? menuItems.map((item) => item.id),
  )
  const [tagId, setTagId] = useState('')
  const [counts, setCounts] = useState<ComplexityCounts>(prefillCounts ?? DEFAULT_COUNTS)
  const [tagsIndex, setTagsIndex] = useState<Map<string, string[]> | null>(null)
  const [mode, setMode] = useState<'random' | 'manual'>(prefillCounts ? 'random' : 'manual')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [manualSearch, setManualSearch] = useState('')
  const [manualComplexity, setManualComplexity] = useState<ComplexityFilter>('All')
  const [currentAreaIndex, setCurrentAreaIndex] = useState(0)
  const [customIds, setCustomIds] = useState<string[]>(prefillCustomIds ?? [])
  const [addQuestionOpen, setAddQuestionOpen] = useState(false)
  const [newQuestionTitle, setNewQuestionTitle] = useState('')
  const [newQuestionDetail, setNewQuestionDetail] = useState('')
  const { getQuestion, addQuestion } = useAdhocQuestions()
  const { lastCompletedInterview, clearLastCompletedInterview } = useLastCompletedInterview()
  const { history } = useInterviewHistory()

  useEffect(() => {
    let active = true
    getTopicTagsIndex()
      .then((index) => {
        if (active) setTagsIndex(index)
      })
      .catch(() => {
        // Tag filtering is a progressive enhancement — ignore failures.
      })
    return () => {
      active = false
    }
  }, [])

  // Combined pool across every selected topic area. `topicMenuMap` remembers
  // which menu each topic came from (topic ids are unique repo-wide, same
  // assumption the tags feature's index already relies on) so the session
  // page can later reconstruct `/${menuId}/${slug}` links for a mixed set.
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

  const tagOptions = useMemo(() => {
    if (!tagsIndex) {
      return []
    }
    const counts = new Map<string, number>()
    for (const topic of pool) {
      for (const id of tagsIndex.get(topic.id) ?? []) {
        counts.set(id, (counts.get(id) ?? 0) + 1)
      }
    }
    return TAG_DEFINITIONS.filter((tag) => counts.has(tag.id)).map((tag) => ({
      id: tag.id,
      label: tag.label,
      count: counts.get(tag.id) ?? 0,
    }))
  }, [pool, tagsIndex])

  const tagFilteredTopics: Topic[] = useMemo(() => {
    if (!tagId) {
      return pool
    }
    if (!tagsIndex) {
      return []
    }
    return pool.filter((topic) => tagsIndex.get(topic.id)?.includes(tagId))
  }, [pool, tagId, tagsIndex])

  const filteredTopics: Topic[] = tagFilteredTopics

  const availableCounts = useMemo(
    () => countAvailableByComplexity(filteredTopics),
    [filteredTopics],
  )

  // Reset the selected tag and clamp requested counts whenever the menu/tag
  // choice shrinks the available pool below what's currently requested.
  useEffect(() => {
    setCounts((previous) => ({
      Easy: Math.min(previous.Easy, availableCounts.Easy),
      Medium: Math.min(previous.Medium, availableCounts.Medium),
      Hard: Math.min(previous.Hard, availableCounts.Hard),
    }))
  }, [availableCounts])

  useEffect(() => {
    setTagId('')
  }, [menuIds])

  // A manual selection only makes sense against the currently filtered pool —
  // clear it (and the manual list's own search/complexity narrowing) whenever
  // the underlying filters change so stale ids/queries can't linger.
  useEffect(() => {
    setSelectedIds(new Set())
    setManualSearch('')
    setManualComplexity('All')
    setCurrentAreaIndex(0)
  }, [menuIds, tagId])

  // Reset just the search box (not the selection) when moving to a new area —
  // a search term is area-specific and shouldn't silently carry over.
  useEffect(() => {
    setManualSearch('')
  }, [currentAreaIndex])

  const currentAreaId = menuIds[currentAreaIndex] ?? menuIds[0]

  // The manual picker works one topic area at a time — `areaTopics` is
  // everything in the CURRENT area (used for the per-area selected count),
  // further narrowed into `visibleManualTopics` by title search + complexity.
  // Both stay independent of `selectedIds`, so switching areas or narrowing
  // the list never discards a selection made elsewhere.
  const areaTopics: Topic[] = useMemo(
    () => filteredTopics.filter((topic) => topicMenuMap.get(topic.id) === currentAreaId),
    [filteredTopics, topicMenuMap, currentAreaId],
  )

  const visibleManualTopics: Topic[] = useMemo(() => {
    let list = areaTopics
    if (manualComplexity !== 'All') {
      list = list.filter((topic) => topic.complexity === manualComplexity)
    }
    const query = manualSearch.trim().toLowerCase()
    if (query) {
      list = list.filter((topic) => topic.title.toLowerCase().includes(query))
    }
    return list
  }, [areaTopics, manualComplexity, manualSearch])

  const selectedInAreaCount = useMemo(
    () => areaTopics.filter((topic) => selectedIds.has(topic.id)).length,
    [areaTopics, selectedIds],
  )

  // Complexity breakdown of the manual picks across ALL areas (not just the
  // one currently in view) — powers the summary sidebar's chip readout.
  const selectedCountsBreakdown = useMemo(
    () => countAvailableByComplexity(filteredTopics.filter((topic) => selectedIds.has(topic.id))),
    [filteredTopics, selectedIds],
  )

  // Per-area breakdown of the manual picks (menuId -> selected count) — powers
  // the summary sidebar's "by topic area" readout when multiple areas are in play.
  const selectedAreaCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const topic of filteredTopics) {
      if (!selectedIds.has(topic.id)) {
        continue
      }
      const menuId = topicMenuMap.get(topic.id)
      if (menuId) {
        counts.set(menuId, (counts.get(menuId) ?? 0) + 1)
      }
    }
    return counts
  }, [filteredTopics, selectedIds, topicMenuMap])

  const totalRequested = counts.Easy + counts.Medium + counts.Hard
  const totalAvailable = availableCounts.Easy + availableCounts.Medium + availableCounts.Hard
  const selectedLabel = menuIds.map((id) => menuLabelMap.get(id) ?? id).join(', ')

  function handleMenuIdsChange(value: string[]) {
    // Keep at least one topic area selected; ignore an attempt to clear the last one.
    setMenuIds(value.length > 0 ? value : menuIds)
  }

  function handleCountChange(key: keyof ComplexityCounts, rawValue: string) {
    const parsed = Number.parseInt(rawValue, 10)
    const clamped = Number.isNaN(parsed) ? 0 : Math.max(0, Math.min(parsed, availableCounts[key]))
    setCounts((previous) => ({ ...previous, [key]: clamped }))
  }

  function toggleTopicSelected(topicId: string) {
    setSelectedIds((previous) => {
      const next = new Set(previous)
      if (next.has(topicId)) {
        next.delete(topicId)
      } else {
        next.add(topicId)
      }
      return next
    })
  }

  function handleGenerate(destination: 'session' | 'run' = 'session') {
    const selected =
      mode === 'manual'
        ? filteredTopics.filter((topic) => selectedIds.has(topic.id))
        : generateInterviewSession(filteredTopics, counts)
    if (selected.length === 0 && customIds.length === 0) {
      return
    }
    const selectedCounts = countAvailableByComplexity(selected)
    const params = new URLSearchParams()
    params.set('menus', menuIds.join(','))
    if (tagId) params.set('tag', tagId)
    params.set('easy', String(selectedCounts.Easy))
    params.set('medium', String(selectedCounts.Medium))
    params.set('hard', String(selectedCounts.Hard))
    params.set(
      'items',
      selected.map((topic) => `${topicMenuMap.get(topic.id)}:${topic.slug}`).join(','),
    )
    if (customIds.length > 0) params.set('custom', customIds.join(','))
    // Identifies this specific interview occurrence so ratings/notes taken
    // during it never bleed into a later session touching the same topics.
    params.set('run', generateRunId())
    navigate(`/interview-builder/${destination}?${params.toString()}`)
  }

  function handleAddQuestion() {
    if (!newQuestionTitle.trim()) {
      return
    }
    const question = addQuestion({ title: newQuestionTitle, detail: newQuestionDetail })
    setCustomIds((previous) => [...previous, question.id])
    setNewQuestionTitle('')
    setNewQuestionDetail('')
    setAddQuestionOpen(false)
  }

  function handleRemoveCustomQuestion(id: string) {
    setCustomIds((previous) => previous.filter((questionId) => questionId !== id))
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1280, mx: 'auto' }}>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" flexWrap="wrap" gap={1.5}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ mb: 0.5 }}>
            Build an Interview Session
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Pick one or more topic areas and a difficulty mix to generate a randomized question set for
            your next interview — great for panels spanning several skill areas.
          </Typography>
        </Box>
        <Button
          onClick={() => navigate('/interview-builder/history')}
          variant="outlined"
          color="inherit"
          size="small"
          startIcon={<HistoryRoundedIcon fontSize="small" />}
        >
          Past interviews{history.length > 0 ? ` (${history.length})` : ''}
        </Button>
      </Stack>

      {lastCompletedInterview && (
        <Alert
          severity="success"
          variant="outlined"
          sx={{ mb: 3 }}
          action={
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Button
                color="inherit"
                size="small"
                onClick={() =>
                  navigate(`/interview-builder/session?${lastCompletedInterview.search}`)
                }
              >
                View &amp; print
              </Button>
              <IconButton
                color="inherit"
                size="small"
                aria-label="Dismiss last completed interview"
                onClick={clearLastCompletedInterview}
              >
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </Stack>
          }
        >
          Your last completed interview ({lastCompletedInterview.totalQuestions} questions) is ready
          to review or print.
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  label="Topic areas"
                  fullWidth
                  size="small"
                  value={menuIds}
                  onChange={(e) => handleMenuIdsChange(e.target.value as unknown as string[])}
                  slotProps={{
                    select: {
                      multiple: true,
                      renderValue: () => selectedLabel,
                      'aria-label': 'Topic areas',
                    } as never,
                  }}
                >
                  <MenuItem
                    disableRipple
                    sx={{ p: 0, borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    {/* MUI clones each direct MenuItem child and overrides its onClick to toggle
                    that item's own `value` into the Select's array — stopping propagation on
                    this wrapper (a plain, un-cloned descendant) intercepts the click first so
                    "Select all" can run its own logic instead of corrupting the value array.
                    A separate <Divider> is deliberately avoided here: MUI clones EVERY direct
                    child of the Select (including non-MenuItem ones) into a listbox "option",
                    which broke `getAllByRole('option')` queries in tests — an <hr role="option">
                    has no checkbox inside it. */}
                    <Box
                      onClick={(e) => {
                        e.stopPropagation()
                        setMenuIds(
                          menuIds.length === menuItems.length
                            ? [menuItems[0].id]
                            : menuItems.map((item) => item.id),
                        )
                      }}
                      sx={{ display: 'flex', alignItems: 'center', width: '100%', px: 2, py: 1 }}
                    >
                      <Checkbox
                        checked={menuIds.length === menuItems.length}
                        indeterminate={menuIds.length > 0 && menuIds.length < menuItems.length}
                        size="small"
                        tabIndex={-1}
                        inputProps={{ 'aria-label': 'Select all topic areas' }}
                      />
                      <ListItemText
                        primary={menuIds.length === menuItems.length ? 'Clear all' : 'Select all'}
                      />
                    </Box>
                  </MenuItem>
                  {menuItems.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <Checkbox checked={menuIds.includes(item.id)} size="small" />
                      <ListItemText primary={item.label} />
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  label="Tag (optional)"
                  fullWidth
                  size="small"
                  value={tagId}
                  onChange={(e) => setTagId(e.target.value)}
                  inputProps={{ 'aria-label': 'Tag filter' }}
                >
                  <MenuItem value="">All tags</MenuItem>
                  {tagOptions.map((tag) => (
                    <MenuItem key={tag.id} value={tag.id}>
                      {tag.label} ({tag.count})
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid size={12}>
                <ToggleButtonGroup
                  value={mode}
                  exclusive
                  size="small"
                  onChange={(_e, value) => value && setMode(value)}
                  aria-label="Question selection mode"
                  sx={{ width: '100%' }}
                >
                  <ToggleButton value="random" sx={{ flex: 1 }}>
                    Random selection
                  </ToggleButton>
                  <ToggleButton value="manual" sx={{ flex: 1 }}>
                    Manual selection
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>

              {mode === 'random' &&
                INTERVIEW_COMPLEXITY_KEYS.map((key) => (
                  <Grid key={key} size={{ xs: 12, sm: 4 }}>
                    <TextField
                      type="number"
                      label={`${key} questions`}
                      fullWidth
                      size="small"
                      value={counts[key]}
                      onChange={(e) => handleCountChange(key, e.target.value)}
                      helperText={`${availableCounts[key]} available`}
                      inputProps={{
                        min: 0,
                        max: availableCounts[key],
                        'aria-label': `${key} questions`,
                      }}
                    />
                  </Grid>
                ))}

              {mode === 'manual' && (
                <Grid size={12}>
                  {menuIds.length > 1 && (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mb: 1.5 }}
                    >
                      <Button
                        size="small"
                        disabled={currentAreaIndex === 0}
                        onClick={() => setCurrentAreaIndex((previous) => Math.max(previous - 1, 0))}
                      >
                        ← Previous area
                      </Button>
                      <Typography variant="subtitle2">
                        Area {currentAreaIndex + 1} of {menuIds.length}:{' '}
                        {menuLabelMap.get(currentAreaId) ?? currentAreaId}
                      </Typography>
                      <Button
                        size="small"
                        disabled={currentAreaIndex === menuIds.length - 1}
                        onClick={() =>
                          setCurrentAreaIndex((previous) =>
                            Math.min(previous + 1, menuIds.length - 1),
                          )
                        }
                      >
                        Next area →
                      </Button>
                    </Stack>
                  )}
                  <Box sx={{ mb: 1.5 }}>
                    <TopicSearch
                      value={manualSearch}
                      onChange={setManualSearch}
                      complexity={manualComplexity}
                      onComplexityChange={setManualComplexity}
                    />
                  </Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {selectedInAreaCount} of {areaTopics.length} selected in this area
                      {visibleManualTopics.length !== areaTopics.length &&
                        ` · showing ${visibleManualTopics.length}`}
                      {' · '}
                      {selectedIds.size} selected overall
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        disabled={visibleManualTopics.length === 0}
                        onClick={() =>
                          setSelectedIds(
                            (previous) =>
                              new Set([
                                ...previous,
                                ...visibleManualTopics.map((topic) => topic.id),
                              ]),
                          )
                        }
                      >
                        Select all questions
                      </Button>
                      <Button
                        size="small"
                        disabled={visibleManualTopics.length === 0}
                        onClick={() =>
                          setSelectedIds((previous) => {
                            const next = new Set(previous)
                            for (const topic of visibleManualTopics) next.delete(topic.id)
                            return next
                          })
                        }
                      >
                        Clear questions
                      </Button>
                    </Stack>
                  </Stack>
                  <List
                    dense
                    sx={{
                      maxHeight: 440,
                      overflowY: 'auto',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                    }}
                  >
                    {visibleManualTopics.length === 0 && (
                      <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                        No questions match your search.
                      </Typography>
                    )}
                    {visibleManualTopics.map((topic) => (
                      <ListItem key={topic.id} disablePadding>
                        <ListItemButton onClick={() => toggleTopicSelected(topic.id)} dense>
                          <Checkbox
                            edge="start"
                            checked={selectedIds.has(topic.id)}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-label': `Select ${topic.title}` }}
                          />
                          <ListItemText
                            primary={topic.title}
                            secondary={menuLabelMap.get(topicMenuMap.get(topic.id) ?? '')}
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
                </Grid>
              )}

              <Grid size={12}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  flexWrap="wrap"
                  sx={{ mb: customIds.length > 0 ? 1 : 0 }}
                >
                  <Typography variant="subtitle2">Ad-hoc questions</Typography>
                  <Button size="small" onClick={() => setAddQuestionOpen(true)}>
                    + Add ad-hoc question
                  </Button>
                </Stack>
                {customIds.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {customIds.map((id) => {
                      const question = getQuestion(id)
                      if (!question) return null
                      return (
                        <Chip
                          key={id}
                          label={question.title}
                          onDelete={() => handleRemoveCustomQuestion(id)}
                          deleteIcon={<CloseRoundedIcon />}
                          size="small"
                        />
                      )
                    })}
                  </Stack>
                )}
              </Grid>
            </Grid>

            {filteredTopics.length === 0 && (
              <Alert severity="info" sx={{ mt: 2 }}>
                No topics match this selection.
              </Alert>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            variant="outlined"
            sx={{ p: 3, borderRadius: 2, position: { md: 'sticky' }, top: { md: 88 } }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Session summary
            </Typography>

            <Typography variant="overline" color="text.secondary">
              Topic areas
            </Typography>
            <Stack
              direction="row"
              spacing={0.75}
              flexWrap="wrap"
              useFlexGap
              sx={{ mb: 2, mt: 0.5 }}
            >
              {menuIds.slice(0, MAX_VISIBLE_AREA_CHIPS).map((id) => (
                <Chip key={id} label={menuLabelMap.get(id) ?? id} size="small" />
              ))}
              {menuIds.length > MAX_VISIBLE_AREA_CHIPS && (
                <Tooltip
                  title={menuIds
                    .slice(MAX_VISIBLE_AREA_CHIPS)
                    .map((id) => menuLabelMap.get(id) ?? id)
                    .join(', ')}
                >
                  <Chip
                    label={`+${menuIds.length - MAX_VISIBLE_AREA_CHIPS} more`}
                    size="small"
                    variant="outlined"
                  />
                </Tooltip>
              )}
            </Stack>

            {tagId && (
              <Chip
                label={`Tag: ${tagOptions.find((tag) => tag.id === tagId)?.label ?? tagId}`}
                size="small"
                color="secondary"
                variant="outlined"
                sx={{ mb: 2 }}
              />
            )}

            <Divider sx={{ mb: 2 }} />

            {mode === 'random' ? (
              <>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Requesting <strong>{totalRequested}</strong> of {totalAvailable} available
                  questions
                </Typography>
                <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                  {INTERVIEW_COMPLEXITY_KEYS.map((key) => (
                    <Chip
                      key={key}
                      size="small"
                      color={complexityColor[key]}
                      label={`${counts[key]} ${key}`}
                    />
                  ))}
                </Stack>
              </>
            ) : (
              <>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>{selectedIds.size}</strong> question{selectedIds.size === 1 ? '' : 's'}{' '}
                  selected
                </Typography>
                {menuIds.length > 1 && selectedIds.size > 0 && (
                  <Stack spacing={0.5} sx={{ mb: 1.5 }}>
                    {menuIds
                      .filter((id) => (selectedAreaCounts.get(id) ?? 0) > 0)
                      .map((id) => (
                        <Stack key={id} direction="row" justifyContent="space-between" spacing={1}>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {menuLabelMap.get(id) ?? id}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {selectedAreaCounts.get(id)}
                          </Typography>
                        </Stack>
                      ))}
                  </Stack>
                )}
                {selectedIds.size > 0 && (
                  <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                    {INTERVIEW_COMPLEXITY_KEYS.filter(
                      (key) => selectedCountsBreakdown[key] > 0,
                    ).map((key) => (
                      <Chip
                        key={key}
                        size="small"
                        color={complexityColor[key]}
                        label={`${selectedCountsBreakdown[key]} ${key}`}
                      />
                    ))}
                  </Stack>
                )}
              </>
            )}

            {customIds.length > 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                + {customIds.length} ad-hoc question{customIds.length === 1 ? '' : 's'}
              </Typography>
            )}

            <Stack spacing={1.25} sx={{ mt: 1 }}>
              <Button
                variant="contained"
                fullWidth
                disabled={
                  (mode === 'random' ? totalRequested === 0 : selectedIds.size === 0) &&
                  customIds.length === 0
                }
                onClick={() => handleGenerate('run')}
              >
                Start interview
              </Button>
              <Button
                variant="outlined"
                fullWidth
                disabled={
                  (mode === 'random' ? totalRequested === 0 : selectedIds.size === 0) &&
                  customIds.length === 0
                }
                onClick={() => handleGenerate('session')}
              >
                Generate session
              </Button>
            </Stack>

            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
              {mode === 'random'
                ? 'Questions are chosen at random each time you generate a session.'
                : 'You control exactly which questions get asked.'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        open={addQuestionOpen}
        onClose={() => setAddQuestionOpen(false)}
        fullWidth
        maxWidth="sm"
      >
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
          <Button
            variant="contained"
            disabled={!newQuestionTitle.trim()}
            onClick={handleAddQuestion}
          >
            Add to session
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
