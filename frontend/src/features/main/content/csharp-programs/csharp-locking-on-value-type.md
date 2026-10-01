# Locking on a Value Type

Not every tricky `Parallel`/threading question is about timing — this one is about whether the code even compiles, and then about a lock that *looks* safe but silently isn't.

## The Question

```csharp
int counter = 0;

Parallel.Invoke(
    () => { lock (counter) { counter = counter + 1; } },
    () => { lock (counter) { counter = counter + 1; } }
);

Console.WriteLine(counter);
```

What happens?

- A) Runtime error
- B) Compile-time error
- C) Always prints `2`
- D) Prints either `1` or `2`

**Answer:** B — this doesn't compile at all.

- `lock` requires an expression of a **reference type**. `counter` is `int` — a value type — so the compiler rejects it outright (`CS0185: 'int' is not a reference type as required by the lock statement`).
- Many people jump straight to reasoning about race conditions here. There's no race to reason about — the code never runs.

## What If We Just Remove the lock?

```csharp
int counter = 0;

Parallel.Invoke(
    () => { counter = counter + 1; },
    () => { counter = counter + 1; }
);

Console.WriteLine(counter); // Output?
```

**Output:** Could print `1` **or** `2` — a genuine race condition.

- Both delegates run at the same time, without any synchronization. Both can read `counter` as `0`, both compute `1`, and both write `1` back — one increment is silently lost.

## What If We "Fix" It With object counter = 0?

```csharp
object counter = 0;

Parallel.Invoke(
    () => { lock (counter) { counter = (int)counter + 1; } },
    () => { lock (counter) { counter = (int)counter + 1; } }
);

Console.WriteLine(counter);
```

This compiles now — `object` is a reference type. But it's still broken, and this is the real trap.

- `counter = (int)counter + 1` unboxes the current value, adds 1, and **reboxes the result into a brand-new object**, then points `counter` at that new box.
- `lock (counter)` re-evaluates the expression `counter` fresh, every single time it's entered. If one delegate reassigns `counter` to a new box *before* the other delegate reaches its own `lock (counter)`, the two delegates end up locking two **different** objects.
- Two threads locking different objects get zero mutual exclusion between them — the same lost-update race from the no-lock version can still happen, just hidden behind code that compiles and looks properly synchronized.

## The Correct Fix

```csharp
private static readonly object locker = new object();
int counter = 0;

Parallel.Invoke(
    () => { lock (locker) { counter++; } },
    () => { lock (locker) { counter++; } }
);

Console.WriteLine(counter); // Always 2
```

Use one dedicated, never-reassigned object purely for locking — never lock on the data being protected itself, and especially never on something that gets boxed/reboxed as it changes.

## Common Mistake

Assuming that once `lock (counter)` compiles, the synchronization is correct. Compiling only proves `counter` is a reference type at that point — it says nothing about whether every thread locks the exact same object instance for the whole critical section. This is the same underlying rule as [locking on `this`](./csharp-locking-on-this-anti-pattern.md): never lock on something whose reference can change out from under you.

## Summary

| Attempt | Result |
|---|---|
| `lock (counter)` where `counter` is `int` | Compile-time error — `int` isn't a reference type |
| No lock, `int counter` | Compiles, but a race condition — prints `1` or `2` |
| `lock (counter)` where `counter` is `object`, reassigned inside the lock | Compiles, but still broken — reboxing changes the lock target mid-flight |
| `lock (locker)` around `counter++`, with a dedicated `locker` object | Correct — one stable lock target, always prints `2` |
