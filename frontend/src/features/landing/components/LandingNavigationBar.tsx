import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import ButtonBase from '@mui/material/ButtonBase'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import TopMenuItems from './TopMenuItems'
import GlobalSearchBar from './GlobalSearchBar'
import ThemeToggleAction from './ThemeToggleAction'
import BookmarksNavAction from './BookmarksNavAction'
import TagsNavAction from './TagsNavAction'
import InterviewBuilderNavAction from './InterviewBuilderNavAction'
import LiveInterviewNavAction from './LiveInterviewNavAction'
import DataSettingsNavAction from './DataSettingsNavAction'
import MobileNavigationDrawer from './MobileNavigationDrawer'
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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

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
            FS Guide
          </Typography>
        </ButtonBase>
        {isMobile ? (
          <>
            <Box sx={{ flex: '1 1 auto' }} />
            <TagsNavAction />
            <BookmarksNavAction />
            <InterviewBuilderNavAction />
            <LiveInterviewNavAction />
            <DataSettingsNavAction />
            <ThemeToggleAction />
            <IconButton
              aria-label="Open navigation menu"
              color="inherit"
              onClick={() => setMobileNavOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <MobileNavigationDrawer
              open={mobileNavOpen}
              onClose={() => setMobileNavOpen(false)}
              groups={groups}
              activeGroupId={activeGroupId}
              onSelect={(item) => {
                onSelect(item)
                setMobileNavOpen(false)
              }}
            />
          </>
        ) : (
          <>
            <GlobalSearchBar />
            <TopMenuItems groups={groups} activeGroupId={activeGroupId} onSelect={onSelect} />
            <TagsNavAction />
            <BookmarksNavAction />
            <InterviewBuilderNavAction />
            <LiveInterviewNavAction />
            <DataSettingsNavAction />
            <ThemeToggleAction />
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

