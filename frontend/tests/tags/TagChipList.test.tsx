import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import TagChipList from '../../src/features/tags/components/TagChipList'

vi.mock('../../src/features/tags/data/tagDefinitions', () => ({
  TAG_DEFINITIONS: [
    { id: 'caching', label: 'Caching', keywords: ['cache'] },
    { id: 'security', label: 'Security', keywords: ['security'] },
    { id: 'testing', label: 'Testing', keywords: ['testing'] },
  ],
}))

describe('TagChipList', () => {
  it('renders nothing when tagIds is empty', () => {
    const { container } = render(<TagChipList tagIds={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders one chip per tag id with its resolved label', () => {
    render(<TagChipList tagIds={['caching', 'security']} />)
    expect(screen.getByText('Caching')).toBeInTheDocument()
    expect(screen.getByText('Security')).toBeInTheDocument()
  })

  it('renders as plain, non-interactive indicators when onTagClick is omitted', () => {
    render(<TagChipList tagIds={['caching']} />)
    expect(screen.queryByRole('button', { name: 'Caching' })).not.toBeInTheDocument()
  })

  it('renders keyboard-operable chips that invoke onTagClick with the tag id when provided', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<TagChipList tagIds={['caching']} onTagClick={handleClick} />)

    const chip = screen.getByRole('button', { name: 'Caching' })
    await user.click(chip)
    expect(handleClick).toHaveBeenCalledWith('caching')

    chip.focus()
    await user.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

  it('caps visible chips at maxVisible and shows a "+N" overflow indicator', () => {
    render(<TagChipList tagIds={['caching', 'security', 'testing']} maxVisible={2} />)

    expect(screen.getByText('Caching')).toBeInTheDocument()
    expect(screen.getByText('Security')).toBeInTheDocument()
    expect(screen.queryByText('Testing')).not.toBeInTheDocument()
    expect(screen.getByText('+1')).toBeInTheDocument()
  })

  it('does not show an overflow indicator when tagIds fit within maxVisible', () => {
    render(<TagChipList tagIds={['caching']} maxVisible={2} />)
    expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument()
  })
})
