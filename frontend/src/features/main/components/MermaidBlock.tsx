import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

let diagramIdCounter = 0

interface MermaidBlockProps {
  code: string
}

export default function MermaidBlock({ code }: MermaidBlockProps) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !code.trim()) return
    // Re-initialise per render so the diagram theme follows the current light/dark mode
    mermaid.initialize({ startOnLoad: false, theme: isDark ? 'dark' : 'default' })
    const id = `mermaid-diagram-${++diagramIdCounter}`
    setError(false)
    mermaid
      .render(id, code)
      .then(({ svg }) => {
        if (containerRef.current) containerRef.current.innerHTML = svg
      })
      .catch(() => setError(true))
  }, [code, isDark])

  if (error) {
    return (
      <Typography color="text.secondary" variant="body2" sx={{ fontStyle: 'italic', my: 1 }}>
        Diagram syntax not supported
      </Typography>
    )
  }

  return <Box ref={containerRef} sx={{ my: 2, overflowX: 'auto' }} />
}

