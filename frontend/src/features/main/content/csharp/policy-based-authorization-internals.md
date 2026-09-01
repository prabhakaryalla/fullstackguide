# How Policy-Based Authorization Works Internally in ASP.NET Core

Policy-based authorization in ASP.NET Core checks whether the current user satisfies one or more requirements before accessing protected endpoints.

## Big Picture

When a request reaches an endpoint with authorization metadata:

1. Authentication runs first and builds HttpContext.User.
2. Authorization middleware finds the endpoint policy.
3. Policy requirements are evaluated by handlers.
4. Access is either granted, challenged (401), or forbidden (403).

## Core Components

- AuthorizationPolicy: collection of requirements plus authentication schemes.
- IAuthorizationRequirement: rule definition (for example minimum age, specific claim).
- AuthorizationHandler<TRequirement>: logic that checks whether user satisfies requirement.
- IAuthorizationService: orchestrates evaluation.

## Policy Registration

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("EmployeeOnly", policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireClaim("department", "engineering", "finance");
    });
});
```

## Applying a Policy

```csharp
[Authorize(Policy = "EmployeeOnly")]
[HttpGet("reports")]
public IActionResult GetReports() => Ok("Authorized");
```

## Custom Requirement and Handler

```csharp
public sealed class MinimumTenureRequirement : IAuthorizationRequirement
{
    public int Months { get; }
    public MinimumTenureRequirement(int months) => Months = months;
}

public sealed class MinimumTenureHandler
    : AuthorizationHandler<MinimumTenureRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        MinimumTenureRequirement requirement)
    {
        var claim = context.User.FindFirst("tenure_months")?.Value;
        if (int.TryParse(claim, out var months) && months >= requirement.Months)
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
```

Register handler:

```csharp
builder.Services.AddSingleton<IAuthorizationHandler, MinimumTenureHandler>();
```

## Internal Evaluation Behavior

- A policy can have multiple requirements.
- Handlers run and may mark requirement success.
- All required conditions must be satisfied unless policy/handlers explicitly allow alternatives.

If user is not authenticated:

- Result is typically challenge (401).

If authenticated but missing permission:

- Result is typically forbid (403).

## Middleware Order Matters

Use this order:

```csharp
app.UseAuthentication();
app.UseAuthorization();
```

If authorization runs before authentication, policies will evaluate against an empty/unauthenticated principal.

## Why Policy-Based Authorization Is Better Than Role-Only Checks

- Centralized reusable rules
- Easier testing
- Supports claims, resource checks, and custom logic
- Cleaner than duplicating checks in controllers

## Real-World Analogy

Think of entering a restricted office floor.

- Authentication checks your identity badge.
- Policy checks whether your badge has the required floor permission.
- Handlers are security guards validating each specific rule.
