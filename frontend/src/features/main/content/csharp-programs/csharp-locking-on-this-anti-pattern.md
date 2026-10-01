# Locking on this

`lock` synchronizes on whatever object reference you give it, and `this` is publicly reachable from outside the class — so code you don't control can accidentally lock on the same object, causing deadlocks or unexpected serialization.

## The Question

```csharp
class BankAccount
{
    public void Withdraw(decimal amount)
    {
        lock (this) { /* ... critical section ... */ } // Is this safe?
    }
}
```

**Answer:** No — `this` is publicly accessible. Lock on a private object instead.

## Why This Happens

```csharp
var account = new BankAccount();

// Completely unrelated code elsewhere in the codebase:
lock (account)
{
    DoSomethingSlow(); // holds the SAME monitor that Withdraw() needs
    // meanwhile, Withdraw() on another thread blocks here, waiting for this lock to release
}
```

- `lock (x) { }` is sugar for `Monitor.Enter(x)`/`Monitor.Exit(x)` — the monitor belongs to whatever object `x` refers to.
- Since `this` can be observed and locked on by any external caller holding a reference, external code can unintentionally (or maliciously) hold the same lock for a long time, blocking the class's own internal synchronization.
- The same problem applies to `lock (typeof(SomeType))` and `lock ("a string literal")` — `Type` objects and interned string literals are also globally visible and shared.

## The Fix

```csharp
class BankAccount
{
    private readonly object _syncLock = new();

    public void Withdraw(decimal amount)
    {
        lock (_syncLock) { /* ... critical section ... */ } // safe - nothing outside can reference _syncLock
    }
}
```

- `_syncLock` is `private`, so no code outside `BankAccount` can ever obtain a reference to it, let alone lock on it.

## Common Mistake

Locking on `this`, `typeof(SomeType)`, or a string literal because it's convenient, without realizing all three are visible (and lockable) from code outside your control.

## Summary

Never lock on `this`, a `Type` object, or interned string literals. Always use a `private readonly object` field created solely for synchronization, scoped so nothing outside the class can contend for the same monitor.
