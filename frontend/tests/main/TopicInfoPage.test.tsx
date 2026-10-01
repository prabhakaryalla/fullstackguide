import { describe, it, expect, vi, afterEach, beforeAll, afterAll } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import type { Topic } from '../../src/features/main/model/types'
import { resolveAdjacentTopicSlugs } from '../../src/features/main/data/resolveAdjacentTopicSlugs'
import TopicInfoPage from '../../src/features/main/pages/TopicInfoPage'
import TopicProgressProvider from '../../src/features/progress/context/TopicProgressContext'
import BookmarkProvider from '../../src/features/bookmarks/context/BookmarkContext'
import { stubContentIndexFetch } from '../testUtils/stubContentIndexFetch'

afterEach(() => {
  window.localStorage.clear()
})

beforeAll(() => {
  stubContentIndexFetch()
})

afterAll(() => {
  vi.unstubAllGlobals()
})

vi.mock('mermaid', () => ({
  default: { initialize: vi.fn(), render: vi.fn().mockResolvedValue({ svg: '<svg />' }) },
}))

function renderAtRoute(path: string) {
  return render(
    <TopicProgressProvider>
      <BookmarkProvider>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/:menuSlug/:topicSlug" element={<TopicInfoPage />} />
            <Route path="/:menuSlug" element={<div data-testid="main-page" />} />
            <Route path="/tags/:tagId" element={<div data-testid="tag-page" />} />
          </Routes>
        </MemoryRouter>
      </BookmarkProvider>
    </TopicProgressProvider>,
  )
}

describe('resolveAdjacentTopicSlugs', () => {
  const topics: Topic[] = [
    {
      id: 'azure-event-hubs',
      slug: 'azure-event-hubs',
      title: 'Azure Event Hubs',
      markdownPath: 'azure/azure-event-hubs.md',
      complexity: 'Medium',
    },
    {
      id: 'azure-service-bus',
      slug: 'azure-service-bus',
      title: 'Azure Service Bus',
      markdownPath: 'azure/azure-service-bus.md',
      complexity: 'Hard',
    },
    {
      id: 'azure-functions',
      slug: 'azure-functions',
      title: 'Azure Functions',
      markdownPath: 'azure/azure-functions.md',
      complexity: 'Easy',
    },
  ]

  it('returns next only for first topic', () => {
    expect(resolveAdjacentTopicSlugs(topics, 'azure-event-hubs')).toEqual({
      previousTopicSlug: null,
      nextTopicSlug: 'azure-service-bus',
    })
  })

  it('returns previous and next for middle topic', () => {
    expect(resolveAdjacentTopicSlugs(topics, 'azure-service-bus')).toEqual({
      previousTopicSlug: 'azure-event-hubs',
      nextTopicSlug: 'azure-functions',
    })
  })

  it('returns previous only for last topic', () => {
    expect(resolveAdjacentTopicSlugs(topics, 'azure-functions')).toEqual({
      previousTopicSlug: 'azure-service-bus',
      nextTopicSlug: null,
    })
  })

  it('returns null adjacency for unknown topic', () => {
    expect(resolveAdjacentTopicSlugs(topics, 'unknown')).toEqual({
      previousTopicSlug: null,
      nextTopicSlug: null,
    })
  })

  it('returns null adjacency for only-topic menu', () => {
    const onlyTopic: Topic[] = [topics[0]]
    expect(resolveAdjacentTopicSlugs(onlyTopic, 'azure-event-hubs')).toEqual({
      previousTopicSlug: null,
      nextTopicSlug: null,
    })
  })
})

describe('TopicInfoPage navigation', () => {
  it('renders Previous and Next buttons on valid topic route', async () => {
    renderAtRoute('/azure/azure-service-bus')

    await waitFor(() => expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument())
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
  })

  it('navigates to the next adjacent topic in same menu', async () => {
    const user = userEvent.setup()

    renderAtRoute('/azure/azure-event-hubs')

    const nextButton = await screen.findByRole('button', { name: 'Next' })
    await user.click(nextButton)

    await waitFor(() => {
      expect(screen.getByText('Azure Service Bus')).toBeInTheDocument()
    })
  })

  it('navigates to the previous adjacent topic in same menu', async () => {
    const user = userEvent.setup()

    renderAtRoute('/azure/azure-service-bus')

    const previousButton = await screen.findByRole('button', { name: 'Previous' })
    await user.click(previousButton)

    await waitFor(() => {
      expect(screen.getByText('Azure Event Hubs')).toBeInTheDocument()
    })
  })

  it('disables Previous on first topic', async () => {
    renderAtRoute('/azure/azure-event-hubs')

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled()
      expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled()
    })
  })

  it('disables Next on last topic', async () => {
    renderAtRoute('/dotnet/dotnet-common-cryptography-methods')

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Previous' })).toBeEnabled()
      expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
    })
  })

  it('supports keyboard activation for enabled Next and keeps disabled Previous non-actionable on first topic', async () => {
    const user = userEvent.setup()

    renderAtRoute('/azure/azure-event-hubs')
    const previousButton = await screen.findByRole('button', { name: 'Previous' })
    const nextButton = screen.getByRole('button', { name: 'Next' })

    expect(previousButton).toBeDisabled()

    await user.tab()
    await user.tab()
    expect(nextButton).toHaveFocus()
    await user.keyboard('{Enter}')

    await waitFor(() => {
      expect(screen.getByText('Azure Service Bus')).toBeInTheDocument()
    })
  })

  it('supports keyboard activation for enabled Previous on middle topic', async () => {
    const user = userEvent.setup()

    renderAtRoute('/azure/azure-service-bus')
    const previousButton = await screen.findByRole('button', { name: 'Previous' })

    expect(previousButton).toBeEnabled()

    await user.tab()
    await user.tab()
    expect(previousButton).toHaveFocus()

    await user.keyboard('{Enter}')

    await waitFor(() => {
      expect(screen.getByText('Azure Event Hubs')).toBeInTheDocument()
    })
  })

  it('shows unavailable content state for unknown topic slug', async () => {
    renderAtRoute('/azure/unknown-topic')

    await waitFor(() => expect(screen.getByText('Content unavailable')).toBeInTheDocument())
  })

  it('navigates back to menu main page', async () => {
    const user = userEvent.setup()

    renderAtRoute('/azure/azure-event-hubs')

    const backButton = await screen.findByRole('button', { name: /back to azure/i })
    await user.click(backButton)

    expect(screen.getByTestId('main-page')).toBeInTheDocument()
  })

  it('marks a topic complete, toggles it back, and persists across remount', async () => {
    const user = userEvent.setup()

    const { unmount } = renderAtRoute('/azure/azure-event-hubs')

    const markButton = await screen.findByRole('button', { name: 'Mark as complete' })
    expect(markButton).toHaveAttribute('aria-pressed', 'false')

    await user.click(markButton)
    const completedButton = await screen.findByRole('button', { name: 'Mark as not complete' })
    expect(completedButton).toHaveAttribute('aria-pressed', 'true')
    expect(completedButton).toHaveTextContent('Completed')

    unmount()
    renderAtRoute('/azure/azure-event-hubs')
    expect(await screen.findByRole('button', { name: 'Mark as not complete' })).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByRole('button', { name: 'Mark as not complete' }))
    expect(await screen.findByRole('button', { name: 'Mark as complete' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('does not affect another topic\'s completion state', async () => {
    const user = userEvent.setup()

    renderAtRoute('/azure/azure-event-hubs')
    await user.click(await screen.findByRole('button', { name: 'Mark as complete' }))
    expect(await screen.findByRole('button', { name: 'Mark as not complete' })).toBeInTheDocument()

    renderAtRoute('/azure/azure-service-bus')
    expect(await screen.findByRole('button', { name: 'Mark as complete' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('bookmarks a topic, toggles it back, and persists across remount', async () => {
    const user = userEvent.setup()

    const { unmount } = renderAtRoute('/azure/azure-event-hubs')

    const bookmarkButton = await screen.findByRole('button', { name: 'Bookmark this topic' })
    expect(bookmarkButton).toHaveAttribute('aria-pressed', 'false')

    await user.click(bookmarkButton)
    const bookmarkedButton = await screen.findByRole('button', { name: 'Remove bookmark' })
    expect(bookmarkedButton).toHaveAttribute('aria-pressed', 'true')
    expect(bookmarkedButton).toHaveTextContent('Bookmarked')

    unmount()
    renderAtRoute('/azure/azure-event-hubs')
    expect(await screen.findByRole('button', { name: 'Remove bookmark' })).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByRole('button', { name: 'Remove bookmark' }))
    expect(await screen.findByRole('button', { name: 'Bookmark this topic' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('tracks bookmark and completion state independently', async () => {
    const user = userEvent.setup()

    renderAtRoute('/azure/azure-event-hubs')

    await user.click(await screen.findByRole('button', { name: 'Bookmark this topic' }))
    expect(await screen.findByRole('button', { name: 'Remove bookmark' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Mark as complete' })).toHaveAttribute('aria-pressed', 'false')

    await user.click(screen.getByRole('button', { name: 'Mark as complete' }))
    expect(await screen.findByRole('button', { name: 'Mark as not complete' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Remove bookmark' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('renders the Related Topics section below the main content without delaying it', async () => {
    renderAtRoute('/azure/azure-event-hubs')

    // Main content renders immediately, independent of the Related Topics section's own loading state.
    await waitFor(() => expect(screen.getByText('Azure Event Hubs')).toBeInTheDocument())
    expect(screen.getByRole('heading', { name: 'Related Topics' })).toBeInTheDocument()
  })

  it('shows selectable tag chips for a topic that matches at least one tag, and navigates to /tags/:tagId when selected', async () => {
    const user = userEvent.setup()

    renderAtRoute('/design-patterns/singleton-pattern-implementation')

    const tagChip = await screen.findByRole('button', { name: 'Design Patterns' })
    await user.click(tagChip)

    expect(screen.getByTestId('tag-page')).toBeInTheDocument()
  })
})
