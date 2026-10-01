import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { TAG_DEFINITIONS } from '../data/tagDefinitions'

interface TagChipListProps {
  tagIds: string[]
  onTagClick?: (tagId: string) => void
  maxVisible?: number
  // Card-level indicators: smaller, muted styling so tags read as secondary
  // metadata and don't visually compete with the complexity badge.
  dense?: boolean
}

const labelById = new Map(TAG_DEFINITIONS.map((tag) => [tag.id, tag.label]))

const denseChipSx = {
  height: 20,
  fontSize: '0.6875rem',
  fontWeight: 500,
  color: 'text.secondary',
  borderColor: 'divider',
} as const

export default function TagChipList({ tagIds, onTagClick, maxVisible, dense }: TagChipListProps) {
  if (tagIds.length === 0) {
    return null
  }

  const visibleTagIds = maxVisible ? tagIds.slice(0, maxVisible) : tagIds
  const hiddenCount = tagIds.length - visibleTagIds.length

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: dense ? 0.75 : 1 }}>
      {visibleTagIds.map((tagId) => (
        <Chip
          key={tagId}
          label={labelById.get(tagId) ?? tagId}
          size="small"
          variant="outlined"
          color={onTagClick ? 'primary' : 'default'}
          clickable={Boolean(onTagClick)}
          onClick={onTagClick ? () => onTagClick(tagId) : undefined}
          sx={dense ? denseChipSx : undefined}
        />
      ))}
      {hiddenCount > 0 && (
        <Chip
          label={`+${hiddenCount}`}
          size="small"
          variant="outlined"
          color="default"
          title={`${hiddenCount} more tags`}
          sx={
            dense
              ? { ...denseChipSx, color: 'text.disabled', borderStyle: 'dashed' }
              : { color: 'text.disabled' }
          }
        />
      )}
    </Box>
  )
}

