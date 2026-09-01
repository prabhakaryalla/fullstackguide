# How Can You Use Claims Transformation in Conjunction with Policy-Based Authorization?

Claims transformation lets you enrich or normalize user claims after authentication and before authorization decisions are made.

This is powerful when incoming tokens or identity providers do not provide claims exactly in the shape your policies need.

## Why This Matters

Policy-based authorization evaluates claims from `ClaimsPrincipal`.

If claims are missing, inconsistent, or provider-specific, policies become noisy or brittle.

Claims transformation solves this by producing a stable claim model for authorization policies.

## Request Pipeline Position

High-level flow:

1. Authentication validates token/cookie and creates `ClaimsPrincipal`.
2. Claims transformation runs and can add/replace claims.
3. Authorization policies evaluate transformed claims.

So your policy sees transformed claims, not just raw identity provider claims.

## Typical Use Cases

- Map external claim names to internal names.
- Add app-specific permission claims from a database.
- Expand role hierarchies (for example, `Admin` implies additional permissions).
- Add tenant context claims for multi-tenant policy checks.

## Implementing Claims Transformation

Use `IClaimsTransformation`:

```csharp
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

public sealed class AppClaimsTransformation : IClaimsTransformation
{
    private readonly IUserPermissionService _permissionService;

    public AppClaimsTransformation(IUserPermissionService permissionService)
    {
        _permissionService = permissionService;
    }

    public async Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
    {
        if (principal.Identity is not ClaimsIdentity identity || !identity.IsAuthenticated)
        {
            return principal;
        }

        // Prevent duplicate claims when TransformAsync is called multiple times.
        if (identity.HasClaim(c => c.Type == "permissions_loaded" && c.Value == "true"))
        {
            return principal;
        }

        var subjectId = principal.FindFirst("sub")?.Value;
        if (string.IsNullOrWhiteSpace(subjectId))
        {
            return principal;
        }

        var permissions = await _permissionService.GetPermissionsAsync(subjectId);

        foreach (var permission in permissions)
        {
            identity.AddClaim(new Claim("permission", permission));
        }

        identity.AddClaim(new Claim("permissions_loaded", "true"));
        return principal;
    }
}
```

Register it:

```csharp
builder.Services.AddScoped<IClaimsTransformation, AppClaimsTransformation>();
```

## Connecting to Policy-Based Authorization

Define policies that consume transformed claims:

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("CanApproveInvoice", policy =>
        policy.RequireClaim("permission", "invoice.approve"));

    options.AddPolicy("CanViewAudit", policy =>
        policy.RequireClaim("permission", "audit.view"));
});
```

Use in endpoint:

```csharp
[Authorize(Policy = "CanApproveInvoice")]
[HttpPost("invoices/{id}/approve")]
public IActionResult ApproveInvoice(Guid id) => Ok();
```

Even if the original token did not contain `invoice.approve`, the policy can still pass if transformation added it.

## Advanced Pattern: Normalize Provider Differences

Imagine provider A sends `roles`, provider B sends `groups`.

In transformation:

- read provider-specific claims
- map them into one standard claim, for example `permission`

Then policies stay provider-agnostic and consistent.

## Performance and Safety Considerations

- Keep transformation idempotent to avoid duplicate claims.
- Avoid expensive I/O on every request without caching.
- Be careful with trust boundaries; only derive claims from trusted data.
- Prefer short claim payloads to avoid token/principal bloat.

## Real-World Example

A company uses Microsoft Entra ID groups, but app policies are permission-based.

Transformation layer:

- reads group ids from token
- resolves them to app permissions (`projects.read`, `projects.write`)
- adds `permission` claims

Policies then stay simple and readable:

- `RequireClaim("permission", "projects.write")`

## Common Mistakes

- Treating transformation as authentication and issuing sensitive trust without validation.
- Calling downstream services repeatedly without caching strategy.
- Building policies against raw external claims and skipping normalization.

## Summary

Claims transformation is the bridge between raw identity data and clean policy-based authorization.

Use it to normalize claims, enrich permissions, and keep your policies stable, readable, and portable across identity providers.
