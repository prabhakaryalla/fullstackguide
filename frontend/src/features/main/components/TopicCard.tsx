import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded'
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import type { Topic, TopicComplexity } from '../model/types'
import TagChipList from '../../tags/components/TagChipList'

interface TopicCardProps {
  topic: Topic
  onClick: (topic: Topic) => void
  completed?: boolean
  bookmarked?: boolean
  onToggleBookmark?: (topic: Topic) => void
  onRemove?: (topic: Topic) => void
  snippet?: string
  tags?: string[]
}

const complexityColor: Record<TopicComplexity, 'success' | 'warning' | 'error' | 'default'> = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'error',
  Unknown: 'default',
}

export default function TopicCard({ topic, onClick, completed = false, bookmarked = false, onToggleBookmark, onRemove, snippet, tags }: TopicCardProps) {
  const complexity = topic.complexity ?? 'Unknown'

  return (
    <Card
      variant="outlined"
      sx={{
        position: 'relative',
        height: '100%',
        borderRadius: 2,
        '&:focus-within': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
      }}
    >
      {/* sibling of CardActionArea, not nested inside it — avoids invalid nested <button> markup */}
      {onToggleBookmark && (
        <IconButton
          size="small"
          onClick={(event) => {
            event.stopPropagation()
            onToggleBookmark(topic)
          }}
          aria-pressed={bookmarked}
          aria-label={bookmarked ? `Remove bookmark for ${topic.title}` : `Bookmark ${topic.title}`}
          sx={{ position: 'absolute', top: 4, left: 4, zIndex: 1 }}
        >
          {bookmarked ? (
            <BookmarkRoundedIcon fontSize="small" color="primary" />
          ) : (
            <BookmarkBorderRoundedIcon fontSize="small" color="action" />
          )}
        </IconButton>
      )}
      {onRemove && (
        <IconButton
          size="small"
          onClick={(event) => {
            event.stopPropagation()
            onRemove(topic)
          }}
          aria-label={`Remove ${topic.title} from this session`}
          sx={{ position: 'absolute', top: 4, right: 4, zIndex: 1 }}
        >
          <CloseRoundedIcon fontSize="small" color="action" />
        </IconButton>
      )}
      <CardActionArea
        onClick={() => onClick(topic)}
        sx={{ height: '100%', alignItems: 'stretch' }}
      >
        <CardContent sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1} sx={{ pl: onToggleBookmark ? 4 : 0, pr: onRemove ? 4 : 0 }}>
            <Typography variant="h6" component="h2" sx={{ fontSize: '1.05rem', lineHeight: 1.35 }}>
              {topic.title}
            </Typography>
            {completed ? (
              <CheckCircleRoundedIcon fontSize="small" color="success" titleAccess="Completed" sx={{ mt: 0.25, flexShrink: 0 }} />
            ) : (
              <ChevronRightRoundedIcon fontSize="small" color="action" sx={{ mt: 0.25, flexShrink: 0 }} />
            )}
          </Stack>
          {snippet && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {snippet}
            </Typography>
          )}
          {/* pin badge to card bottom so it aligns across rows regardless of title length */}
          <Box sx={{ mt: 'auto', pt: 1.5 }}>
            <Chip
              label={complexity}
              size="small"
              color={complexityColor[complexity]}
              variant={complexity === 'Unknown' ? 'outlined' : 'filled'}
            />
            {tags && tags.length > 0 && (
              <Box sx={{ mt: 0.75 }}>
                <TagChipList tagIds={tags} maxVisible={2} dense />
              </Box>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
