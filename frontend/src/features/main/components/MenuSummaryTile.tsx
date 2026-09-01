import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { MenuTileSummary } from '../model/types'

interface MenuSummaryTileProps {
  summary: MenuTileSummary
  onSelect: (menuId: string) => void
}

export default function MenuSummaryTile({ summary, onSelect }: MenuSummaryTileProps) {
  const easyPercent = summary.stats.totalTopics === 0
    ? 0
    : Math.round((summary.stats.easyTopics / summary.stats.totalTopics) * 100)
  const mediumPercent = summary.stats.totalTopics === 0
    ? 0
    : Math.round((summary.stats.mediumTopics / summary.stats.totalTopics) * 100)
  const hardPercent = summary.stats.totalTopics === 0
    ? 0
    : Math.round((summary.stats.hardTopics / summary.stats.totalTopics) * 100)
  const unknownPercent = Math.max(0, 100 - easyPercent - mediumPercent - hardPercent)

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        background:
          'linear-gradient(140deg, rgba(15, 35, 95, 0.06) 0%, rgba(0, 138, 95, 0.04) 100%)',
        '&:focus-within': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: 2,
        },
      }}
    >
      <CardActionArea
        onClick={() => onSelect(summary.menuId)}
        sx={{ height: '100%', alignItems: 'stretch', p: 0.5 }}
      >
        <CardContent sx={{ width: '100%' }}>
          <Stack spacing={1.5}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Typography variant="h6" component="h2">
                {summary.menuLabel}
              </Typography>
              <Chip label={`${summary.stats.totalTopics} topics`} size="small" color="primary" />
            </Stack>

            <Box>
              <Stack
                direction="row"
                sx={{
                  overflow: 'hidden',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  height: 8,
                }}
              >
                <Box sx={{ width: `${easyPercent}%`, bgcolor: 'success.main' }} />
                <Box sx={{ width: `${mediumPercent}%`, bgcolor: 'warning.main' }} />
                <Box sx={{ width: `${hardPercent}%`, bgcolor: 'error.main' }} />
                <Box sx={{ width: `${unknownPercent}%`, bgcolor: 'grey.400' }} />
              </Stack>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.75, display: 'block' }}>
                Easy {summary.stats.easyTopics} | Medium {summary.stats.mediumTopics} | Hard {summary.stats.hardTopics}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
