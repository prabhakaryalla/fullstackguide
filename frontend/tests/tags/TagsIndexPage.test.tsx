import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom'
import TagsIndexPage from '../../src/features/tags/pages/TagsIndexPage'

let mockStatus: 'loading' | 'ready' = 'ready'
let mockTags: { id: string; label: string; count: number }[] = []

vi.mock('../../src/features/tags/hooks/useAllTagsWithCounts', () => ({
  useAllTagsWithCounts: () => ({ status: mockStatus, tags: mockTags }),
}))

function LocationDisplay() {
  const location = useLocation()
  return <div data-testid="location">{location.pathname}</div>
}

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/tags']}>
      <Routes>
        <Route path="/tags" element={<TagsIndexPage />} />
      </Routes>
      <LocationDisplay />
    </MemoryRouter>,
  )
}

describe('TagsIndexPage', () => {
  it('shows a loading indicator while tags are being computed', () => {
    mockStatus = 'loading'
    mockTags = []
    renderPage()

    expect(screen.getByLabelText(/loading tags/i)).toBeInTheDocument()
  })

  it('lists every tag with its topic count once ready', () => {
    mockStatus = 'ready'
    mockTags = [
      { id: 'caching', label: 'Caching', count: 12 },
      { id: 'security', label: 'Security', count: 0 },
    ]
    renderPage()

    expect(screen.getByText('Caching')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('Security')).toBeInTheDocument()
  })

  it('navigates to /tags/:tagId when a tag is selected', async () => {
    mockStatus = 'ready'
    mockTags = [{ id: 'caching', label: 'Caching', count: 12 }]
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByText('Caching'))
    expect(screen.getByTestId('location')).toHaveTextContent('/tags/caching')
  })
})
