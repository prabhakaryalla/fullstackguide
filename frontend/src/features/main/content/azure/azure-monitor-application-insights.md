# Azure Monitor and Application Insights

Azure Monitor is the umbrella platform for metrics, logs, and alerts across every Azure resource; Application Insights is its application-performance-monitoring (APM) layer, specifically instrumenting your own code for request tracing, dependency tracking, and exception telemetry.

## Short Answer

**Azure Monitor** collects **Metrics** (numeric time-series data — CPU, request count, queue length) and **Logs** (detailed event data, queryable via the Kusto Query Language in Log Analytics), and lets you configure **Alerts** that react automatically when a metric or log query crosses a threshold. **Application Insights** is Azure Monitor's application-level component — instrumented directly into your application code (via an SDK or auto-instrumentation) to capture request/response telemetry, dependency calls (HTTP, SQL), exceptions, and end-to-end distributed traces across services.

## Metrics vs Logs

```
Metric: CPU Percentage = 87%, at 14:32:00, for VM "web-01"
  → lightweight, numeric, stored efficiently, great for near-real-time alerting

Log: { timestamp: "14:32:05", level: "Error", message: "Payment failed", orderId: 4821, ... }
  → rich, structured/unstructured event data, queried via KQL (Kusto Query Language)
```

- Metrics are optimized for fast, near-real-time alerting on numeric trends. Logs carry much richer detail but are comparatively more expensive to store/query at scale and have higher query latency than metrics.
- **Log Analytics Workspace** is where logs are actually stored and queried — Azure Monitor Logs, Application Insights telemetry, and many Azure resource diagnostic logs can all be routed into the same workspace for unified querying.

## Kusto Query Language (KQL)

```kusto
requests
| where timestamp > ago(1h)
| where success == false
| summarize FailureCount = count() by resultCode, bin(timestamp, 5m)
| order by timestamp desc
```

- KQL is the query language for Log Analytics/Application Insights data — conceptually similar to SQL but built specifically for filtering, aggregating, and time-windowing large volumes of log/telemetry data efficiently.
- Being comfortable reading/writing basic KQL (`where`, `summarize`, `join`, `bin()` for time bucketing) is a genuinely practical, frequently-tested senior-level Azure skill, since it's how you actually investigate incidents in production.

## Application Insights: Application-Level Telemetry

```csharp
// Auto-instrumented via the SDK - captures this automatically, no manual code needed:
// - Incoming HTTP requests (duration, status code, route)
// - Outgoing dependency calls (SQL queries, HTTP calls to other services, duration)
// - Unhandled exceptions, with full stack trace

// Custom telemetry - for business-specific events the SDK can't infer on its own:
telemetryClient.TrackEvent("OrderPlaced", new Dictionary<string, string> { ["OrderId"] = orderId });
telemetryClient.TrackMetric("CartValue", cartTotal);
```

- **Application Map** visualizes your entire distributed system's dependency graph automatically, derived from captured telemetry — showing which services call which, with aggregated latency and failure rates per connection, without you manually drawing or maintaining that diagram.
- **Distributed tracing** correlates a single request across multiple services (similar in concept to AWS X-Ray or OpenTelemetry tracing) — Application Insights automatically propagates a correlation ID across HTTP calls between instrumented services, letting you see one request's full timeline end-to-end.
- **Live Metrics** provides a near-real-time (sub-second) streaming view of requests/failures/dependencies — useful during an active deployment or incident, when you need to see what's happening *right now*, not after the usual few minutes of log ingestion delay.

## Alerts

```
Alert Rule: Average response time > 2 seconds, evaluated over 5 minutes, for 2 consecutive periods
  → Action Group: notify via email/SMS/webhook, and/or trigger an Azure Automation runbook
```

- Alerts can be based on metrics, log query results (via a scheduled KQL query), or Application Insights availability tests (synthetic checks pinging your endpoint from multiple global locations on a schedule).
- An **Action Group** decouples "what triggers an alert" from "what happens when it fires" — the same action group (notify the on-call team, trigger an auto-remediation runbook) can be reused across many different alert rules.

## Common Mistake

Instrumenting Application Insights for request/exception telemetry but never adding custom business-event tracking (`TrackEvent`/`TrackMetric`) — infrastructure and request-level metrics can look perfectly healthy while a business process is silently failing (e.g. checkout completions dropping to zero due to a logic bug unrelated to request success/failure rates). Combining both infrastructure-level and business-level telemetry is what actually gives complete observability.

## Summary

Azure Monitor is the platform-wide umbrella for metrics, logs, and alerts across all Azure resources, queried via KQL in Log Analytics. Application Insights is its application-focused layer, auto-instrumenting requests/dependencies/exceptions and providing distributed tracing and an automatically-generated Application Map — extended with custom events/metrics for business-level visibility that infrastructure telemetry alone can't provide.
