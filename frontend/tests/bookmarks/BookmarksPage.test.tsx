import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, afterEach } from 'vitest'
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom'
import BookmarksPage from '../../src/features/bookmarks/pages/BookmarksPage'
import BookmarkProvider from '../../src/features/bookmarks/context/BookmarkContext'
import { writeBookmarkState } from '../../src/features/bookmarks/data/bookmarkStorage'

function LocationDisplay() {
  const location = useLocation()
  return <div data-testid="location">{location.pathname}</div>
}

function renderAt(initialPath: string) {
  return render(
    <BookmarkProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route
            path="/bookmarks"
            element={
              <>
                <BookmarksPage />
                <LocationDisplay />
              </>
            }
          />
          <Route path="/:menuSlug/:topicSlug" element={<div>topic content page</div>} />
        </Routes>
      </MemoryRouter>
    </BookmarkProvider>,
  )
}

describe('BookmarksPage', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('shows an empty-state message when there are no bookmarks', () => {
    renderAt('/bookmarks')
    expect(screen.getByText("You haven't bookmarked any topics yet")).toBeInTheDocument()
  })

  it('lists every bookmarked topic across multiple menu areas', () => {
    writeBookmarkState({ 'azure/azure-event-hubs': true, 'csharp/boxing-and-unboxing-csharp': true })
    renderAt('/bookmarks')

    expect(screen.getByText('Azure Event Hubs')).toBeInTheDocument()
    expect(screen.getByText('Boxing and Unboxing')).toBeInTheDocument()
  })

  it('navigates to the topic content page when a bookmarked topic is selected', async () => {
    const user = userEvent.setup()
    writeBookmarkState({ 'azure/azure-event-hubs': true })
    renderAt('/bookmarks')

    await user.click(screen.getByText('Azure Event Hubs'))

    expect(screen.getByText('topic content page')).toBeInTheDocument()
  })

  it('removes a bookmark from the list immediately without a page reload', async () => {
    const user = userEvent.setup()
    writeBookmarkState({ 'azure/azure-event-hubs': true, 'azure/azure-service-bus': true })
    renderAt('/bookmarks')

    const eventHubsCard = screen.getByText('Azure Event Hubs').closest('.MuiCard-root') as HTMLElement
    await user.click(within(eventHubsCard).getByRole('button', { name: /remove bookmark/i }))

    expect(screen.queryByText('Azure Event Hubs')).not.toBeInTheDocument()
    expect(screen.getByText('Azure Service Bus')).toBeInTheDocument()
    expect(screen.getByTestId('location')).toHaveTextContent('/bookmarks')
  })
})
