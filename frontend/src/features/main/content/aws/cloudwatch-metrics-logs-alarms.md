# CloudWatch: Metrics, Logs, and Alarms

CloudWatch is AWS's built-in monitoring and observability service — it collects metrics (numeric time-series data), logs (text/structured event data), and lets you configure alarms that react automatically when something crosses a defined threshold.

## Short Answer

**Metrics** are numeric data points over time (CPU utilization, request count, error rate) — AWS services publish many built-in metrics automatically, and you can publish your own custom metrics from application code. **Logs** capture detailed, often text-based event data (application logs, Lambda execution logs, VPC flow logs) organized into Log Groups and Log Streams. **Alarms** watch a metric against a threshold and trigger an action (notify via SNS, auto-scale, stop an instance) when that threshold is breached for a sustained period.

## Metrics

```
Namespace: AWS/EC2
Metric: CPUUtilization
Dimension: InstanceId = i-0abc123
Period: 5 minutes
```

- Every metric belongs to a **namespace** (grouping related metrics, e.g. `AWS/EC2`, `AWS/Lambda`) and is further broken down by **dimensions** (e.g. which specific instance, function, or queue the data point is about).
- Most AWS services automatically publish relevant metrics at no extra setup cost — CPU/network for EC2, invocation count/duration/errors for Lambda, queue depth for SQS — giving you baseline visibility without writing any custom instrumentation.
- **Custom Metrics** let application code publish its own business-relevant data points (e.g. "orders processed per minute," "checkout conversion rate") via the `PutMetricData` API, extending monitoring beyond what AWS's built-in metrics cover.

## Logs

```
Log Group: /aws/lambda/my-function
  Log Stream: 2026/09/29/[$LATEST]abc123...
    "START RequestId: ..."
    "Processing order 12345"
    "END RequestId: ..."
```

- A **Log Group** is a named collection of logs (typically one per application/function/service); a **Log Stream** within it represents a single source of log events (e.g. one Lambda execution environment, or one EC2 instance's log file).
- **CloudWatch Logs Insights** lets you run query-language searches directly against log data — filtering, aggregating, and extracting fields from raw log lines without needing to export logs to a separate analysis tool first.
- **Metric Filters** can turn specific log patterns into a numeric metric automatically — e.g. counting occurrences of the string `"ERROR"` across a log group and exposing that count as a metric you can then alarm on.

## Alarms

```
Alarm: HighCPU
  Metric: CPUUtilization
  Threshold: > 80%
  Evaluation Periods: 3 consecutive periods of 5 minutes (15 minutes sustained)
  Action: Notify SNS topic "ops-alerts" AND trigger Auto Scaling policy "scale-out"
```

- An alarm doesn't fire on a single instantaneous breach — it requires the threshold to be breached across a configured number of **evaluation periods**, avoiding false alarms from brief, transient spikes.
- Alarms can trigger more than just a notification — they commonly drive Auto Scaling actions directly (scale out when CPU is high, scale in when it's low) or invoke a Lambda function to take automated remediation action.
- **Composite Alarms** combine multiple individual alarms with AND/OR logic (e.g. "alert only if both high error rate AND high latency are true simultaneously") — reducing noisy, low-value alerts from a single flaky metric.

## Common Mistake

Relying purely on default AWS-provided metrics and never adding custom, business-relevant metrics or alarms — infrastructure-level metrics (CPU, memory) can all look perfectly healthy while the actual business process is failing (e.g. checkout success rate silently dropping to zero due to an application bug unrelated to resource utilization). Effective monitoring combines both infrastructure metrics and application/business-level custom metrics.

## Summary

CloudWatch Metrics track numeric trends over time (built-in and custom), Logs capture detailed event-level data organized into groups and streams (with Insights for querying), and Alarms watch metrics against thresholds to trigger notifications or automated remediation. A well-monitored system uses all three together — metrics for trends, logs for detailed investigation, and alarms to react automatically before a human even notices a problem.
