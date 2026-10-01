import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useCandidateInfo } from '../hooks/useCandidateInfo'

interface CandidateDetailsFormProps {
  runId: string
}

// Shared by the Session Review and Live Interview pages so candidate details
// can be filled in (or edited) from whichever one the interviewer lands on
// first — both read/write the same `runId`-scoped entry, and the printed
// question sheet later reads it back via the same key.
export default function CandidateDetailsForm({ runId }: CandidateDetailsFormProps) {
  const { getCandidateInfo, updateCandidateInfo } = useCandidateInfo()
  const info = getCandidateInfo(runId)
  const hasInfo = Boolean(info.name || info.yearsOfExperience || info.skills || info.notes)
  // Collapsed by default once details already exist (e.g. carried over from
  // Session Review) so this never sits open as a full form the interviewer
  // has to look past — "Edit" reopens it on demand.
  const [expanded, setExpanded] = useState(!hasInfo)

  if (!expanded) {
    return (
      <Paper
        variant="outlined"
        sx={{ px: 2, py: 0.75, borderRadius: 2, mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}
      >
        <Typography variant="body2" noWrap sx={{ minWidth: 0 }}>
          {hasInfo ? (
            <>
              <strong>{info.name || 'Candidate'}</strong>
              {info.yearsOfExperience && ` · ${info.yearsOfExperience} yrs`}
              {info.skills && ` · ${info.skills}`}
            </>
          ) : (
            'Candidate details (optional)'
          )}
        </Typography>
        <Button size="small" onClick={() => setExpanded(true)}>
          {hasInfo ? 'Edit' : '+ Add'}
        </Button>
      </Paper>
    )
  }

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          Candidate details
        </Typography>
        <Button size="small" onClick={() => setExpanded(false)}>
          Done
        </Button>
      </Stack>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Candidate name"
            fullWidth
            size="small"
            value={info.name}
            onChange={(e) => updateCandidateInfo(runId, { name: e.target.value })}
            inputProps={{ 'aria-label': 'Candidate name' }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Years of experience"
            fullWidth
            size="small"
            value={info.yearsOfExperience}
            onChange={(e) => updateCandidateInfo(runId, { yearsOfExperience: e.target.value })}
            inputProps={{ 'aria-label': 'Years of experience' }}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Key skills / knowledge areas"
            fullWidth
            size="small"
            placeholder="e.g. React, .NET, Azure, SQL"
            value={info.skills}
            onChange={(e) => updateCandidateInfo(runId, { skills: e.target.value })}
            inputProps={{ 'aria-label': 'Key skills / knowledge areas' }}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Other notes (optional)"
            fullWidth
            multiline
            minRows={2}
            size="small"
            value={info.notes}
            onChange={(e) => updateCandidateInfo(runId, { notes: e.target.value })}
            inputProps={{ 'aria-label': 'Candidate notes' }}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}
