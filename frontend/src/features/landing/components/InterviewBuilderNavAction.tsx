import IconButton from '@mui/material/IconButton'
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded'
import { useNavigate } from 'react-router-dom'

export default function InterviewBuilderNavAction() {
  const navigate = useNavigate()

  return (
    <IconButton
      aria-label="Build an interview session"
      color="inherit"
      onClick={() => navigate('/interview-builder')}
      sx={{
        '&:focus-visible': {
          outline: '2px solid currentColor',
          outlineOffset: '2px',
        },
      }}
    >
      <FactCheckRoundedIcon />
    </IconButton>
  )
}
