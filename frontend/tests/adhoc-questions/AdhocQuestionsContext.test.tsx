import { afterEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdhocQuestionsProvider from '../../src/features/adhoc-questions/context/AdhocQuestionsContext'
import { useAdhocQuestions } from '../../src/features/adhoc-questions/hooks/useAdhocQuestions'
import { ADHOC_QUESTIONS_STORAGE_KEY } from '../../src/features/adhoc-questions/data/adhocQuestionsStorage'
import { adhocQuestionToTopic, ADHOC_MENU_ID } from '../../src/features/adhoc-questions/data/adhocQuestionToTopic'

function Harness() {
  const { questions, addQuestion, getQuestion } = useAdhocQuestions()
  return (
    <div>
      <span>{`count:${questions.length}`}</span>
      <button type="button" onClick={() => addQuestion({ title: 'What is a closure?', detail: 'A function bundled with its scope.' })}>
        Add
      </button>
      {questions.map((q) => (
        <div key={q.id}>
          <span>{`title:${q.title}`}</span>
          <span>{`detail:${q.detail}`}</span>
          <span>{`found:${Boolean(getQuestion(q.id))}`}</span>
        </div>
      ))}
    </div>
  )
}

describe('AdhocQuestionsContext', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('starts with no questions', () => {
    render(
      <AdhocQuestionsProvider>
        <Harness />
      </AdhocQuestionsProvider>,
    )
    expect(screen.getByText('count:0')).toBeInTheDocument()
  })

  it('adds a question and makes it retrievable by id', async () => {
    const user = userEvent.setup()
    render(
      <AdhocQuestionsProvider>
        <Harness />
      </AdhocQuestionsProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByText('count:1')).toBeInTheDocument()
    expect(screen.getByText('title:What is a closure?')).toBeInTheDocument()
    expect(screen.getByText('detail:A function bundled with its scope.')).toBeInTheDocument()
    expect(screen.getByText('found:true')).toBeInTheDocument()
  })

  it('persists added questions across a provider remount', async () => {
    const user = userEvent.setup()
    const { unmount } = render(
      <AdhocQuestionsProvider>
        <Harness />
      </AdhocQuestionsProvider>,
    )
    await user.click(screen.getByRole('button', { name: 'Add' }))
    unmount()

    render(
      <AdhocQuestionsProvider>
        <Harness />
      </AdhocQuestionsProvider>,
    )
    expect(screen.getByText('count:1')).toBeInTheDocument()
    expect(window.localStorage.getItem(ADHOC_QUESTIONS_STORAGE_KEY)).toContain('What is a closure?')
  })

  it('defaults an unspecified complexity to Unknown', async () => {
    const user = userEvent.setup()
    render(
      <AdhocQuestionsProvider>
        <Harness />
      </AdhocQuestionsProvider>,
    )
    await user.click(screen.getByRole('button', { name: 'Add' }))

    const state = JSON.parse(window.localStorage.getItem(ADHOC_QUESTIONS_STORAGE_KEY) ?? '{}')
    const saved = Object.values(state)[0] as { complexity: string }
    expect(saved.complexity).toBe('Unknown')
  })
})

describe('adhocQuestionToTopic', () => {
  it('maps an ad-hoc question onto the shared Topic shape, keyed under the custom pseudo-menu', () => {
    const topic = adhocQuestionToTopic({
      id: 'adhoc-1',
      title: 'Explain the event loop',
      detail: 'Covers microtasks vs macrotasks.',
      complexity: 'Medium',
      createdAt: 0,
    })
    expect(topic).toEqual({
      id: 'adhoc-1',
      slug: 'adhoc-1',
      title: 'Explain the event loop',
      markdownPath: '',
      complexity: 'Medium',
    })
    expect(ADHOC_MENU_ID).toBe('custom')
  })
})
