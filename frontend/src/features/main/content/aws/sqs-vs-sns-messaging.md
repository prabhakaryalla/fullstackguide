# SQS vs SNS: Queue vs Pub/Sub Messaging

SQS and SNS are both fully managed AWS messaging services, but they implement fundamentally different delivery models — SQS is a queue where one message is consumed once, while SNS is a publish/subscribe topic that fans a message out to many subscribers at once.

## Short Answer

**SQS** (Simple Queue Service) is a point-to-point queue: a message sits in the queue until exactly one consumer polls, processes, and deletes it. **SNS** (Simple Notification Service) is a pub/sub topic: a published message is immediately pushed to **every** current subscriber (which can include multiple SQS queues, Lambda functions, HTTP endpoints, email, or SMS) — no single consumer "owns" or removes the message from others' view.

## SQS: One Message, One Consumer

```
Producer → [SQS Queue] → Consumer polls, processes, deletes the message

If 3 consumer instances are polling the same queue,
each message is still delivered to and processed by only ONE of them.
```

- Consumers actively **poll** the queue (long polling is recommended to reduce empty-response overhead) — messages aren't pushed to consumers automatically.
- A message becomes invisible to other consumers for a **visibility timeout** once one consumer receives it, giving that consumer time to process and explicitly delete it before another consumer could pick it up — if processing fails or times out without deletion, the message becomes visible again for another attempt.
- Ideal for **decoupling a producer from a worker pool** — multiple workers can pull from the same queue to parallelize processing, but each individual message is handled exactly once (not duplicated across workers).
- Supports a **Dead Letter Queue (DLQ)** — messages that fail processing repeatedly (exceeding a configured retry count) are automatically moved to a separate queue for investigation, instead of endlessly retrying or silently disappearing.

## SNS: One Message, Many Subscribers

```
Producer → [SNS Topic] → pushed to EVERY current subscriber simultaneously:
                             ├── SQS Queue (Order Processing)
                             ├── SQS Queue (Analytics)
                             ├── Lambda function (send confirmation email)
                             └── HTTPS endpoint (webhook to a partner system)
```

- SNS **pushes** messages to subscribers immediately upon publish — there's no polling involved, and delivery to each subscriber happens independently and in parallel.
- Every subscriber that existed at publish time gets its own copy of the message — one publish can simultaneously trigger a Lambda, land in multiple independent SQS queues, and hit a webhook, all from a single `Publish` call.
- Ideal for **fan-out**: one event (e.g. "OrderPlaced") needs to trigger several independent, unrelated downstream processes (inventory update, email confirmation, analytics event, partner webhook) without the publisher needing to know about any of them individually.

## The Common Combined Pattern: SNS + SQS Fan-Out

```
Producer → SNS Topic "OrderPlaced"
              ├── subscribes → SQS Queue (Inventory Service)
              ├── subscribes → SQS Queue (Billing Service)
              └── subscribes → SQS Queue (Notification Service)
```

Publishing once to the SNS topic fans the message out to three independent SQS queues — each downstream service gets its own durable, independently-consumable copy, with its own retry/DLQ behavior, decoupled entirely from the other services. This combines SNS's fan-out with SQS's durable, poll-based, exactly-once-per-consumer processing — a very common architecture for event-driven microservices.

## Key Differences at a Glance

| | SQS | SNS |
|---|---|---|
| Model | Point-to-point queue | Publish/subscribe topic |
| Delivery | Pull (consumer polls) | Push (immediate to all subscribers) |
| Consumers per message | Exactly one | Every current subscriber |
| Message persistence | Retained until consumed/expired | Not retained — delivered immediately, no polling/replay |
| Best for | Decoupling a producer from a worker pool, task queues | Fan-out to multiple independent downstream systems |

## Common Mistake

Using SNS alone (without subscribing SQS queues) for a workload that needs durability and retry semantics — a direct Lambda or HTTP subscriber that fails to process a message doesn't get automatic re-queuing the way an SQS consumer does. The standard fix is subscribing an SQS queue to the SNS topic for any subscriber that needs guaranteed, retryable processing.

## Summary

SQS is a durable, pull-based queue where each message is processed by exactly one consumer — ideal for decoupling a producer from a worker pool. SNS is a push-based pub/sub topic that fans a message out to every current subscriber simultaneously — ideal for triggering multiple independent downstream systems from a single event. Combining them (SNS fanning out to multiple SQS queues) gives you both fan-out and durable, per-consumer retry semantics at once.
