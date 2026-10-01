import { afterEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ActiveInterviewProvider from '../../src/features/interview-builder/context/ActiveInterviewContext'
import { useActiveInterview } from '../../src/features/interview-builder/hooks/useActiveInterview'
import { ACTIVE_INTERVIEW_STORAGE_KEY } from '../../src/features/interview-builder/data/activeInterviewStorage'

function Harness() {
  const { activeInterview, setActiveInterview, clearActiveInterview } = useActiveInterview()
  return (
    <div>
      <span>{`active:${activeInterview ? `${activeInterview.currentIndex}/${activeInterview.totalQuestions}` : 'none'}`}</span>
      <button
        type="button"
        onClick={() => setActiveInterview({ search: 'menus=azure&items=azure:azure-service-bus', currentIndex: 1, totalQuestions: 3 })}
      >
        Set
      </button>
      <button type="button" onClick={clearActiveInterview}>
        Clear
      </button>
    </div>
  )
}

describe('ActiveInterviewContext', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('starts with no active interview', () => {
    render(
      <ActiveInterviewProvider>
        <Harness />
      </ActiveInterviewProvider>,
    )
    expect(screen.getByText('active:none')).toBeInTheDocument()
  })

  it('sets an active interview and persists it to storage', async () => {
    const user = userEvent.setup()
    render(
      <ActiveInterviewProvider>
        <Harness />
      </ActiveInterviewProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Set' }))

    expect(screen.getByText('active:1/3')).toBeInTheDocument()
    expect(window.localStorage.getItem(ACTIVE_INTERVIEW_STORAGE_KEY)).toContain('azure-service-bus')
  })

  it('persists the active interview across a provider remount', async () => {
    const user = userEvent.setup()
    const { unmount } = render(
      <ActiveInterviewProvider>
        <Harness />
      </ActiveInterviewProvider>,
    )
    await user.click(screen.getByRole('button', { name: 'Set' }))
    unmount()

    render(
      <ActiveInterviewProvider>
        <Harness />
      </ActiveInterviewProvider>,
    )
    expect(screen.getByText('active:1/3')).toBeInTheDocument()
  })

  it('clears the active interview and removes it from storage', async () => {
    const user = userEvent.setup()
    render(
      <ActiveInterviewProvider>
        <Harness />
      </ActiveInterviewProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Set' }))
    expect(screen.getByText('active:1/3')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Clear' }))
    expect(screen.getByText('active:none')).toBeInTheDocument()
    expect(window.localStorage.getItem(ACTIVE_INTERVIEW_STORAGE_KEY)).toBeNull()
  })
})
