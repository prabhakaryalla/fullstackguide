import AppBar from '@mui/material/AppBar'
import ButtonBase from '@mui/material/ButtonBase'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import TopMenuItems from './TopMenuItems'
import GlobalSearchBar from './GlobalSearchBar'
import ThemeToggleAction from './ThemeToggleAction'
import type { NavigationMenuItem, TopNavigationGroupView } from '../model/types'

interface LandingNavigationBarProps {
  groups: TopNavigationGroupView[]
  activeGroupId: string | null
  onHomeSelect: () => void
  onSelect: (item: NavigationMenuItem) => void
}

export default function LandingNavigationBar({
  groups,
  activeGroupId,
  onHomeSelect,
  onSelect,
}: LandingNavigationBarProps) {
  return (
    <AppBar component="header" position="fixed" color="primary" enableColorOnDark>
      <Toolbar aria-label="Top navigation bar">
        <ButtonBase
          onClick={onHomeSelect}
          sx={{
            mr: 3,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            borderRadius: 1,
            px: 0.5,
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'common.white',
              outlineOffset: 2,
            },
          }}
          aria-label="Go to main page"
        >
          <Typography variant="h6" component="span">
            Fullstack Guide
          </Typography>
        </ButtonBase>
        <GlobalSearchBar />
        <TopMenuItems groups={groups} activeGroupId={activeGroupId} onSelect={onSelect} />
        <ThemeToggleAction />
      </Toolbar>
    </AppBar>
  )
}
