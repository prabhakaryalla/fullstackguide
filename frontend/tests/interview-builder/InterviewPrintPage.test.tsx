import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import InterviewPrintPage from '../../src/features/interview-builder/pages/InterviewPrintPage'
import InterviewNotesProvider from '../../src/features/interview-notes/context/InterviewNotesContext'
import AdhocQuestionsProvider from '../../src/features/adhoc-questions/context/AdhocQuestionsContext'
import CandidateInfoProvider from '../../src/features/interview-builder/context/CandidateInfoContext'

function SessionStub() {
  const location = useLocation()
  return <div data-testid="session-page">{location.search}</div>
}

function renderAt(initialPath: string) {
  return render(
    <AdhocQuestionsProvider>
      <InterviewNotesProvider>
        <CandidateInfoProvider>
          <MemoryRouter initialEntries={[initialPath]}>
            <Routes>
              <Route path="/interview-builder/print" element={<InterviewPrintPage />} />
              <Route path="/interview-builder/session" element={<SessionStub />} />
            </Routes>
          </MemoryRouter>
        </CandidateInfoProvider>
      </InterviewNotesProvider>
    </AdhocQuestionsProvider>,
  )
}

const MIXED_ITEMS = 'csharp-programs:csharp-access-modifiers-output-questions,azure:azure-service-bus'

describe('InterviewPrintPage', () => {
  afterEach(() => {
    window.localStorage.clear()
    vi.restoreAllMocks()
  })

  it('shows an unavailable state when no items resolve to real topics', () => {
    renderAt('/interview-builder/print?menus=csharp-programs&items=not-a-real-slug')
    expect(screen.getByText(/session is unavailable or has expired/i)).toBeInTheDocument()
  })

  it('renders a numbered question sheet with menu labels and complexity', () => {
    renderAt(`/interview-builder/print?menus=csharp-programs,azure&items=${MIXED_ITEMS}`)

    expect(screen.getByRole('heading', { name: 'Interview Question Sheet' })).toBeInTheDocument()
    expect(screen.getByText(/C# Programs, Azure/)).toBeInTheDocument()
    expect(screen.getByText('1. Access Modifiers')).toBeInTheDocument()
    expect(screen.getByText('2. Azure Service Bus')).toBeInTheDocument()
  })

  it('shows blank ruled lines for a question with no interviewer notes yet', () => {
    renderAt(`/interview-builder/print?menus=csharp-programs&items=csharp-programs:csharp-access-modifiers-output-questions`)
    expect(screen.getByTestId('blank-note-lines')).toBeInTheDocument()
    expect(screen.queryByText(/Rating:/)).not.toBeInTheDocument()
  })

  it('shows the existing rating and note instead of blank lines when already captured', () => {
    window.localStorage.setItem(
      'fullstack-guide.interview-run-notes.v1',
      JSON.stringify({ 'test-run/csharp-programs/csharp-access-modifiers-output-questions': { rating: 5, note: 'Excellent' } }),
    )
    renderAt(
      '/interview-builder/print?menus=csharp-programs&items=csharp-programs:csharp-access-modifiers-output-questions&run=test-run',
    )

    expect(screen.getByText('Rating: 5/5')).toBeInTheDocument()
    expect(screen.getByText('Notes: Excellent')).toBeInTheDocument()
  })

  it('clearly marks a skipped question as not asked, instead of blank lines or a rating', () => {
    window.localStorage.setItem(
      'fullstack-guide.interview-run-notes.v1',
      JSON.stringify({
        'test-run/csharp-programs/csharp-access-modifiers-output-questions': { rating: 3, note: '', skipped: true },
      }),
    )
    renderAt(
      '/interview-builder/print?menus=csharp-programs&items=csharp-programs:csharp-access-modifiers-output-questions&run=test-run',
    )

    expect(screen.getByText('Skipped — not asked')).toBeInTheDocument()
    expect(screen.queryByTestId('blank-note-lines')).not.toBeInTheDocument()
    expect(screen.queryByText(/Rating:/)).not.toBeInTheDocument()
  })

  it('calls window.print when the print button is clicked', async () => {
    const user = userEvent.setup()
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {})
    renderAt(`/interview-builder/print?menus=csharp-programs&items=csharp-programs:csharp-access-modifiers-output-questions`)

    await user.click(screen.getByRole('button', { name: /print/i }))
    expect(printSpy).toHaveBeenCalled()
  })

  it('navigates back to the session with the same query', async () => {
    const user = userEvent.setup()
    renderAt(`/interview-builder/print?menus=csharp-programs&items=csharp-programs:csharp-access-modifiers-output-questions`)

    await user.click(screen.getByRole('button', { name: /back to session/i }))
    const sessionPage = await screen.findByTestId('session-page')
    expect(sessionPage.textContent).toContain('menus=csharp-programs')
  })

  it('includes ad-hoc questions in the printed sheet, showing their expected answer', () => {
    window.localStorage.setItem(
      'fullstack-guide.adhoc-questions.v1',
      JSON.stringify({
        'adhoc-1': { id: 'adhoc-1', title: 'What is a deadlock?', detail: 'Two locks waiting on each other.', complexity: 'Medium', createdAt: 0 },
      }),
    )
    renderAt(
      `/interview-builder/print?menus=csharp-programs&items=csharp-programs:csharp-access-modifiers-output-questions&custom=adhoc-1`,
    )

    expect(screen.getByText('1. Access Modifiers')).toBeInTheDocument()
    expect(screen.getByText('2. What is a deadlock?')).toBeInTheDocument()
    expect(screen.getByText('Custom Questions')).toBeInTheDocument()
    expect(screen.getByText(/Expected answer: Two locks waiting on each other\./)).toBeInTheDocument()
  })
})
