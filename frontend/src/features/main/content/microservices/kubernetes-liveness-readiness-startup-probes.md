# Kubernetes Probes: Liveness, Readiness, and Startup

Kubernetes doesn't know whether your application is actually working just because the container process is running — probes are how you tell it, and picking the wrong probe type (or misconfiguring one) is one of the most common sources of production incidents in Kubernetes clusters.

## Short Answer

- **Liveness probe** — "Is this container stuck/deadlocked? If it fails, kill and restart the container." Answers: should this pod be restarted?
- **Readiness probe** — "Is this container ready to receive traffic right now? If it fails, stop sending it requests, but don't restart it." Answers: should this pod receive traffic?
- **Startup probe** — "Has this container finished its (possibly slow) initial startup yet? Until it succeeds once, liveness/readiness probes are suspended entirely." Answers: is initial startup complete?

## Liveness Probe

```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 10
  failureThreshold: 3
```

- If this probe fails `failureThreshold` times in a row, Kubernetes **kills and restarts the container** — the assumption is that the application has entered a broken state (a deadlock, a stuck thread pool) that only a restart can fix.
- A liveness check should be **minimal** — just enough to confirm the process itself is genuinely responsive, not a full dependency check. A liveness probe that also checks a downstream database connection means a downed database causes Kubernetes to endlessly restart perfectly healthy application containers, which does nothing to fix the actual database outage and can make the incident worse.

## Readiness Probe

```yaml
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
  failureThreshold: 3
```

- If this probe fails, the pod is removed from the Service's load-balancing rotation — **no restart happens**, traffic is simply stopped until the probe passes again.
- This is exactly where dependency checks belong — "can I reach my database, my cache, my required downstream service" — because the correct response to a downstream outage is "stop sending me traffic until this is fixed," not "restart this container repeatedly," which a liveness probe would incorrectly trigger.
- Also critical during a **rolling deployment**: a new pod shouldn't receive traffic until it's actually finished initializing (loaded caches, established connections) — readiness gates exactly this, preventing users from hitting a pod that's technically running but not yet actually ready.

## Startup Probe

```yaml
startupProbe:
  httpGet:
    path: /healthz
    port: 8080
  failureThreshold: 30
  periodSeconds: 10   # allows up to 30 * 10 = 300 seconds for startup
```

- While a startup probe is configured and hasn't yet succeeded even once, **liveness and readiness probes are disabled entirely** — this exists specifically for applications with slow, unpredictable startup times (loading a large cache, running migrations).
- Without a startup probe, a slow-starting app can get killed by its own liveness probe before it ever finishes starting — the liveness probe's `initialDelaySeconds` would need to be set pessimistically long for *every* startup, even fast ones, if there were no separate startup probe to handle the slow case explicitly.

## The Classic Misconfiguration

```yaml
# BUG: liveness probe checks a downstream dependency
livenessProbe:
  httpGet:
    path: /health  # this endpoint internally checks database connectivity!
    port: 8080
```

If `/health` checks the database and the database has a brief outage, **every single pod** running this application gets killed and restarted by its liveness probe simultaneously — turning a downstream dependency blip into a full application outage, and potentially a restart storm that makes recovery slower once the database does come back (every pod restarting at once, re-establishing connections simultaneously).

## Common Mistake

Using the exact same health-check endpoint for both liveness and readiness — conflating "should this be restarted" with "should this receive traffic" causes exactly the dependency-outage cascading-restart failure mode above. Liveness should check almost nothing beyond "is the process alive and responsive"; readiness should check everything needed to safely serve real traffic.

## Summary

Liveness probes answer "should Kubernetes restart this container" and should check only the process's own basic responsiveness. Readiness probes answer "should this pod receive traffic" and are the right place for dependency checks, since the correct response to a failing dependency is removing traffic, not restarting. Startup probes suspend the other two while a slow-starting application initializes, preventing premature restarts during a legitimately long startup window.
