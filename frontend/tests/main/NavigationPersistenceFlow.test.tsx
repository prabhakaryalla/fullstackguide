import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithFeatureRouter } from './renderWithRouter'

describe('Navigation persistence flow', () => {
  it('keeps top navigation visible while navigating landing -> main -> topic info', async () => {
    const user = userEvent.setup()
    renderWithFeatureRouter('/')

    await waitFor(() => {
      expect(screen.getByText('Fullstack Guide')).toBeInTheDocument()
    })

    await user.hover(screen.getByRole('button', { name: 'Cloud' }))
    const azureItem = await screen.findByRole('menuitem', { name: 'Azure' })
    await user.click(azureItem)

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Azure' })).toBeInTheDocument()
    })
    expect(screen.getByText('Fullstack Guide')).toBeInTheDocument()

    await user.click(screen.getByText('Azure Event Hubs'))

    await waitFor(() => {
      expect(screen.getByText(/Back to azure/i)).toBeInTheDocument()
    })
    expect(screen.getByText('Fullstack Guide')).toBeInTheDocument()
  })

  it('keeps top navigation visible for unknown menu slug and empty topic states', async () => {
    renderWithFeatureRouter('/unknown')

    await waitFor(() => {
      expect(screen.getByText('Topic area unavailable')).toBeInTheDocument()
    })
    expect(screen.getByText('No topics available')).toBeInTheDocument()
    expect(screen.getByText('Fullstack Guide')).toBeInTheDocument()
  })

  it('keeps top navigation visible on fallback route', async () => {
    renderWithFeatureRouter('/this/path/does-not-exist')

    await waitFor(() => {
      expect(screen.getByText('Fullstack Guide')).toBeInTheDocument()
    })
    expect(screen.getByRole('button', { name: /switch to (dark|light) theme/i })).toBeInTheDocument()
  })

  it('keeps the toggled theme mode applied after navigating to a different route', async () => {
    const user = userEvent.setup()
    renderWithFeatureRouter('/')

    await waitFor(() => {
      expect(screen.getByText('Fullstack Guide')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }))
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument()

    await user.hover(screen.getByRole('button', { name: 'Cloud' }))
    const azureItem = await screen.findByRole('menuitem', { name: 'Azure' })
    await user.click(azureItem)

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Azure' })).toBeInTheDocument()
    })
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument()
  })

  it('hovering Backend and selecting C# navigates, closes the submenu, and shows Backend as active', async () => {
    const user = userEvent.setup()
    renderWithFeatureRouter('/')

    await waitFor(() => {
      expect(screen.getByText('Fullstack Guide')).toBeInTheDocument()
    })

    await user.hover(screen.getByRole('button', { name: 'Backend' }))
    const csharpItem = await screen.findByRole('menuitem', { name: 'C#' })
    await user.click(csharpItem)

    await waitFor(() => {
      expect(screen.getByLabelText('Search topics')).toBeInTheDocument()
    })
    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Backend' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('a direct link to a submenu item shows the parent active with its submenu closed on load', async () => {
    renderWithFeatureRouter('/csharp')

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'C#' })).toBeInTheDocument()
    })
    expect(screen.getByRole('button', { name: 'Backend' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument()
  })

  it('submitting a global search reaches a result, and the Global Search bar collapses then re-expands when navigating away', async () => {
    const user = userEvent.setup()
    renderWithFeatureRouter('/')

    await waitFor(() => {
      expect(screen.getByText('Fullstack Guide')).toBeInTheDocument()
    })

    await user.type(screen.getByRole('textbox', { name: /search all topics/i }), 'azure{Enter}')

    await waitFor(() => {
      expect(screen.getByText('Azure Event Hubs')).toBeInTheDocument()
    })
    expect(screen.queryByRole('textbox', { name: /search all topics/i })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open global search/i })).toBeInTheDocument()

    await user.click(screen.getByText('Azure Event Hubs'))

    await waitFor(() => {
      expect(screen.getByText(/Back to azure/i)).toBeInTheDocument()
    })

    await user.hover(screen.getByRole('button', { name: 'Backend' }))
    const csharpItem = await screen.findByRole('menuitem', { name: 'C#' })
    await user.click(csharpItem)

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'C#' })).toBeInTheDocument()
    })
    const searchInput = screen.getByRole('textbox', { name: /search all topics/i })
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveValue('')
  })

  it.each(['/sql', '/angular'])(
    'navigating to %s renders the existing "No topics available" empty state',
    async (path) => {
      renderWithFeatureRouter(path)

      await waitFor(() => {
        expect(screen.getByText('Fullstack Guide')).toBeInTheDocument()
      })
      expect(screen.getByText('No topics available')).toBeInTheDocument()
    },
  )

  it.each([
    ['/dotnet', '.NET'],
    ['/azure', 'Azure'],
    ['/csharp', 'C#'],
    ['/cosmos', 'Cosmos'],
    ['/react-js', 'React JS'],
    ['/ai', 'AI'],
    ['/system-design', 'System Design'],
    ['/microservices', 'Microservices'],
  ])('every leaf route reachable before this feature (%s) still renders its content page', async (path, heading) => {
    renderWithFeatureRouter(path)

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
    })
    expect(screen.getByText('Fullstack Guide')).toBeInTheDocument()
  })
})
