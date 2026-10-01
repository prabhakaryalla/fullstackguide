import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import InterviewBuilderPage from '../../src/features/interview-builder/pages/InterviewBuilderPage'
import InterviewNotesProvider from '../../src/features/interview-notes/context/InterviewNotesContext'
import AdhocQuestionsProvider from '../../src/features/adhoc-questions/context/AdhocQuestionsContext'
import LastCompletedInterviewProvider from '../../src/features/interview-builder/context/LastCompletedInterviewContext'
import InterviewHistoryProvider from '../../src/features/interview-builder/context/InterviewHistoryContext'
import { LAST_COMPLETED_INTERVIEW_STORAGE_KEY } from '../../src/features/interview-builder/data/lastCompletedInterviewStorage'
import { getSortedMenuItems } from '../../src/features/landing/data/getSortedMenuItems'
import { getMenuTopicSource } from '../../src/features/main/data/getMenuTopicSource'

const allMenuItems = getSortedMenuItems().filter(
  (item) => item.id !== 'leet-code' && getMenuTopicSource(item.id).length > 0,
)

vi.mock('../../src/features/tags/data/getTopicTagsIndex', () => ({
  getTopicTagsIndex: () => Promise.resolve(new Map()),
}))

function SessionStub() {
  const location = useLocation()
  return <div data-testid="session-page">{location.search}</div>
}

function RunStub() {
  const location = useLocation()
  return <div data-testid="run-page">{location.search}</div>
}

function renderPage() {
  return render(
    <AdhocQuestionsProvider>
      <InterviewNotesProvider>
        <LastCompletedInterviewProvider>
          <InterviewHistoryProvider>
            <MemoryRouter initialEntries={['/interview-builder']}>
              <Routes>
                <Route path="/interview-builder" element={<InterviewBuilderPage />} />
                <Route path="/interview-builder/session" element={<SessionStub />} />
                <Route path="/interview-builder/run" element={<RunStub />} />
                <Route path="/interview-builder/history" element={<div data-testid="history-page" />} />
              </Routes>
            </MemoryRouter>
          </InterviewHistoryProvider>
        </LastCompletedInterviewProvider>
      </InterviewNotesProvider>
    </AdhocQuestionsProvider>,
  )
}

async function selectOnlyMenus(user: ReturnType<typeof userEvent.setup>, labels: string[]) {
  await user.click(screen.getByRole('combobox', { name: /topic areas/i }))
  // Add desired selections first, then remove undesired ones — the component
  // refuses to let the selection go empty, so removing-before-adding can be a
  // no-op if the currently selected item is the only one checked.
  for (const shouldBeSelected of [true, false]) {
    for (const option of screen.getAllByRole('option')) {
      // Skip the "Select all"/"Clear all" meta-option — it isn't a real topic area.
      if (option.textContent === 'Select all' || option.textContent === 'Clear all') {
        continue
      }
      const checkbox = within(option).getByRole('checkbox') as HTMLInputElement
      const wantsSelected = labels.some((label) => option.textContent?.includes(label))
      if (wantsSelected === shouldBeSelected && checkbox.checked !== shouldBeSelected) {
        await user.click(option)
      }
    }
  }
  await user.keyboard('{Escape}')
}

// Manual selection is the default mode — tests that exercise the random-mix
// counts UI need to switch into it explicitly first.
async function switchToRandomMode(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: 'Random selection' }))
}

describe('InterviewBuilderPage', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    window.localStorage.clear()
  })

  it('renders the builder form with a Generate session action', async () => {
    const user = userEvent.setup()
    renderPage()
    await switchToRandomMode(user)
    expect(screen.getByRole('heading', { name: 'Build an Interview Session' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Generate session' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start interview' })).toBeInTheDocument()
    // Let the mocked tag-index promise settle so React doesn't warn about an unwrapped state update.
    await waitFor(() => expect(screen.getByLabelText('Easy questions')).toBeInTheDocument())
  })

  it('lets the interviewer skip the session-review page and jump straight into Live Interview', async () => {
    const user = userEvent.setup()
    renderPage()
    await switchToRandomMode(user)

    await selectOnlyMenus(user, ['C# Programs'])
    await waitFor(() => expect(screen.getByLabelText('Easy questions')).not.toHaveValue(0))

    await user.click(screen.getByRole('button', { name: 'Start interview' }))

    const runPage = await screen.findByTestId('run-page')
    const params = new URLSearchParams(runPage.textContent ?? '')
    expect(params.get('menus')).toBe('csharp-programs')
    expect(params.get('items')?.split(',').length).toBeGreaterThan(0)
  })

  it('shows available-count helper text that updates when the topic areas change', async () => {
    const user = userEvent.setup()
    renderPage()
    await switchToRandomMode(user)

    await selectOnlyMenus(user, ['C# Programs'])

    await waitFor(() => expect(screen.getByLabelText('Easy questions')).not.toHaveValue(0))
  })

  it('supports selecting multiple topic areas at once, combining their available counts', async () => {
    const user = userEvent.setup()
    renderPage()
    await switchToRandomMode(user)

    await selectOnlyMenus(user, ['C# Programs'])
    await waitFor(() => expect(screen.getByLabelText('Medium questions')).not.toHaveValue(0))
    const singleMenuAvailable = Number(screen.getByLabelText('Medium questions').getAttribute('max'))

    await selectOnlyMenus(user, ['C# Programs', 'JavaScript Programs'])
    await waitFor(() => {
      const combinedAvailable = Number(screen.getByLabelText('Medium questions').getAttribute('max'))
      expect(combinedAvailable).toBeGreaterThan(singleMenuAvailable)
    })
  })

  it('disables Generate session when every requested count is zero', async () => {
    const user = userEvent.setup()
    renderPage()
    await switchToRandomMode(user)

    await selectOnlyMenus(user, ['C# Programs'])
    await waitFor(() => expect(screen.getByLabelText('Easy questions')).not.toHaveValue(0))

    for (const label of ['Easy questions', 'Medium questions', 'Hard questions']) {
      await user.clear(screen.getByLabelText(label))
    }

    expect(screen.getByRole('button', { name: 'Generate session' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Start interview' })).toBeDisabled()
  })

  it('generates a session and navigates with the requested counts and matching topic items', async () => {
    const user = userEvent.setup()
    renderPage()
    await switchToRandomMode(user)

    await selectOnlyMenus(user, ['C# Programs'])
    await waitFor(() => expect(screen.getByLabelText('Easy questions')).not.toHaveValue(0))

    await user.clear(screen.getByLabelText('Easy questions'))
    await user.type(screen.getByLabelText('Easy questions'), '2')
    await user.clear(screen.getByLabelText('Medium questions'))
    await user.type(screen.getByLabelText('Medium questions'), '1')
    await user.clear(screen.getByLabelText('Hard questions'))
    await user.type(screen.getByLabelText('Hard questions'), '1')

    await user.click(screen.getByRole('button', { name: 'Generate session' }))

    const sessionPage = await screen.findByTestId('session-page')
    const params = new URLSearchParams(sessionPage.textContent ?? '')
    expect(params.get('menus')).toBe('csharp-programs')
    expect(params.get('easy')).toBe('2')
    expect(params.get('medium')).toBe('1')
    expect(params.get('hard')).toBe('1')
    const items = params.get('items')?.split(',') ?? []
    expect(items).toHaveLength(4)
    expect(items.every((item) => item.startsWith('csharp-programs:'))).toBe(true)
    // Uniquely identifies this occurrence so ratings/notes don't bleed into a later session.
    expect(params.get('run')).toBeTruthy()
  })

  it('lets the interviewer pick specific questions instead of a random mix', async () => {
    const user = userEvent.setup()
    renderPage()
    await switchToRandomMode(user)

    await selectOnlyMenus(user, ['C# Programs'])
    await waitFor(() => expect(screen.getByLabelText('Easy questions')).not.toHaveValue(0))

    await user.click(screen.getByRole('button', { name: 'Manual selection' }))

    // Random-mix inputs are gone; a checkbox list of the filtered pool appears instead.
    expect(screen.queryByLabelText('Easy questions')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Generate session' })).toBeDisabled()

    await user.click(screen.getByRole('checkbox', { name: 'Select Access Modifiers' }))
    await user.click(screen.getByRole('checkbox', { name: 'Select Catch Block Ordering' }))
    expect(screen.getByText('2 of', { exact: false })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Generate session' }))

    const sessionPage = await screen.findByTestId('session-page')
    const params = new URLSearchParams(sessionPage.textContent ?? '')
    const items = params.get('items')?.split(',') ?? []
    expect(items).toHaveLength(2)
    expect(items).toContain('csharp-programs:csharp-access-modifiers-output-questions')
    expect(items).toContain('csharp-programs:csharp-catch-block-ordering')
  })

  it('supports selecting and clearing all questions at once in manual mode', async () => {
    const user = userEvent.setup()
    renderPage()

    await selectOnlyMenus(user, ['C# Programs'])
    await waitFor(() => expect(screen.getByRole('checkbox', { name: 'Select Access Modifiers' })).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: 'Select all questions' }))
    expect(screen.getByRole('button', { name: 'Generate session' })).not.toBeDisabled()

    await user.click(screen.getByRole('button', { name: 'Clear questions' }))
    expect(screen.getByRole('button', { name: 'Generate session' })).toBeDisabled()
  })

  it('narrows the manual picker list by search text', async () => {
    const user = userEvent.setup()
    renderPage()

    await selectOnlyMenus(user, ['C# Programs'])
    await waitFor(() => expect(screen.getByRole('checkbox', { name: 'Select Access Modifiers' })).toBeInTheDocument())

    expect(screen.getByRole('checkbox', { name: 'Select Access Modifiers' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Select Catch Block Ordering' })).toBeInTheDocument()

    await user.type(screen.getByLabelText('Search topics'), 'Access Modifiers')

    expect(screen.getByRole('checkbox', { name: 'Select Access Modifiers' })).toBeInTheDocument()
    expect(screen.queryByRole('checkbox', { name: 'Select Catch Block Ordering' })).not.toBeInTheDocument()
  })

  it('lets the interviewer step through each topic area one at a time, keeping picks from earlier areas', async () => {
    const user = userEvent.setup()
    renderPage()

    await selectOnlyMenus(user, ['C# Programs', 'JavaScript Programs'])
    await waitFor(() => expect(screen.getByText('Area 1 of 2: C# Programs')).toBeInTheDocument())

    expect(screen.getByText('Area 1 of 2: C# Programs')).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Select Access Modifiers' })).toBeInTheDocument()
    await user.click(screen.getByRole('checkbox', { name: 'Select Access Modifiers' }))
    expect(screen.getByText(/1 selected overall/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Next area →' }))

    expect(screen.getByText('Area 2 of 2: JavaScript Programs')).toBeInTheDocument()
    expect(screen.queryByRole('checkbox', { name: 'Select Access Modifiers' })).not.toBeInTheDocument()
    // The C# Programs pick from the previous area is still counted, even though it's out of view.
    expect(screen.getByText(/1 selected overall/)).toBeInTheDocument()

    await user.click(screen.getByRole('checkbox', { name: 'Select Implicit Type Coercion in JavaScript Expressions' }))
    expect(screen.getByText(/2 selected overall/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Generate session' }))

    const sessionPage = await screen.findByTestId('session-page')
    const params = new URLSearchParams(sessionPage.textContent ?? '')
    const items = params.get('items')?.split(',') ?? []
    expect(items).toHaveLength(2)
    expect(items).toContain('csharp-programs:csharp-access-modifiers-output-questions')
    expect(items).toContain('javascript-programs:js-implicit-type-coercion-expressions')
  })

  it('narrows the manual picker list by complexity, and Select all only affects the visible ones', async () => {
    const user = userEvent.setup()
    renderPage()

    await selectOnlyMenus(user, ['C# Programs'])
    await waitFor(() => expect(screen.getByRole('checkbox', { name: 'Select Access Modifiers' })).toBeInTheDocument())

    // Pre-select one Medium question before narrowing to Easy, to prove narrowing never drops it.
    await user.click(screen.getByRole('checkbox', { name: 'Select Access Modifiers' }))

    await user.click(screen.getByRole('combobox', { name: /complexity/i }))
    await user.click(screen.getByRole('option', { name: 'Easy' }))

    expect(screen.queryByRole('checkbox', { name: 'Select Access Modifiers' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Select all questions' }))
    await user.click(screen.getByRole('combobox', { name: /complexity/i }))
    await user.click(screen.getByRole('option', { name: 'All' }))

    // The pre-selected Medium question is still checked alongside the newly-selected Easy ones.
    expect((screen.getByRole('checkbox', { name: 'Select Access Modifiers' }) as HTMLInputElement).checked).toBe(true)
  })

  it('selects and clears every topic area at once from within the dropdown', async () => {
    const user = userEvent.setup()
    renderPage()

    // Every topic area is selected by default.
    expect(screen.getByRole('combobox', { name: /topic areas/i })).toHaveTextContent(
      allMenuItems.map((item) => item.label).join(', '),
    )

    // The combobox itself is aria-hidden while the dropdown is open (MUI hides
    // background content), so close it (Escape) before asserting on its text.
    await user.click(screen.getByRole('combobox', { name: /topic areas/i }))
    await user.click(screen.getByRole('checkbox', { name: 'Select all topic areas' }))
    await user.keyboard('{Escape}')

    await waitFor(() =>
      expect(screen.getByRole('combobox', { name: /topic areas/i })).toHaveTextContent(allMenuItems[0].label),
    )

    await user.click(screen.getByRole('combobox', { name: /topic areas/i }))
    await user.click(screen.getByRole('checkbox', { name: 'Select all topic areas' }))
    await user.keyboard('{Escape}')

    await waitFor(() =>
      expect(screen.getByRole('combobox', { name: /topic areas/i })).toHaveTextContent(
        allMenuItems.map((item) => item.label).join(', '),
      ),
    )
  })

  it('lets the interviewer add an ad-hoc question and include it in the generated session', async () => {
    const user = userEvent.setup()
    renderPage()

    // Only the ad-hoc question should end up in the generated session — manual
    // mode is the default, and nothing has been selected from the pool yet.
    expect(screen.getByRole('button', { name: 'Generate session' })).toBeDisabled()

    await user.click(screen.getByRole('button', { name: '+ Add ad-hoc question' }))
    await user.type(screen.getByLabelText('Ad-hoc question title'), 'What is a race condition?')
    await user.type(screen.getByLabelText('Ad-hoc question notes'), 'Two threads racing to mutate shared state.')
    await user.click(screen.getByRole('button', { name: 'Add to session' }))

    expect(screen.getByText('What is a race condition?')).toBeInTheDocument()
    // The dialog's close transition briefly keeps the rest of the page aria-hidden.
    await waitFor(() => expect(screen.getByRole('button', { name: 'Generate session' })).not.toBeDisabled())

    await user.click(screen.getByRole('button', { name: 'Generate session' }))

    const sessionPage = await screen.findByTestId('session-page')
    const params = new URLSearchParams(sessionPage.textContent ?? '')
    expect(params.get('custom')).toBeTruthy()
    const items = params.get('items')?.split(',').filter(Boolean) ?? []
    expect(items).toHaveLength(0)
  })

  it('lets the interviewer remove an ad-hoc question before generating', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: '+ Add ad-hoc question' }))
    await user.type(screen.getByLabelText('Ad-hoc question title'), 'Explain CAP theorem')
    await user.click(screen.getByRole('button', { name: 'Add to session' }))
    expect(screen.getByText('Explain CAP theorem')).toBeInTheDocument()

    await waitFor(() => expect(screen.getByTestId('CloseRoundedIcon')).toBeInTheDocument())
    await user.click(screen.getByTestId('CloseRoundedIcon'))
    expect(screen.queryByText('Explain CAP theorem')).not.toBeInTheDocument()
  })

  it('does not show a last-completed-interview banner when none exists', () => {
    renderPage()
    expect(screen.queryByText(/last completed interview/i)).not.toBeInTheDocument()
  })

  it('offers to view/print the last completed interview, and gets there with its exact saved query', async () => {
    const user = userEvent.setup()
    window.localStorage.setItem(
      LAST_COMPLETED_INTERVIEW_STORAGE_KEY,
      JSON.stringify({ search: 'menus=csharp-programs&items=csharp-programs:csharp-access-modifiers-output-questions&run=past-run', totalQuestions: 1, completedAt: Date.now() }),
    )
    renderPage()

    expect(screen.getByText(/last completed interview \(1 questions\)/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'View & print' }))

    const sessionPage = await screen.findByTestId('session-page')
    const params = new URLSearchParams(sessionPage.textContent ?? '')
    expect(params.get('run')).toBe('past-run')
  })

  it('lets the interviewer dismiss the last-completed-interview banner for good', async () => {
    const user = userEvent.setup()
    window.localStorage.setItem(
      LAST_COMPLETED_INTERVIEW_STORAGE_KEY,
      JSON.stringify({ search: 'menus=csharp-programs&items=csharp-programs:csharp-access-modifiers-output-questions&run=past-run', totalQuestions: 1, completedAt: Date.now() }),
    )
    renderPage()

    await user.click(screen.getByRole('button', { name: 'Dismiss last completed interview' }))
    expect(screen.queryByText(/last completed interview/i)).not.toBeInTheDocument()
    expect(window.localStorage.getItem(LAST_COMPLETED_INTERVIEW_STORAGE_KEY)).toBeNull()
  })
})
