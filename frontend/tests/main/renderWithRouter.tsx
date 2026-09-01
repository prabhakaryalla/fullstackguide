import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AppShell from '../../src/app/layout/AppShell'
import LandingPage from '../../src/features/landing/pages/LandingPage'
import MainPage from '../../src/features/main/pages/MainPage'
import MainMenuTilesPage from '../../src/features/main/pages/MainMenuTilesPage'
import TopicInfoPage from '../../src/features/main/pages/TopicInfoPage'
import SearchResultsPage from '../../src/features/search/pages/SearchResultsPage'
import ThemeModeProvider from '../../src/theme/ThemeModeContext'

export function renderWithFeatureRouter(initialPath: string) {
  return render(
    <ThemeModeProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<MainMenuTilesPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/:menuSlug" element={<MainPage />} />
            <Route path="/:menuSlug/:topicSlug" element={<TopicInfoPage />} />
            <Route path="*" element={<LandingPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </ThemeModeProvider>,
  )
}

export function renderTopicInfoRoute(menuSlug: string, topicSlug: string) {
  return renderWithFeatureRouter(`/${menuSlug}/${topicSlug}`)
}

export function renderRootMainRoute() {
  return renderWithFeatureRouter('/')
}
