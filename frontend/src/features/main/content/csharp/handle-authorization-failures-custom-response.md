# How Do You Handle Authorization Failures and Customize the Response in ASP.NET Core?

Authorization failures in ASP.NET Core usually return:

- `401 Unauthorized` when the user is not authenticated
- `403 Forbidden` when the user is authenticated but not allowed

In production systems, you often need richer, consistent API responses instead of default empty or generic responses.

## Where Customization Happens

You can customize failure behavior at multiple levels:

- authentication challenge/forbid events (scheme-level)
- middleware result handling for authorization
- endpoint-level/manual checks with `IAuthorizationService`

Use the right level depending on whether you need global behavior or endpoint-specific behavior.

## Approach 1: Customize Challenge/Forbid in Authentication Events

For JWT Bearer APIs, override `OnChallenge` and `OnForbidden`.

```csharp
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.JwtBearer;

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Events = new JwtBearerEvents
        {
            OnChallenge = async context =>
            {
                // Suppress default behavior so we can write our own response body.
                context.HandleResponse();

                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Response.ContentType = "application/json";

                var payload = new
                {
                    error = "unauthorized",
                    message = "Authentication is required to access this resource.",
                    traceId = context.HttpContext.TraceIdentifier
                };

                await context.Response.WriteAsync(JsonSerializer.Serialize(payload));
            },
            OnForbidden = async context =>
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                context.Response.ContentType = "application/json";

                var payload = new
                {
                    error = "forbidden",
                    message = "You are authenticated but do not have sufficient permissions.",
                    traceId = context.HttpContext.TraceIdentifier
                };

                await context.Response.WriteAsync(JsonSerializer.Serialize(payload));
            }
        };
    });
```

Best for:

- APIs using one dominant auth scheme
- consistent JSON responses for all unauthorized/forbidden results

## Approach 2: Global AuthorizationMiddlewareResultHandler

Use `IAuthorizationMiddlewareResultHandler` to customize how authorization middleware translates failures into HTTP responses.

```csharp
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Policy;

public sealed class CustomAuthorizationResultHandler : IAuthorizationMiddlewareResultHandler
{
    private readonly AuthorizationMiddlewareResultHandler _defaultHandler = new();

    public async Task HandleAsync(
        RequestDelegate next,
        HttpContext context,
        AuthorizationPolicy policy,
        PolicyAuthorizationResult authorizeResult)
    {
        if (authorizeResult.Forbidden)
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            context.Response.ContentType = "application/json";

            var payload = new
            {
                error = "forbidden",
                message = "Policy requirements were not satisfied.",
                traceId = context.TraceIdentifier
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(payload));
            return;
        }

        if (authorizeResult.Challenged)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            context.Response.ContentType = "application/json";

            var payload = new
            {
                error = "unauthorized",
                message = "Provide valid credentials.",
                traceId = context.TraceIdentifier
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(payload));
            return;
        }

        await _defaultHandler.HandleAsync(next, context, policy, authorizeResult);
    }
}
```

Register it:

```csharp
builder.Services.AddSingleton<IAuthorizationMiddlewareResultHandler, CustomAuthorizationResultHandler>();
```

Best for:

- centralized policy failure formatting
- consistent handling across multiple auth schemes

## Approach 3: Manual Authorization with Rich Domain Responses

When failure reasons depend on business context, authorize manually in endpoint/service:

```csharp
var result = await authorizationService.AuthorizeAsync(User, document, "CanEditDocument");
if (!result.Succeeded)
{
    return Results.Json(
        new
        {
            error = "forbidden",
            reason = "Only document owners can edit draft documents."
        },
        statusCode: StatusCodes.Status403Forbidden);
}
```

Best for:

- resource-based checks
- user-facing domain-specific error details

## Returning Failure Reasons Safely

Authorization failures may include internal details (`AuthorizationFailure`).

Guidelines:

- log full technical reasons internally
- return minimal, safe messages externally
- avoid exposing sensitive claims/policy structure

## 401 vs 403 Decision Table

| Condition | Status |
| --- | --- |
| No/invalid credentials | 401 |
| Valid credentials but insufficient access | 403 |

Misclassifying these codes causes client confusion and retry issues.

## Real-World Pattern

Many teams standardize all error payloads to RFC 7807 Problem Details.

```csharp
return Results.Problem(
    title: "Forbidden",
    detail: "You do not have the required permission.",
    statusCode: StatusCodes.Status403Forbidden,
    extensions: new Dictionary<string, object?>
    {
        ["traceId"] = httpContext.TraceIdentifier
    });
```

This keeps client handling uniform across validation, authn, and authz errors.

## Common Pitfalls

- Writing a response body without calling `HandleResponse()` in `OnChallenge`.
- Returning `403` for unauthenticated users.
- Leaking internal policy names or claim values in error messages.
- Customizing one auth scheme while requests use another scheme.

## Summary

To handle authorization failures well in ASP.NET Core:

1. Distinguish clearly between `401` and `403`.
2. Centralize response shape with auth events or middleware result handler.
3. Use manual authorization for resource-specific business messages.
4. Keep external responses safe and log technical details internally.
