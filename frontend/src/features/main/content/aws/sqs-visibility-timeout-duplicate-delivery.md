# SQS Visibility Timeout and Duplicate Message Delivery

SQS guarantees **at-least-once** delivery — not exactly-once — and the mechanism behind that guarantee (the visibility timeout) is exactly what causes a perfectly successful consumer to sometimes process the very same message twice.

## The Trap

```
1. Consumer A receives message #123 from the queue.
2. The message becomes INVISIBLE to other consumers for the visibility timeout period (e.g. 30 seconds).
3. Consumer A starts processing message #123 - it takes 45 seconds (longer than the timeout!).
4. At 30 seconds, the visibility timeout EXPIRES, and #123 becomes visible again.
5. Consumer B receives the SAME message #123 and starts processing it too.
6. Consumer A finally finishes at 45 seconds and deletes #123 from the queue.
7. Consumer B is now independently processing a message that's already been fully handled.
```

**What most people expect:** once a consumer receives a message, no other consumer will ever see it, since SQS "removed" it from the queue.

**What actually happens:** the message was never removed — it was only hidden for a fixed **visibility timeout** window. If processing takes longer than that window, the message reappears and can be picked up by a second consumer, even though the first consumer is still (successfully) working on it.

## Why This Happens

- A message is only permanently removed from the queue when the consumer explicitly calls `DeleteMessage` after successfully processing it — receiving a message is not the same as deleting it.
- The **visibility timeout** is SQS's way of handling a consumer that crashes or hangs mid-processing without ever deleting the message: after the timeout expires, SQS assumes something went wrong and makes the message visible again so another consumer can retry it.
- The trap is that SQS has no way to distinguish "the consumer crashed" from "the consumer is still working, just slower than the configured timeout" — both look identical from the queue's perspective, so both result in the message reappearing.

## The Fix: Match the Timeout to Real Processing Time (and Design for Duplicates Anyway)

```
Option 1: Set the visibility timeout comfortably longer than the expected (worst-case) processing time.

Option 2: For genuinely long-running or unpredictable processing, call ChangeMessageVisibility
periodically ("heartbeat") to extend the timeout while work is still actively in progress.

Option 3 (always do this regardless): Design message processing to be IDEMPOTENT, so processing
the same message twice produces the same end result as processing it once - because at-least-once
delivery means duplicates are a NORMAL, expected outcome, not just a rare edge case.
```

- Tuning the visibility timeout reduces how *often* duplicates happen, but SQS's delivery guarantee is fundamentally **at-least-once** — network retries, consumer crashes after processing but before deleting, and Lambda-triggered consumers being invoked more than once for the same message can all still cause duplicates even with a perfectly tuned timeout.
- The only fully reliable fix is designing the actual processing logic to be idempotent (e.g. using the message's content to check "have I already applied this exact change" before acting, or using a database `UPSERT`/unique-constraint pattern) — treating duplicate delivery as a normal, expected part of using SQS rather than an occasional bug to work around.

## Common Mistake

Setting the visibility timeout equal to (or only slightly longer than) the *average* processing time instead of the worst-case — a single slow request (a downstream API hiccup, a large payload, GC pause) is all it takes to exceed the timeout and trigger a duplicate delivery, even though the "average" case would have been fine.

## Summary

SQS's visibility timeout hides a received message from other consumers temporarily, not permanently — if processing takes longer than that window, the message becomes visible again and can be delivered to a second consumer while the first is still working on it. This is a direct consequence of SQS's at-least-once delivery model, not a bug — the visibility timeout should be tuned to comfortably exceed worst-case processing time, and message processing logic should always be designed to tolerate occasional duplicate delivery via idempotency, regardless of how well the timeout is tuned.
