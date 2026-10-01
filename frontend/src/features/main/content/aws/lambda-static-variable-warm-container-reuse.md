# Static/Global Variables and "Warm" Lambda Container Reuse

Lambda's execution environment reuse is normally framed as a performance win — but the same reuse means mutable state stored outside the handler silently survives across invocations that look, from the caller's perspective, completely independent.

## The Trap

```python
import boto3

request_count = 0  # looks like it resets "per invocation" - it does NOT

def handler(event, context):
    global request_count
    request_count += 1
    print(f"This container has handled {request_count} requests")
    return {"count": request_count}
```

**What most people expect:** each Lambda invocation is isolated, so `request_count` should always be `1`.

**What actually happens:** as long as AWS reuses the same warm execution environment for the next invocation, `request_count` keeps climbing — `1`, `2`, `3`, ... — across calls that the caller has no reason to think are related at all.

## Why This Happens

- Lambda doesn't tear down and recreate the entire execution environment after every single invocation — for performance, it keeps a container "warm" and reuses it for the next invocation whenever one arrives before the environment is reclaimed.
- Anything defined **outside the handler function** (module/global scope) is initialized once per execution environment, not once per invocation — it persists in memory across every invocation that same warm container happens to serve.
- This is invisible in typical local testing (invoking the function once at a time) and often invisible even in low-traffic production usage — it only becomes obvious under enough sustained traffic that the same container serves many requests in a row.

## Where This Reuse Is Actually the Right Tool

```python
import boto3

s3_client = boto3.client('s3')  # created ONCE per environment, reused across warm invocations - GOOD

def handler(event, context):
    return s3_client.get_object(Bucket=event['bucket'], Key=event['key'])
```

Initializing an expensive, **stateless** resource (an SDK client, a database connection) at module scope is the officially recommended pattern — it's the entire reason Lambda's cold-start guidance tells you to move expensive setup outside the handler. The trap isn't module-level initialization itself; it's specifically **mutable, per-request state** stored the same way, which quietly leaks across invocations that should be independent.

## Common Mistake

Assuming Lambda guarantees a fresh, isolated environment for every single invocation the way a brand-new process would. It doesn't — warm reuse is a deliberate, documented optimization, and any counter, cache, or in-memory flag stored outside the handler needs to be treated with exactly the same care as a static/global variable in any other long-running server process, because that's effectively what a warm Lambda container is.

## Summary

Code outside a Lambda handler runs once per execution environment, not once per invocation — a genuine performance win for expensive, stateless resources like SDK clients, but a subtle correctness bug the moment mutable, per-request state (a counter, a cache that should reset each call) is stored the same way. Never assume "this only exists for one request" for anything defined at module/global scope in a Lambda function.
