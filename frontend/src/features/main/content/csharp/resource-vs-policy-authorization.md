# What Is the Difference Between Resource-Based Authorization and Policy-Based Authorization?

Both approaches are part of ASP.NET Core authorization, but they solve different problems.

## Short Definition

- Policy-based authorization checks whether a user meets predefined rules (claims, roles, requirements).
- Resource-based authorization checks whether a user can access a specific runtime object (for example, a particular document or order).

## Policy-Based Authorization

Policy-based authorization is usually declarative and endpoint-focused.

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("CanManageInvoices", policy =>
        policy.RequireClaim("permission", "invoices.manage"));
});

[Authorize(Policy = "CanManageInvoices")]
[HttpPost("invoices")]
public IActionResult CreateInvoice() => Ok();
```

What happens:

- ASP.NET Core evaluates policy requirements before entering action logic.
- Decision is based mostly on user identity/claims.
- It does not naturally know which specific invoice/document instance is being accessed.

## Resource-Based Authorization

Resource-based authorization is imperative and object-focused.

```csharp
[HttpPut("documents/{id}")]
public async Task<IActionResult> UpdateDocument(Guid id)
{
    var document = await repository.GetByIdAsync(id);
    if (document is null) return NotFound();

    var authResult = await authorizationService.AuthorizeAsync(
        User,
        document,
        "CanEditDocument");

    if (!authResult.Succeeded)
    {
        return Forbid();
    }

    // update logic
    return Ok();
}
```

What happens:

- You load the target resource first.
- You call `AuthorizeAsync` with user + resource + policy/requirement.
- Handler can inspect resource state (owner id, tenant id, status, etc.).

## Key Differences

| Aspect | Policy-Based | Resource-Based |
| --- | --- | --- |
| Primary target | Endpoint/action | Specific runtime object |
| Typical style | Declarative via `[Authorize]` | Imperative via `IAuthorizationService` |
| Input data | User claims/roles/requirements | User + resource instance |
| Best for | Broad access rules | Ownership and context-sensitive rules |
| Timing | Before action body | Inside action/service after loading data |

## Real-World Example

Imagine a project management app:

- Policy-based: only users with `projects.read` permission can open project APIs.
- Resource-based: user can edit project only if they are the project owner or assigned manager.

You often use both together:

1. Policy-based check for coarse-grained access.
2. Resource-based check for fine-grained, per-entity access.

## When to Choose Which

Use policy-based when:

- Rules are generic and reusable.
- Decision depends only on user identity/claims.

Use resource-based when:

- Rule depends on the actual object being accessed.
- You need checks like owner, tenant isolation, record status, or approval stage.

## Common Mistake

Trying to enforce per-resource ownership with only `[Authorize(Policy = "...")]` without passing resource data. Policies alone cannot inspect a document that has not been loaded.

## Summary

Policy-based authorization answers: "Is this user generally allowed to use this capability?"

Resource-based authorization answers: "Is this user allowed to access this specific item right now?"
