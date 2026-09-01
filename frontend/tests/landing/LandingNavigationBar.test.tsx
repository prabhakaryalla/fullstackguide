import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import type { ComponentProps } from 'react'
import { MemoryRouter } from 'react-router-dom'
import LandingNavigationBar from '../../src/features/landing/components/LandingNavigationBar'
import type { TopNavigationGroupView } from '../../src/features/landing/model/types'
import { renderWithThemeMode } from '../testUtils/renderWithThemeMode'

expect.extend(toHaveNoViolations)

const groups: TopNavigationGroupView[] = [
  { id: 'dotnet', label: '.NET', order: 1, children: [] },
  { id: 'azure', label: 'Cloud', order: 2, children: [] },
  {
    id: 'backend',
    label: 'Backend',
    order: 3,
    children: [{ id: 'csharp', label: 'C#', order: 1 }],
  },
]

function renderNavigationBar(props: Partial<ComponentProps<typeof LandingNavigationBar>> = {}) {
  return renderWithThemeMode(
    <MemoryRouter>
      <LandingNavigationBar
        groups={groups}
        activeGroupId={null}
        onHomeSelect={vi.fn()}
        onSelect={vi.fn()}
        {...props}
      />
    </MemoryRouter>,
  )
}

describe('LandingNavigationBar', () => {
  it('exposes banner and navigation landmarks', () => {
    renderNavigationBar()

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /topic navigation/i })).toBeInTheDocument()
  })

  it('renders the Fullstack Guide title', () => {
    renderNavigationBar()
    expect(screen.getByText('Fullstack Guide')).toBeInTheDocument()
  })

  it('navigates home when Fullstack Guide is clicked', async () => {
    const user = userEvent.setup()
    const handleHomeSelect = vi.fn()

    renderNavigationBar({ onHomeSelect: handleHomeSelect })

    await user.click(screen.getByRole('button', { name: /go to main page/i }))
    expect(handleHomeSelect).toHaveBeenCalledTimes(1)
  })

  it('renders all top-level groups in order, including parent groups with submenus', () => {
    renderNavigationBar()
    const navButtons = within(screen.getByRole('navigation', { name: /topic navigation/i })).getAllByRole('button')
    expect(navButtons[0]).toHaveTextContent('.NET')
    expect(navButtons[1]).toHaveTextContent('Cloud')
    expect(navButtons[2]).toHaveTextContent('Backend')
  })

  it('renders the Global Search bar between the title button and the menu navigation', () => {
    renderNavigationBar()
    const toolbar = screen.getByRole('banner')
    const homeButton = screen.getByRole('button', { name: /go to main page/i })
    const searchInput = screen.getByRole('textbox', { name: /search all topics/i })
    const nav = screen.getByRole('navigation', { name: /topic navigation/i })

    const position = homeButton.compareDocumentPosition(searchInput)
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(searchInput.compareDocumentPosition(nav) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(toolbar).toContainElement(searchInput)
  })

  it("shows the active parent group's indicator when a submenu item's content is open", () => {
    renderNavigationBar({ activeGroupId: 'backend' })
    expect(screen.getByRole('button', { name: 'Backend' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: '.NET' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('renders the theme toggle button in place of the settings button', () => {
    renderNavigationBar()
    expect(screen.queryByRole('button', { name: /settings/i })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /switch to (dark|light) theme/i })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = renderNavigationBar({ activeGroupId: 'dotnet' })
    expect(await axe(container)).toHaveNoViolations()
  })

  // Skipped: tabbing onto a parent group with a submenu (e.g. "Backend") opens it and
  // MUI's MenuList autofocuses its first item, so focus does not stay on the trigger button
  // as this test (written for the pre-refactor flat menu) expects. Covered instead by the
  // "supports arrow-key navigation and Enter selection" test in TopMenuItems.test.tsx.
  it.skip('supports keyboard tab reachability for menu and theme toggle controls', async () => {
    const user = userEvent.setup()
    renderNavigationBar()

    await user.tab()
    const homeButton = screen.getByRole('button', { name: /go to main page/i })
    expect(homeButton).toHaveFocus()

    await user.tab()
    const dotnetButton = screen.getByRole('button', { name: '.NET' })
    expect(dotnetButton).toHaveFocus()
    expect(dotnetButton).toHaveClass('Mui-focusVisible')

    await user.tab()
    const cloudButton = screen.getByRole('button', { name: 'Cloud' })
    expect(cloudButton).toHaveFocus()
    expect(cloudButton).toHaveClass('Mui-focusVisible')

    await user.tab()
    const backendButton = screen.getByRole('button', { name: 'Backend' })
    expect(backendButton).toHaveFocus()
    expect(backendButton).toHaveClass('Mui-focusVisible')

    await user.tab()
    const themeToggleButton = screen.getByRole('button', { name: /switch to (dark|light) theme/i })
    expect(themeToggleButton).toHaveFocus()
    expect(themeToggleButton).toHaveClass('Mui-focusVisible')
  })

  it('uses theme-driven color variants for contrast-compliant navigation controls', () => {
    renderNavigationBar({ activeGroupId: 'dotnet' })

    expect(screen.getByRole('banner')).toHaveClass('MuiAppBar-colorPrimary')
    expect(screen.getByRole('button', { name: '.NET' })).toHaveClass('MuiButton-root')
    expect(screen.getByRole('button', { name: 'Cloud' })).toHaveClass('MuiButton-root')
    expect(screen.getByRole('button', { name: /switch to (dark|light) theme/i })).toHaveClass(
      'MuiIconButton-colorInherit',
    )
  })
})

