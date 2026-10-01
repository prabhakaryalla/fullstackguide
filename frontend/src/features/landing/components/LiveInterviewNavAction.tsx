import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded'
import { useNavigate } from 'react-router-dom'
import { useActiveInterview } from '../../interview-builder/hooks/useActiveInterview'

// A dedicated shortcut back into Live Interview Mode, separate from "Build an
// interview session" (which always starts a fresh builder form) — disabled
// when there's no in-progress interview to jump into.
export default function LiveInterviewNavAction() {
  const navigate = useNavigate()
  const { activeInterview } = useActiveInterview()

  return (
    <Tooltip title={activeInterview ? 'Go to live interview' : 'No live interview in progress'}>
      <span>
        <IconButton
          aria-label="Go to live interview"
          color="inherit"
          disabled={!activeInterview}
          onClick={() => {
            if (activeInterview) {
              navigate(`/interview-builder/run?${activeInterview.search}`)
            }
          }}
          sx={{
            '&:focus-visible': {
              outline: '2px solid currentColor',
              outlineOffset: '2px',
            },
          }}
        >
          <PlayCircleFilledRoundedIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}
