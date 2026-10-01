# Angular Route Guards

Route guards let Angular decide whether a navigation is allowed to proceed — the primary mechanism for protecting routes based on authentication state or authorization (roles/permissions).

## Short Answer

Guards are functions (or classes, in older Angular versions) hooked into the router configuration that return `true`/`false`/a redirect `UrlTree` to allow, block, or redirect a navigation. The most common is `canActivate`, used to block access to a route unless the user is authenticated (and optionally authorized).

## Guard Types

| Guard | Purpose |
|---|---|
| `canActivate` | Can this route be entered? |
| `canActivateChild` | Can child routes be entered? |
| `canDeactivate` | Can the user leave this route (e.g., unsaved changes warning)? |
| `canMatch` | Should this route even be matched/considered (useful with lazy-loaded feature modules)? |
| `resolve` | Pre-fetch data before the route activates |

## Functional Guard (Modern Angular)

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.isAuthenticated()) {
    return true
  }

  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
}
```

```typescript
export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService)
    const router = inject(Router)

    if (authService.hasAnyRole(allowedRoles)) {
      return true
    }

    return router.createUrlTree(['/unauthorized'])
  }
}
```

## Wiring Guards Into Routes

```typescript
export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard, roleGuard(['Admin'])] },
  { path: 'login', component: LoginComponent },
]
```

- Multiple guards on one route all must return `true` for navigation to proceed — Angular short-circuits on the first failure.

## Sequence: Guard Evaluation

```archify
diagrams/angular-route-guard.html
```

## canDeactivate — Preventing Accidental Navigation Away

```typescript
export const unsavedChangesGuard: CanDeactivateFn<EditFormComponent> = (component) => {
  if (component.hasUnsavedChanges()) {
    return confirm('You have unsaved changes. Leave anyway?')
  }
  return true
}
```

## Common Mistake

Relying solely on route guards for security. Guards only prevent the Angular router from **rendering** a route in the browser — the underlying API must independently reject unauthorized requests, since a determined user can still call the API directly (see Authentication vs Authorization topic).

## Real-World Example

An HR system uses `authGuard` on every non-public route to force login, and `roleGuard(['Manager', 'Admin'])` on `/reports` so only managers/admins can navigate there — while the `/api/reports` endpoint on the backend performs its own independent role check, so the guard is purely a navigation/UX control, not the security boundary.

## Summary

Route guards (`canActivate`, `canActivateChild`, `canDeactivate`, `canMatch`) let Angular's router make navigation decisions based on authentication and authorization state, redirecting unauthorized users before a protected component ever renders — but they must always be backed by equivalent server-side enforcement.
