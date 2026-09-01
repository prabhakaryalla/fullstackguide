import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import MenuSummaryTile from './MenuSummaryTile'
import type { MenuTileSummary } from '../model/types'

interface MenuSummaryTileGridProps {
  summaries: MenuTileSummary[]
  onSelect: (menuId: string) => void
}

export default function MenuSummaryTileGrid({ summaries, onSelect }: MenuSummaryTileGridProps) {
  if (summaries.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ mt: 4 }}>
        No menu areas available
      </Typography>
    )
  }

  return (
    <Grid container spacing={2}>
      {summaries.map((summary) => (
        <Grid key={summary.menuId} size={{ xs: 12, sm: 6, md: 4 }}>
          <MenuSummaryTile summary={summary} onSelect={onSelect} />
        </Grid>
      ))}
    </Grid>
  )
}
