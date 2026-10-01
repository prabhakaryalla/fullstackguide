import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

interface ArchifyEmbedProps {
  src: string
}

const MIN_HEIGHT = 360
// Relocating the toolbar into normal flow (below the title, see the effect further
// down) adds its height to the measured content, so this needs enough headroom that
// tall diagrams (long title + wrapped toolbar + cards) don't get cropped by the
// overflow:hidden wrapper below.
const MAX_HEIGHT = 1150
const LOADING_HEIGHT = 200
// Archify's viewer JS adapts its own reading width/layout to the iframe's live
// viewport height (window.innerHeight), so the iframe's *own* rendered height must
// stay fixed forever - otherwise measuring it and resizing it back creates an
// infinite feedback loop (visible as flicker). Generous enough to fit every diagram
// in this repo without the artifact's internal reader needing to reflow again.
const IFRAME_INTERNAL_HEIGHT = 1400
const SETTLE_MS = 350

// Pilot embed for Archify-generated interactive diagrams (see /diagrams).
// The artifact is a self-contained HTML document, so it's loaded in a sandboxed iframe
// rather than parsed/inlined like Mermaid's SVG output.
export default function ArchifyEmbed({ src }: ArchifyEmbedProps) {
  const [loaded, setLoaded] = useState(false)
  const [displayHeight, setDisplayHeight] = useState<number | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  // Resolve against Vite's configured base so the artifact loads correctly under /fullstackguide/ in dev and prod
  const resolvedSrc = `${import.meta.env.BASE_URL}${src.replace(/^\/+/, '')}`

  // Archify's toolbar (theme/style/motion/export buttons) is `position: fixed` at the
  // top-right of the artifact's own page, reserving wide padding next to the title so
  // it never overlaps - great full-page, but it squeezes the title into a narrow
  // column in our narrower article-width embed. Relocate the toolbar into normal flow
  // just below the title instead, so the title gets the embed's full width.
  useEffect(() => {
    if (!loaded) return
    const doc = iframeRef.current?.contentDocument
    if (!doc) return
    const toolbar = doc.querySelector<HTMLElement>('.toolbar')
    const headerRow = doc.querySelector<HTMLElement>('.header-row')
    if (!toolbar || !headerRow || toolbar.dataset.relocated) return

    const style = doc.createElement('style')
    style.textContent = `
      .toolbar { position: static !important; margin: 0.6rem 0 0 !important; flex-wrap: wrap; gap: 0.4rem !important; }
      .header,
      html[data-preset="signal-flow"] .header,
      html[data-preset="blueprint"] .header,
      html[data-preset="editorial"] .header { padding-right: 0 !important; }
      /* Keep titles compact so they read clearly at article-column widths instead of the artifact's full-page sizing. */
      h1, html[data-preset="editorial"] h1 { font-size: 1.1rem !important; line-height: 1.35 !important; }
      .subtitle { font-size: 0.8rem !important; }
      /* The desktop toolbar's buttons are sized for a full page's top-right corner; at
         article-column widths they wrap one-per-row and dwarf small diagrams. */
      .toolbar button { min-height: 2rem !important; padding: 0.32rem 0.55rem !important; font-size: 0.7rem !important; }
      .toolbar-icon { width: 0.8rem !important; height: 0.8rem !important; }
      .toolbar #btn-present { display: none !important; }
    `
    doc.head.appendChild(style)
    headerRow.insertAdjacentElement('afterend', toolbar)
    toolbar.dataset.relocated = 'true'
  }, [loaded])

  // Most artifacts in this repo were delivered before trace-motion existed, so their
  // SVGs lack the `data-animation="trace"` / `data-animate="edge"` markers that
  // activate Archify's built-in flow keyframes (those keyframes ship in every
  // artifact's CSS regardless). Add the markers ourselves so every diagram gets the
  // same one-pass "flow reveal" along its arrows on load, making the sequence of
  // interactions easier to follow at a glance instead of a static picture.
  useEffect(() => {
    if (!loaded) return
    const doc = iframeRef.current?.contentDocument
    if (!doc) return
    const svg = doc.querySelector<SVGSVGElement>('.diagram-container svg')
    if (!svg || svg.dataset.runtimeAnimated) return

    const edges = svg.querySelectorAll<SVGElement>('[data-composition-edge-id], [marker-end]')
    if (!edges.length) return

    edges.forEach((edge, index) => {
      edge.setAttribute('data-animate', 'edge')
      edge.style.setProperty('--step', String(index))
    })
    svg.setAttribute('data-animation', 'trace')
    svg.dataset.runtimeAnimated = 'true'
    doc.documentElement.setAttribute('data-motion-capable', 'true')
    doc.documentElement.setAttribute('data-ambient-motion', 'running')
  }, [loaded])

  // Diagram node/edge labels use an inline SVG `font-size` attribute sized for a
  // full-page reading distance. That scales fine for dense diagrams, but on a small,
  // simple diagram the labels end up large relative to their boxes, making the whole
  // thing look oversized. Shrink every label proportionally so simple diagrams read
  // as compact instead of zoomed-in.
  useEffect(() => {
    if (!loaded) return
    const doc = iframeRef.current?.contentDocument
    if (!doc) return
    const svg = doc.querySelector<SVGSVGElement>('.diagram-container svg')
    if (!svg || svg.dataset.runtimeTextScaled) return

    const labels = svg.querySelectorAll<SVGTextElement>('text[font-size]')
    if (!labels.length) return

    labels.forEach((label) => {
      const size = parseFloat(label.getAttribute('font-size') || '')
      if (Number.isFinite(size)) label.setAttribute('font-size', String(size * 0.82))
    })
    svg.dataset.runtimeTextScaled = 'true'
  }, [loaded])

  // The artifact always stretches its SVG to fill 100% of the available column width,
  // regardless of the diagram's own native size (its viewBox). That upscales small,
  // simple diagrams well past their authored size - the embed column here is much
  // wider than most diagrams were designed for. Cap the diagram at its native pixel
  // size instead, only shrinking (never enlarging) to fit a narrower embed.
  useEffect(() => {
    if (!loaded) return
    const doc = iframeRef.current?.contentDocument
    if (!doc) return
    const svg = doc.querySelector<SVGSVGElement>('.diagram-container svg')
    const diagramContainer = doc.querySelector<HTMLElement>('.diagram-container')
    if (!svg || !diagramContainer || diagramContainer.dataset.runtimeCapped) return

    const viewBox = svg.viewBox.baseVal
    if (!viewBox || !viewBox.width) return

    diagramContainer.style.maxWidth = `${Math.ceil(viewBox.width) + 48}px`
    diagramContainer.style.margin = '0 auto'
    diagramContainer.dataset.runtimeCapped = 'true'
  }, [loaded])

  // Measure the artifact's real content (".container") once it settles, then crop
  // the outer wrapper to fit - the iframe itself is never resized after this.
  useEffect(() => {
    if (!loaded || displayHeight !== null) return
    const doc = iframeRef.current?.contentDocument
    if (!doc) return

    let cancelled = false
    let settleTimer: ReturnType<typeof setTimeout> | undefined

    const measure = (content: HTMLElement) => {
      settleTimer = setTimeout(() => {
        if (cancelled) return
        const measured = content.getBoundingClientRect().height
        const bodyStyle = doc.defaultView?.getComputedStyle(doc.body)
        const verticalPadding = bodyStyle ? parseFloat(bodyStyle.paddingTop) + parseFloat(bodyStyle.paddingBottom) : 64
        setDisplayHeight(Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, measured + verticalPadding)))
      }, SETTLE_MS)
    }

    const existing = doc.querySelector<HTMLElement>('.container')
    if (existing) {
      measure(existing)
      return () => {
        cancelled = true
        if (settleTimer) clearTimeout(settleTimer)
      }
    }

    // The diagram's content can render asynchronously after the iframe's load event.
    const mutationObserver = new MutationObserver(() => {
      const content = doc.querySelector<HTMLElement>('.container')
      if (content) {
        mutationObserver.disconnect()
        measure(content)
      }
    })
    mutationObserver.observe(doc.body, { childList: true, subtree: true })

    return () => {
      cancelled = true
      mutationObserver.disconnect()
      if (settleTimer) clearTimeout(settleTimer)
    }
  }, [loaded, displayHeight])

  return (
    <Box sx={{ my: 2 }}>
      <Chip label="Interactive diagram (pilot)" size="small" color="primary" variant="outlined" sx={{ mb: 1 }} />
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          overflow: 'hidden',
          height: displayHeight ?? LOADING_HEIGHT,
          transition: 'height 0.15s ease',
          position: 'relative',
        }}
      >
        {!loaded && (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
            Loading interactive diagram…
          </Typography>
        )}
        <Box
          ref={iframeRef}
          component="iframe"
          src={resolvedSrc}
          onLoad={() => setLoaded(true)}
          title="Interactive architecture diagram"
          sandbox="allow-scripts allow-same-origin allow-popups allow-downloads"
          sx={{
            width: '100%',
            height: IFRAME_INTERNAL_HEIGHT,
            border: 0,
            display: loaded ? 'block' : 'none',
          }}
        />
      </Box>
    </Box>
  )
}

