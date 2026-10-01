import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { useLocation, useNavigate } from 'react-router-dom'

interface GlobalSearchBarProps {
  // 'plain' renders full-width, dark-on-light text for use inside the mobile nav drawer
  variant?: 'appbar' | 'plain'
}

export default function GlobalSearchBar({ variant = 'appbar' }: GlobalSearchBarProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [value, setValue] = useState('')
  const [manuallyExpanded, setManuallyExpanded] = useState(false)

  const isOnSearchPage = pathname === '/search'
  const isCollapsed = variant === 'appbar' && isOnSearchPage && !manuallyExpanded
  const isPlain = variant === 'plain'

  // Collapsing back to icon-only must survive route changes not caused by a submit (e.g. Back button)
  useEffect(() => {
    if (pathname !== '/search') {
      setManuallyExpanded(false)
      setValue('')
    }
  }, [pathname])

  function submit() {
    const trimmed = value.trim()
    if (!trimmed) return
    navigate(`/search?q=${encodeURIComponent(trimmed)}`)
    setValue('')
    setManuallyExpanded(false)
  }

  if (isCollapsed) {
    return (
      <IconButton
        aria-label="Open global search"
        onClick={() => setManuallyExpanded(true)}
        sx={{ mr: 3, color: 'common.white' }}
      >
        <SearchRoundedIcon fontSize="small" />
      </IconButton>
    )
  }

  return (
    <TextField
      variant="outlined"
      size="small"
      placeholder="Search all topics"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') submit()
      }}
      inputProps={{ 'aria-label': 'Search all topics' }}
      sx={
        isPlain
          ? { width: '100%' }
          : {
              mr: 3,
              flexShrink: 0,
              width: { xs: 160, sm: 220 },
              bgcolor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: 1,
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.35)' },
              '& .MuiInputBase-input': { color: 'common.white' },
              '& .MuiInputBase-input::placeholder': { color: 'rgba(255, 255, 255, 0.7)', opacity: 1 },
            }
      }
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Search all topics"
                onClick={submit}
                edge="end"
                size="small"
                sx={isPlain ? undefined : { color: 'common.white' }}
              >
                <SearchRoundedIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  )
}
