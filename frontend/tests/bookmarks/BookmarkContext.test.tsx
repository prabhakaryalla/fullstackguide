import { afterEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookmarkProvider from '../../src/features/bookmarks/context/BookmarkContext'
import { useBookmarks } from '../../src/features/bookmarks/hooks/useBookmarks'
import { useAllBookmarkedTopics } from '../../src/features/bookmarks/hooks/useAllBookmarkedTopics'
import { BOOKMARK_STORAGE_KEY } from '../../src/features/bookmarks/data/bookmarkStorage'

function ToggleHarness({ menuId, slug }: { menuId: string; slug: string }) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  return (
    <button type="button" onClick={() => toggleBookmark(menuId, slug)}>
      {isBookmarked(menuId, slug) ? 'Bookmarked' : 'Not bookmarked'}
    </button>
  )
}

function BookmarkedCountHarness() {
  const bookmarked = useAllBookmarkedTopics()
  return <div>{`count:${bookmarked.length}`}</div>
}

describe('BookmarkContext', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('toggles a topic bookmark state and is reversible', async () => {
    const user = userEvent.setup()
    render(
      <BookmarkProvider>
        <ToggleHarness menuId="azure" slug="azure-event-hubs" />
      </BookmarkProvider>,
    )

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Not bookmarked')

    await user.click(button)
    expect(button).toHaveTextContent('Bookmarked')

    await user.click(button)
    expect(button).toHaveTextContent('Not bookmarked')
  })

  it('persists bookmark state across a provider remount', async () => {
    const user = userEvent.setup()
    const { unmount } = render(
      <BookmarkProvider>
        <ToggleHarness menuId="azure" slug="azure-event-hubs" />
      </BookmarkProvider>,
    )

    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveTextContent('Bookmarked')
    unmount()

    render(
      <BookmarkProvider>
        <ToggleHarness menuId="azure" slug="azure-event-hubs" />
      </BookmarkProvider>,
    )
    expect(screen.getByRole('button')).toHaveTextContent('Bookmarked')
    expect(window.localStorage.getItem(BOOKMARK_STORAGE_KEY)).toContain('azure/azure-event-hubs')
  })

  it('does not affect another topic\'s bookmark state', async () => {
    const user = userEvent.setup()
    render(
      <BookmarkProvider>
        <ToggleHarness menuId="azure" slug="azure-event-hubs" />
        <ToggleHarness menuId="azure" slug="azure-service-bus" />
      </BookmarkProvider>,
    )

    const [first, second] = screen.getAllByRole('button')
    await user.click(first)
    expect(first).toHaveTextContent('Bookmarked')
    expect(second).toHaveTextContent('Not bookmarked')
  })

  it('excludes bookmarks for slugs no longer present in current topic data from useAllBookmarkedTopics', async () => {
    const user = userEvent.setup()
    render(
      <BookmarkProvider>
        <ToggleHarness menuId="azure" slug="azure-nonexistent-topic-slug" />
        <BookmarkedCountHarness />
      </BookmarkProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Not bookmarked' }))
    expect(screen.getByRole('button')).toHaveTextContent('Bookmarked')
    // the slug isn't a real topic in azure-topics.json, so it must not appear in the aggregated list
    expect(screen.getByText('count:0')).toBeInTheDocument()
  })
})
