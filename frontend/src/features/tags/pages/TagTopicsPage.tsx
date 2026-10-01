import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import ButtonBase from '@mui/material/ButtonBase'
import Chip from '@mui/material/Chip'
import { useTopicsByTag } from '../hooks/useTopicsByTag'
import { TAG_DEFINITIONS } from '../data/tagDefinitions'

export default function TagTopicsPage() {
  const { tagId = '' } = useParams<{ tagId: string }>()
  const navigate = useNavigate()
  const { status, topics } = useTopicsByTag(tagId)

  const tagDefinition = TAG_DEFINITIONS.find((tag) => tag.id === tagId)

  if (!tagDefinition) {
    return (
      <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h5" component="h1">
          Tag not found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          The tag "{tagId}" does not exist.
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        {tagDefinition.label}
      </Typography>

      {status === 'loading' && (
        <Stack direction="row" spacing={1} alignItems="center" aria-label="Loading topics for this tag">
          <CircularProgress size={16} />
          <Typography variant="body2" color="text.secondary">
            Loading topics…
          </Typography>
        </Stack>
      )}

      {status === 'ready' && topics.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No topics found for this tag
        </Typography>
      )}

      {status === 'ready' && topics.length > 0 && (
        <Stack spacing={1}>
          {topics.map((entry) => (
            <ButtonBase
              key={entry.topic.id}
              onClick={() => navigate(`/${entry.menuId}/${entry.topic.slug}`)}
              sx={{
                justifyContent: 'flex-start',
                p: 1.5,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                textAlign: 'left',
                '&:hover': { borderColor: 'primary.main' },
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '100%' }}>
                <Typography variant="body1" sx={{ flex: 1 }}>
                  {entry.topic.title}
                </Typography>
                <Chip label={entry.menuLabel} size="small" variant="outlined" />
              </Stack>
            </ButtonBase>
          ))}
        </Stack>
      )}
    </Box>
  )
}
