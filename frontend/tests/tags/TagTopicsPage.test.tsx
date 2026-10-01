import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom'
import TagTopicsPage from '../../src/features/tags/pages/TagTopicsPage'
import type { Topic } from '../../src/features/main/model/types'

const topicA: Topic = { id: 'a', slug: 'topic-a', title: 'Topic A', markdownPath: 'x/a.md' }
const topicB: Topic = { id: 'b', slug: 'topic-b', title: 'Topic B', markdownPath: 'y/b.md' }

let mockStatus: 'loading' | 'ready' = 'ready'
let mockTopics: { topic: Topic; menuId: string; menuLabel: string }[] = []

vi.mock('../../src/features/tags/hooks/useTopicsByTag', () => ({
  useTopicsByTag: () => ({ status: mockStatus, topics: mockTopics }),
}))

vi.mock('../../src/features/tags/data/tagDefinitions', () => ({
  TAG_DEFINITIONS: [{ id: 'caching', label: 'Caching', keywords: ['cache'] }],
}))

function LocationDisplay() {
  const location = useLocation()
  return <div data-testid="location">{location.pathname}</div>
}

function renderPage(tagId: string) {
  return render(
    <MemoryRouter initialEntries={[`/tags/${tagId}`]}>
      <Routes>
        <Route path="/tags/:tagId" element={<TagTopicsPage />} />
      </Routes>
      <LocationDisplay />
    </MemoryRouter>,
  )
}

describe('TagTopicsPage', () => {
  it('shows a "Tag not found" state for an unknown tag id', () => {
    renderPage('unknown-tag')
    expect(screen.getByText(/tag not found/i)).toBeInTheDocument()
  })

  it('shows a loading indicator while topics are being computed', () => {
    mockStatus = 'loading'
    mockTopics = []
    renderPage('caching')

    expect(screen.getByLabelText(/loading topics for this tag/i)).toBeInTheDocument()
  })

  it('shows topics from more than one menu area, each with its menu label', () => {
    mockStatus = 'ready'
    mockTopics = [
      { topic: topicA, menuId: 'x', menuLabel: 'X Menu' },
      { topic: topicB, menuId: 'y', menuLabel: 'Y Menu' },
    ]
    renderPage('caching')

    expect(screen.getByText('Topic A')).toBeInTheDocument()
    expect(screen.getByText('X Menu')).toBeInTheDocument()
    expect(screen.getByText('Topic B')).toBeInTheDocument()
    expect(screen.getByText('Y Menu')).toBeInTheDocument()
  })

  it('shows a "No topics found for this tag" message when there are zero matches', () => {
    mockStatus = 'ready'
    mockTopics = []
    renderPage('caching')

    expect(screen.getByText(/no topics found for this tag/i)).toBeInTheDocument()
  })

  it('navigates to the topic content page when a topic is selected', async () => {
    mockStatus = 'ready'
    mockTopics = [{ topic: topicA, menuId: 'x', menuLabel: 'X Menu' }]
    const user = userEvent.setup()
    renderPage('caching')

    await user.click(screen.getByText('Topic A'))
    expect(screen.getByTestId('location')).toHaveTextContent('/x/topic-a')
  })
})
