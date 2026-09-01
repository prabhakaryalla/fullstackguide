import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { getMenuTileSummaries } from '../../src/features/main/data/getMenuTileSummaries'
import MainPage from '../../src/features/main/pages/MainPage'
import MainMenuTilesPage from '../../src/features/main/pages/MainMenuTilesPage'
import { renderRootMainRoute } from './renderWithRouter'

vi.mock('../../src/features/landing/data/menuConfig.json', () => ({
  default: {
    items: [
      { id: 'dotnet', label: '.NET', order: 1 },
      { id: 'azure', label: 'Azure', order: 2 },
      { id: 'csharp', label: 'C#', order: 3 },
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

function renderWithRoute(path: string, routePath: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path={routePath} element={<MainPage />} />
      </Routes>
    </MemoryRouter>,
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
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<MainMenuTilesPage />} />
            <Route path="/:menuSlug" element={<MainPage />} />
          </Routes>
        </MemoryRouter>,
      )

      await user.click(screen.getByText('Azure'))

      expect(screen.getByRole('heading', { name: 'Azure' })).toBeInTheDocument()
      expect(screen.getByText('Azure Event Hubs')).toBeInTheDocument()
    })

    it('navigates configured zero-topic tile and shows empty topic state', async () => {
      const user = userEvent.setup()

      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<MainMenuTilesPage />} />
            <Route path="/:menuSlug" element={<MainPage />} />
          </Routes>
        </MemoryRouter>,
      )

      await user.click(screen.getByText('C#'))

      expect(screen.getByRole('heading', { name: 'C#' })).toBeInTheDocument()
      expect(screen.getByText('No topics available')).toBeInTheDocument()
    })

    it('supports keyboard activation parity for tile navigation', async () => {
      const user = userEvent.setup()

      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<MainMenuTilesPage />} />
            <Route path="/:menuSlug" element={<MainPage />} />
          </Routes>
        </MemoryRouter>,
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
      <MemoryRouter initialEntries={['/azure']}>
        <Routes>
          <Route path="/:menuSlug" element={<MainPage />} />
          <Route path="/:menuSlug/:topicSlug" element={<div data-testid="topic-page" />} />
        </Routes>
      </MemoryRouter>,
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
      <MemoryRouter initialEntries={['/azure']}>
        <Routes>
          <Route path="/:menuSlug" element={<MainPageWithRouteSwitch />} />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('combobox', { name: /complexity/i }))
    await user.click(screen.getByRole('option', { name: 'Hard' }))
    expect(screen.getByRole('combobox', { name: /complexity/i })).toHaveTextContent('Hard')

    await user.click(screen.getByRole('button', { name: 'Go Dotnet' }))
    expect(screen.getByRole('combobox', { name: /complexity/i })).toHaveTextContent('All')
  })
})
