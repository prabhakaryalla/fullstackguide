import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import type { Topic } from '../../src/features/main/model/types'
import { resolveAdjacentTopicSlugs } from '../../src/features/main/data/resolveAdjacentTopicSlugs'
import TopicInfoPage from '../../src/features/main/pages/TopicInfoPage'

vi.mock('mermaid', () => ({
  default: { initialize: vi.fn(), render: vi.fn().mockResolvedValue({ svg: '<svg />' }) },
}))

function renderAtRoute(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/:menuSlug/:topicSlug" element={<TopicInfoPage />} />
        <Route path="/:menuSlug" element={<div data-testid="main-page" />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('resolveAdjacentTopicSlugs', () => {
  const topics: Topic[] = [
    {
      id: 'azure-event-hubs',
      slug: 'azure-event-hubs',
      title: 'Azure Event Hubs',
      markdownPath: 'azure/azure-event-hubs.md',
      complexity: 'Medium',
    },
    {
      id: 'azure-service-bus',
      slug: 'azure-service-bus',
      title: 'Azure Service Bus',
      markdownPath: 'azure/azure-service-bus.md',
      complexity: 'Hard',
    },
    {
      id: 'azure-functions',
      slug: 'azure-functions',
      title: 'Azure Functions',
      markdownPath: 'azure/azure-functions.md',
      complexity: 'Easy',
    },
  ]

  it('returns next only for first topic', () => {
    expect(resolveAdjacentTopicSlugs(topics, 'azure-event-hubs')).toEqual({
      previousTopicSlug: null,
      nextTopicSlug: 'azure-service-bus',
    })
  })

  it('returns previous and next for middle topic', () => {
    expect(resolveAdjacentTopicSlugs(topics, 'azure-service-bus')).toEqual({
      previousTopicSlug: 'azure-event-hubs',
      nextTopicSlug: 'azure-functions',
    })
  })

  it('returns previous only for last topic', () => {
    expect(resolveAdjacentTopicSlugs(topics, 'azure-functions')).toEqual({
      previousTopicSlug: 'azure-service-bus',
      nextTopicSlug: null,
    })
  })

  it('returns null adjacency for unknown topic', () => {
    expect(resolveAdjacentTopicSlugs(topics, 'unknown')).toEqual({
      previousTopicSlug: null,
      nextTopicSlug: null,
    })
  })

  it('returns null adjacency for only-topic menu', () => {
    const onlyTopic: Topic[] = [topics[0]]
    expect(resolveAdjacentTopicSlugs(onlyTopic, 'azure-event-hubs')).toEqual({
      previousTopicSlug: null,
      nextTopicSlug: null,
    })
  })
})

describe('TopicInfoPage navigation', () => {
  it('renders Previous and Next buttons on valid topic route', async () => {
    renderAtRoute('/azure/azure-service-bus')

    await waitFor(() => expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument())
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
  })

  it('navigates to the next adjacent topic in same menu', async () => {
    const user = userEvent.setup()

    renderAtRoute('/azure/azure-event-hubs')

    const nextButton = await screen.findByRole('button', { name: 'Next' })
    await user.click(nextButton)

    await waitFor(() => {
      expect(screen.getByText('Azure Service Bus')).toBeInTheDocument()
    })
  })

  it('navigates to the previous adjacent topic in same menu', async () => {
    const user = userEvent.setup()

    renderAtRoute('/azure/azure-service-bus')

    const previousButton = await screen.findByRole('button', { name: 'Previous' })
    await user.click(previousButton)

    await waitFor(() => {
      expect(screen.getByText('Azure Event Hubs')).toBeInTheDocument()
    })
  })

  it('disables Previous on first topic', async () => {
    renderAtRoute('/azure/azure-event-hubs')

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled()
      expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled()
    })
  })

  it('disables Next on last topic', async () => {
    renderAtRoute('/dotnet/dotnet-common-cryptography-methods')

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Previous' })).toBeEnabled()
      expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
    })
  })

  it('supports keyboard activation for enabled Next and keeps disabled Previous non-actionable on first topic', async () => {
    const user = userEvent.setup()

    renderAtRoute('/azure/azure-event-hubs')
    const previousButton = await screen.findByRole('button', { name: 'Previous' })
    const nextButton = screen.getByRole('button', { name: 'Next' })

    expect(previousButton).toBeDisabled()

    await user.tab()
    await user.tab()
    expect(nextButton).toHaveFocus()
    await user.keyboard('{Enter}')

    await waitFor(() => {
      expect(screen.getByText('Azure Service Bus')).toBeInTheDocument()
    })
  })

  it('supports keyboard activation for enabled Previous on middle topic', async () => {
    const user = userEvent.setup()

    renderAtRoute('/azure/azure-service-bus')
    const previousButton = await screen.findByRole('button', { name: 'Previous' })

    expect(previousButton).toBeEnabled()

    await user.tab()
    await user.tab()
    expect(previousButton).toHaveFocus()

    await user.keyboard('{Enter}')

    await waitFor(() => {
      expect(screen.getByText('Azure Event Hubs')).toBeInTheDocument()
    })
  })

  it('shows unavailable content state for unknown topic slug', async () => {
    renderAtRoute('/azure/unknown-topic')

    await waitFor(() => expect(screen.getByText('Content unavailable')).toBeInTheDocument())
  })

  it('navigates back to menu main page', async () => {
    const user = userEvent.setup()

    renderAtRoute('/azure/azure-event-hubs')

    const backButton = await screen.findByRole('button', { name: /back to azure/i })
    await user.click(backButton)

    expect(screen.getByTestId('main-page')).toBeInTheDocument()
  })
})
