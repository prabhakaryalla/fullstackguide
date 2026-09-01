import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import MenuSummaryTileGrid from '../components/MenuSummaryTileGrid'
import { getMenuTileSummaries } from '../data/getMenuTileSummaries'
import { getSortedMenuItems } from '../../landing/data/getSortedMenuItems'

export default function MainMenuTilesPage() {
  const navigate = useNavigate()
  const menuItems = useMemo(() => getSortedMenuItems(), [])
  const summaries = useMemo(() => getMenuTileSummaries(menuItems), [menuItems])

  return (
    <Box sx={{ p: 3, height: '100%' }}>
      <MenuSummaryTileGrid summaries={summaries} onSelect={(menuId) => navigate(`/${menuId}`)} />
    </Box>
  )
}
