import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { getMenuTileSummaries } from '../../src/features/main/data/getMenuTileSummaries'
import MainPage from '../../src/features/main/pages/MainPage'
import MainMenuTilesPage from '../../src/features/main/pages/MainMenuTilesPage'
import TopicProgressProvider from '../../src/features/progress/context/TopicProgressContext'
import { PROGRESS_STORAGE_KEY } from '../../src/features/progress/data/progressStorage'
import BookmarkProvider from '../../src/features/bookmarks/context/BookmarkContext'
import { renderRootMainRoute } from './renderWithRouter'

afterEach(() => {
  window.localStorage.clear()
})

function LocationDisplay() {
  const location = useLocation()
  return <div data-testid="location">{location.pathname + location.search}</div>
}

vi.mock('../../src/features/landing/data/menuConfig.json', () => ({
  default: {
    items: [
      { id: 'dotnet', label: '.NET', order: 1 },
      { id: 'azure', label: 'Azure', order: 2 },
      { id: 'csharp', label: 'C#', order: 3 },
      { id: 'csharp-programs', label: 'C# Programs', order: 4 },
    ],
  },
}))

vi.mock('../../src/features/main/data/azure-topics.json', () => ({
  default: {
    menuId: 'azure',
    topics: [
      { id: 't1', slug: 'azure-event-hubs', title: 'Azure Event Hubs', markdownPath: 'azure/azure-event-hubs.md', complexity: 'Medium' },
      { id: 't2', slug: 'azure-service-bus', title: 'Azure Service Bus', markdownPath: 'azure/azure-service-bus.md', complexity: 'Hard' },
      { id: 't3', slug: 'azure-functions', title: 'Azure Functions', markdownPath: 'azure/azure-functions.md', complexity: 'Easy' },
      { id: 't4', slug: 'azure-legacy-topic', title: 'Azure Legacy Topic', markdownPath: 'azure/legacy.md' },
    ],
  },
}))

vi.mock('../../src/features/main/data/dotnet-topics.json', () => ({
  default: {
    menuId: 'dotnet',
    topics: [
      { id: 'd1', slug: 'dotnet-di', title: '.NET Dependency Injection', markdownPath: 'dotnet/dotnet-di.md', complexity: 'Medium' },
    ],
  },
}))

vi.mock('../../src/features/main/data/csharp-topics.json', () => ({
  default: { menuId: 'csharp', topics: [] },
}))

vi.mock('../../src/features/main/data/database-topics.json', () => ({
  default: { menuId: 'database', topics: [] },
}))

vi.mock('../../src/features/main/data/ai-topics.json', () => ({
  default: { menuId: 'ai', topics: [] },
}))

vi.mock('../../src/features/main/data/react-js-topics.json', () => ({
  default: { menuId: 'react-js', topics: [] },
}))

vi.mock('../../src/features/main/data/microservices-topics.json', () => ({
  default: { menuId: 'microservices', topics: [] },
}))

vi.mock('../../src/features/main/data/system-design-topics.json', () => ({
  default: { menuId: 'system-design', topics: [] },
}))

vi.mock('../../src/features/tags/data/getTopicTagsIndex', () => ({
  getTopicTagsIndex: () => Promise.resolve(new Map([['t2', ['messaging']]])),
}))

function renderWithRoute(path: string, routePath: string) {
  return render(
    <TopicProgressProvider>
      <BookmarkProvider>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path={routePath} element={<MainPage />} />
          </Routes>
        </MemoryRouter>
      </BookmarkProvider>
    </TopicProgressProvider>,
  )
}

function MainPageWithRouteSwitch() {
  const navigate = useNavigate()

  return (
    <>
      <button type="button" onClick={() => navigate('/dotnet')}>Go Dotnet</button>
      <MainPage />
    </>
  )
}

describe('MainPage', () => {
  describe('getMenuTileSummaries', () => {
    it('computes unknown-count and excludes unknown from easy/medium/hard counts', () => {
      const summaries = getMenuTileSummaries([
        { id: 'azure', label: 'Azure', order: 2 },
      ])

      expect(summaries[0]?.stats).toEqual({
        totalTopics: 4,
        easyTopics: 1,
        mediumTopics: 1,
        hardTopics: 1,
        unknownTopics: 1,
      })
    })

    it('returns Mixed dominant complexity when known counts tie for highest', () => {
      const summaries = getMenuTileSummaries([
        { id: 'azure', label: 'Azure', order: 2 },
      ])

      expect(summaries[0]?.dominantComplexity).toBe('Mixed')
    })

    it('returns Unknown dominant complexity for a zero-topic menu', () => {
      const summaries = getMenuTileSummaries([
        { id: 'csharp', label: 'C#', order: 3 },
      ])

      expect(summaries[0]?.dominantComplexity).toBe('Unknown')
    })
  })

  describe('MainMenuTilesPage root route', () => {
    it('renders menu tiles on root route and does not render coming-soon placeholder', () => {
      renderRootMainRoute()

      expect(screen.getByRole('heading', { name: '.NET' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Azure' })).toBeInTheDocument()
      expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument()
    })

    it('renders compact high-level statistics for tiles', () => {
      renderRootMainRoute()

      const azureHeading = screen.getByRole('heading', { name: 'Azure' })
      const azureTile = azureHeading.closest('.MuiCard-root')
      expect(azureTile).not.toBeNull()

      const tileContent = within(azureTile as HTMLElement)
      expect(tileContent.getByText('4 topics')).toBeInTheDocument()
      expect(tileContent.getByText('Easy 1 | Medium 1 | Hard 1')).toBeInTheDocument()
    })

    it('navigates to matching menu route when a tile is clicked', async () => {
      const user = userEvent.setup()

      render(
        <TopicProgressProvider>
          <BookmarkProvider>
            <MemoryRouter initialEntries={['/']}>
              <Routes>
                <Route path="/" element={<MainMenuTilesPage />} />
                <Route path="/:menuSlug" element={<MainPage />} />
              </Routes>
            </MemoryRouter>
          </BookmarkProvider>
        </TopicProgressProvider>,
      )

      await user.click(screen.getByText('Azure'))

      expect(screen.getByRole('heading', { name: 'Azure' })).toBeInTheDocument()
      expect(screen.getByText('Azure Event Hubs')).toBeInTheDocument()
    })

    it('navigates configured zero-topic tile and shows empty topic state', async () => {
      const user = userEvent.setup()

      render(
        <TopicProgressProvider>
          <BookmarkProvider>
            <MemoryRouter initialEntries={['/']}>
              <Routes>
                <Route path="/" element={<MainMenuTilesPage />} />
                <Route path="/:menuSlug" element={<MainPage />} />
              </Routes>
            </MemoryRouter>
          </BookmarkProvider>
        </TopicProgressProvider>,
      )

      await user.click(screen.getByText('C#'))

      expect(screen.getByRole('heading', { name: 'C#' })).toBeInTheDocument()
      expect(screen.getByText('No topics available')).toBeInTheDocument()
    })

    it('supports keyboard activation parity for tile navigation', async () => {
      const user = userEvent.setup()

      render(
        <TopicProgressProvider>
          <BookmarkProvider>
            <MemoryRouter initialEntries={['/']}>
              <Routes>
                <Route path="/" element={<MainMenuTilesPage />} />
                <Route path="/:menuSlug" element={<MainPage />} />
              </Routes>
            </MemoryRouter>
          </BookmarkProvider>
        </TopicProgressProvider>,
      )

      await user.tab()
      await user.keyboard('{Enter}')

      expect(screen.getByRole('heading', { name: '.NET' })).toBeInTheDocument()
      expect(screen.getByText('.NET Dependency Injection')).toBeInTheDocument()
    })
  })

  it('renders topic tiles from the config for the active menu', () => {
    renderWithRoute('/azure', '/:menuSlug')
    expect(screen.getByText('Azure Event Hubs')).toBeInTheDocument()
    expect(screen.getByText('Azure Service Bus')).toBeInTheDocument()
  })

  it('navigates to topic route when a tile is clicked', async () => {
    const user = userEvent.setup()
    render(
      <TopicProgressProvider>
        <BookmarkProvider>
          <MemoryRouter initialEntries={['/azure']}>
            <Routes>
              <Route path="/:menuSlug" element={<MainPage />} />
              <Route path="/:menuSlug/:topicSlug" element={<div data-testid="topic-page" />} />
            </Routes>
          </MemoryRouter>
        </BookmarkProvider>
      </TopicProgressProvider>,
    )
    await user.click(screen.getByText('Azure Event Hubs'))
    expect(screen.getByTestId('topic-page')).toBeInTheDocument()
  })

  it('shows "No topics available" when config has an empty topics array', () => {
    renderWithRoute('/csharp', '/:menuSlug')
    expect(screen.getByText('No topics available')).toBeInTheDocument()
  })

  it('shows "No topics available" for an unknown menuSlug', () => {
    renderWithRoute('/unknown', '/:menuSlug')
    expect(screen.getByText('No topics available')).toBeInTheDocument()
  })

  it('defaults complexity filter to All', () => {
    renderWithRoute('/azure', '/:menuSlug')
    expect(screen.getByRole('combobox', { name: /complexity/i })).toHaveTextContent('All')
  })

  it('filters topics by selected complexity', async () => {
    const user = userEvent.setup()
    renderWithRoute('/azure', '/:menuSlug')

    await user.click(screen.getByRole('combobox', { name: /complexity/i }))
    await user.click(screen.getByRole('option', { name: 'Easy' }))

    expect(screen.getByText('Azure Functions')).toBeInTheDocument()
    expect(screen.queryByText('Azure Service Bus')).not.toBeInTheDocument()
  })

  it('combines search and complexity filters with intersection semantics', async () => {
    const user = userEvent.setup()
    renderWithRoute('/azure', '/:menuSlug')

    await user.type(screen.getByLabelText('Search topics'), 'azure')
    await user.click(screen.getByRole('combobox', { name: /complexity/i }))
    await user.click(screen.getByRole('option', { name: 'Hard' }))

    expect(screen.getByText('Azure Service Bus')).toBeInTheDocument()
    expect(screen.queryByText('Azure Event Hubs')).not.toBeInTheDocument()
  })

  it('shows no-results message for unmatched search + complexity combination', async () => {
    const user = userEvent.setup()
    renderWithRoute('/azure', '/:menuSlug')

    await user.type(screen.getByLabelText('Search topics'), 'functions')
    await user.click(screen.getByRole('combobox', { name: /complexity/i }))
    await user.click(screen.getByRole('option', { name: 'Hard' }))

    expect(screen.getByText('No topics match current filters')).toBeInTheDocument()
  })

  it('resets complexity to All when navigating to a different menu route', async () => {
    const user = userEvent.setup()
    render(
      <TopicProgressProvider>
        <BookmarkProvider>
          <MemoryRouter initialEntries={['/azure']}>
            <Routes>
              <Route path="/:menuSlug" element={<MainPageWithRouteSwitch />} />
            </Routes>
          </MemoryRouter>
        </BookmarkProvider>
      </TopicProgressProvider>,
    )

    await user.click(screen.getByRole('combobox', { name: /complexity/i }))
    await user.click(screen.getByRole('option', { name: 'Hard' }))
    expect(screen.getByRole('combobox', { name: /complexity/i })).toHaveTextContent('Hard')

    await user.click(screen.getByRole('button', { name: 'Go Dotnet' }))
    expect(screen.getByRole('combobox', { name: /complexity/i })).toHaveTextContent('All')
  })

  describe('progress tracking', () => {
    function seedCompleted(...keys: string[]) {
      const state = Object.fromEntries(keys.map((key) => [key, true]))
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state))
    }

    it('shows a 0/total progress chip when nothing is completed', () => {
      renderWithRoute('/azure', '/:menuSlug')
      expect(screen.getByText('0/4 completed')).toBeInTheDocument()
    })

    it('shows the completed/total progress chip and marks completed topics', () => {
      seedCompleted('azure/azure-event-hubs', 'azure/azure-functions')
      renderWithRoute('/azure', '/:menuSlug')

      expect(screen.getByText('2/4 completed')).toBeInTheDocument()
      const eventHubsCard = screen.getByText('Azure Event Hubs').closest('.MuiCard-root') as HTMLElement
      const serviceBusCard = screen.getByText('Azure Service Bus').closest('.MuiCard-root') as HTMLElement
      expect(within(eventHubsCard).getByTitle('Completed')).toBeInTheDocument()
      expect(within(serviceBusCard).queryByTitle('Completed')).not.toBeInTheDocument()
    })

    it('reset progress dialog cancel leaves progress unchanged', async () => {
      const user = userEvent.setup()
      seedCompleted('azure/azure-event-hubs')
      renderWithRoute('/azure', '/:menuSlug')

      await user.click(screen.getByRole('button', { name: 'Reset progress' }))
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      await user.click(screen.getByRole('button', { name: 'Cancel' }))

      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
      expect(screen.getByText('1/4 completed')).toBeInTheDocument()
    })

    it('reset progress dialog confirm clears only the current menu', async () => {
      const user = userEvent.setup()
      seedCompleted('azure/azure-event-hubs', 'dotnet/dotnet-di')
      renderWithRoute('/azure', '/:menuSlug')

      await user.click(screen.getByRole('button', { name: 'Reset progress' }))
      const dialog = screen.getByRole('dialog')
      await user.click(within(dialog).getByRole('button', { name: 'Reset progress' }))

      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
      expect(screen.getByText('0/4 completed')).toBeInTheDocument()

      const state = JSON.parse(window.localStorage.getItem(PROGRESS_STORAGE_KEY) ?? '{}')
      expect(state).toEqual({ 'dotnet/dotnet-di': true })
    })
  })

  describe('flashcards entry point', () => {
    it('does not render a Flashcards control for a non-eligible menu', () => {
      renderWithRoute('/azure', '/:menuSlug')
      expect(screen.queryByRole('button', { name: 'Flashcards' })).not.toBeInTheDocument()
    })

    it('renders an enabled Flashcards control for an eligible menu with topics', () => {
      renderWithRoute('/csharp-programs', '/:menuSlug')
      expect(screen.getByRole('button', { name: 'Flashcards' })).toBeEnabled()
    })

    it('disables the Flashcards control when the filtered list is empty', async () => {
      const user = userEvent.setup()
      renderWithRoute('/csharp-programs', '/:menuSlug')

      await user.type(screen.getByLabelText('Search topics'), 'zzzznotopicmatchesthis')

      expect(screen.getByRole('button', { name: 'Flashcards' })).toBeDisabled()
    })

    it('navigates to the flashcards route carrying the active search/complexity filter', async () => {
      const user = userEvent.setup()
      render(
        <TopicProgressProvider>
          <BookmarkProvider>
            <MemoryRouter initialEntries={['/csharp-programs']}>
              <Routes>
                <Route path="/:menuSlug" element={<MainPage />} />
                <Route path="/:menuSlug/flashcards" element={<LocationDisplay />} />
              </Routes>
            </MemoryRouter>
          </BookmarkProvider>
        </TopicProgressProvider>,
      )

      await user.click(screen.getByRole('combobox', { name: /complexity/i }))
      await user.click(screen.getByRole('option', { name: 'Medium' }))
      await user.click(screen.getByRole('button', { name: 'Flashcards' }))

      expect(screen.getByTestId('location')).toHaveTextContent('/csharp-programs/flashcards?complexity=Medium')
    })
  })

  describe('tag indicators', () => {
    it('shows a plain tag indicator on a card matching a tag, but not on a card with no matching tag', async () => {
      renderWithRoute('/azure', '/:menuSlug')

      const serviceBusCard = screen.getByText('Azure Service Bus').closest('.MuiCard-root') as HTMLElement
      await waitFor(() => expect(within(serviceBusCard).getByText('Messaging & Queues')).toBeInTheDocument())

      const eventHubsCard = screen.getByText('Azure Event Hubs').closest('.MuiCard-root') as HTMLElement
      expect(within(eventHubsCard).queryByText('Messaging & Queues')).not.toBeInTheDocument()
    })

    it('still navigates to the topic when clicking a card that shows a tag indicator', async () => {
      const user = userEvent.setup()
      render(
        <TopicProgressProvider>
          <BookmarkProvider>
            <MemoryRouter initialEntries={['/azure']}>
              <Routes>
                <Route path="/:menuSlug" element={<MainPage />} />
                <Route path="/:menuSlug/:topicSlug" element={<div data-testid="topic-page" />} />
              </Routes>
            </MemoryRouter>
          </BookmarkProvider>
        </TopicProgressProvider>,
      )

      await waitFor(() =>
        expect(
          within(screen.getByText('Azure Service Bus').closest('.MuiCard-root') as HTMLElement).getByText('Messaging & Queues'),
        ).toBeInTheDocument(),
      )

      await user.click(screen.getByText('Azure Service Bus'))
      expect(screen.getByTestId('topic-page')).toBeInTheDocument()
    })
  })
})
