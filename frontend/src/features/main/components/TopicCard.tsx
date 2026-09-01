import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import type { Topic, TopicComplexity } from '../model/types'

interface TopicCardProps {
  topic: Topic
  onClick: (topic: Topic) => void
}

const complexityColor: Record<TopicComplexity, 'success' | 'warning' | 'error' | 'default'> = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'error',
  Unknown: 'default',
}

export default function TopicCard({ topic, onClick }: TopicCardProps) {
  const complexity = topic.complexity ?? 'Unknown'

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        borderRadius: 2,
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
        '&:focus-within': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
      }}
    >
      <CardActionArea
        onClick={() => onClick(topic)}
        sx={{ height: '100%', alignItems: 'stretch' }}
      >
        <CardContent sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
            <Typography variant="h6" component="h2" sx={{ fontSize: '1.05rem', lineHeight: 1.35 }}>
              {topic.title}
            </Typography>
            <ChevronRightRoundedIcon fontSize="small" color="action" sx={{ mt: 0.25, flexShrink: 0 }} />
          </Stack>
          {/* pin badge to card bottom so it aligns across rows regardless of title length */}
          <Box sx={{ mt: 'auto', pt: 1.5 }}>
            <Chip
              label={complexity}
              size="small"
              color={complexityColor[complexity]}
              variant={complexity === 'Unknown' ? 'outlined' : 'filled'}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
