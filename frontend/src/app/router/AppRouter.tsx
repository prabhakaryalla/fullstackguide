import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from '../../features/landing/pages/LandingPage'
import AppShell from '../layout/AppShell'

const MainMenuTilesPage = lazy(() => import('../../features/main/pages/MainMenuTilesPage'))
const MainPage = lazy(() => import('../../features/main/pages/MainPage'))
const TopicInfoPage = lazy(() => import('../../features/main/pages/TopicInfoPage'))
const SearchResultsPage = lazy(() => import('../../features/search/pages/SearchResultsPage'))
const BookmarksPage = lazy(() => import('../../features/bookmarks/pages/BookmarksPage'))
const FlashcardSessionPage = lazy(() => import('../../features/flashcards/pages/FlashcardSessionPage'))
const TagsIndexPage = lazy(() => import('../../features/tags/pages/TagsIndexPage'))
const TagTopicsPage = lazy(() => import('../../features/tags/pages/TagTopicsPage'))
const InterviewBuilderPage = lazy(() => import('../../features/interview-builder/pages/InterviewBuilderPage'))
const InterviewSessionPage = lazy(() => import('../../features/interview-builder/pages/InterviewSessionPage'))
const InterviewRunPage = lazy(() => import('../../features/interview-builder/pages/InterviewRunPage'))
const InterviewHistoryPage = lazy(() => import('../../features/interview-builder/pages/InterviewHistoryPage'))
const InterviewPrintPage = lazy(() => import('../../features/interview-builder/pages/InterviewPrintPage'))
const DataSettingsPage = lazy(() => import('../../features/data-portability/pages/DataSettingsPage'))

export default function AppRouter() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<MainMenuTilesPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/tags" element={<TagsIndexPage />} />
          <Route path="/tags/:tagId" element={<TagTopicsPage />} />
          <Route path="/interview-builder" element={<InterviewBuilderPage />} />
          <Route path="/interview-builder/session" element={<InterviewSessionPage />} />
          <Route path="/interview-builder/run" element={<InterviewRunPage />} />
          <Route path="/interview-builder/history" element={<InterviewHistoryPage />} />
          <Route path="/settings/data" element={<DataSettingsPage />} />
          <Route path="/:menuSlug" element={<MainPage />} />
          <Route path="/:menuSlug/flashcards" element={<FlashcardSessionPage />} />
          <Route path="/:menuSlug/:topicSlug" element={<TopicInfoPage />} />
          <Route path="*" element={<LandingPage />} />
        </Route>
        {/* Deliberately outside AppShell — a printed sheet shouldn't include the top nav bar. */}
        <Route path="/interview-builder/print" element={<InterviewPrintPage />} />
      </Routes>
    </Suspense>
  )
}
