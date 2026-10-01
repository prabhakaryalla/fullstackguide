import { ThemeProvider, CssBaseline } from '@mui/material'
import { HashRouter } from 'react-router-dom'
import type { ReactNode } from 'react'
import ThemeModeProvider from '../../theme/ThemeModeContext'
import { useThemeMode } from '../../theme/useThemeMode'
import { getAppTheme } from '../../theme/theme'
import TopicProgressProvider from '../../features/progress/context/TopicProgressContext'
import BookmarkProvider from '../../features/bookmarks/context/BookmarkContext'
import InterviewNotesProvider from '../../features/interview-notes/context/InterviewNotesContext'
import AdhocQuestionsProvider from '../../features/adhoc-questions/context/AdhocQuestionsContext'
import ActiveInterviewProvider from '../../features/interview-builder/context/ActiveInterviewContext'
import CompletedInterviewsProvider from '../../features/interview-builder/context/CompletedInterviewsContext'
import LastCompletedInterviewProvider from '../../features/interview-builder/context/LastCompletedInterviewContext'
import CandidateInfoProvider from '../../features/interview-builder/context/CandidateInfoContext'
import InterviewHistoryProvider from '../../features/interview-builder/context/InterviewHistoryContext'

interface AppProvidersProps {
  children: ReactNode
}

function ThemedApp({ children }: { children: ReactNode }) {
  const { mode } = useThemeMode()
  return (
    <ThemeProvider theme={getAppTheme(mode)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <HashRouter>
      <ThemeModeProvider>
        <TopicProgressProvider>
          <BookmarkProvider>
            <InterviewNotesProvider>
              <AdhocQuestionsProvider>
                <ActiveInterviewProvider>
                  <CompletedInterviewsProvider>
                    <LastCompletedInterviewProvider>
                      <CandidateInfoProvider>
                        <InterviewHistoryProvider>
                          <ThemedApp>{children}</ThemedApp>
                        </InterviewHistoryProvider>
                      </CandidateInfoProvider>
                    </LastCompletedInterviewProvider>
                  </CompletedInterviewsProvider>
                </ActiveInterviewProvider>
              </AdhocQuestionsProvider>
            </InterviewNotesProvider>
          </BookmarkProvider>
        </TopicProgressProvider>
      </ThemeModeProvider>
    </HashRouter>
  )
}

