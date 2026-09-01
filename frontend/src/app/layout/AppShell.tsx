import { useMemo } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import LandingNavigationBar from '../../features/landing/components/LandingNavigationBar'
import { getSortedMenuItems } from '../../features/landing/data/getSortedMenuItems'
import { getTopNavigationTree } from '../../features/landing/data/getTopNavigationTree'
import { resolveSelectedMenuId, resolveActiveTopNavigationGroupId } from './resolveSelectedMenuId'

export default function AppShell() {
  const navigate = useNavigate()
  const location = useLocation()
  const menuItems = useMemo(() => getSortedMenuItems(), [])
  const groups = useMemo(() => getTopNavigationTree(), [])

  const knownMenuIds = useMemo(() => new Set(menuItems.map((item) => item.id)), [menuItems])
  const selectedLeafId = resolveSelectedMenuId(location.pathname, knownMenuIds)
  const activeGroupId = resolveActiveTopNavigationGroupId(selectedLeafId, groups)

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingNavigationBar
        groups={groups}
        activeGroupId={activeGroupId}
        onHomeSelect={() => navigate('/')}
        onSelect={(item) => navigate(`/${item.id}`)}
      />
      <Box
        aria-hidden
        sx={(theme) => ({
          ...theme.mixins.toolbar,
        })}
      />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
