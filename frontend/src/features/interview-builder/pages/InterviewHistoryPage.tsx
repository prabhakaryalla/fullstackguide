import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import PrintRoundedIcon from '@mui/icons-material/PrintRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { getSortedMenuItems } from '../../landing/data/getSortedMenuItems'
import { useInterviewHistory } from '../hooks/useInterviewHistory'
import { useInterviewNotes } from '../../interview-notes/hooks/useInterviewNotes'
import { parseSessionItemKeys, computeSessionRatingSummary } from '../data/sessionRatingSummary'
import type { InterviewHistoryEntry } from '../model/types'

const menuLabelMap = new Map(getSortedMenuItems().map((item) => [item.id, item.label]))

function formatCompletedAt(timestamp: number): string {
  return new Date(timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
}

interface HistoryEntryRowProps {
  entry: InterviewHistoryEntry
  onRemove: (runId: string) => void
}

function HistoryEntryRow({ entry, onRemove }: HistoryEntryRowProps) {
  const navigate = useNavigate()
  const { getNote } = useInterviewNotes()
  const displayName = entry.candidateName.trim() || 'Unnamed candidate'

  const summary = useMemo(() => {
    const itemKeys = parseSessionItemKeys(entry.search)
    return computeSessionRatingSummary(entry.runId, itemKeys, getNote)
  }, [entry.search, entry.runId, getNote])

  const menuIds = useMemo(
    () => (new URLSearchParams(entry.search).get('menus') ?? '').split(',').filter(Boolean),
    [entry.search],
  )

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {displayName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatCompletedAt(entry.completedAt)} · {entry.totalQuestions} question
            {entry.totalQuestions === 1 ? '' : 's'}
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mt: 0.75 }}>
            {menuIds.map((menuId) => (
              <Chip key={menuId} label={menuLabelMap.get(menuId) ?? menuId} size="small" variant="outlined" />
            ))}
            {summary.averageRating !== null ? (
              <Chip
                icon={<StarRoundedIcon fontSize="small" />}
                label={`${summary.averageRating.toFixed(1)} / 5 (${summary.ratedCount} rated)`}
                size="small"
                color="primary"
                variant="outlined"
              />
            ) : (
              <Chip label="Not yet rated" size="small" variant="outlined" sx={{ color: 'text.disabled' }} />
            )}
          </Stack>
        </Box>
        <Stack direction="row" spacing={1} flexShrink={0}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<VisibilityRoundedIcon />}
            onClick={() => navigate(`/interview-builder/session?${entry.search}`)}
          >
            View
          </Button>
          <Button
            size="small"
            variant="outlined"
            startIcon={<PrintRoundedIcon />}
            onClick={() => navigate(`/interview-builder/print?${entry.search}`)}
          >
            Print
          </Button>
          <IconButton
            size="small"
            aria-label={`Remove ${displayName} from history`}
            onClick={() => onRemove(entry.runId)}
          >
            <DeleteOutlineRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default function InterviewHistoryPage() {
  const navigate = useNavigate()
  const { history, removeHistoryEntry, clearHistory } = useInterviewHistory()
  const [search, setSearch] = useState('')
  const [clearDialogOpen, setClearDialogOpen] = useState(false)

  const visibleHistory = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) {
      return history
    }
    return history.filter((entry) => (entry.candidateName || 'unnamed candidate').toLowerCase().includes(query))
  }, [history, search])

  return (
    <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto' }}>
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1.5}
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Past Interviews
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Every completed Live Interview run in this browser, newest first.
          </Typography>
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

      {history.length === 0 ? (
        <Alert severity="info">
          No completed interviews yet — once you finish a Live Interview run, it will show up here.
        </Alert>
      ) : (
        <>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <TextField
              size="small"
              label="Search by candidate name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, maxWidth: 360 }}
            />
            <Button size="small" color="error" variant="text" onClick={() => setClearDialogOpen(true)}>
              Clear all history
            </Button>
          </Stack>

          {visibleHistory.length === 0 ? (
            <Alert severity="info">No past interviews match &ldquo;{search}&rdquo;.</Alert>
          ) : (
            <Stack spacing={1.5}>
              {visibleHistory.map((entry) => (
                <HistoryEntryRow key={entry.runId} entry={entry} onRemove={removeHistoryEntry} />
              ))}
            </Stack>
          )}
        </>
      )}

      <Dialog open={clearDialogOpen} onClose={() => setClearDialogOpen(false)}>
        <DialogTitle>Clear all interview history?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            This removes all {history.length} entries from this list. It does not delete the underlying ratings,
            notes, or candidate details already saved for those sessions.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClearDialogOpen(false)}>Cancel</Button>
          <Button
            color="error"
            onClick={() => {
              clearHistory()
              setClearDialogOpen(false)
            }}
          >
            Clear history
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
