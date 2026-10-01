import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import ButtonBase from '@mui/material/ButtonBase'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import { useRelatedTopics } from '../hooks/useRelatedTopics'
import type { Topic } from '../../main/model/types'

interface RelatedTopicsSectionProps {
  topic: Topic
}

export default function RelatedTopicsSection({ topic }: RelatedTopicsSectionProps) {
  const navigate = useNavigate()
  const { status, relatedTopics } = useRelatedTopics(topic)

  return (
    <Box sx={{ mt: 4 }}>
      <Divider sx={{ mb: 3 }} />
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Related Topics
      </Typography>

      {status === 'loading' && (
        <Stack direction="row" spacing={1} alignItems="center" aria-label="Finding related topics">
          <CircularProgress size={16} />
          <Typography variant="body2" color="text.secondary">
            Finding related topics…
          </Typography>
        </Stack>
      )}

      {status === 'ready' && relatedTopics.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No related topics found
        </Typography>
      )}

      {status === 'ready' && relatedTopics.length > 0 && (
        <Stack spacing={1}>
          {relatedTopics.map((related) => (
            <ButtonBase
              key={related.topic.id}
              onClick={() => navigate(`/${related.menuId}/${related.topic.slug}`)}
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
                  {related.topic.title}
                </Typography>
                <Chip label={related.menuLabel} size="small" variant="outlined" />
              </Stack>
            </ButtonBase>
          ))}
        </Stack>
      )}
    </Box>
  )
}
