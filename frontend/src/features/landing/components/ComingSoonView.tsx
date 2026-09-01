import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface ComingSoonViewProps {
  selectedMenuLabel: string | null
}

export default function ComingSoonView({ selectedMenuLabel }: ComingSoonViewProps) {
  if (selectedMenuLabel === null) {
    return (
      <Box
        component="section"
        aria-label="No topics configured"
        sx={{ p: 4, textAlign: 'center' }}
      >
        <Typography variant="h5" gutterBottom>
          No topics configured
        </Typography>
        <Typography variant="body1" color="text.secondary">
          No menu items are currently configured. Please check the menu configuration.
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      component="section"
      aria-label={`Coming soon: ${selectedMenuLabel}`}
      sx={{ p: 4, textAlign: 'center' }}
    >
      <Typography variant="h4" gutterBottom>
        {selectedMenuLabel} — Coming Soon
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Content for <strong>{selectedMenuLabel}</strong> is not yet available. Check back soon!
      </Typography>
    </Box>
  )
}
