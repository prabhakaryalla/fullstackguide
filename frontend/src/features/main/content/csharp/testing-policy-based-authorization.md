# How Do You Test Policy-Based Authorization Logic Effectively in Unit and Integration Tests?

Good authorization testing uses two layers:

- unit tests for requirements/handlers
- integration tests for end-to-end policy behavior on real endpoints

Both are necessary because policy logic can fail in handlers, registration, middleware order, or authentication setup.

## What to Test

You should validate:

- policy requirements pass for valid users
- policy requirements fail for invalid users
- multiple requirement combinations (AND behavior)
- challenge vs forbid behavior (401 Unauthorized vs 403 Forbidden)
- endpoint-level policy wiring (wrong policy name, missing attribute)

## 1) Unit Test Authorization Handlers

Unit tests are fast and isolate business rules inside handlers.

### Sample Requirement + Handler

```csharp
using Microsoft.AspNetCore.Authorization;

public sealed class MinimumAgeRequirement : IAuthorizationRequirement
{
    public int MinimumAge { get; }
    public MinimumAgeRequirement(int minimumAge) => MinimumAge = minimumAge;
}

public sealed class MinimumAgeHandler : AuthorizationHandler<MinimumAgeRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        MinimumAgeRequirement requirement)
    {
        var dobClaim = context.User.FindFirst("date_of_birth")?.Value;
        if (DateOnly.TryParse(dobClaim, out var dob))
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);
            var age = today.Year - dob.Year;
            if (dob > today.AddYears(-age)) age--;

            if (age >= requirement.MinimumAge)
            {
                context.Succeed(requirement);
            }
        }

        return Task.CompletedTask;
    }
}
```

### Unit Test Pattern

```csharp
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Xunit;

public class MinimumAgeHandlerTests
{
    [Fact]
    public async Task Succeeds_When_User_Meets_Minimum_Age()
    {
        var requirement = new MinimumAgeRequirement(18);
        var user = new ClaimsPrincipal(new ClaimsIdentity(
        [
            new Claim("date_of_birth", "2000-01-01")
        ],
        "test"));

        var context = new AuthorizationHandlerContext([requirement], user, resource: null);
        var handler = new MinimumAgeHandler();

        await handler.HandleAsync(context);

        Assert.True(context.HasSucceeded);
    }

    [Fact]
    public async Task Fails_When_User_Is_Too_Young()
    {
        var requirement = new MinimumAgeRequirement(65);
        var user = new ClaimsPrincipal(new ClaimsIdentity(
        [
            new Claim("date_of_birth", "2000-01-01")
        ],
        "test"));

        var context = new AuthorizationHandlerContext([requirement], user, resource: null);
        var handler = new MinimumAgeHandler();

        await handler.HandleAsync(context);

        Assert.False(context.HasSucceeded);
    }
}
```

Why this helps:

- no HTTP server needed
- deterministic validation of requirement logic
- easy edge-case coverage (missing claim, malformed claim, boundary age)

## 2) Integration Test Endpoint Authorization

Integration tests verify real runtime behavior:

- authentication middleware
- authorization middleware
- policy registration
- endpoint attributes or `RequireAuthorization`

### Setup With WebApplicationFactory

```csharp
public class ApiFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureTestServices(services =>
        {
            services.AddAuthentication("Test")
                .AddScheme<AuthenticationSchemeOptions, TestAuthHandler>("Test", _ => { });
        });
    }
}
```

### Fake Auth Handler for Test Identities

```csharp
public sealed class TestAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    public TestAuthHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock) : base(options, logger, encoder, clock)
    {
    }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        // Build claims from request headers to vary user identity per test.
        var claims = new List<Claim>();
        if (Request.Headers.TryGetValue("x-permission", out var permission))
        {
            claims.Add(new Claim("permission", permission.ToString()));
        }

        var identity = new ClaimsIdentity(claims, "Test");
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, "Test");

        return Task.FromResult(AuthenticateResult.Success(ticket));
    }
}
```

### Integration Test Cases

```csharp
[Fact]
public async Task Returns_401_When_Not_Authenticated()
{
    await using var factory = new ApiFactory();
    using var client = factory.CreateClient();

    var response = await client.GetAsync("/invoices");
    Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
}

[Fact]
public async Task Returns_403_When_Authenticated_But_Missing_Permission()
{
    await using var factory = new ApiFactory();
    using var client = factory.CreateClient();

    var request = new HttpRequestMessage(HttpMethod.Get, "/invoices");
    // No x-permission header => authenticated but unauthorized for policy.
    var response = await client.SendAsync(request);

    Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
}

[Fact]
public async Task Returns_200_When_User_Satisfies_Policy()
{
    await using var factory = new ApiFactory();
    using var client = factory.CreateClient();

    var request = new HttpRequestMessage(HttpMethod.Get, "/invoices");
    request.Headers.Add("x-permission", "invoices.read");

    var response = await client.SendAsync(request);
    Assert.Equal(HttpStatusCode.OK, response.StatusCode);
}
```

## 401 vs 403 Rule (Very Important)

- 401 Unauthorized: user is not authenticated.
- 403 Forbidden: user is authenticated but fails policy requirements.

Always assert these separately to catch misconfigured authentication schemes.

## Strategy for Effective Coverage

Use a test matrix:

- authenticated: yes/no
- required claim present: yes/no
- claim value valid/invalid
- multi-requirement policy: partial/full match

This catches most real authorization regressions.

## Common Mistakes

- Only testing handlers and skipping integration tests.
- Only checking status code 403 and never validating 401 paths.
- Accidentally bypassing authorization with test-only middleware changes.
- Hard-coding one test identity that hides policy edge cases.

## Recommended Testing Split

- Unit tests: all custom requirement handlers and edge conditions.
- Integration tests: critical protected endpoints and middleware behavior.
- Optional end-to-end tests: one smoke path through the real identity provider in staging.

## Summary

To test policy-based authorization effectively:

1. Unit-test each authorization handler in isolation.
2. Integration-test endpoint behavior with controlled test identities.
3. Explicitly verify both 401 and 403 outcomes.
4. Use a claims/requirements matrix to cover edge cases and prevent regressions.
