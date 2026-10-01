# Health Checks in ASP.NET Core

Health checks give infrastructure (load balancers, Kubernetes, orchestrators) a standard, queryable way to ask "is this instance actually able to serve traffic right now" — going well beyond "is the process still running" to check the things that can silently fail while the app itself stays up.

## Short Answer

`Microsoft.Extensions.Diagnostics.HealthChecks` exposes an HTTP endpoint that reports the application's health, aggregated from individually registered checks (database connectivity, a downstream API, disk space, a message queue connection). Kubernetes and load balancers use this to decide whether to route traffic to an instance, restart it, or wait before sending it live traffic after startup.

## Registering Health Checks

```csharp
builder.Services.AddHealthChecks()
    .AddSqlServer(connectionString, name: "database")
    .AddUrlGroup(new Uri("https://payments-api/health"), name: "payments-api")
    .AddCheck<DiskSpaceHealthCheck>("disk-space");

app.MapHealthChecks("/health");
```

```
GET /health
→ 200 OK  { "status": "Healthy" }         - if every check passes
→ 503 Service Unavailable                  - if any check reports Unhealthy
```

- Each check independently reports `Healthy`, `Degraded`, or `Unhealthy` — the overall endpoint result is the aggregate across all registered checks, so a single failing dependency (a downed database, an unreachable downstream API) can correctly mark the whole instance as unhealthy.

## Liveness vs Readiness: Two Different Questions

```csharp
app.MapHealthChecks("/health/live", new HealthCheckOptions
{
    Predicate = check => check.Tags.Contains("live") // only checks tagged "live"
});

app.MapHealthChecks("/health/ready", new HealthCheckOptions
{
    Predicate = check => check.Tags.Contains("ready") // only checks tagged "ready"
});
```

- **Liveness**: "Is the process itself still functioning, or should it be killed and restarted?" — typically a minimal check (the process can respond to HTTP at all) since a false-positive "unhealthy" here causes an unnecessary restart.
- **Readiness**: "Is this instance ready to receive traffic right now?" — a fuller check including dependencies (database, downstream services), since a false-positive "healthy" here means traffic gets routed to an instance that can't actually serve requests correctly.
- Kubernetes explicitly supports both concepts (`livenessProbe` and `readinessProbe`) as separate configurations for exactly this reason — conflating the two (using one check for both purposes) either causes unnecessary restarts (a struggling dependency triggers a liveness failure and a pointless restart, when the process itself is fine) or routes traffic to instances that can't actually serve it (a readiness check too lenient to catch a real dependency outage).

## A Custom Health Check

```csharp
public class DiskSpaceHealthCheck : IHealthCheck
{
    public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken ct = default)
    {
        var freeSpaceGb = GetFreeDiskSpaceGb();
        return Task.FromResult(freeSpaceGb switch
        {
            < 1  => HealthCheckResult.Unhealthy($"Only {freeSpaceGb}GB free"),
            < 5  => HealthCheckResult.Degraded($"Low disk space: {freeSpaceGb}GB free"),
            _    => HealthCheckResult.Healthy($"{freeSpaceGb}GB free")
        });
    }
}
```

- `Degraded` is a genuinely useful third state between healthy and unhealthy — it can signal "still functioning, but something's worth alerting on" without actually pulling the instance out of rotation the way `Unhealthy` typically does.

## Common Mistake

Using the same, single `/health` endpoint (with the same aggregated checks) for both Kubernetes' liveness and readiness probes — a temporary blip in a downstream dependency then causes Kubernetes to restart perfectly healthy application instances (liveness failure), rather than simply routing traffic away from them temporarily until the dependency recovers (which is what a properly separated readiness probe would do).

## Summary

Health checks give orchestrators and load balancers a standard, queryable signal for whether an instance can actually serve traffic, aggregating individual checks (database, downstream services, disk space) into an overall status. Separating liveness (should this process be restarted?) from readiness (should traffic be routed here right now?) is the key design decision — conflating them causes either unnecessary restarts or traffic routed to instances that can't properly serve it.
