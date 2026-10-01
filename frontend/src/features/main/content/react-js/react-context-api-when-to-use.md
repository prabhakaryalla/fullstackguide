# Context API - When to Use?

Context lets you share a value across a component tree without manually passing props through every intermediate level ("prop drilling"). It's a tool for **avoiding prop drilling**, not a general-purpose global state manager.

## Short Answer

Use Context for data that many components across different levels of the tree need to read, and that changes infrequently — theme, authenticated user, locale/language, feature flags. Avoid it for frequently-changing, high-frequency state (e.g., every keystroke in a form), since any consumer re-renders whenever the context value changes.

## The Problem Context Solves

```archify
diagrams/react-prop-drilling.html
```

Without Context, passing `currentUser` from `App` to `Avatar` means threading it through `Layout`, `Header`, and `UserMenu` even though they don't use it themselves — pure "prop drilling."

## Creating and Using Context

```tsx
interface AuthContextValue {
  user: User | null
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const logout = () => setUser(null)

  return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
```

```tsx
function Avatar() {
  const { user } = useAuth() // no prop drilling needed
  return <img src={user?.avatarUrl} alt={user?.name} />
}
```

## When Context Is a Good Fit

- **Theme** (light/dark mode) — read in many unrelated components, changes rarely.
- **Authenticated user/session** — needed app-wide, changes only on login/logout.
- **Locale/i18n settings** — read broadly, changes rarely.
- **Feature flags** — set once, read in many places.

## When to Avoid Context

- **Frequently changing values** (form input state, live counters) — every update re-renders **all** consumers, even ones that only care about a slice of the value.
- **Large, complex application state** with many independent slices — a dedicated state manager (Redux, Zustand, Jotai) gives finer-grained subscriptions so components only re-render for the slices they use.

```archify
diagrams/react-context-rerenders.html
```

## Mitigating Context Re-render Cost

- Split contexts by concern (e.g., separate `UserContext` and `ThemeContext`) instead of one giant context object — a change to theme shouldn't re-render every user-data consumer.
- Memoize the provider's `value` object with `useMemo` so it doesn't create a new reference on every parent render.

```tsx
const value = useMemo(() => ({ user, logout }), [user])
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
```

## Real-World Example

A multi-tenant dashboard uses `ThemeContext` for dark/light mode (read in dozens of components, rarely changes) and `AuthContext` for the logged-in user (read in the header, sidebar, and route guards) — but keeps fast-changing table filter/search state as local component state or in a dedicated store, since re-rendering the whole tree on every keystroke would be wasteful.

## Summary

Reach for Context when you need to avoid prop drilling for relatively stable, widely-needed data. For state that changes often or needs fine-grained subscriptions, prefer local state or a dedicated state management library to avoid unnecessary re-renders across the tree.
