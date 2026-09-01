import { useRef, useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import type { NavigationMenuItem, TopNavigationGroupView } from '../model/types'

interface TopMenuItemsProps {
  groups: TopNavigationGroupView[]
  activeGroupId: string | null
  onSelect: (item: NavigationMenuItem) => void
}

function itemSx(isSelected: boolean) {
  return {
    flexShrink: 0,
    textTransform: 'none',
    fontWeight: isSelected ? 700 : 400,
    color: isSelected ? '#1a1a2e' : 'rgba(255,255,255,0.85)',
    backgroundColor: isSelected ? '#ffffff' : 'transparent',
    borderRadius: '6px',
    px: 1.5,
    py: 0.5,
    '&:hover': {
      backgroundColor: isSelected ? '#f0f0f0' : 'rgba(255,255,255,0.12)',
      color: isSelected ? '#1a1a2e' : '#ffffff',
    },
    '&:focus-visible': {
      outline: '2px solid #ffffff',
      outlineOffset: '2px',
    },
  } as const
}

export default function TopMenuItems({ groups, activeGroupId, onSelect }: TopMenuItemsProps) {
  const [openGroupId, setOpenGroupId] = useState<string | null>(null)
  // Suppresses the focus-reopen loop that Escape's focus-restoration would otherwise trigger
  const suppressFocusOpenRef = useRef<string | null>(null)
  // Captures the open state from before the current pointer gesture started (set on
  // mouseenter, consumed on click), since a click's pointer simulation hovers first
  const openBeforeInteractionRef = useRef<string | null | undefined>(undefined)
  // Debounces mouseleave so a brief pointer flicker between the trigger and its submenu doesn't close it
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  function openGroupNow(groupId: string) {
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setOpenGroupId(groupId)
  }

  function closeGroup(groupId: string) {
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current)
    }
    closeTimeoutRef.current = setTimeout(() => {
      setOpenGroupId((current) => (current === groupId ? null : current))
    }, 100)
  }

  function closeGroupImmediately() {
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setOpenGroupId(null)
  }

  return (
    <Box
      component="nav"
      aria-label="Topic navigation"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        flex: '1 1 auto',
        minWidth: 0,
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': { height: 4 },
      }}
    >
      {groups.map((group) => {
        const isActive = activeGroupId === group.id

        if (group.children.length === 0) {
          const item: NavigationMenuItem = { id: group.id, label: group.label, order: group.order }
          return (
            <Button
              key={group.id}
              variant="text"
              onClick={() => onSelect(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelect(item)
                }
              }}
              aria-pressed={isActive}
              sx={itemSx(isActive)}
            >
              {group.label}
            </Button>
          )
        }

        const isOpen = openGroupId === group.id

        return (
          <Box
            key={group.id}
            sx={{ flexShrink: 0 }}
            onMouseEnter={() => {
              // Capture pre-gesture state here: a click's realistic pointer simulation
              // fires mouseenter (hover-open) before mousedown/click, so this must run first
              if (openBeforeInteractionRef.current === undefined) {
                openBeforeInteractionRef.current = openGroupId
              }
              openGroupNow(group.id)
            }}
            onMouseLeave={() => {
              openBeforeInteractionRef.current = undefined
              closeGroup(group.id)
            }}
          >
            <Button
              ref={(el) => {
                triggerRefs.current[group.id] = el
              }}
              variant="text"
              onClick={() => {
                const wasOpen = openBeforeInteractionRef.current === group.id
                openBeforeInteractionRef.current = undefined
                setOpenGroupId(wasOpen ? null : group.id)
              }}
              onFocus={() => {
                if (suppressFocusOpenRef.current === group.id) {
                  suppressFocusOpenRef.current = null
                  return
                }
                openGroupNow(group.id)
              }}
              aria-haspopup="menu"
              aria-expanded={isOpen}
              aria-pressed={isActive}
              endIcon={<ExpandMoreIcon fontSize="small" />}
              sx={itemSx(isActive)}
            >
              {group.label}
            </Button>
            {/* Portals to document.body via Popper so the menu escapes the scrollable nav's clipping */}
            <Popper
              open={isOpen}
              anchorEl={triggerRefs.current[group.id]}
              placement="bottom-start"
              sx={{ zIndex: (theme) => theme.zIndex.appBar + 1 }}
            >
              <Paper
                onMouseEnter={() => openGroupNow(group.id)}
                onMouseLeave={() => closeGroup(group.id)}
              >
                <MenuList
                  autoFocusItem
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      suppressFocusOpenRef.current = group.id
                      closeGroupImmediately()
                      triggerRefs.current[group.id]?.focus()
                    }
                  }}
                >
                  {group.children.map((child) => (
                    <MenuItem
                      key={child.id}
                      onClick={() => {
                        onSelect(child)
                        closeGroupImmediately()
                      }}
                    >
                      {child.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            </Popper>
          </Box>
        )
      })}
    </Box>
  )
}

