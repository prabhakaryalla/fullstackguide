import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom'
import SearchResultsPage from '../../src/features/search/pages/SearchResultsPage'
import { getAllSearchableTopics } from '../../src/features/search/data/getAllSearchableTopics'
import { stubContentIndexFetch } from '../testUtils/stubContentIndexFetch'

beforeAll(() => {
  stubContentIndexFetch()
})

afterAll(() => {
  vi.unstubAllGlobals()
})

function LocationDisplay() {
  const location = useLocation()
  return <div data-testid="location">{location.pathname + location.search}</div>
}

function renderAt(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="/search"
          element={
            <>
              <SearchResultsPage />
              <LocationDisplay />
            </>
          }
        />
        <Route path="/:menuSlug/:topicSlug" element={<div>topic content page</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('SearchResultsPage', () => {
  it('pre-fills its own search bar with the q query parameter and renders at least one match', () => {
    renderAt('/search?q=azure')

    expect(screen.getByRole('textbox', { name: /search topics/i })).toHaveValue('azure')
    expect(screen.getByText('Azure Event Hubs')).toBeInTheDocument()
  })

  it('exposes an accessible name for its own search bar and is reachable via Tab', async () => {
    const user = userEvent.setup()
    renderAt('/search?q=azure')

    await user.tab()
    expect(screen.getByRole('textbox', { name: /search topics/i })).toHaveFocus()
  })

  it('shows matches from more than one menu area for a keyword shared across menus', () => {
    renderAt('/search?q=token')

    expect(screen.getByText(/token exchange/i)).toBeInTheDocument()
    expect(screen.getByText('Access Token and Refresh Token')).toBeInTheDocument()
  })

  it('renders every match with no cap when a broad keyword matches many topics', () => {
    renderAt('/search?q=a')

    const expectedCount = getAllSearchableTopics().filter((entry) =>
      entry.topic.title.toLowerCase().includes('a'),
    ).length
    // Corpus is large enough (4,200+ topics) to exceed TopicList's own large-list batching
    // threshold — "no cap" means every match is reachable via its existing "Load More"
    // progressive rendering, not that all of them render into the DOM in one pass.
    expect(screen.getByText(`Showing 120 of ${expectedCount} topics`)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Load More Topics' })).toBeInTheDocument()
  })

  it('updates the results list when the keyword is edited in place, without a separate submit', async () => {
    const user = userEvent.setup({ delay: null })
    renderAt('/search?q=azure')

    expect(screen.getByText('Azure Event Hubs')).toBeInTheDocument()

    const input = screen.getByRole('textbox', { name: /search topics/i })
    await user.clear(input)
    await user.type(input, 'cosmos')

    expect(screen.queryByText('Azure Event Hubs')).not.toBeInTheDocument()
    expect(screen.getByText('Azure Cosmos DB')).toBeInTheDocument()
  }, 30000)

  it('keeps the q query parameter in sync with an edited keyword', async () => {
    const user = userEvent.setup({ delay: null })
    renderAt('/search?q=azure')

    const input = screen.getByRole('textbox', { name: /search topics/i })
    await user.clear(input)
    await user.type(input, 'cosmos')

    expect(screen.getByTestId('location')).toHaveTextContent('/search?q=cosmos')
  }, 30000)

  it('shows an empty-state message when no topic matches the keyword', () => {
    renderAt('/search?q=zzzznotopic')

    expect(screen.getByText(/no topics match your search/i)).toBeInTheDocument()
  })

  it('navigates to the topic content page when a result is selected', async () => {
    const user = userEvent.setup()
    renderAt('/search?q=azure')

    await user.click(screen.getByText('Azure Event Hubs'))

    expect(screen.getByText('topic content page')).toBeInTheDocument()
  })

  it('shows a title match instantly, before the content index has finished loading', () => {
    renderAt('/search?q=azure')
    // No await/waitFor here on purpose — asserts the title match is present on the very first render.
    expect(screen.getByText('Azure Event Hubs')).toBeInTheDocument()
  })

  it('shows a loading indicator while the content index loads, then hides it once ready', async () => {
    renderAt('/search?q=azure')

    expect(screen.getByLabelText(/loading more results/i)).toBeInTheDocument()

    await waitFor(() => expect(screen.queryByLabelText(/loading more results/i)).not.toBeInTheDocument(), {
      timeout: 15000,
    })
  }, 15000)

  it('merges in a content-only match with a snippet once the content index is ready', async () => {
    renderAt('/search?q=Auto-Inflate')

    await waitFor(() => expect(screen.getByText('Azure Event Hubs')).toBeInTheDocument(), { timeout: 15000 })
    expect(screen.getByText(/Enable \*\*Auto-Inflate\*\*/i)).toBeInTheDocument()
  }, 15000)

  it('does not duplicate a topic that matches by both title and content', async () => {
    renderAt('/search?q=Event Hubs')

    await waitFor(() => expect(screen.queryByLabelText(/loading more results/i)).not.toBeInTheDocument(), {
      timeout: 15000,
    })
    expect(screen.getAllByText('Azure Event Hubs')).toHaveLength(1)
  }, 15000)

  it('updates content matches when the keyword changes after the index is ready, without re-showing the loading indicator', async () => {
    const user = userEvent.setup({ delay: null })
    renderAt('/search?q=Auto-Inflate')

    await waitFor(() => expect(screen.queryByLabelText(/loading more results/i)).not.toBeInTheDocument(), {
      timeout: 15000,
    })

    const input = screen.getByRole('textbox', { name: /search topics/i })
    await user.clear(input)
    await user.type(input, 'zzzznotopic')

    expect(screen.queryByLabelText(/loading more results/i)).not.toBeInTheDocument()
    expect(screen.getByText(/no topics match your search/i)).toBeInTheDocument()
  }, 15000)
})
