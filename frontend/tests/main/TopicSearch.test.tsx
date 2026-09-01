import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TopicSearch from '../../src/features/main/components/TopicSearch'

describe('TopicSearch', () => {
  it('renders an input with an accessible label', () => {
    render(<TopicSearch value="" onChange={vi.fn()} complexity="All" onComplexityChange={vi.fn()} />)
    expect(screen.getByLabelText('Search topics')).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /complexity/i })).toBeInTheDocument()
  })

  it('calls onChange with the new value on input', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<TopicSearch value="" onChange={handleChange} complexity="All" onComplexityChange={vi.fn()} />)
    await user.type(screen.getByLabelText('Search topics'), 'az')
    expect(handleChange).toHaveBeenCalled()
  })

  it('reflects the controlled value prop', () => {
    render(<TopicSearch value="event" onChange={vi.fn()} complexity="All" onComplexityChange={vi.fn()} />)
    expect(screen.getByLabelText('Search topics')).toHaveValue('event')
  })

  it('calls onChange with empty string when cleared', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<TopicSearch value="event" onChange={handleChange} complexity="All" onComplexityChange={vi.fn()} />)
    await user.clear(screen.getByLabelText('Search topics'))
    expect(handleChange).toHaveBeenLastCalledWith('')
  })

  it('renders supported complexity options', async () => {
    const user = userEvent.setup()
    render(<TopicSearch value="" onChange={vi.fn()} complexity="All" onComplexityChange={vi.fn()} />)

    const combo = screen.getByRole('combobox', { name: /complexity/i })
    await user.click(combo)

    expect(screen.getByRole('option', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Easy' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Medium' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Hard' })).toBeInTheDocument()
  })

  it('calls onComplexityChange when a complexity option is selected', async () => {
    const user = userEvent.setup()
    const handleComplexityChange = vi.fn()
    render(<TopicSearch value="" onChange={vi.fn()} complexity="All" onComplexityChange={handleComplexityChange} />)

    await user.click(screen.getByRole('combobox', { name: /complexity/i }))
    await user.click(screen.getByRole('option', { name: 'Easy' }))

    expect(handleComplexityChange).toHaveBeenCalledWith('Easy')
  })
})
