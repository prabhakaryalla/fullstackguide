import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation, useParams } from 'react-router-dom'
import InterviewSessionPage from '../../src/features/interview-builder/pages/InterviewSessionPage'
import AdhocQuestionsProvider from '../../src/features/adhoc-questions/context/AdhocQuestionsContext'
import { ADHOC_QUESTIONS_STORAGE_KEY } from '../../src/features/adhoc-questions/data/adhocQuestionsStorage'
import InterviewNotesProvider from '../../src/features/interview-notes/context/InterviewNotesContext'
import CompletedInterviewsProvider from '../../src/features/interview-builder/context/CompletedInterviewsContext'
import { COMPLETED_INTERVIEWS_STORAGE_KEY, buildRunCompletionKey } from '../../src/features/interview-builder/data/completedInterviewsStorage'
import ActiveInterviewProvider from '../../src/features/interview-builder/context/ActiveInterviewContext'
import { ACTIVE_INTERVIEW_STORAGE_KEY } from '../../src/features/interview-builder/data/activeInterviewStorage'
import CandidateInfoProvider from '../../src/features/interview-builder/context/CandidateInfoContext'

vi.mock('../../src/features/tags/data/getTopicTagsIndex', () => ({
  getTopicTagsIndex: () =>
    Promise.resolve(new Map([['csharp-access-modifiers-output-questions', ['testing']]])),
}))

function TopicStub() {
  const { topicSlug } = useParams<{ topicSlug: string }>()
  return <div data-testid="topic-page">{topicSlug}</div>
}

function BuilderStub() {
  const location = useLocation()
  return <div data-testid="builder-page">{location.search}</div>
}

function RunStub() {
  const location = useLocation()
  return <div data-testid="run-page">{location.search}</div>
}

function renderAt(initialPath: string) {
  return render(
    <AdhocQuestionsProvider>
      <InterviewNotesProvider>
        <CompletedInterviewsProvider>
          <ActiveInterviewProvider>
            <CandidateInfoProvider>
              <MemoryRouter initialEntries={[initialPath]}>
                <Routes>
                  <Route path="/interview-builder" element={<BuilderStub />} />
                  <Route path="/interview-builder/session" element={<InterviewSessionPage />} />
                  <Route path="/interview-builder/run" element={<RunStub />} />
                  <Route path="/:menuSlug/:topicSlug" element={<TopicStub />} />
                </Routes>
              </MemoryRouter>
            </CandidateInfoProvider>
          </ActiveInterviewProvider>
        </CompletedInterviewsProvider>
      </InterviewNotesProvider>
    </AdhocQuestionsProvider>,
  )
}

const ITEMS =
  'csharp-programs:csharp-access-modifiers-output-questions,csharp-programs:csharp-catch-block-ordering,csharp-programs:csharp-finally-execution-with-unhandled-exceptions'

describe('InterviewSessionPage', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    window.localStorage.clear()
  })

  it('renders the requested topics with menu label and count chips', () => {
    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}&easy=0&medium=3&hard=0`)

    expect(screen.getByRole('heading', { name: 'Interview Session' })).toBeInTheDocument()
    expect(screen.getByText('C# Programs')).toBeInTheDocument()
    expect(screen.getByText('3 questions')).toBeInTheDocument()
    expect(screen.getByText('3 Medium')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Access Modifiers' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Catch Block Ordering' })).toBeInTheDocument()
  })

  it('disables Print / Export and shows no Completed chip before the interview has been conducted', () => {
    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}`)

    expect(screen.getByRole('button', { name: 'Print / Export' })).toBeDisabled()
    expect(screen.queryByText('Completed')).not.toBeInTheDocument()
  })

  it('enables Print / Export and shows a Completed chip once this exact run has been conducted', () => {
    const key = buildRunCompletionKey('test-run', ITEMS, [])
    window.localStorage.setItem(COMPLETED_INTERVIEWS_STORAGE_KEY, JSON.stringify({ [key]: Date.now() }))

    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}&run=test-run`)

    expect(screen.getByRole('button', { name: 'Print / Export' })).toBeEnabled()
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })

  it('does not show a different run of the identical question set as already completed', () => {
    // Regenerating with the same filters can coincidentally reproduce the
    // exact same items (e.g. a tiny available pool) — a completed run under a
    // DIFFERENT run id must never make this fresh run look pre-completed.
    const key = buildRunCompletionKey('some-other-run', ITEMS, [])
    window.localStorage.setItem(COMPLETED_INTERVIEWS_STORAGE_KEY, JSON.stringify({ [key]: Date.now() }))

    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}&run=test-run`)

    expect(screen.getByRole('button', { name: 'Print / Export' })).toBeDisabled()
    expect(screen.queryByText('Completed')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start interview' })).toBeInTheDocument()
  })

  it('starts a fresh run at question 1 when there is no matching in-progress interview', async () => {
    const user = userEvent.setup()
    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}`)

    expect(screen.getByRole('button', { name: 'Start interview' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Start interview' }))

    const runPage = await screen.findByTestId('run-page')
    expect(new URLSearchParams(runPage.textContent ?? '').get('at')).toBeNull()
  })

  it('resumes at the paused question when this exact session is already in progress', async () => {
    const user = userEvent.setup()
    window.localStorage.setItem(
      ACTIVE_INTERVIEW_STORAGE_KEY,
      JSON.stringify({
        search: `menus=csharp-programs&items=${ITEMS}&at=1`,
        currentIndex: 1,
        totalQuestions: 3,
        updatedAt: Date.now(),
      }),
    )
    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}`)

    expect(screen.getByRole('button', { name: 'Resume interview' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Resume interview' }))

    const runPage = await screen.findByTestId('run-page')
    expect(new URLSearchParams(runPage.textContent ?? '').get('at')).toBe('1')
  })

  it('does not offer to resume a different session\'s in-progress interview', () => {
    window.localStorage.setItem(
      ACTIVE_INTERVIEW_STORAGE_KEY,
      JSON.stringify({
        search: 'menus=azure&items=azure:azure-service-bus&at=0',
        currentIndex: 0,
        totalQuestions: 1,
        updatedAt: Date.now(),
      }),
    )
    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}`)

    expect(screen.getByRole('button', { name: 'Start interview' })).toBeInTheDocument()
  })

  it('keeps offering to resume (not restart) after editing the list of an in-progress session', async () => {
    const user = userEvent.setup()
    window.localStorage.setItem(
      ACTIVE_INTERVIEW_STORAGE_KEY,
      JSON.stringify({
        search: `menus=csharp-programs&items=${ITEMS}&run=paused-run&at=1`,
        currentIndex: 1,
        totalQuestions: 3,
        updatedAt: Date.now(),
      }),
    )
    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}`)
    expect(screen.getByRole('button', { name: 'Resume interview' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Remove Access Modifiers from this session' }))

    // Still resumable — the paused run's own stored item list/count follow the edit.
    expect(screen.getByRole('button', { name: 'Resume interview' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Resume interview' }))

    const runPage = await screen.findByTestId('run-page')
    const params = new URLSearchParams(runPage.textContent ?? '')
    expect(params.get('run')).toBe('paused-run')
    expect(params.get('at')).toBe('1')
    expect(params.get('items')?.split(',')).not.toContain('csharp-programs:csharp-access-modifiers-output-questions')

    const state = JSON.parse(window.localStorage.getItem(ACTIVE_INTERVIEW_STORAGE_KEY) ?? 'null')
    expect(state?.totalQuestions).toBe(2)
  })

  it('renders a mixed session spanning multiple topic areas', () => {
    const mixedItems = 'csharp-programs:csharp-access-modifiers-output-questions,javascript-programs:js-implicit-type-coercion-expressions'
    renderAt(`/interview-builder/session?menus=csharp-programs,javascript-programs&items=${mixedItems}`)

    expect(screen.getByRole('heading', { name: 'Interview Session' })).toBeInTheDocument()
    expect(screen.getByText('C# Programs')).toBeInTheDocument()
    expect(screen.getByText('JavaScript Programs')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Access Modifiers' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Implicit Type Coercion in JavaScript Expressions' })).toBeInTheDocument()
  })

  it('shows an unavailable state when no items resolve to real topics', () => {
    renderAt('/interview-builder/session?menus=csharp-programs&items=csharp-programs:not-a-real-slug')

    expect(screen.getByText(/session is unavailable or has expired/i)).toBeInTheDocument()
  })

  it('navigates back to the builder', async () => {
    const user = userEvent.setup()
    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}`)

    await user.click(screen.getByRole('button', { name: 'Back to builder' }))
    expect(screen.getByTestId('builder-page')).toBeInTheDocument()
  })

  it('navigates to the owning menu topic page when a question is clicked', async () => {
    const user = userEvent.setup()
    const mixedItems = 'csharp-programs:csharp-access-modifiers-output-questions,javascript-programs:js-implicit-type-coercion-expressions'
    renderAt(`/interview-builder/session?menus=csharp-programs,javascript-programs&items=${mixedItems}`)

    await user.click(screen.getByRole('heading', { name: 'Implicit Type Coercion in JavaScript Expressions' }))
    expect(await screen.findByTestId('topic-page')).toHaveTextContent('js-implicit-type-coercion-expressions')
  })

  it('copies the shareable link to the clipboard', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}`)

    await user.click(screen.getByRole('button', { name: 'Copy shareable link' }))

    expect(writeText).toHaveBeenCalledWith(window.location.href)
    expect(await screen.findByRole('button', { name: 'Link copied!' })).toBeInTheDocument()
  })

  it('regenerates by sending the interviewer to the Builder, pre-filled with this session\'s areas/counts', async () => {
    const user = userEvent.setup()
    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}&easy=0&medium=3&hard=0`)

    await user.click(screen.getByRole('button', { name: 'Regenerate' }))

    const builderPage = await screen.findByTestId('builder-page')
    const params = new URLSearchParams(builderPage.textContent ?? '')
    expect(params.get('menus')).toBe('csharp-programs')
    expect(params.get('easy')).toBe('0')
    expect(params.get('medium')).toBe('3')
    expect(params.get('hard')).toBe('0')
  })

  it('carries ad-hoc questions along when regenerating via the Builder', async () => {
    const user = userEvent.setup()
    window.localStorage.setItem(
      ADHOC_QUESTIONS_STORAGE_KEY,
      JSON.stringify({
        'adhoc-1': { id: 'adhoc-1', title: 'What is a race condition?', detail: '', complexity: 'Unknown', createdAt: 0 },
      }),
    )
    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}&custom=adhoc-1`)

    await user.click(screen.getByRole('button', { name: 'Regenerate' }))

    const builderPage = await screen.findByTestId('builder-page')
    const params = new URLSearchParams(builderPage.textContent ?? '')
    expect(params.get('custom')).toBe('adhoc-1')
  })

  it('shows ad-hoc questions in their own section, included in the total count', () => {
    window.localStorage.setItem(
      ADHOC_QUESTIONS_STORAGE_KEY,
      JSON.stringify({
        'adhoc-1': { id: 'adhoc-1', title: 'What is a race condition?', detail: 'Two threads, shared state.', complexity: 'Unknown', createdAt: 0 },
      }),
    )
    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}&custom=adhoc-1`)

    expect(screen.getByText('4 questions')).toBeInTheDocument()
    expect(screen.getByText('Custom Questions')).toBeInTheDocument()
    expect(screen.getByText('What is a race condition?')).toBeInTheDocument()
    expect(screen.getByText('Two threads, shared state.')).toBeInTheDocument()
  })

  it('warns when a shared link references custom questions this browser never saved', () => {
    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}&custom=adhoc-missing-1,adhoc-missing-2`)

    expect(screen.getByText(/2 custom questions from this link aren't available in this browser/i)).toBeInTheDocument()
    // The 2 unresolved ids are excluded from the visible count entirely.
    expect(screen.getByText('3 questions')).toBeInTheDocument()
  })

  it('is not "unavailable" for a session made up entirely of ad-hoc questions', () => {
    window.localStorage.setItem(
      ADHOC_QUESTIONS_STORAGE_KEY,
      JSON.stringify({
        'adhoc-1': { id: 'adhoc-1', title: 'Explain CAP theorem', detail: '', complexity: 'Unknown', createdAt: 0 },
      }),
    )
    renderAt('/interview-builder/session?custom=adhoc-1')

    expect(screen.queryByText(/session is unavailable or has expired/i)).not.toBeInTheDocument()
    expect(screen.getByText('Explain CAP theorem')).toBeInTheDocument()
  })

  it('lets the interviewer remove a topic from the session list', async () => {
    const user = userEvent.setup()
    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}&easy=0&medium=3&hard=0`)

    expect(screen.getByRole('heading', { name: 'Access Modifiers' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Remove Access Modifiers from this session' }))

    expect(screen.queryByRole('heading', { name: 'Access Modifiers' })).not.toBeInTheDocument()
    expect(screen.getByText('2 questions')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Catch Block Ordering' })).toBeInTheDocument()
  })

  it('lets the interviewer remove a custom ad-hoc question from the session list', async () => {
    const user = userEvent.setup()
    window.localStorage.setItem(
      ADHOC_QUESTIONS_STORAGE_KEY,
      JSON.stringify({
        'adhoc-1': { id: 'adhoc-1', title: 'What is a race condition?', detail: '', complexity: 'Unknown', createdAt: 0 },
      }),
    )
    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}&custom=adhoc-1`)

    expect(screen.getByText('What is a race condition?')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Remove What is a race condition?' }))

    expect(screen.queryByText('What is a race condition?')).not.toBeInTheDocument()
    expect(screen.getByText('3 questions')).toBeInTheDocument()
  })

  it('lets the interviewer add an ad-hoc question straight from Session Review', async () => {
    const user = userEvent.setup()
    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}`)

    await user.click(screen.getByRole('button', { name: '+ Add question' }))
    await user.click(screen.getByRole('button', { name: 'Custom question' }))
    await user.type(screen.getByLabelText('Ad-hoc question title'), 'What is a deadlock?')
    await user.click(screen.getByRole('button', { name: 'Add to session' }))

    expect(screen.getByText('What is a deadlock?')).toBeInTheDocument()
    expect(screen.getByText('4 questions')).toBeInTheDocument()
  })

  it('lets the interviewer add an existing topic from a different topic area straight from Session Review', async () => {
    const user = userEvent.setup()
    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}`)

    await user.click(screen.getByRole('button', { name: '+ Add question' }))
    await user.click(screen.getByRole('combobox', { name: 'Topic area' }))
    await user.click(screen.getByRole('option', { name: 'Azure' }))
    await user.type(screen.getByRole('textbox', { name: 'Search topics' }), 'Service Bus')
    await user.click(screen.getByRole('checkbox', { name: 'Select Azure Service Bus' }))
    await user.click(screen.getByRole('button', { name: 'Add 1 selected' }))

    // The dialog's close transition briefly keeps the rest of the page aria-hidden.
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Azure Service Bus' })).toBeInTheDocument())
    expect(screen.getByText('4 questions')).toBeInTheDocument()
    // The new topic's own menu (Azure) wasn't part of the original session —
    // confirms `menus` picked it up too, not just `items`.
    expect(screen.getByRole('heading', { name: 'Interview Session' })).toBeInTheDocument()
    expect(screen.getByText('C# Programs')).toBeInTheDocument()
    expect(screen.getByText('Azure')).toBeInTheDocument()
  })

  it('forgets a search/selection that was never confirmed once the add-question dialog is closed', async () => {
    const user = userEvent.setup()
    renderAt(`/interview-builder/session?menus=csharp-programs&items=${ITEMS}`)

    await user.click(screen.getByRole('button', { name: '+ Add question' }))
    await user.click(screen.getByRole('combobox', { name: 'Topic area' }))
    await user.click(screen.getByRole('option', { name: 'Azure' }))
    await user.type(screen.getByRole('textbox', { name: 'Search topics' }), 'Service Bus')
    await user.click(screen.getByRole('checkbox', { name: 'Select Azure Service Bus' }))
    // Cancel instead of confirming — nothing should actually be added.
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(screen.getByText('3 questions')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '+ Add question' }))
    expect(screen.getByRole('combobox', { name: 'Topic area' })).toHaveTextContent('All areas')
    expect(screen.queryByRole('textbox', { name: 'Search topics' })).toHaveValue('')
    expect(screen.queryByRole('checkbox', { name: 'Select Azure Service Bus' })).not.toBeInTheDocument()
  })
})
