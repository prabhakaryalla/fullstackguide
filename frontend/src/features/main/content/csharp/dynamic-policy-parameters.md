# How Do You Pass Parameters to Authorization Policies Dynamically at Runtime?

In ASP.NET Core, policies are usually static (defined once at startup). But real apps often need runtime values such as a minimum age, tenant id, or permission name.

## Why Static Policies Fall Short

A static policy like this is fixed forever:

```csharp
options.AddPolicy("CanViewReports", p => p.RequireClaim("permission", "reports:view"));
```

This works, but it cannot easily support values that vary per endpoint like:

- `Permission:Orders.Read`
- `Permission:Orders.Write`
- `AgeOver:21`

## Pattern 1: Dynamic Policy Names + Custom Policy Provider

A common approach is to encode parameters in the policy name and generate the policy at runtime.

### Step 1: Create an Authorization Requirement

```csharp
public sealed class PermissionRequirement : IAuthorizationRequirement
{
    public PermissionRequirement(string permission)
    {
        Permission = permission;
    }

    public string Permission { get; }
}
```

### Step 2: Create a Handler

```csharp
public sealed class PermissionHandler : AuthorizationHandler<PermissionRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        PermissionRequirement requirement)
    {
        var permissions = context.User.FindAll("permission").Select(c => c.Value);

        if (permissions.Contains(requirement.Permission, StringComparer.OrdinalIgnoreCase))
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
```

### Step 3: Implement IAuthorizationPolicyProvider

```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;

public sealed class DynamicAuthorizationPolicyProvider : DefaultAuthorizationPolicyProvider
{
    private const string Prefix = "Permission:";

    public DynamicAuthorizationPolicyProvider(IOptions<AuthorizationOptions> options)
        : base(options)
    {
    }

    public override Task<AuthorizationPolicy?> GetPolicyAsync(string policyName)
    {
        if (policyName.StartsWith(Prefix, StringComparison.OrdinalIgnoreCase))
        {
            var permission = policyName[Prefix.Length..];

            var policy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .AddRequirements(new PermissionRequirement(permission))
                .Build();

            return Task.FromResult<AuthorizationPolicy?>(policy);
        }

        return base.GetPolicyAsync(policyName);
    }
}
```

### Step 4: Register Services

```csharp
builder.Services.AddAuthorization();
builder.Services.AddSingleton<IAuthorizationPolicyProvider, DynamicAuthorizationPolicyProvider>();
builder.Services.AddSingleton<IAuthorizationHandler, PermissionHandler>();
```

### Step 5: Use It on Endpoints

```csharp
[Authorize(Policy = "Permission:Orders.Read")]
[HttpGet("orders")]
public IActionResult GetOrders() => Ok();

[Authorize(Policy = "Permission:Orders.Write")]
[HttpPost("orders")]
public IActionResult CreateOrder() => Ok();
```

Now the parameter (`Orders.Read`, `Orders.Write`) is passed dynamically through the policy string.

## Pattern 2: Resource-Based Authorization

If authorization depends on runtime data (for example, whether the current user owns a specific order), pass the resource directly:

```csharp
var order = await repository.GetByIdAsync(orderId);
var result = await authorizationService.AuthorizeAsync(User, order, "CanEditOrder");

if (!result.Succeeded)
{
    return Forbid();
}
```

This is useful when checks require domain objects, not just claims.

## When to Use Which Pattern

- Use dynamic policy provider when the rule is parameterized but reusable (`Permission:X`, `AgeOver:Y`).
- Use resource-based authorization when decisions depend on runtime entity data.

## Real-World Example

In a SaaS ERP app:

- Finance endpoints use `Permission:Finance.Read`.
- Invoice creation uses `Permission:Finance.Write`.
- Tenant-specific checks use resource-based handlers against invoice ownership.

This design keeps controller code clean while supporting runtime authorization variation.

## Common Mistakes

- Creating hundreds of static policies instead of one dynamic provider.
- Forgetting `RequireAuthenticatedUser()` in generated policies.
- Encoding complex JSON in policy names. Keep names simple and parseable.

## Quick Summary

ASP.NET Core does not directly accept arbitrary runtime parameters in `[Authorize]`, but you can achieve it cleanly by:

- encoding parameter values in the policy name
- generating policies with a custom `IAuthorizationPolicyProvider`
- validating those values in custom authorization handlers
