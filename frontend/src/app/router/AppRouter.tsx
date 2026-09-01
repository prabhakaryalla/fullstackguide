import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from '../../features/landing/pages/LandingPage'
import AppShell from '../layout/AppShell'

const MainMenuTilesPage = lazy(() => import('../../features/main/pages/MainMenuTilesPage'))
const MainPage = lazy(() => import('../../features/main/pages/MainPage'))
const TopicInfoPage = lazy(() => import('../../features/main/pages/TopicInfoPage'))
const SearchResultsPage = lazy(() => import('../../features/search/pages/SearchResultsPage'))

export default function AppRouter() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<MainMenuTilesPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/:menuSlug" element={<MainPage />} />
          <Route path="/:menuSlug/:topicSlug" element={<TopicInfoPage />} />
          <Route path="*" element={<LandingPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
