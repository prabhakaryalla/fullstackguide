import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useEffect } from 'react'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import ActiveInterviewBanner from '../../src/features/interview-builder/components/ActiveInterviewBanner'
import ActiveInterviewProvider from '../../src/features/interview-builder/context/ActiveInterviewContext'
import { useActiveInterview } from '../../src/features/interview-builder/hooks/useActiveInterview'

function SetActiveInterviewOnMount() {
  const { setActiveInterview } = useActiveInterview()
  useEffect(() => {
    setActiveInterview({ search: 'menus=azure&items=azure:azure-service-bus&at=1', currentIndex: 1, totalQuestions: 2 })
  }, [setActiveInterview])
  return null
}

function LocationStub() {
  const location = useLocation()
  return <div data-testid="location">{`${location.pathname}${location.search}`}</div>
}

function renderAt(initialPath: string, { seeded = false }: { seeded?: boolean } = {}) {
  return render(
    <ActiveInterviewProvider>
      {seeded && <SetActiveInterviewOnMount />}
      <MemoryRouter initialEntries={[initialPath]}>
        <ActiveInterviewBanner />
        <Routes>
          <Route path="*" element={<LocationStub />} />
        </Routes>
      </MemoryRouter>
    </ActiveInterviewProvider>,
  )
}

describe('ActiveInterviewBanner', () => {
  it('renders nothing when there is no active interview', () => {
    const { container } = renderAt('/interview-builder')
    expect(container.querySelector('.MuiAlert-root')).not.toBeInTheDocument()
  })

  it('renders nothing while already on the live interview run page', () => {
    const { container } = renderAt('/interview-builder/run', { seeded: true })
    expect(container.querySelector('.MuiAlert-root')).not.toBeInTheDocument()
  })

  it('shows a resume reminder with the current position on other pages', () => {
    renderAt('/interview-builder', { seeded: true })
    expect(screen.getByText(/live interview in progress/i)).toBeInTheDocument()
    expect(screen.getByText(/question 2 of 2/i)).toBeInTheDocument()
  })

  it('navigates back to the exact run URL when Resume is clicked', async () => {
    const user = userEvent.setup()
    renderAt('/azure', { seeded: true })

    await user.click(screen.getByRole('button', { name: 'Resume' }))

    const location = await screen.findByTestId('location')
    expect(location.textContent).toBe('/interview-builder/run?menus=azure&items=azure:azure-service-bus&at=1')
  })

  it('dismisses the reminder without navigating when the close icon is clicked', async () => {
    const user = userEvent.setup()
    renderAt('/azure', { seeded: true })

    await user.click(screen.getByRole('button', { name: 'Dismiss live interview reminder' }))

    expect(screen.queryByText(/live interview in progress/i)).not.toBeInTheDocument()
    const location = await screen.findByTestId('location')
    expect(location.textContent).toBe('/azure')
  })
})
