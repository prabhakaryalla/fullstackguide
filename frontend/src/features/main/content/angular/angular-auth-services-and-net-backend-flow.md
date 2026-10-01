# Authentication Services: Angular Client and .NET Backend End-to-End Flow

A working authentication system is split across two codebases: Angular handles the client-side pieces (calling the API, attaching tokens, guarding routes), while the .NET backend handles the actual credential validation and token issuance. Knowing which service does what on each side is a common interview checkpoint.

## Short Answer

**Angular side**: `HttpClient` (calls the auth API), an `AuthService` (holds auth state, exposes login/logout/refresh), a JWT decoding helper (reads claims for UX), and an `HttpInterceptor` (attaches tokens, handles 401s).

**.NET side**: ASP.NET Core Identity (user store, password hashing), Authentication Middleware (`app.UseAuthentication()`), JWT Bearer Authentication (validates incoming tokens), and an OpenID Connect provider (issues tokens, e.g., Entra ID or a custom identity server).

## The Common End-to-End Flow

```archify
diagrams/angular-dotnet-auth-architecture.html
```

## Angular Side Components

```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private accessToken: string | null = null

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<void> {
    return this.http.post<{ accessToken: string }>('/api/auth/login', credentials).pipe(
      tap((res) => (this.accessToken = res.accessToken)),
      map(() => void 0),
    )
  }

  getAccessToken(): string | null {
    return this.accessToken
  }

  hasRole(role: string): boolean {
    const claims = this.accessToken ? decodeJwt(this.accessToken) : {}
    return (claims['roles'] as string[] | undefined)?.includes(role) ?? false
  }
}
```

- `HttpClient` — the transport used to call `/api/auth/login`, `/api/auth/refresh`, and protected endpoints.
- `AuthService` — the single source of truth for "am I logged in, and what can I do" from the Angular app's perspective.
- `HttpInterceptor` — attaches the token to outgoing requests and reacts to 401s (see the Interceptor and Refresh Token topics).

## .NET Backend Side Components

```csharp
// Program.cs
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://login.microsoftonline.com/{tenant}/v2.0"; // OIDC provider
        options.Audience = builder.Configuration["Auth:Audience"];
    });

builder.Services.AddAuthorization();

var app = builder.Build();
app.UseAuthentication(); // validates the incoming JWT on every request
app.UseAuthorization();  // enforces [Authorize]/policy checks
```

```csharp
[Authorize(Roles = "Admin")]
[HttpGet("admin/reports")]
public IActionResult GetReports() => Ok(_reportService.GetAll());
```

- **ASP.NET Core Identity** — manages user accounts, password hashing, and (if you're issuing your own tokens rather than delegating to Entra ID/Auth0) the login endpoint that validates credentials.
- **Authentication Middleware** (`UseAuthentication`) — runs on every request, validates the JWT's signature/expiry, and populates `HttpContext.User` with its claims.
- **JWT Bearer Authentication** — the specific scheme that expects `Authorization: Bearer <token>` and validates it against the configured issuer/audience/signing key.
- **OpenID Connect provider** — either an external provider (Entra ID, Auth0, Okta) or a self-hosted one (IdentityServer/OpenIddict) that actually issues the tokens.

## Putting It Together

```archify
diagrams/angular-dotnet-auth-sequence.html
```

## Real-World Example

A corporate portal uses Entra ID as the OIDC provider: Angular's `@azure/msal-angular` handles the login redirect and token acquisition (no custom `AuthService` login endpoint needed), an interceptor attaches the resulting access token to calls, and the .NET API validates that token using `AddJwtBearer` configured against Entra ID's issuer — no ASP.NET Core Identity user store is needed at all since Entra ID is the identity source of truth.

## Summary

Angular's role in authentication is client-side orchestration: calling the auth endpoint, storing the resulting token, attaching it to requests, and reacting to expiry. The .NET backend's role is issuing and validating that token: ASP.NET Core Identity (or an external OIDC provider) authenticates the user, and JWT Bearer middleware validates every subsequent request against that token.
