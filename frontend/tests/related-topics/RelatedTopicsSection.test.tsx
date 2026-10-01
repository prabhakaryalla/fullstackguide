import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import RelatedTopicsSection from '../../src/features/related-topics/components/RelatedTopicsSection'
import type { Topic } from '../../src/features/main/model/types'

const currentTopic: Topic = { id: 'current', slug: 'current-topic', title: 'Current Topic', markdownPath: 'x/current.md' }
const relatedTopic: Topic = { id: 'related', slug: 'related-topic', title: 'Related Topic', markdownPath: 'y/related.md' }

let mockStatus: 'loading' | 'ready' = 'ready'
let mockRelated: { topic: Topic; menuId: string; menuLabel: string }[] = []

vi.mock('../../src/features/related-topics/hooks/useRelatedTopics', () => ({
  useRelatedTopics: () => ({ status: mockStatus, relatedTopics: mockRelated }),
}))

function LocationDisplay() {
  const location = useLocation()
  return <div data-testid="location">{location.pathname}</div>
}

function renderSection() {
  return render(
    <MemoryRouter initialEntries={['/x/current-topic']}>
      <Routes>
        <Route
          path="/x/current-topic"
          element={
            <>
              <RelatedTopicsSection topic={currentTopic} />
              <LocationDisplay />
            </>
          }
        />
        <Route path="/:menuSlug/:topicSlug" element={<LocationDisplay />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('RelatedTopicsSection', () => {
  it('shows a loading indicator while status is loading', () => {
    mockStatus = 'loading'
    mockRelated = []
    renderSection()
    expect(screen.getByLabelText(/finding related topics/i)).toBeInTheDocument()
  })

  it('renders each related topic\'s title and menu label once ready', () => {
    mockStatus = 'ready'
    mockRelated = [{ topic: relatedTopic, menuId: 'y', menuLabel: 'Y Menu' }]
    renderSection()

    expect(screen.getByText('Related Topic')).toBeInTheDocument()
    expect(screen.getByText('Y Menu')).toBeInTheDocument()
  })

  it('shows a "No related topics found" message when ready with zero matches', () => {
    mockStatus = 'ready'
    mockRelated = []
    renderSection()

    expect(screen.getByText(/no related topics found/i)).toBeInTheDocument()
  })

  it('navigates to the related topic\'s content page when selected', async () => {
    const user = userEvent.setup()
    mockStatus = 'ready'
    mockRelated = [{ topic: relatedTopic, menuId: 'y', menuLabel: 'Y Menu' }]
    renderSection()

    await user.click(screen.getByText('Related Topic'))

    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/y/related-topic'))
  })

  it('is keyboard operable', async () => {
    const user = userEvent.setup()
    mockStatus = 'ready'
    mockRelated = [{ topic: relatedTopic, menuId: 'y', menuLabel: 'Y Menu' }]
    renderSection()

    await user.tab()
    expect(screen.getByRole('button', { name: /related topic/i })).toHaveFocus()
    await user.keyboard('{Enter}')

    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/y/related-topic'))
  })
})
