import { useLocation, useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useActiveInterview } from '../hooks/useActiveInterview'

// Lets an interviewer who wandered off mid-interview (to browse another topic
// via the top nav) find their way straight back, instead of relying on the
// browser's Back button. Rendered once in AppShell, so it's visible from any
// page — except the run page itself, where there's nothing to "resume" to.
export default function ActiveInterviewBanner() {
  const { activeInterview, clearActiveInterview } = useActiveInterview()
  const location = useLocation()
  const navigate = useNavigate()

  if (!activeInterview || location.pathname === '/interview-builder/run') {
    return null
  }

  return (
    <Alert
      severity="info"
      variant="filled"
      icon={false}
      sx={{ borderRadius: 0, justifyContent: 'center' }}
      action={
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Button
            color="inherit"
            size="small"
            onClick={() => navigate(`/interview-builder/run?${activeInterview.search}`)}
          >
            Resume
          </Button>
          <IconButton
            color="inherit"
            size="small"
            aria-label="Dismiss live interview reminder"
            onClick={clearActiveInterview}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      }
    >
      Live interview in progress — Question {activeInterview.currentIndex + 1} of {activeInterview.totalQuestions}
    </Alert>
  )
}
