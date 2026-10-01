import { afterEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CompletedInterviewsProvider from '../../src/features/interview-builder/context/CompletedInterviewsContext'
import { useCompletedInterviews } from '../../src/features/interview-builder/hooks/useCompletedInterviews'
import {
  COMPLETED_INTERVIEWS_STORAGE_KEY,
  buildSessionCompletionKey,
} from '../../src/features/interview-builder/data/completedInterviewsStorage'

const KEY = buildSessionCompletionKey('csharp-programs:csharp-access-modifiers-output-questions', [])

function Harness() {
  const { isCompleted, markCompleted } = useCompletedInterviews()
  return (
    <div>
      <span>{`completed:${isCompleted(KEY)}`}</span>
      <button type="button" onClick={() => markCompleted(KEY)}>
        Complete
      </button>
    </div>
  )
}

describe('CompletedInterviewsContext', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('starts with no completed sessions', () => {
    render(
      <CompletedInterviewsProvider>
        <Harness />
      </CompletedInterviewsProvider>,
    )
    expect(screen.getByText('completed:false')).toBeInTheDocument()
  })

  it('marks a session completed and persists it to storage', async () => {
    const user = userEvent.setup()
    render(
      <CompletedInterviewsProvider>
        <Harness />
      </CompletedInterviewsProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Complete' }))

    expect(screen.getByText('completed:true')).toBeInTheDocument()
    const state = JSON.parse(window.localStorage.getItem(COMPLETED_INTERVIEWS_STORAGE_KEY) ?? '{}')
    expect(state[KEY]).toBeTypeOf('number')
  })

  it('persists completion across a provider remount', async () => {
    const user = userEvent.setup()
    const { unmount } = render(
      <CompletedInterviewsProvider>
        <Harness />
      </CompletedInterviewsProvider>,
    )
    await user.click(screen.getByRole('button', { name: 'Complete' }))
    unmount()

    render(
      <CompletedInterviewsProvider>
        <Harness />
      </CompletedInterviewsProvider>,
    )
    expect(screen.getByText('completed:true')).toBeInTheDocument()
  })

  it('builds a completion key from items and sorted custom ids, independent of custom-id order', () => {
    const keyA = buildSessionCompletionKey('menus:a,menus:b', ['adhoc-2', 'adhoc-1'])
    const keyB = buildSessionCompletionKey('menus:a,menus:b', ['adhoc-1', 'adhoc-2'])
    expect(keyA).toBe(keyB)
  })
})
