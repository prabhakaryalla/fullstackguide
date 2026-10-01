import IconButton from '@mui/material/IconButton'
import SellRoundedIcon from '@mui/icons-material/SellRounded'
import { useNavigate } from 'react-router-dom'

export default function TagsNavAction() {
  const navigate = useNavigate()

  return (
    <IconButton
      aria-label="Browse by tags"
      color="inherit"
      onClick={() => navigate('/tags')}
      sx={{
        '&:focus-visible': {
          outline: '2px solid currentColor',
          outlineOffset: '2px',
        },
      }}
    >
      <SellRoundedIcon />
    </IconButton>
  )
}
