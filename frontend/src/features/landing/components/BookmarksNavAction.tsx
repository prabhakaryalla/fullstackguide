import IconButton from '@mui/material/IconButton'
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded'
import { useNavigate } from 'react-router-dom'

export default function BookmarksNavAction() {
  const navigate = useNavigate()

  return (
    <IconButton
      aria-label="View my bookmarks"
      color="inherit"
      onClick={() => navigate('/bookmarks')}
      sx={{
        '&:focus-visible': {
          outline: '2px solid currentColor',
          outlineOffset: '2px',
        },
      }}
    >
      <BookmarksRoundedIcon />
    </IconButton>
  )
}
