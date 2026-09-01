import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import type { ComplexityFilter } from '../model/types'
import { COMPLEXITY_FILTER_OPTIONS } from '../model/types'

interface TopicSearchProps {
  value: string
  onChange: (value: string) => void
  complexity: ComplexityFilter
  onComplexityChange: (value: ComplexityFilter) => void
}

export default function TopicSearch({ value, onChange, complexity, onComplexityChange }: TopicSearchProps) {
  return (
    <Box
      sx={{
        mb: 3,
        display: 'grid',
        gap: 2,
        gridTemplateColumns: '1fr',
        '@media (min-width:1024px)': {
          gridTemplateColumns: 'minmax(0, 1fr) 220px',
          alignItems: 'start',
        },
      }}
    >
      <TextField
        label="Search topics"
        variant="outlined"
        size="small"
        fullWidth
        slotProps={{ inputLabel: { shrink: true } }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputProps={{ 'aria-label': 'Search topics' }}
      />
      <TextField
        select
        label="Complexity"
        variant="outlined"
        size="small"
        value={complexity}
        onChange={(e) => onComplexityChange(e.target.value as ComplexityFilter)}
        inputProps={{ 'aria-label': 'Complexity filter' }}
        fullWidth
      >
        {COMPLEXITY_FILTER_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  )
}
