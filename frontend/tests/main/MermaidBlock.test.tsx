import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import MermaidBlock from '../../src/features/main/components/MermaidBlock'

vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn(),
  },
}))

import mermaid from 'mermaid'

const mockMermaid = vi.mocked(mermaid)

describe('MermaidBlock', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders an SVG container when mermaid.render resolves', async () => {
    mockMermaid.render.mockResolvedValue({ svg: '<svg data-testid="mermaid-svg"></svg>', bindFunctions: undefined, diagramType: 'flowchart' })
    render(<MermaidBlock code="flowchart LR\n  A --> B" />)
    await waitFor(() => expect(document.querySelector('svg')).not.toBeNull())
  })

  it('shows fallback message when mermaid.render rejects', async () => {
    mockMermaid.render.mockRejectedValue(new Error('parse error'))
    render(<MermaidBlock code="invalid diagram code" />)
    await waitFor(() => expect(screen.getByText('Diagram syntax not supported')).toBeInTheDocument())
  })

  it('does not crash when code is an empty string', () => {
    expect(() => render(<MermaidBlock code="" />)).not.toThrow()
  })
})
