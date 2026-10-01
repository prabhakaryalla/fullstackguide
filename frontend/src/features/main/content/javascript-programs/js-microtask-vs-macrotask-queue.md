# Microtask vs Macrotask Queue Ordering

`setTimeout` and `Promise.then()` are both "asynchronous," but they don't queue into the same place — Promises use a higher-priority **microtask queue** that always drains completely before the event loop touches the next **macrotask** (like a timer callback), even a `setTimeout` with a `0`ms delay.

## The Question

```js
console.log('1: sync start')

setTimeout(() => console.log('2: setTimeout'), 0)

Promise.resolve().then(() => console.log('3: promise'))

console.log('4: sync end')
```

**Output:**

```
1: sync start
4: sync end
3: promise
2: setTimeout
```

Not `1, 4, 2, 3` — the Promise callback always wins over the `setTimeout(fn, 0)` callback, even though both were "scheduled" around the same point in the code.

## Why This Happens

- All synchronous code (`1`, `4`) always runs first, to completion, before the event loop touches anything queued asynchronously — this part is the same for both timers and Promises.
- Once the call stack is empty, the event loop doesn't go straight to the next **macrotask** (timers, I/O callbacks, UI rendering) — it first fully drains the **microtask queue** (Promise callbacks, `queueMicrotask`, `MutationObserver` callbacks), running every microtask queued so far, including any *new* microtasks that get queued while draining it.
- Only once the microtask queue is completely empty does the event loop move on to process the next single macrotask (here, the `setTimeout` callback).

```mermaid
sequenceDiagram
    participant Stack as Call Stack
    participant Micro as Microtask Queue
    participant Macro as Macrotask Queue (Timers)
    participant Loop as Event Loop

    Stack->>Stack: console.log('1: sync start')
    Stack->>Macro: setTimeout(cb, 0) queued
    Stack->>Micro: Promise.resolve().then(cb) queued
    Stack->>Stack: console.log('4: sync end')
    Note over Stack: Call stack now empty
    Loop->>Micro: Drain ENTIRE microtask queue first
    Micro-->>Stack: run promise callback → prints '3: promise'
    Note over Micro: Microtask queue now empty
    Loop->>Macro: NOW process next macrotask
    Macro-->>Stack: run setTimeout callback → prints '2: setTimeout'
```

## The Rule: Microtasks Always Drain Completely Between Macrotasks

```js
setTimeout(() => console.log('timeout'), 0)

Promise.resolve().then(() => {
  console.log('promise 1')
  Promise.resolve().then(() => console.log('promise 2 (queued from inside promise 1)'))
})
// Output: promise 1, promise 2 (queued from inside promise 1), timeout
```

Even a *new* microtask queued from inside an already-running microtask (`promise 2`) still runs before the event loop moves on to the `setTimeout` callback — the microtask queue must be **completely empty** (not just "however many microtasks existed at the start") before any macrotask runs.

## Common Mistake

Assuming all asynchronous callbacks are processed in the order they were scheduled, regardless of whether they came from a Promise or a timer. `setTimeout(fn, 0)` does **not** mean "run next" — it means "run as the next macrotask, after every currently-pending microtask (including ones queued along the way) has finished." Promises (and `async`/`await`, which is built on Promises) are always microtasks and will always run before a same-tick `setTimeout`, no matter how small its delay.

## Summary

After the current synchronous code finishes, the event loop fully drains the microtask queue (Promises, `queueMicrotask`) before running even a single queued macrotask (`setTimeout`, `setInterval`, I/O). This is why a Promise callback always executes before a `setTimeout(fn, 0)` callback scheduled around the same point in the code — the two callbacks are competing in entirely different, differently-prioritized queues, not a single shared "asynchronous callback" queue.
