import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
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
})
