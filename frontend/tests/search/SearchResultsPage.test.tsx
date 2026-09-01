import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom'
import SearchResultsPage from '../../src/features/search/pages/SearchResultsPage'
import { getAllSearchableTopics } from '../../src/features/search/data/getAllSearchableTopics'

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
    const headings = screen.getAllByRole('heading', { level: 2 })
    expect(headings).toHaveLength(expectedCount)
  })

  it('updates the results list when the keyword is edited in place, without a separate submit', async () => {
    const user = userEvent.setup()
    renderAt('/search?q=azure')

    expect(screen.getByText('Azure Event Hubs')).toBeInTheDocument()

    const input = screen.getByRole('textbox', { name: /search topics/i })
    await user.clear(input)
    await user.type(input, 'cosmos')

    expect(screen.queryByText('Azure Event Hubs')).not.toBeInTheDocument()
    expect(screen.getByText('Azure Cosmos DB')).toBeInTheDocument()
  })

  it('keeps the q query parameter in sync with an edited keyword', async () => {
    const user = userEvent.setup()
    renderAt('/search?q=azure')

    const input = screen.getByRole('textbox', { name: /search topics/i })
    await user.clear(input)
    await user.type(input, 'cosmos')

    expect(screen.getByTestId('location')).toHaveTextContent('/search?q=cosmos')
  })

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
})
