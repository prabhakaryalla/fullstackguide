import { useMemo } from 'react'
import Box from '@mui/material/Box'
import ComingSoonView from '../components/ComingSoonView'
import { getSortedMenuItems } from '../data/getSortedMenuItems'

const sortedItems = getSortedMenuItems()

export default function LandingPage() {
  const selectedLabel = useMemo(() => sortedItems[0]?.label ?? null, [])

  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ComingSoonView selectedMenuLabel={selectedLabel} />
    </Box>
  )
}
