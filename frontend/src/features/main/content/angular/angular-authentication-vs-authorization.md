# Authentication vs Authorization in Angular Applications

Authentication answers "who are you?"; authorization answers "what are you allowed to do?" In an Angular app, these map to two distinct concerns: verifying identity (login, tokens) and controlling access to routes/features/data (roles, permissions).

## Short Answer

- **Authentication** — confirming the user's identity, typically by exchanging credentials for a token (JWT) via a login flow.
- **Authorization** — using the authenticated identity's claims/roles to decide what the user can see or do (route access, UI visibility, API permissions).
- Angular handles authentication mostly by storing and attaching a token; it handles authorization by inspecting claims/roles inside route guards and conditionally rendering UI.

## Authentication in Angular

```archify
diagrams/angular-auth-vs-authz-sequence.html
```

- Angular itself doesn't "authenticate" — it delegates to a backend/identity provider and stores the resulting token, then treats a valid, unexpired token as "authenticated."

## Authorization in Angular

```typescript
// Role-based UI visibility
@Component({
  selector: 'app-admin-panel',
  template: `<div *ngIf="authService.hasRole('Admin')">Admin controls</div>`,
})
export class AdminPanelComponent {
  constructor(public authService: AuthService) {}
}
```

```typescript
// Role-based route protection (see Angular Route Guards topic for full detail)
export const adminRoutes: Routes = [
  { path: 'admin', component: AdminPanelComponent, canActivate: [roleGuard(['Admin'])] },
]
```

- Authorization data (roles/permissions) typically comes from claims embedded in the JWT itself, decoded client-side to drive UI and route decisions — but the **server must always re-validate** authorization on every API call, since client-side checks can be bypassed.

## Key Distinction Table

| | Authentication | Authorization |
|---|---|---|
| Question answered | Who are you? | What can you do? |
| Angular mechanism | Login flow, token storage | Route guards, `*ngIf` on roles/claims, API-side checks |
| Failure result | Redirect to login | 403 Forbidden / hide UI element |
| Where enforced | Client (UX) + Server (source of truth) | Client (UX) + Server (source of truth, mandatory) |

## Common Mistake

Treating client-side authorization checks (hiding a button, blocking a route) as security. They only improve UX — a user can still call the API directly. The backend must independently enforce authorization on every request regardless of what the Angular UI shows or hides.

## Real-World Example

An internal admin portal: after login, the JWT contains a `roles` claim. A route guard blocks navigation to `/admin` unless `roles` includes `Admin`, and the admin panel component hides destructive buttons for non-admins — but the underlying `/api/admin/*` endpoints independently check the same role claim server-side, so even a modified/bypassed Angular build can't grant unauthorized access.

## Summary

Authentication establishes identity via login and token issuance; authorization uses that identity's claims to gate routes and UI in Angular. Client-side authorization in Angular is a UX convenience — the backend remains the only trustworthy enforcement point.
