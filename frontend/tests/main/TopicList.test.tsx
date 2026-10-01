import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TopicList from '../../src/features/main/components/TopicList'
import type { Topic } from '../../src/features/main/model/types'

const topics: Topic[] = [
  { id: '1', slug: 'event-hubs', title: 'Azure Event Hubs', markdownPath: 'azure/azure-event-hubs.md', complexity: 'Medium' },
  { id: '2', slug: 'service-bus', title: 'Azure Service Bus', markdownPath: 'azure/azure-service-bus.md', complexity: 'Hard' },
]

describe('TopicList', () => {
  it('renders one card per topic', () => {
    render(<TopicList topics={topics} onTopicClick={vi.fn()} />)
    expect(screen.getByText('Azure Event Hubs')).toBeInTheDocument()
    expect(screen.getByText('Azure Service Bus')).toBeInTheDocument()
  })

  it('calls onTopicClick with the correct topic when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<TopicList topics={topics} onTopicClick={handleClick} />)
    await user.click(screen.getByText('Azure Event Hubs'))
    expect(handleClick).toHaveBeenCalledWith(topics[0])
  })

  it('shows the default empty-state message when topics is empty', () => {
    render(<TopicList topics={[]} onTopicClick={vi.fn()} />)
    expect(screen.getByText('No topics available')).toBeInTheDocument()
  })

  it('shows a custom empty-state message when provided', () => {
    render(<TopicList topics={[]} onTopicClick={vi.fn()} emptyMessage="Nothing matches your search" />)
    expect(screen.getByText('Nothing matches your search')).toBeInTheDocument()
  })

  it('forwards the isTopicCompleted lookup result to each TopicCard as its completed prop', () => {
    render(
      <TopicList
        topics={topics}
        onTopicClick={vi.fn()}
        isTopicCompleted={(topic) => topic.slug === 'service-bus'}
      />,
    )
    const serviceBusCard = screen.getByText('Azure Service Bus').closest('.MuiCard-root') as HTMLElement
    const eventHubsCard = screen.getByText('Azure Event Hubs').closest('.MuiCard-root') as HTMLElement
    expect(within(serviceBusCard).getByTitle('Completed')).toBeInTheDocument()
    expect(within(eventHubsCard).queryByTitle('Completed')).not.toBeInTheDocument()
  })

  it('renders a bookmark control per card reflecting isTopicBookmarked without triggering navigation', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    const handleToggleBookmark = vi.fn()
    render(
      <TopicList
        topics={topics}
        onTopicClick={handleClick}
        isTopicBookmarked={(topic) => topic.slug === 'service-bus'}
        onToggleBookmark={handleToggleBookmark}
      />,
    )

    expect(screen.getByRole('button', { name: /remove bookmark for azure service bus/i })).toBeInTheDocument()
    const bookmarkButton = screen.getByRole('button', { name: /bookmark azure event hubs/i })

    await user.click(bookmarkButton)

    expect(handleToggleBookmark).toHaveBeenCalledWith(topics[0])
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('does not render a bookmark control when onToggleBookmark is omitted', () => {
    render(<TopicList topics={topics} onTopicClick={vi.fn()} />)
    expect(screen.queryByRole('button', { name: /bookmark/i })).not.toBeInTheDocument()
  })

  it('forwards the getTags lookup result to each TopicCard as its tags prop', () => {
    render(
      <TopicList
        topics={topics}
        onTopicClick={vi.fn()}
        getTags={(topic) => (topic.slug === 'service-bus' ? ['messaging'] : undefined)}
      />,
    )
    const serviceBusCard = screen.getByText('Azure Service Bus').closest('.MuiCard-root') as HTMLElement
    const eventHubsCard = screen.getByText('Azure Event Hubs').closest('.MuiCard-root') as HTMLElement
    expect(within(serviceBusCard).getByText('Messaging & Queues')).toBeInTheDocument()
    expect(within(eventHubsCard).queryByText('Messaging & Queues')).not.toBeInTheDocument()
  })
})
