import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

let diagramIdCounter = 0

interface MermaidBlockProps {
  code: string
}

const SVG_NS = 'http://www.w3.org/2000/svg'

// Adds a small dot per edge that travels along its path, staggered so message
// movement between nodes reads clearly instead of a static arrow.
function addTravelingDots(svg: SVGSVGElement, dotColor: string) {
  const paths = Array.from(svg.querySelectorAll<SVGPathElement>('path.flowchart-link'))

  paths.forEach((path, index) => {
    const length = path.getTotalLength()
    if (!length) return

    const dot = document.createElementNS(SVG_NS, 'circle')
    dot.setAttribute('r', '4')
    dot.setAttribute('fill', dotColor)
    dot.setAttribute('class', 'mermaid-flow-dot')
    dot.style.offsetPath = `path('${path.getAttribute('d') ?? ''}')`
    dot.style.setProperty('--dot-delay', `${(index % 6) * 0.25}s`)
    svg.appendChild(dot)
  })
}

export default function MermaidBlock({ code }: MermaidBlockProps) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !code.trim()) return
    // React StrictMode (dev only) invokes this effect twice in a row — without
    // this guard, the first render's async result can land AFTER the second
    // invocation has already redrawn the diagram, replacing it a beat later
    // and reading as a flicker every time the answer is revealed.
    let cancelled = false
    // Re-initialise per render so the diagram theme follows the current light/dark mode
    mermaid.initialize({ startOnLoad: false, theme: isDark ? 'dark' : 'default' })
    const id = `mermaid-diagram-${++diagramIdCounter}`
    setError(false)
    mermaid
      .render(id, code)
      .then(({ svg }) => {
        if (cancelled || !containerRef.current) return
        containerRef.current.innerHTML = svg
        const svgEl = containerRef.current.querySelector('svg')
        if (svgEl) addTravelingDots(svgEl, theme.palette.primary.main)
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
    return () => {
      cancelled = true
    }
  }, [code, isDark, theme.palette.primary.main])

  if (error) {
    return (
      <Typography color="text.secondary" variant="body2" sx={{ fontStyle: 'italic', my: 1 }}>
        Diagram syntax not supported
      </Typography>
    )
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        my: 2,
        overflowX: 'auto',
        // Subtle dashed flow direction along edges
        '& .flowchart-link': {
          strokeDasharray: '6 4',
          animation: 'mermaid-flow 1s linear infinite',
        },
        // Dot traveling the full edge path — the clearest visual cue of data/message movement
        '& .mermaid-flow-dot': {
          offsetRotate: '0deg',
          animation: 'mermaid-travel 2.4s linear infinite',
          animationDelay: 'var(--dot-delay, 0s)',
        },
        // Gentle pulse on nodes so the diagram reads as "live" rather than static
        '& .node rect, & .node polygon, & .node circle': {
          animation: 'mermaid-pulse 2.4s ease-in-out infinite',
        },
        '@keyframes mermaid-flow': {
          to: { strokeDashoffset: -20 },
        },
        '@keyframes mermaid-travel': {
          from: { offsetDistance: '0%', opacity: 0 },
          '5%': { opacity: 1 },
          '95%': { opacity: 1 },
          to: { offsetDistance: '100%', opacity: 0 },
        },
        '@keyframes mermaid-pulse': {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.15)' },
        },
        '@media (prefers-reduced-motion: reduce)': {
          '& .flowchart-link, & .mermaid-flow-dot, & .node rect, & .node polygon, & .node circle': {
            animation: 'none',
          },
        },
      }}
    />
  )
}

