import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import InterviewRunPage from '../../src/features/interview-builder/pages/InterviewRunPage'
import InterviewNotesProvider from '../../src/features/interview-notes/context/InterviewNotesContext'
import { INTERVIEW_NOTES_STORAGE_KEY } from '../../src/features/interview-notes/data/interviewNotesStorage'
import AdhocQuestionsProvider from '../../src/features/adhoc-questions/context/AdhocQuestionsContext'
import ActiveInterviewProvider from '../../src/features/interview-builder/context/ActiveInterviewContext'
import { ACTIVE_INTERVIEW_STORAGE_KEY } from '../../src/features/interview-builder/data/activeInterviewStorage'
import CompletedInterviewsProvider from '../../src/features/interview-builder/context/CompletedInterviewsContext'
import { COMPLETED_INTERVIEWS_STORAGE_KEY, buildSessionCompletionKey } from '../../src/features/interview-builder/data/completedInterviewsStorage'
import LastCompletedInterviewProvider from '../../src/features/interview-builder/context/LastCompletedInterviewContext'
import { LAST_COMPLETED_INTERVIEW_STORAGE_KEY } from '../../src/features/interview-builder/data/lastCompletedInterviewStorage'
import CandidateInfoProvider from '../../src/features/interview-builder/context/CandidateInfoContext'
import InterviewHistoryProvider from '../../src/features/interview-builder/context/InterviewHistoryContext'
import { ASKED_TOPICS_STORAGE_KEY } from '../../src/features/interview-notes/data/askedTopicsStorage'

function SessionStub() {
  const location = useLocation()
  return <div data-testid="session-page">{location.search}</div>
}

function BuilderStub() {
  return <div data-testid="builder-page" />
}

function PrintStub() {
  const location = useLocation()
  return <div data-testid="print-page">{location.search}</div>
}

function renderAt(initialPath: string) {
  return render(
    <AdhocQuestionsProvider>
      <InterviewNotesProvider>
        <ActiveInterviewProvider>
          <CompletedInterviewsProvider>
            <LastCompletedInterviewProvider>
              <CandidateInfoProvider>
                <InterviewHistoryProvider>
                  <MemoryRouter initialEntries={[initialPath]}>
                    <Routes>
                      <Route path="/interview-builder" element={<BuilderStub />} />
                      <Route path="/interview-builder/session" element={<SessionStub />} />
                      <Route path="/interview-builder/run" element={<InterviewRunPage />} />
                      <Route path="/interview-builder/print" element={<PrintStub />} />
                    </Routes>
                  </MemoryRouter>
                </InterviewHistoryProvider>
              </CandidateInfoProvider>
            </LastCompletedInterviewProvider>
          </CompletedInterviewsProvider>
        </ActiveInterviewProvider>
      </InterviewNotesProvider>
    </AdhocQuestionsProvider>,
  )
}

const MIXED_ITEMS = 'csharp-programs:csharp-access-modifiers-output-questions,azure:azure-service-bus'

describe('InterviewRunPage', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('shows an unavailable state when no items resolve to real topics', () => {
    renderAt('/interview-builder/run?menus=csharp-programs&items=not-a-real-slug')
    expect(screen.getByText(/session is unavailable or has expired/i)).toBeInTheDocument()
  })

  it('shows the first question hidden behind a Reveal answer control', () => {
    renderAt(`/interview-builder/run?menus=csharp-programs,azure&items=${MIXED_ITEMS}`)

    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Access Modifiers' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reveal answer' })).toBeInTheDocument()
    expect(screen.queryByText(/no modifier = internal by default/i)).not.toBeInTheDocument()
  })

  it('reveals the answer content on demand', async () => {
    const user = userEvent.setup()
    renderAt(`/interview-builder/run?menus=csharp-programs,azure&items=${MIXED_ITEMS}`)

    await user.click(screen.getByRole('button', { name: 'Reveal answer' }))
    await waitFor(() => expect(screen.getByText(/no modifier = internal by default/i)).toBeInTheDocument())
  })

  it('lets the interviewer hide the answer again after revealing it', async () => {
    const user = userEvent.setup()
    renderAt(`/interview-builder/run?menus=csharp-programs,azure&items=${MIXED_ITEMS}`)

    await user.click(screen.getByRole('button', { name: 'Reveal answer' }))
    await waitFor(() => expect(screen.getByText(/no modifier = internal by default/i)).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: 'Hide answer' }))
    expect(screen.queryByText(/no modifier = internal by default/i)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reveal answer' })).toBeInTheDocument()
  })

  it('moves to the next question across a different topic area, and back', async () => {
    const user = userEvent.setup()
    renderAt(`/interview-builder/run?menus=csharp-programs,azure&items=${MIXED_ITEMS}`)

    await user.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByRole('heading', { name: 'Azure Service Bus' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reveal answer' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Previous' }))
    expect(screen.getByRole('heading', { name: 'Access Modifiers' })).toBeInTheDocument()
  })

  it('asks questions topic-area by topic-area, regrouping them even if the session items were interleaved', async () => {
    const user = userEvent.setup()
    // Scrambled on purpose: an azure item is listed before the csharp-programs
    // one, even though `menus=csharp-programs,azure` puts C# Programs first.
    const scrambledItems =
      'azure:azure-service-bus,csharp-programs:csharp-access-modifiers-output-questions,azure:azure-ddos-protection'
    renderAt(`/interview-builder/run?menus=csharp-programs,azure&items=${scrambledItems}`)

    expect(screen.getByRole('heading', { name: 'Access Modifiers' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByRole('heading', { name: 'Azure Service Bus' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByRole('heading', { name: 'DDoS Protection' })).toBeInTheDocument()
  })

  it('lets the interviewer jump directly to another topic area', async () => {
    const user = userEvent.setup()
    const scrambledItems =
      'azure:azure-service-bus,csharp-programs:csharp-access-modifiers-output-questions,azure:azure-ddos-protection'
    renderAt(`/interview-builder/run?menus=csharp-programs,azure&items=${scrambledItems}`)

    expect(screen.getByRole('heading', { name: 'Access Modifiers' })).toBeInTheDocument()

    await user.click(screen.getByRole('combobox', { name: /jump to topic area/i }))
    await user.click(screen.getByRole('option', { name: 'Azure' }))

    expect(screen.getByRole('heading', { name: 'Azure Service Bus' })).toBeInTheDocument()
  })

  it('hides the jump-to-area control when the session only spans one topic area', () => {
    renderAt('/interview-builder/run?menus=csharp-programs&items=csharp-programs:csharp-access-modifiers-output-questions')
    expect(screen.queryByRole('combobox', { name: /jump to topic area/i })).not.toBeInTheDocument()
  })

  it('shows an interview-complete screen after marking the last question complete', async () => {
    const user = userEvent.setup()
    renderAt('/interview-builder/run?menus=csharp-programs&items=csharp-programs:csharp-access-modifiers-output-questions')

    // A single-question session starts already on its last question — Next
    // is disabled so it can never be the thing that completes the interview.
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()

    await user.click(screen.getByRole('button', { name: 'Mark complete' }))
    expect(screen.getByText(/gone through every question/i)).toBeInTheDocument()

    // The completion reminder dialog opens on top — dismiss it before
    // asserting on the (aria-hidden while it's open) background buttons.
    await user.click(screen.getByRole('button', { name: 'Not now' }))
    await waitFor(() => expect(screen.getByRole('button', { name: 'Back to session' })).toBeInTheDocument())
    expect(screen.getByRole('button', { name: 'Build another session' })).toBeInTheDocument()

    // Completion is now tracked per-run (a dynamically generated run id, not
    // predictable here) rather than by question-set content alone — look up
    // whichever key was actually written by its content-hash suffix.
    const contentKey = buildSessionCompletionKey('csharp-programs:csharp-access-modifiers-output-questions', [])
    const state = JSON.parse(window.localStorage.getItem(COMPLETED_INTERVIEWS_STORAGE_KEY) ?? '{}')
    const matchingKey = Object.keys(state).find((k) => k.endsWith(`::${contentKey}`))
    expect(matchingKey).toBeDefined()
    expect(state[matchingKey as string]).toBeTypeOf('number')
  })

  it('lets the interviewer finish early with the Mark complete button, without stepping through every question', async () => {
    const user = userEvent.setup()
    renderAt(`/interview-builder/run?menus=csharp-programs,azure&items=${MIXED_ITEMS}`)

    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Mark complete' }))

    expect(screen.getByText(/gone through every question/i)).toBeInTheDocument()
    const contentKey = buildSessionCompletionKey(MIXED_ITEMS, [])
    const state = JSON.parse(window.localStorage.getItem(COMPLETED_INTERVIEWS_STORAGE_KEY) ?? '{}')
    const matchingKey = Object.keys(state).find((k) => k.endsWith(`::${contentKey}`))
    expect(matchingKey).toBeDefined()
    expect(state[matchingKey as string]).toBeTypeOf('number')
  })

  it('disables Next on the last question so an extra click can never complete the interview by accident', async () => {
    const user = userEvent.setup()
    renderAt(`/interview-builder/run?menus=csharp-programs,azure&items=${MIXED_ITEMS}`)

    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled()

    await user.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByText('Question 2 of 2')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
    expect(screen.queryByText(/gone through every question/i)).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Mark complete' }))
    expect(screen.getByText(/gone through every question/i)).toBeInTheDocument()
  })

  it('warns that notes only live in this browser as soon as the interview completes, offering Print / Export', async () => {
    const user = userEvent.setup()
    renderAt('/interview-builder/run?menus=csharp-programs&items=csharp-programs:csharp-access-modifiers-output-questions')

    await user.click(screen.getByRole('button', { name: 'Mark complete' }))

    expect(screen.getByRole('heading', { name: 'Interview complete' })).toBeInTheDocument()
    expect(screen.getByText(/only live in this browser/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Not now' }))
    await waitFor(() => expect(screen.queryByRole('heading', { name: 'Interview complete' })).not.toBeInTheDocument())
  })

  it('lets the interviewer print/export straight from the completion reminder', async () => {
    const user = userEvent.setup()
    renderAt('/interview-builder/run?menus=csharp-programs&items=csharp-programs:csharp-access-modifiers-output-questions')

    await user.click(screen.getByRole('button', { name: 'Mark complete' }))
    const dialog = screen.getByRole('dialog', { name: 'Interview complete' })
    await user.click(within(dialog).getByRole('button', { name: 'Print / Export' }))

    const printPage = await screen.findByTestId('print-page')
    expect(new URLSearchParams(printPage.textContent ?? '').get('items')).toBe(
      'csharp-programs:csharp-access-modifiers-output-questions',
    )
  })

  it('also offers Print / Export directly on the complete screen after dismissing the reminder', async () => {
    const user = userEvent.setup()
    renderAt('/interview-builder/run?menus=csharp-programs&items=csharp-programs:csharp-access-modifiers-output-questions')

    await user.click(screen.getByRole('button', { name: 'Mark complete' }))
    await user.click(screen.getByRole('button', { name: 'Not now' }))

    // The dialog's close transition briefly keeps the rest of the page aria-hidden.
    await waitFor(() => expect(screen.getByRole('button', { name: 'Print / Export' })).toBeInTheDocument())
    await user.click(screen.getByRole('button', { name: 'Print / Export' }))
    const printPage = await screen.findByTestId('print-page')
    expect(new URLSearchParams(printPage.textContent ?? '').get('items')).toBe(
      'csharp-programs:csharp-access-modifiers-output-questions',
    )
  })

  it('exits back to the session page with the same query, whether mid-interview or complete', async () => {
    const user = userEvent.setup()
    renderAt(`/interview-builder/run?menus=csharp-programs,azure&items=${MIXED_ITEMS}&easy=0&medium=1&hard=1`)

    await user.click(screen.getByRole('button', { name: 'Exit' }))
    const sessionPage = await screen.findByTestId('session-page')
    const params = new URLSearchParams(sessionPage.textContent ?? '')
    expect(params.get('menus')).toBe('csharp-programs,azure')
    expect(params.get('items')).toBe(MIXED_ITEMS)
  })

  it('rates the current question and persists the rating separately per topic', async () => {
    const user = userEvent.setup()
    renderAt(`/interview-builder/run?menus=csharp-programs,azure&items=${MIXED_ITEMS}&run=test-run`)

    // MUI Rating's radios don't resolve their value correctly via userEvent.click in jsdom — use fireEvent instead.
    fireEvent.click(screen.getByRole('radio', { name: '4 Stars' }))
    expect(screen.getByText('4/5')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.queryByText('4/5')).not.toBeInTheDocument()

    const state = JSON.parse(window.localStorage.getItem(INTERVIEW_NOTES_STORAGE_KEY) ?? '{}')
    expect(state['test-run/csharp-programs/csharp-access-modifiers-output-questions'].rating).toBe(4)
  })

  it('writes and persists interviewer notes for the current question', async () => {
    const user = userEvent.setup()
    renderAt(`/interview-builder/run?menus=csharp-programs,azure&items=${MIXED_ITEMS}&run=test-run`)

    await user.type(screen.getByLabelText('Interviewer notes'), 'Strong answer')

    const state = JSON.parse(window.localStorage.getItem(INTERVIEW_NOTES_STORAGE_KEY) ?? '{}')
    expect(state['test-run/csharp-programs/csharp-access-modifiers-output-questions'].note).toBe('Strong answer')
  })

  it('lets the interviewer mark a question as skipped, hiding the rating/notes controls, and undo it', async () => {
    const user = userEvent.setup()
    renderAt(`/interview-builder/run?menus=csharp-programs,azure&items=${MIXED_ITEMS}&run=test-run`)

    await user.click(screen.getByRole('button', { name: 'Skip question' }))
    expect(screen.getByText(/marked as skipped/i)).toBeInTheDocument()
    expect(screen.queryByLabelText('Interviewer notes')).not.toBeInTheDocument()

    const state = JSON.parse(window.localStorage.getItem(INTERVIEW_NOTES_STORAGE_KEY) ?? '{}')
    expect(state['test-run/csharp-programs/csharp-access-modifiers-output-questions'].skipped).toBe(true)

    await user.click(screen.getByRole('button', { name: 'Ask it after all' }))
    expect(screen.queryByText(/marked as skipped/i)).not.toBeInTheDocument()
    expect(screen.getByLabelText('Interviewer notes')).toBeInTheDocument()
  })

  it('keeps ratings for the same topic independent across two different interview runs', async () => {
    const { unmount } = renderAt(`/interview-builder/run?menus=csharp-programs,azure&items=${MIXED_ITEMS}&run=run-a`)
    fireEvent.click(screen.getByRole('radio', { name: '4 Stars' }))
    expect(screen.getByText('4/5')).toBeInTheDocument()
    unmount()

    renderAt(`/interview-builder/run?menus=csharp-programs,azure&items=${MIXED_ITEMS}&run=run-b`)
    // A different run touching the exact same first question starts unrated, not showing run-a's 4 stars.
    expect(screen.queryByText('4/5')).not.toBeInTheDocument()

    const state = JSON.parse(window.localStorage.getItem(INTERVIEW_NOTES_STORAGE_KEY) ?? '{}')
    expect(state['run-a/csharp-programs/csharp-access-modifiers-output-questions'].rating).toBe(4)
    expect(state['run-b/csharp-programs/csharp-access-modifiers-output-questions']).toBeUndefined()
  })

  it('marks every question in the session as asked as soon as the run starts', async () => {
    renderAt(`/interview-builder/run?menus=csharp-programs,azure&items=${MIXED_ITEMS}`)

    await waitFor(() => {
      const state = JSON.parse(window.localStorage.getItem(ASKED_TOPICS_STORAGE_KEY) ?? '{}')
      expect(state['csharp-programs/csharp-access-modifiers-output-questions']).toBeTypeOf('number')
      expect(state['azure/azure-service-bus']).toBeTypeOf('number')
    })
  })

  it('keeps a resume pointer in storage that tracks the current question, and clears it on completion', async () => {
    const user = userEvent.setup()
    renderAt('/interview-builder/run?menus=csharp-programs&items=csharp-programs:csharp-access-modifiers-output-questions')

    await waitFor(() => {
      const state = JSON.parse(window.localStorage.getItem(ACTIVE_INTERVIEW_STORAGE_KEY) ?? 'null')
      expect(state?.currentIndex).toBe(0)
      expect(state?.totalQuestions).toBe(1)
    })

    await user.click(screen.getByRole('button', { name: 'Mark complete' }))
    expect(screen.getByText(/gone through every question/i)).toBeInTheDocument()
    expect(window.localStorage.getItem(ACTIVE_INTERVIEW_STORAGE_KEY)).toBeNull()
  })

  it('remembers the completed run so it can be found again later, e.g. after closing the tab', async () => {
    const user = userEvent.setup()
    renderAt(
      `/interview-builder/run?menus=csharp-programs,azure&items=${MIXED_ITEMS}&run=test-run`,
    )

    await user.click(screen.getByRole('button', { name: 'Mark complete' }))
    expect(screen.getByText(/gone through every question/i)).toBeInTheDocument()

    const state = JSON.parse(window.localStorage.getItem(LAST_COMPLETED_INTERVIEW_STORAGE_KEY) ?? 'null')
    expect(state?.totalQuestions).toBe(2)
    const params = new URLSearchParams(state?.search ?? '')
    expect(params.get('items')).toBe(MIXED_ITEMS)
    expect(params.get('run')).toBe('test-run')
    expect(params.get('at')).toBeNull()
  })

  it('lets the interviewer add an ad-hoc question mid-interview and jumps to it right away', async () => {
    const user = userEvent.setup()
    renderAt(`/interview-builder/run?menus=csharp-programs,azure&items=${MIXED_ITEMS}`)

    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '+ Add question' }))
    await user.type(screen.getByLabelText('Ad-hoc question title'), 'What is a deadlock?')
    await user.type(screen.getByLabelText('Ad-hoc question notes'), 'Two locks waiting on each other forever.')
    await user.click(screen.getByRole('button', { name: 'Ask now' }))

    await waitFor(() => expect(screen.getByText('Question 3 of 3')).toBeInTheDocument())
    await waitFor(() => expect(screen.getByRole('heading', { name: 'What is a deadlock?' })).toBeInTheDocument())
    expect(screen.getAllByText('Custom Questions').length).toBeGreaterThan(0)

    await user.click(screen.getByRole('button', { name: 'Reveal answer' }))
    expect(screen.getByText('Two locks waiting on each other forever.')).toBeInTheDocument()
  })
})
