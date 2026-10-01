import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import SettingsBackupRestoreRoundedIcon from '@mui/icons-material/SettingsBackupRestoreRounded'
import { useNavigate } from 'react-router-dom'

export default function DataSettingsNavAction() {
  const navigate = useNavigate()

  return (
    <Tooltip title="Backup & restore your data">
      <IconButton
        aria-label="Backup and restore your data"
        color="inherit"
        onClick={() => navigate('/settings/data')}
        sx={{
          '&:focus-visible': {
            outline: '2px solid currentColor',
            outlineOffset: '2px',
          },
        }}
      >
        <SettingsBackupRestoreRoundedIcon />
      </IconButton>
    </Tooltip>
  )
}
