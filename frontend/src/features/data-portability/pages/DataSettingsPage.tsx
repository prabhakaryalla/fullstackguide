import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import UploadRoundedIcon from '@mui/icons-material/UploadRounded'
import {
  applyAppDataExport,
  buildAppDataExport,
  countExportableEntries,
  downloadAppDataExport,
  parseAppDataExport,
} from '../data/exportImportData'
import type { AppDataExport } from '../data/exportImportData'

export default function DataSettingsPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [pendingImport, setPendingImport] = useState<AppDataExport | null>(null)
  const [importError, setImportError] = useState<string | null>(null)
  const [importedCount, setImportedCount] = useState<number | null>(null)

  function handleChooseFile() {
    fileInputRef.current?.click()
  }

  async function handleFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = '' // allow re-selecting the same file next time
    if (!file) {
      return
    }
    setImportError(null)
    setImportedCount(null)
    const raw = await file.text()
    const parsed = parseAppDataExport(raw)
    if (!parsed) {
      setImportError("This doesn't look like a valid fullstackguide backup file.")
      return
    }
    setPendingImport(parsed)
  }

  function handleConfirmImport() {
    if (!pendingImport) {
      return
    }
    const count = applyAppDataExport(pendingImport)
    setPendingImport(null)
    setImportedCount(count)
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" flexWrap="wrap" gap={1.5} sx={{ mb: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Backup & Restore
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            This app saves everything — bookmarks, progress, flashcard history, and interview builder data — only in
            this browser. Clearing your browser data or switching devices will lose it unless you back it up here.
          </Typography>
        </Box>
        <Button
          onClick={() => navigate('/')}
          variant="text"
          color="inherit"
          size="small"
          startIcon={<ArrowBackRoundedIcon fontSize="small" />}
        >
          Back home
        </Button>
      </Stack>

      <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
          Export your data
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Downloads a single JSON file with your bookmarks, topic progress, tags, flashcard state, interview history,
          candidate notes, and theme preference — think of it like a save file you can keep somewhere safe or move to
          another browser.
        </Typography>
        <Button variant="contained" startIcon={<DownloadRoundedIcon />} onClick={() => downloadAppDataExport()}>
          Download backup file
        </Button>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
          Import a backup
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Restores a previously downloaded backup file into this browser. This overwrites any existing data of the
          same kind already saved here, so use it on a fresh browser/device, or when you deliberately want to roll
          back to an earlier backup.
        </Typography>
        <Button variant="outlined" startIcon={<UploadRoundedIcon />} onClick={handleChooseFile}>
          Choose backup file
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          hidden
          aria-label="Choose backup file"
          onChange={(event) => {
            void handleFileSelected(event)
          }}
        />

        {importError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {importError}
          </Alert>
        )}

        {importedCount !== null && (
          <Alert
            severity="success"
            sx={{ mt: 2 }}
            action={
              <Button color="inherit" size="small" onClick={() => window.location.reload()}>
                Reload page
              </Button>
            }
          >
            Restored {importedCount} item{importedCount === 1 ? '' : 's'}. Reload the page to see your restored data.
          </Alert>
        )}
      </Paper>

      <Dialog open={pendingImport !== null} onClose={() => setPendingImport(null)}>
        <DialogTitle>Overwrite existing data with this backup?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            This backup contains {pendingImport ? countExportableEntries(pendingImport) : 0} saved item
            {pendingImport && countExportableEntries(pendingImport) === 1 ? '' : 's'}
            {pendingImport?.exportedAt ? ` from ${new Date(pendingImport.exportedAt).toLocaleString()}` : ''}. Importing
            replaces any bookmarks, progress, or interview data already saved in this browser for matching items.
            This can&apos;t be undone.
          </Typography>
          {countExportableEntries(buildAppDataExport()) > 0 && (
            <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
              Consider downloading a backup of your current data first if you haven&apos;t already.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPendingImport(null)}>Cancel</Button>
          <Button color="error" onClick={handleConfirmImport}>
            Import and overwrite
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
