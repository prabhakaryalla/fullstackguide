import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import { useAllTagsWithCounts } from '../hooks/useAllTagsWithCounts'

export default function TagsIndexPage() {
  const navigate = useNavigate()
  const { status, tags } = useAllTagsWithCounts()

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Browse by Tags
      </Typography>

      {status === 'loading' && (
        <Stack direction="row" spacing={1} alignItems="center" aria-label="Loading tags">
          <CircularProgress size={16} />
          <Typography variant="body2" color="text.secondary">
            Loading tags…
          </Typography>
        </Stack>
      )}

      {status === 'ready' && (
        <List disablePadding>
          {tags.map((tag) => (
            <ListItemButton key={tag.id} onClick={() => navigate(`/tags/${tag.id}`)} sx={{ borderRadius: 1, mb: 0.5 }}>
              <ListItemText primary={tag.label} />
              <Chip label={tag.count} size="small" variant="outlined" />
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  )
}
