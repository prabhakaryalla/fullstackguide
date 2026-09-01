import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom'
import GlobalSearchBar from '../../src/features/landing/components/GlobalSearchBar'

function LocationDisplay() {
  const location = useLocation()
  return <div data-testid="location">{location.pathname + location.search}</div>
}

function renderAt(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <GlobalSearchBar />
              <LocationDisplay />
            </>
          }
        />
      </Routes>
    </MemoryRouter>,
  )
}

describe('GlobalSearchBar', () => {
  it('renders a search input with an accessible name', () => {
    renderAt('/')
    expect(screen.getByRole('textbox', { name: /search all topics/i })).toBeInTheDocument()
  })

  it('navigates to /search with the keyword when Enter is pressed', async () => {
    const user = userEvent.setup()
    renderAt('/')

    await user.type(screen.getByRole('textbox', { name: /search all topics/i }), 'azure{Enter}')

    expect(screen.getByTestId('location')).toHaveTextContent('/search?q=azure')
  })

  it('does not navigate when submitting an empty value', async () => {
    const user = userEvent.setup()
    renderAt('/')

    await user.type(screen.getByRole('textbox', { name: /search all topics/i }), '{Enter}')

    expect(screen.getByTestId('location')).toHaveTextContent('/')
  })

  it('does not navigate when submitting a whitespace-only value', async () => {
    const user = userEvent.setup()
    renderAt('/')

    await user.type(screen.getByRole('textbox', { name: /search all topics/i }), '   {Enter}')

    expect(screen.getByTestId('location')).toHaveTextContent('/')
  })

  it('is reachable via Tab', async () => {
    const user = userEvent.setup()
    renderAt('/')

    await user.tab()
    expect(screen.getByRole('textbox', { name: /search all topics/i })).toHaveFocus()
  })

  it('clears its value after a successful submit', async () => {
    const user = userEvent.setup()
    renderAt('/')

    const input = screen.getByRole('textbox', { name: /search all topics/i })
    await user.type(input, 'azure{Enter}')

    expect(input).toHaveValue('')
  })

  it('collapses to a search-icon-only control while on the search results page', () => {
    renderAt('/search?q=azure')

    expect(screen.queryByRole('textbox', { name: /search all topics/i })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open global search/i })).toBeInTheDocument()
  })

  it('re-expands into a text input when the collapsed icon is selected', async () => {
    const user = userEvent.setup()
    renderAt('/search?q=azure')

    await user.click(screen.getByRole('button', { name: /open global search/i }))

    const input = screen.getByRole('textbox', { name: /search all topics/i })
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('collapses again after submitting a new keyword from the re-expanded input', async () => {
    const user = userEvent.setup()
    renderAt('/search?q=azure')

    await user.click(screen.getByRole('button', { name: /open global search/i }))
    await user.type(screen.getByRole('textbox', { name: /search all topics/i }), 'cosmos{Enter}')

    expect(screen.getByTestId('location')).toHaveTextContent('/search?q=cosmos')
    expect(screen.queryByRole('textbox', { name: /search all topics/i })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open global search/i })).toBeInTheDocument()
  })
})
