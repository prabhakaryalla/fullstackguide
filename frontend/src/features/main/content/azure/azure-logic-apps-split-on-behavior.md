# Logic Apps "Split On" Behavior

When a Logic App trigger returns an array, a setting called **Split On** (enabled by default for most connectors) quietly changes what "one workflow run" even means — and misunderstanding it is one of the most common Logic Apps mistakes.

## The Trap

```
Trigger: "When a new email arrives" (returns an array of 3 new emails)

Expectation: ONE workflow run starts, and a "For Each" loop inside processes all 3 emails.

Reality (with Split On enabled, the default): THREE SEPARATE workflow runs start,
each with exactly ONE email as its trigger output - not one run looping over three.
```

## Why This Happens

- Many triggers (an inbox connector returning new emails, a Service Bus trigger returning a batch of messages) can return an **array** of items in one poll.
- **Split On** tells Logic Apps to automatically split that array into one independent workflow run *per array element* — each run receives a single item as its trigger body, completely unaware of the other items that arrived in the same batch.
- This is enabled **by default** on triggers that return arrays, which is exactly why it surprises people — they build a workflow expecting to process "the whole batch" in one run with a `For Each` action, and instead get one run per item, with no visibility into the rest of the batch at all from within a single run.

## Turning Split On Off

```
Trigger settings → Split On → set to "Off" (or remove the splitOn property in the underlying JSON definition)

Now: ONE workflow run receives the full array as its trigger body,
and a "For Each" action inside the workflow can iterate over every item together.
```

- With Split On disabled, the full array arrives as a single trigger output, and you explicitly add a `For Each` action to loop over it within one run — giving you full visibility across the whole batch (e.g. "process these 3 emails and then send one summary of all 3," which is impossible with Split On enabled, since each email is isolated into its own run).

## Which Behavior Is Actually Right?

| Need | Best Setting |
|---|---|
| Each item should be processed completely independently, with its own retry/run history, isolated from the others | Split On enabled (the default) |
| You need to process the whole batch together (aggregate, summarize, or make decisions based on the full set) | Split On disabled, with an explicit `For Each` |
| You want each item's failure to be retried/tracked independently, without one bad item blocking the rest | Split On enabled — a failure in one split run doesn't affect the other split runs at all |

- Split On's per-item isolation is actually a real strength for reliability: if one item in a batch causes a failure, only that one split run is affected/retried — the other items' runs succeed independently, whereas a single run looping over the whole array with `For Each` risks one bad item affecting the entire run's outcome (depending on how the loop's failure handling is configured).

## Common Mistake

Building a `For Each` action inside a workflow whose trigger already has Split On enabled by default — the `For Each` loop then only ever has exactly one item to iterate over (since Split On already delivered just one item per run), making the loop pointless and confusing anyone reading the workflow later, since it looks like it's meant to handle a batch but never actually will.

## Summary

Split On (enabled by default on array-returning triggers) converts one batch of trigger data into multiple, fully independent workflow runs — one per array item — rather than a single run that loops over the whole batch. This is often exactly what you want for independent, isolated processing and per-item failure handling, but it's a common source of confusion when a workflow was actually designed assuming it would see and process the entire batch together in one run.
