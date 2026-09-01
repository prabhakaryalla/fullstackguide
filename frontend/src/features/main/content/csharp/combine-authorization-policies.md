# How Multiple Authorization Policies Are Combined or Chained in ASP.NET Core

ASP.NET Core can evaluate multiple authorization requirements together by combining policies at runtime.

## Core Concept

When multiple policies are applied to an endpoint, ASP.NET Core builds one effective policy.

That effective policy contains:

- all authentication scheme requirements
- all authorization requirements from each policy

Resulting behavior is effectively AND logic across requirements.

## Policy Combination Sources

An endpoint can get requirements from multiple places:

- named policy on Authorize attribute
- role requirements
- authentication schemes
- fallback policy or default policy
- endpoint metadata from minimal APIs

Authorization middleware merges these into one AuthorizationPolicy and evaluates it once.

## Example: Combining Policies

Policy definitions:

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Employee", p => p.RequireClaim("employee_id"));
    options.AddPolicy("PaidSubscription", p => p.RequireClaim("subscription", "paid"));
});
```

Endpoint usage:

```csharp
[Authorize(Policy = "Employee")]
[Authorize(Policy = "PaidSubscription")]
[HttpGet("premium-reports")]
public IActionResult GetPremiumReports() => Ok();
```

Effective rule:

- user must satisfy Employee
- user must satisfy PaidSubscription

Both must pass.

## Minimal API Style

```csharp
app.MapGet("/premium", () => "ok")
   .RequireAuthorization("Employee", "PaidSubscription");
```

This also combines policies into one effective set of requirements.

## Chaining in Custom Logic

You can chain authorization checks manually using IAuthorizationService.

```csharp
var first = await auth.AuthorizeAsync(user, resource, "Employee");
if (!first.Succeeded) return Results.Forbid();

var second = await auth.AuthorizeAsync(user, resource, "PaidSubscription");
if (!second.Succeeded) return Results.Forbid();

return Results.Ok();
```

This gives explicit step-by-step control and optional custom responses per failure stage.

## Internals: Evaluation Model

1. Middleware collects endpoint authorization metadata.
2. Policy evaluator combines metadata into a single policy.
3. Authorization handlers execute against each requirement.
4. If all required conditions succeed, access is granted.
5. Otherwise challenge (unauthenticated) or forbid (authenticated but unauthorized).

## OR Logic Pattern

Default policy composition is AND.

If you need OR behavior, implement it inside one requirement/handler:

- requirement: HasDepartmentOrAdminRequirement
- handler: succeed when either condition is true

This keeps endpoint attributes simple while enabling complex logic.

## Common Pitfalls

- Expecting multiple Authorize attributes to behave like OR.
- Splitting dependent checks across multiple policies when one custom requirement is clearer.
- Mixing fallback policy with endpoint-specific policy without understanding final merged effect.

## Practical Guidance

- Use multiple policies when each rule is independently reusable.
- Use one custom requirement when logic is tightly coupled or needs OR semantics.
- Keep policy names business-focused and stable.
- Unit-test handlers and integration-test endpoint authorization behavior.

## Real-World Analogy

Think of entering a high-security room:

- Policy A checks employee badge.
- Policy B checks active subscription clearance.
- Policy C checks training certification.

You pass only if every required checkpoint approves you.
