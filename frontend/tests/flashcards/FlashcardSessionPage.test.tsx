import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, afterEach } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import FlashcardSessionPage from '../../src/features/flashcards/pages/FlashcardSessionPage'
import TopicProgressProvider from '../../src/features/progress/context/TopicProgressContext'
import { PROGRESS_STORAGE_KEY } from '../../src/features/progress/data/progressStorage'

function renderAt(initialPath: string) {
  return render(
    <TopicProgressProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/:menuSlug/flashcards" element={<FlashcardSessionPage />} />
          <Route path="/:menuSlug" element={<div data-testid="menu-page" />} />
        </Routes>
      </MemoryRouter>
    </TopicProgressProvider>,
  )
}

describe('FlashcardSessionPage', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('shows an unavailable state for a non-eligible menu', () => {
    renderAt('/azure/flashcards')
    expect(screen.getByText(/flashcards are unavailable/i)).toBeInTheDocument()
  })

  it('shows only the first topic title, with content hidden, on an eligible menu', () => {
    renderAt('/csharp-programs/flashcards')
    expect(screen.getByRole('heading', { name: 'Access Modifiers' })).toBeInTheDocument()
    expect(screen.queryByText(/no modifier = internal by default/i)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show Answer' })).toBeInTheDocument()
  })

  it('reveals the topic content identical to the topic detail page rendering', async () => {
    const user = userEvent.setup()
    renderAt('/csharp-programs/flashcards')

    await user.click(screen.getByRole('button', { name: 'Show Answer' }))

    await waitFor(() => expect(screen.getByText(/no modifier = internal by default/i)).toBeInTheDocument())
    expect(screen.getByRole('button', { name: 'Got it' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Still learning' })).toBeInTheDocument()
  })

  it('moves to the next card and re-hides content, even goes back and re-hides again', async () => {
    const user = userEvent.setup()
    renderAt('/csharp-programs/flashcards')

    await user.click(screen.getByRole('button', { name: 'Show Answer' }))
    await waitFor(() => expect(screen.getByRole('button', { name: 'Got it' })).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByRole('heading', { name: 'Catch Block Ordering' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show Answer' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Previous' }))
    expect(screen.getByRole('heading', { name: 'Access Modifiers' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show Answer' })).toBeInTheDocument()
  })

  it('respects the complexity filter carried in the URL', () => {
    renderAt('/csharp-programs/flashcards?complexity=Easy')
    expect(screen.getByRole('heading', { name: 'Nullable Types and Null-Coalescing (??)' })).toBeInTheDocument()
  })

  it('shows a session-complete state after stepping past the last card', async () => {
    const user = userEvent.setup()
    renderAt('/csharp-programs/flashcards?q=Access Modifiers')

    expect(screen.getByRole('heading', { name: 'Access Modifiers' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(screen.getByText(/reviewed every card/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Back to topic list' }))
    expect(screen.getByTestId('menu-page')).toBeInTheDocument()
  })

  it('rating "Got it" marks the topic complete and advances; "Still learning" leaves it unchanged', async () => {
    const user = userEvent.setup()
    renderAt('/csharp-programs/flashcards?q=Access Modifiers')

    await user.click(screen.getByRole('button', { name: 'Show Answer' }))
    await user.click(screen.getByRole('button', { name: 'Got it' }))

    const state = JSON.parse(window.localStorage.getItem(PROGRESS_STORAGE_KEY) ?? '{}')
    expect(state).toEqual({ 'csharp-programs/csharp-access-modifiers-output-questions': true })
  })

  it('rating "Got it" twice on the same topic is idempotent (does not un-complete it)', async () => {
    const user = userEvent.setup()
    renderAt('/csharp-programs/flashcards?q=Access Modifiers')

    await user.click(screen.getByRole('button', { name: 'Show Answer' }))
    await user.click(screen.getByRole('button', { name: 'Got it' }))

    // Session moved past the single filtered card; go back and rate it again.
    await user.click(screen.getByRole('button', { name: 'Previous' }))
    await user.click(screen.getByRole('button', { name: 'Show Answer' }))
    await user.click(screen.getByRole('button', { name: 'Got it' }))

    const state = JSON.parse(window.localStorage.getItem(PROGRESS_STORAGE_KEY) ?? '{}')
    expect(state).toEqual({ 'csharp-programs/csharp-access-modifiers-output-questions': true })
  })

  it('rating "Still learning" does not mark the topic complete', async () => {
    const user = userEvent.setup()
    renderAt('/csharp-programs/flashcards?q=Access Modifiers')

    await user.click(screen.getByRole('button', { name: 'Show Answer' }))
    await user.click(screen.getByRole('button', { name: 'Still learning' }))

    const state = JSON.parse(window.localStorage.getItem(PROGRESS_STORAGE_KEY) ?? '{}')
    expect(state).toEqual({})
  })
})
