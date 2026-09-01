import IconButton from '@mui/material/IconButton'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import Box from '@mui/material/Box'
import { useThemeMode } from '../../../theme/useThemeMode'

export default function ThemeToggleAction() {
  const { mode, toggleMode } = useThemeMode()
  const nextMode = mode === 'light' ? 'dark' : 'light'

  return (
    <Box sx={{ marginLeft: 'auto' }}>
      <IconButton
        aria-label={`Switch to ${nextMode} theme`}
        color="inherit"
        onClick={toggleMode}
        sx={{
          '&:focus-visible': {
            outline: '2px solid currentColor',
            outlineOffset: '2px',
          },
        }}
      >
        {nextMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Box>
  )
}
