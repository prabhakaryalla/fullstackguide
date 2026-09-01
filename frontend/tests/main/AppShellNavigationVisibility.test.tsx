import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithFeatureRouter } from './renderWithRouter'

function setViewport(width: number, height: number) {
  Object.defineProperty(window, 'innerWidth', { configurable: true, value: width })
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: height })
  window.dispatchEvent(new Event('resize'))
}

function setScrollY(y: number) {
  Object.defineProperty(window, 'scrollY', { configurable: true, value: y })
  window.dispatchEvent(new Event('scroll'))
}

describe('App shell navigation visibility', () => {
  it.each(['/', '/azure', '/azure/azure-event-hubs', '/unknown/route/extra'])(
    'keeps top navigation visible for route %s',
    async (path) => {
      renderWithFeatureRouter(path)
      await waitFor(() => {
        expect(screen.getByText('Fullstack Guide')).toBeInTheDocument()
      })
      expect(screen.getByRole('banner')).toHaveClass('MuiAppBar-positionFixed')
      expect(screen.getByRole('button', { name: /switch to (dark|light) theme/i })).toBeInTheDocument()
    },
  )

  it('keeps top navigation visible without vertical scroll on desktop and mobile viewports', async () => {
    setViewport(1280, 900)
    const { unmount } = renderWithFeatureRouter('/')

    await waitFor(() => {
      expect(screen.getByText('Fullstack Guide')).toBeInTheDocument()
    })
    expect(screen.getByRole('banner')).toHaveClass('MuiAppBar-positionFixed')
    setScrollY(1200)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(window.scrollY).toBe(1200)

    unmount()
    setViewport(390, 844)
    renderWithFeatureRouter('/azure')

    await waitFor(() => {
      expect(screen.getByText('Fullstack Guide')).toBeInTheDocument()
    })
    expect(screen.getByRole('banner')).toHaveClass('MuiAppBar-positionFixed')
    setScrollY(900)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(window.scrollY).toBe(900)
  })

  it('shows top navigation within 1 second of route render', async () => {
    const startedAt = performance.now()
    renderWithFeatureRouter('/csharp')

    await waitFor(() => {
      expect(screen.getByText('Fullstack Guide')).toBeInTheDocument()
    })

    const elapsedMs = performance.now() - startedAt
    expect(elapsedMs).toBeLessThanOrEqual(1000)
  })
})
