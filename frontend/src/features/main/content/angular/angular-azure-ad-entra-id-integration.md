# Integrating Azure AD / Microsoft Entra ID in Angular (MSAL)

Microsoft Entra ID (formerly Azure AD) is a common identity provider for enterprise Angular apps. Microsoft's official `@azure/msal-angular` library implements the OAuth 2.0/OIDC flows so you don't hand-roll token acquisition, redirect handling, or refresh logic.

## Short Answer

Install `@azure/msal-angular` and `@azure/msal-browser`, configure your app's Entra ID application (client ID, tenant, redirect URI), wrap protected routes/API calls with MSAL's guard and interceptor, and let MSAL manage the Authorization Code + PKCE flow, token caching, and silent refresh automatically.

## Configuration

```typescript
export const msalConfig: Configuration = {
  auth: {
    clientId: 'YOUR_APP_CLIENT_ID',
    authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID',
    redirectUri: '/auth-redirect',
  },
  cache: {
    cacheLocation: 'sessionStorage', // MSAL manages this internally; safer default than manual localStorage use
  },
}
```

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(MsalModule.forRoot(new PublicClientApplication(msalConfig), guardConfig, interceptorConfig)),
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    { provide: HTTP_INTERCEPTOR_DI, useClass: ... }, // MSAL wires the interceptor for you
  ],
}
```

## Protecting Routes with MsalGuard

```typescript
export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [MsalGuard] },
]
```

- `MsalGuard` redirects unauthenticated users to Entra ID's login page automatically — no custom guard logic needed for the basic "must be logged in" case.

## Attaching Tokens Automatically with MsalInterceptor

```typescript
const interceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Redirect,
  protectedResourceMap: new Map([['https://api.mycompany.com/*', ['api://YOUR_API_CLIENT_ID/.default']]]),
}
```

- `MsalInterceptor` automatically attaches an access token scoped to the configured API for any request matching `protectedResourceMap` — you don't write manual header-attaching logic like a hand-rolled interceptor would need.

## Reading the Signed-In User

```typescript
@Component({ selector: 'app-header', template: `<span>{{ userName }}</span>` })
export class HeaderComponent {
  userName = ''

  constructor(private msalService: MsalService) {
    const account = this.msalService.instance.getActiveAccount()
    this.userName = account?.name ?? ''
  }
}
```

## Sequence: Entra ID Login via MSAL

```archify
diagrams/angular-entra-id-msal.html
```

## Role-Based Authorization with Entra ID App Roles

- Define **App Roles** on the Entra ID app registration (e.g., `Admin`, `Manager`).
- Assign users/groups to those roles in Entra ID.
- The issued access token includes a `roles` claim Angular can read the same way as any other JWT claim (see the JWT/OAuth/OIDC topic), driving route guards and UI visibility.

## Common Mistakes

- Manually decoding/validating tokens instead of letting MSAL manage the token cache and silent renewal — MSAL already handles token expiry and silent refresh via hidden iframes/refresh tokens.
- Misconfiguring `redirectUri` (must exactly match what's registered in the Entra ID app registration) — a frequent source of login failures.
- Forgetting to configure `protectedResourceMap` correctly, causing tokens not to be attached to the right API calls.

## Real-World Example

An internal enterprise tool uses Entra ID as the sole identity provider: employees sign in with their existing corporate account (no separate password to manage), `MsalGuard` protects all internal routes, `MsalInterceptor` attaches scoped tokens to calls to the company's API, and App Roles assigned in Entra ID (`Employee`, `Manager`, `Admin`) drive both route guards and UI visibility without the Angular app ever managing its own user database.

## Summary

`@azure/msal-angular` handles the heavy lifting of integrating Entra ID into an Angular app: login redirects, token acquisition/caching/silent refresh, route protection via `MsalGuard`, and automatic token attachment via `MsalInterceptor` — letting the app focus on using the resulting identity/roles rather than implementing OAuth/OIDC by hand.
