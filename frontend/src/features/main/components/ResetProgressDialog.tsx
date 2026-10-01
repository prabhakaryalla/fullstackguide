import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

interface ResetProgressDialogProps {
  open: boolean
  menuLabel: string
  completedCount: number
  onCancel: () => void
  onConfirm: () => void
}

export default function ResetProgressDialog({
  open,
  menuLabel,
  completedCount,
  onCancel,
  onConfirm,
}: ResetProgressDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="reset-progress-dialog-title">
      <DialogTitle id="reset-progress-dialog-title">Reset progress for {menuLabel}?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This will mark all {completedCount} completed {menuLabel} topic
          {completedCount === 1 ? '' : 's'} as not completed. This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm} color="error">
          Reset progress
        </Button>
      </DialogActions>
    </Dialog>
  )
}
