import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import CloseIcon from '@mui/icons-material/Close'
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded'
import SellRoundedIcon from '@mui/icons-material/SellRounded'
import { useNavigate } from 'react-router-dom'
import GlobalSearchBar from './GlobalSearchBar'
import type { NavigationMenuItem, TopNavigationGroupView } from '../model/types'

interface MobileNavigationDrawerProps {
  open: boolean
  onClose: () => void
  groups: TopNavigationGroupView[]
  activeGroupId: string | null
  onSelect: (item: NavigationMenuItem) => void
}

export default function MobileNavigationDrawer({
  open,
  onClose,
  groups,
  activeGroupId,
  onSelect,
}: MobileNavigationDrawerProps) {
  const navigate = useNavigate()

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: 300 } } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: 1 }}>
        <IconButton aria-label="Close navigation menu" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ px: 2, pb: 2 }}>
        <GlobalSearchBar variant="plain" />
      </Box>
      <Divider />
      <List disablePadding>
        <ListItemButton
          onClick={() => {
            navigate('/bookmarks')
            onClose()
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <BookmarksRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My Bookmarks" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            navigate('/tags')
            onClose()
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <SellRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Browse by Tags" />
        </ListItemButton>
      </List>
      <Divider />
      <List component="nav" aria-label="Topic navigation" sx={{ pb: 2 }} disablePadding>
        {groups.map((group) => {
          if (group.children.length === 0) {
            const item: NavigationMenuItem = { id: group.id, label: group.label, order: group.order }
            return (
              <ListItemButton
                key={group.id}
                selected={activeGroupId === group.id}
                onClick={() => onSelect(item)}
              >
                <ListItemText primary={group.label} />
              </ListItemButton>
            )
          }

          return (
            <Box key={group.id}>
              <ListSubheader disableSticky>{group.label}</ListSubheader>
              {group.children.map((child) => (
                <ListItemButton
                  key={child.id}
                  sx={{ pl: 4 }}
                  selected={activeGroupId === child.id}
                  onClick={() => onSelect(child)}
                >
                  <ListItemText primary={child.label} />
                </ListItemButton>
              ))}
            </Box>
          )
        })}
      </List>
    </Drawer>
  )
}
