import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { describe, it, expect, beforeEach } from 'vitest'
import ThemeToggleAction from '../../src/features/landing/components/ThemeToggleAction'
import { renderWithThemeMode } from '../testUtils/renderWithThemeMode'

expect.extend(toHaveNoViolations)

describe('ThemeToggleAction', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders exactly one button', () => {
    renderWithThemeMode(<ThemeToggleAction />)
    expect(screen.getAllByRole('button')).toHaveLength(1)
  })

  it('shows the icon/label for the next mode (dark) when the current theme is light', () => {
    renderWithThemeMode(<ThemeToggleAction />)
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument()
  })

  it('toggles to dark theme on click and updates the label to the new next mode', async () => {
    const user = userEvent.setup()
    renderWithThemeMode(<ThemeToggleAction />)

    await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }))

    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument()
  })

  it('toggles back to light theme on a second click', async () => {
    const user = userEvent.setup()
    renderWithThemeMode(<ThemeToggleAction />)

    const button = screen.getByRole('button')
    await user.click(button)
    await user.click(button)

    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument()
  })

  it('toggles the theme when activated via keyboard Enter', async () => {
    const user = userEvent.setup()
    renderWithThemeMode(<ThemeToggleAction />)

    screen.getByRole('button').focus()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument()
  })

  it('toggles the theme when activated via keyboard Space', async () => {
    const user = userEvent.setup()
    renderWithThemeMode(<ThemeToggleAction />)

    screen.getByRole('button').focus()
    await user.keyboard(' ')

    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument()
  })

  it('has no accessibility violations in the light-theme state', async () => {
    const { container } = renderWithThemeMode(<ThemeToggleAction />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations in the dark-theme state', async () => {
    const user = userEvent.setup()
    const { container } = renderWithThemeMode(<ThemeToggleAction />)
    await user.click(screen.getByRole('button'))
    expect(await axe(container)).toHaveNoViolations()
  })
})
