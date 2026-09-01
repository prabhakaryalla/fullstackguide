# How to Create Custom Authorization Requirements and Handlers in ASP.NET Core

Custom requirements and handlers let you implement authorization rules that go beyond simple role or claim checks.

## Why Use Custom Authorization

Use custom handlers when authorization depends on:

- business rules (for example account status, subscription level)
- data lookups (for example ownership from database)
- resource context (for example user can edit only their own document)

## Core Building Blocks

- IAuthorizationRequirement: marker object that represents a rule
- AuthorizationHandler<TRequirement>: code that evaluates the rule
- AuthorizationPolicy: collection of requirements
- IAuthorizationService: service that executes policy evaluation

## Step 1: Define a Requirement

```csharp
public sealed class MinimumAgeRequirement : IAuthorizationRequirement
{
    public int Age { get; }

    public MinimumAgeRequirement(int age)
    {
        Age = age;
    }
}
```

Requirement holds policy data. It should stay simple and immutable.

## Step 2: Implement the Handler

```csharp
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

public sealed class MinimumAgeHandler
    : AuthorizationHandler<MinimumAgeRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        MinimumAgeRequirement requirement)
    {
        var dob = context.User.FindFirst(ClaimTypes.DateOfBirth)?.Value;
        if (DateTime.TryParse(dob, out var dateOfBirth))
        {
            var age = DateTime.UtcNow.Year - dateOfBirth.Year;
            if (dateOfBirth.Date > DateTime.UtcNow.AddYears(-age)) age--;

            if (age >= requirement.Age)
            {
                context.Succeed(requirement);
            }
        }

        return Task.CompletedTask;
    }
}
```

Important behavior:

- Call context.Succeed(requirement) only when rule passes.
- If not passed, simply return without succeed.
- Use context.Fail() only when you want explicit hard failure semantics.

## Step 3: Register Policy and Handler

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdultOnly", policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.Requirements.Add(new MinimumAgeRequirement(18));
    });
});

builder.Services.AddSingleton<IAuthorizationHandler, MinimumAgeHandler>();
```

## Step 4: Apply Policy

```csharp
[Authorize(Policy = "AdultOnly")]
[HttpGet("restricted")]
public IActionResult GetRestricted() => Ok("Allowed");
```

## Resource-Based Authorization (Advanced)

For rules like user can edit only own document, use a resource-aware handler.

```csharp
public sealed class SameAuthorRequirement : IAuthorizationRequirement { }

public sealed class Document
{
    public string AuthorId { get; init; } = string.Empty;
}

public sealed class SameAuthorHandler
    : AuthorizationHandler<SameAuthorRequirement, Document>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        SameAuthorRequirement requirement,
        Document resource)
    {
        var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!string.IsNullOrEmpty(userId) && userId == resource.AuthorId)
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
```

Evaluate manually:

```csharp
var result = await _authorizationService.AuthorizeAsync(User, document, new SameAuthorRequirement());
if (!result.Succeeded) return Forbid();
```

## Internal Evaluation Model

- A policy may contain multiple requirements.
- Multiple handlers can exist for same requirement.
- Requirement is considered satisfied once any applicable handler calls Succeed for that requirement.
- Final decision succeeds only if all requirements are satisfied.

## Common Pitfalls

- Putting database-heavy logic directly in handlers without caching/throttling.
- Using transient scoped dependencies incorrectly in singleton handlers.
- Mixing authentication failure and authorization failure semantics.
- Forgetting to call Succeed on pass.

## Performance and Design Tips

- Keep handler logic focused and deterministic.
- Use scoped services in handlers for per-request data access.
- Prefer claims-based quick checks before expensive I/O.
- Keep requirements reusable across policies.

## Real-World Analogy

A requirement is a rule in a building access policy, like staff level must be 4 or above.

A handler is the security system that checks badge attributes and decides whether that rule passes.

Policies combine multiple rules, and entry is granted only when every required rule is satisfied.
