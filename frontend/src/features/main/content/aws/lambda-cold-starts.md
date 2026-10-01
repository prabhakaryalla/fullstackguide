# Lambda Cold Starts

The very first time a Lambda function runs (or runs after being idle), AWS has to initialize a new execution environment before your code can start — that initialization delay is a "cold start," and it's one of the most commonly asked practical Lambda questions in interviews.

## Short Answer

A **cold start** is the extra latency incurred when AWS Lambda has to provision a brand-new execution environment (download your code, start the runtime, run any initialization code outside your handler) before it can invoke your function — as opposed to a **warm start**, where an existing, already-initialized environment from a previous invocation is reused, skipping all of that setup.

## What Happens During a Cold Start

```
Cold start:
  1. AWS provisions a new execution environment (a lightweight VM/container)
  2. Your deployment package (code + dependencies) is downloaded and unpacked
  3. The language runtime starts up
  4. Code OUTSIDE your handler function runs (imports, SDK client creation, DB connections)
  5. Your handler function finally runs

Warm start (environment reused from a previous invocation):
  1. Your handler function runs immediately — steps 1-4 already happened previously
```

- Steps 1–4 are the cold start overhead — your actual handler logic (step 5) takes the same time either way. The *total* added latency from a cold start varies by runtime and package size, but can range from tens of milliseconds to a few seconds for a large deployment package or a runtime with heavier startup cost.
- AWS keeps an execution environment "warm" for a period after it finishes handling an invocation, ready to be reused for the next one — but if no invocations arrive for a while, the environment is eventually torn down, and the next invocation is cold again.

## What Makes Cold Starts Worse

- **Package size** — a large deployment package (or a large container image, if using container-based Lambda) takes longer to download and unpack before your code can even start running.
- **Runtime choice** — interpreted/JIT runtimes (Node.js, Python) generally cold-start faster than runtimes with heavier startup cost (the JVM for Java, .NET's CLR) — though this gap has narrowed considerably with recent runtime and tooling improvements.
- **VPC-attached functions** (historically) added extra cold-start latency for provisioning an ENI — AWS has significantly improved this over time, but it's still a factor worth knowing for functions that must access VPC-only resources (like an RDS instance in a private subnet).
- **Code outside the handler doing expensive work** — e.g. establishing a database connection or loading a large ML model at import time runs on every cold start; if it's slow, every cold start pays that cost.

## Mitigating Cold Starts

**Provisioned Concurrency** — keeps a specified number of execution environments pre-initialized and ready at all times, eliminating cold starts entirely for invocations within that provisioned capacity (at an ongoing cost, since you pay to keep those environments warm even when idle):

```
aws lambda put-provisioned-concurrency-config \
  --function-name my-function \
  --qualifier prod \
  --provisioned-concurrent-executions 5
```

**Keep deployment packages small** — bundle only what's actually needed at runtime; avoid pulling in an entire SDK or large library when only a small part of it is used.

**Reuse expensive resources across invocations** — initialize database connections, HTTP clients, and SDK clients *outside* the handler function (at module/global scope), so a warm invocation reuses the same connection instead of re-establishing it every single time:

```python
import boto3

s3_client = boto3.client('s3')  # created ONCE per execution environment, reused across warm invocations

def handler(event, context):
    return s3_client.get_object(Bucket=event['bucket'], Key=event['key'])
```

## Common Mistake

Creating an expensive client/connection **inside** the handler function instead of outside it — this re-does that expensive setup on *every single invocation*, even warm ones, throwing away the primary benefit of environment reuse. Moving that initialization to module-level scope (executed once per environment, not once per invocation) is one of the simplest, highest-impact Lambda performance fixes.

## Summary

A cold start is the one-time setup cost of provisioning a new Lambda execution environment — package download, runtime startup, and any module-level initialization code. It's mitigated by keeping deployment packages small, initializing expensive resources outside the handler (so warm invocations reuse them), and, for latency-critical functions, using Provisioned Concurrency to keep environments pre-warmed at all times.
