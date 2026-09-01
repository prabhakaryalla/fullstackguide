import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import ComingSoonView from '../../src/features/landing/components/ComingSoonView'

expect.extend(toHaveNoViolations)

describe('ComingSoonView', () => {
  it('renders coming soon content for a selected menu', () => {
    render(<ComingSoonView selectedMenuLabel=".NET" />)
    expect(screen.getByText(/.NET.*Coming Soon/i)).toBeInTheDocument()
  })

  it('updates heading when selectedMenuLabel changes', () => {
    const { rerender } = render(<ComingSoonView selectedMenuLabel=".NET" />)
    expect(screen.getByText(/.NET.*Coming Soon/i)).toBeInTheDocument()
    rerender(<ComingSoonView selectedMenuLabel="Azure" />)
    expect(screen.getByText(/Azure.*Coming Soon/i)).toBeInTheDocument()
  })

  it('renders empty-state when selectedMenuLabel is null', () => {
    render(<ComingSoonView selectedMenuLabel={null} />)
    expect(screen.getByText(/no topics configured/i)).toBeInTheDocument()
  })

  it('has no accessibility violations in selected state', async () => {
    const { container } = render(<ComingSoonView selectedMenuLabel="C#" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations in empty state', async () => {
    const { container } = render(<ComingSoonView selectedMenuLabel={null} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
