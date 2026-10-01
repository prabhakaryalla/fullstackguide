import { afterEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TopicProgressProvider from '../../src/features/progress/context/TopicProgressContext'
import { useTopicProgress } from '../../src/features/progress/hooks/useTopicProgress'
import { useMenuProgressSummary } from '../../src/features/progress/hooks/useMenuProgressSummary'
import { PROGRESS_STORAGE_KEY } from '../../src/features/progress/data/progressStorage'
import type { Topic } from '../../src/features/main/model/types'

function ToggleHarness({ menuId, slug }: { menuId: string; slug: string }) {
  const { isCompleted, toggleCompletion } = useTopicProgress()
  return (
    <button type="button" onClick={() => toggleCompletion(menuId, slug)}>
      {isCompleted(menuId, slug) ? 'Completed' : 'Not completed'}
    </button>
  )
}

function ResetHarness({ menuId }: { menuId: string }) {
  const { resetMenuProgress } = useTopicProgress()
  return (
    <button type="button" onClick={() => resetMenuProgress(menuId)}>
      Reset {menuId}
    </button>
  )
}

const azureTopics: Topic[] = [
  { id: '1', slug: 'azure-event-hubs', title: 'Azure Event Hubs', markdownPath: 'azure/a.md' },
  { id: '2', slug: 'azure-service-bus', title: 'Azure Service Bus', markdownPath: 'azure/b.md' },
]

function SummaryHarness({ menuId, topics }: { menuId: string; topics: Topic[] }) {
  const { completed, total } = useMenuProgressSummary(menuId, topics)
  return <div>{`${completed}/${total}`}</div>
}

describe('TopicProgressContext', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('toggles a topic completion state and is reversible', async () => {
    const user = userEvent.setup()
    render(
      <TopicProgressProvider>
        <ToggleHarness menuId="azure" slug="azure-event-hubs" />
      </TopicProgressProvider>,
    )

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Not completed')

    await user.click(button)
    expect(button).toHaveTextContent('Completed')

    await user.click(button)
    expect(button).toHaveTextContent('Not completed')
  })

  it('persists completion state across a provider remount', async () => {
    const user = userEvent.setup()
    const { unmount } = render(
      <TopicProgressProvider>
        <ToggleHarness menuId="azure" slug="azure-event-hubs" />
      </TopicProgressProvider>,
    )

    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveTextContent('Completed')
    unmount()

    render(
      <TopicProgressProvider>
        <ToggleHarness menuId="azure" slug="azure-event-hubs" />
      </TopicProgressProvider>,
    )
    expect(screen.getByRole('button')).toHaveTextContent('Completed')
    expect(window.localStorage.getItem(PROGRESS_STORAGE_KEY)).toContain('azure/azure-event-hubs')
  })

  it('resets only the targeted menu, leaving other menus untouched', async () => {
    const user = userEvent.setup()
    render(
      <TopicProgressProvider>
        <ToggleHarness menuId="azure" slug="azure-event-hubs" />
        <ToggleHarness menuId="csharp" slug="boxing" />
        <ResetHarness menuId="azure" />
      </TopicProgressProvider>,
    )

    const [azureToggle, csharpToggle] = screen.getAllByRole('button', { name: /completed/i })
    await user.click(azureToggle)
    await user.click(csharpToggle)
    expect(azureToggle).toHaveTextContent('Completed')
    expect(csharpToggle).toHaveTextContent('Completed')

    await user.click(screen.getByRole('button', { name: 'Reset azure' }))

    expect(azureToggle).toHaveTextContent('Not completed')
    expect(csharpToggle).toHaveTextContent('Completed')
  })

  it('excludes completions for slugs no longer present in the current topic list', async () => {
    const user = userEvent.setup()
    render(
      <TopicProgressProvider>
        <ToggleHarness menuId="azure" slug="azure-removed-topic" />
        <SummaryHarness menuId="azure" topics={azureTopics} />
      </TopicProgressProvider>,
    )

    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveTextContent('Completed')
    // "azure-removed-topic" is completed but isn't in azureTopics, so it must not count
    expect(screen.getByText('0/2')).toBeInTheDocument()
  })
})
