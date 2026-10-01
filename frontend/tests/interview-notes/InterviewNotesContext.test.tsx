import { afterEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InterviewNotesProvider from '../../src/features/interview-notes/context/InterviewNotesContext'
import { useInterviewNotes } from '../../src/features/interview-notes/hooks/useInterviewNotes'
import { INTERVIEW_NOTES_STORAGE_KEY } from '../../src/features/interview-notes/data/interviewNotesStorage'
import { ASKED_TOPICS_STORAGE_KEY } from '../../src/features/interview-notes/data/askedTopicsStorage'

function NoteHarness({ runId, menuId, slug }: { runId: string; menuId: string; slug: string }) {
  const { getNote, setRating, setNoteText, setSkipped, getLastAskedAt, markAsked } = useInterviewNotes()
  const entry = getNote(runId, menuId, slug)
  return (
    <div>
      <span>{`rating:${entry.rating}`}</span>
      <span>{`note:${entry.note}`}</span>
      <span>{`skipped:${Boolean(entry.skipped)}`}</span>
      <span>{`asked:${Boolean(getLastAskedAt(menuId, slug))}`}</span>
      <button type="button" onClick={() => setRating(runId, menuId, slug, 4)}>
        Rate 4
      </button>
      <button type="button" onClick={() => setNoteText(runId, menuId, slug, 'Great answer')}>
        Write note
      </button>
      <button type="button" onClick={() => setSkipped(runId, menuId, slug, true)}>
        Skip
      </button>
      <button type="button" onClick={() => setSkipped(runId, menuId, slug, false)}>
        Unskip
      </button>
      <button type="button" onClick={() => markAsked([{ menuId, slug }])}>
        Mark asked
      </button>
    </div>
  )
}

describe('InterviewNotesContext', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('starts with an unrated, empty entry for a topic', () => {
    render(
      <InterviewNotesProvider>
        <NoteHarness runId="run-a" menuId="azure" slug="azure-event-hubs" />
      </InterviewNotesProvider>,
    )
    expect(screen.getByText('rating:0')).toBeInTheDocument()
    expect(screen.getByText('note:')).toBeInTheDocument()
  })

  it('sets a rating without clearing the note, and vice versa', async () => {
    const user = userEvent.setup()
    render(
      <InterviewNotesProvider>
        <NoteHarness runId="run-a" menuId="azure" slug="azure-event-hubs" />
      </InterviewNotesProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Rate 4' }))
    expect(screen.getByText('rating:4')).toBeInTheDocument()
    expect(screen.getByText('note:')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Write note' }))
    expect(screen.getByText('rating:4')).toBeInTheDocument()
    expect(screen.getByText('note:Great answer')).toBeInTheDocument()
  })

  it('persists notes across a provider remount', async () => {
    const user = userEvent.setup()
    const { unmount } = render(
      <InterviewNotesProvider>
        <NoteHarness runId="run-a" menuId="azure" slug="azure-event-hubs" />
      </InterviewNotesProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Rate 4' }))
    await user.click(screen.getByRole('button', { name: 'Write note' }))
    unmount()

    render(
      <InterviewNotesProvider>
        <NoteHarness runId="run-a" menuId="azure" slug="azure-event-hubs" />
      </InterviewNotesProvider>,
    )
    expect(screen.getByText('rating:4')).toBeInTheDocument()
    expect(screen.getByText('note:Great answer')).toBeInTheDocument()
    expect(window.localStorage.getItem(INTERVIEW_NOTES_STORAGE_KEY)).toContain('run-a/azure/azure-event-hubs')
  })

  it('keeps notes for different topics independent', async () => {
    const user = userEvent.setup()
    render(
      <InterviewNotesProvider>
        <NoteHarness runId="run-a" menuId="azure" slug="azure-event-hubs" />
        <NoteHarness runId="run-a" menuId="azure" slug="azure-service-bus" />
      </InterviewNotesProvider>,
    )

    const rateButtons = screen.getAllByRole('button', { name: 'Rate 4' })
    await user.click(rateButtons[0])

    const ratingTexts = screen.getAllByText(/^rating:/)
    expect(ratingTexts[0]).toHaveTextContent('rating:4')
    expect(ratingTexts[1]).toHaveTextContent('rating:0')
  })

  it('keeps ratings/notes for the same topic independent across different interview runs', async () => {
    const user = userEvent.setup()
    render(
      <InterviewNotesProvider>
        <NoteHarness runId="run-a" menuId="azure" slug="azure-event-hubs" />
        <NoteHarness runId="run-b" menuId="azure" slug="azure-event-hubs" />
      </InterviewNotesProvider>,
    )

    // Rate + note the FIRST run's copy of this exact topic only.
    await user.click(screen.getAllByRole('button', { name: 'Rate 4' })[0])
    await user.click(screen.getAllByRole('button', { name: 'Write note' })[0])

    const ratingTexts = screen.getAllByText(/^rating:/)
    const noteTexts = screen.getAllByText(/^note:/)
    expect(ratingTexts[0]).toHaveTextContent('rating:4')
    expect(noteTexts[0]).toHaveTextContent('note:Great answer')
    // A second/later session touching the same topic starts fresh — no bleed-over.
    expect(ratingTexts[1]).toHaveTextContent('rating:0')
    expect(noteTexts[1]).toHaveTextContent('note:')
  })

  it('marks a topic asked without clobbering an existing rating/note', async () => {
    const user = userEvent.setup()
    render(
      <InterviewNotesProvider>
        <NoteHarness runId="run-a" menuId="azure" slug="azure-event-hubs" />
      </InterviewNotesProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Rate 4' }))
    await user.click(screen.getByRole('button', { name: 'Mark asked' }))

    expect(screen.getByText('asked:true')).toBeInTheDocument()
    expect(screen.getByText('rating:4')).toBeInTheDocument()
  })

  it('marking asked does not affect a different topic', async () => {
    const user = userEvent.setup()
    render(
      <InterviewNotesProvider>
        <NoteHarness runId="run-a" menuId="azure" slug="azure-event-hubs" />
        <NoteHarness runId="run-a" menuId="azure" slug="azure-service-bus" />
      </InterviewNotesProvider>,
    )

    await user.click(screen.getAllByRole('button', { name: 'Mark asked' })[0])

    const askedTexts = screen.getAllByText(/^asked:/)
    expect(askedTexts[0]).toHaveTextContent('asked:true')
    expect(askedTexts[1]).toHaveTextContent('asked:false')
  })

  it('marking asked stays global across different interview runs (for "exclude previously asked")', async () => {
    const user = userEvent.setup()
    render(
      <InterviewNotesProvider>
        <NoteHarness runId="run-a" menuId="azure" slug="azure-event-hubs" />
        <NoteHarness runId="run-b" menuId="azure" slug="azure-event-hubs" />
      </InterviewNotesProvider>,
    )

    await user.click(screen.getAllByRole('button', { name: 'Mark asked' })[0])

    const askedTexts = screen.getAllByText(/^asked:/)
    expect(askedTexts[0]).toHaveTextContent('asked:true')
    expect(askedTexts[1]).toHaveTextContent('asked:true')
    expect(window.localStorage.getItem(ASKED_TOPICS_STORAGE_KEY)).toContain('azure/azure-event-hubs')
  })

  it('marks a topic as skipped without touching its rating/note, and can undo it', async () => {
    const user = userEvent.setup()
    render(
      <InterviewNotesProvider>
        <NoteHarness runId="run-a" menuId="azure" slug="azure-event-hubs" />
      </InterviewNotesProvider>,
    )

    expect(screen.getByText('skipped:false')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Rate 4' }))
    await user.click(screen.getByRole('button', { name: 'Skip' }))

    expect(screen.getByText('skipped:true')).toBeInTheDocument()
    expect(screen.getByText('rating:4')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Unskip' }))
    expect(screen.getByText('skipped:false')).toBeInTheDocument()
    expect(screen.getByText('rating:4')).toBeInTheDocument()
  })

  it('keeps skipped status independent per topic and per run', async () => {
    const user = userEvent.setup()
    render(
      <InterviewNotesProvider>
        <NoteHarness runId="run-a" menuId="azure" slug="azure-event-hubs" />
        <NoteHarness runId="run-b" menuId="azure" slug="azure-event-hubs" />
      </InterviewNotesProvider>,
    )

    await user.click(screen.getAllByRole('button', { name: 'Skip' })[0])

    const skippedTexts = screen.getAllByText(/^skipped:/)
    expect(skippedTexts[0]).toHaveTextContent('skipped:true')
    expect(skippedTexts[1]).toHaveTextContent('skipped:false')
  })
})
