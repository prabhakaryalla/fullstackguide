export interface NavigationMenuItem {
  id: string
  label: string
  order: number
}

export interface MenuConfig {
  items: NavigationMenuItem[]
}

export interface LandingNavigationBar {
  title: string
  menuItems: NavigationMenuItem[]
}

export interface ComingSoonViewState {
  selectedMenuId: string | null
  selectedMenuLabel: string | null
  heading: string
  description: string
}

// Top-level nav entry; childIds present only for groups with a submenu (Backend, Frontend, Database)
export interface TopNavigationGroup {
  id: string
  label: string
  order: number
  childIds?: string[]
}

// Render-time join of TopNavigationGroup + flat NavigationMenuItem list
export interface TopNavigationGroupView {
  id: string
  label: string
  order: number
  children: NavigationMenuItem[]
}
