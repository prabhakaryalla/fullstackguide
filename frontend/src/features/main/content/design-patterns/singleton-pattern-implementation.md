# Singleton Pattern Implementation (Sealed Class, Double-Checked Locking, Lazy&lt;T&gt;)

This is the classic Gang-of-Four Singleton *pattern* — a hand-implemented class that guarantees exactly one instance — distinct from DI "Singleton lifetime," where the container manages a single shared instance of a registered service for you.

## Short Answer

Implement Singleton with a `private` constructor (prevents external instantiation), a `sealed` class (prevents subclassing from bypassing the restriction), and a static accessor that lazily creates the instance — using `Lazy<T>` for simple, thread-safe lazy initialization instead of hand-rolled locking.

## Basic Implementation

```csharp
public sealed class Singleton
{
    private static Singleton? instance = null;

    private Singleton() { } // prevents `new Singleton()` from outside

    public static Singleton GetInstance
    {
        get
        {
            instance ??= new Singleton();
            return instance;
        }
    }

    public void PrintDetails(string message) => Console.WriteLine(message);
}
```

## Why Seal the Class

```csharp
// Without `sealed`, a nested/derived class can bypass the private constructor restriction
public class Singleton
{
    private static Singleton? instance = null;
    private Singleton() { }
    public class DerivedSingleton : Singleton { } // inherits despite the private constructor
}

var extra = new Singleton.DerivedSingleton(); // creates ANOTHER instance — violates the pattern
```

- A `private` constructor blocks direct `new Singleton()` calls from other classes, but a nested class *inside* `Singleton` can still call the base constructor implicitly through inheritance.
- Marking the class `sealed` closes that loophole entirely — no class, nested or otherwise, can inherit from it.

## Thread Safety Problem

```csharp
// Not thread-safe — two threads can both see `instance == null` simultaneously
public static Singleton GetInstance
{
    get
    {
        if (instance == null)
            instance = new Singleton();
        return instance;
    }
}
```

```archify
diagrams/singleton-race-condition.html
```

## Fix 1: Double-Checked Locking

```csharp
private static readonly object obj = new object();

public static Singleton GetInstance
{
    get
    {
        if (instance == null)
        {
            lock (obj)
            {
                if (instance == null) // check again — another thread may have created it while waiting for the lock
                    instance = new Singleton();
            }
        }
        return instance;
    }
}
```

- The outer `if` avoids acquiring the (relatively expensive) lock on every call once the instance already exists.
- The inner `if` re-checks after acquiring the lock, since another thread could have already created the instance while this thread was waiting.

## Fix 2: Lazy&lt;T&gt; (Preferred Modern Approach)

```csharp
public sealed class Singleton
{
    private static readonly Lazy<Singleton> instance = new(() => new Singleton());

    private Singleton() { }

    public static Singleton GetInstance => instance.Value;
}
```

- `Lazy<T>` is thread-safe by default (`LazyThreadSafetyMode.ExecutionAndPublication`) — no manual locking code needed, and it's the recommended way to implement a lazily-initialized singleton in modern C#.

## Eager Initialization (Simplest, No Locking Needed)

```csharp
public sealed class Singleton
{
    private static readonly Singleton instance = new Singleton();
    private Singleton() { }
    public static Singleton GetInstance => instance;
}
```

- The CLR guarantees thread-safe initialization of `static readonly` fields, so no explicit synchronization is needed — the trade-off is the instance is created at type-load time even if never used (fine for lightweight singletons).

## Lazy vs Eager

| | Lazy | Eager |
|---|---|---|
| Created | On first access | At type load / app startup |
| Startup cost | Lower | Higher (if the object is expensive) |
| Guaranteed thread-safety | Yes, via `Lazy<T>` | Yes, via CLR static initialization |
| Best for | Expensive objects not always needed | Cheap objects, or objects always needed |

## Real-World Example: Singleton-Based Exception Logger

```csharp
public sealed class Log
{
    private static readonly Lazy<Log> instance = new(() => new Log());
    private Log() { }
    public static Log GetInstance => instance.Value;

    public void LogException(string message)
    {
        File.AppendAllText("exceptions.log", $"{DateTime.Now}: {message}{Environment.NewLine}");
    }
}
```

- A shared logging singleton ensures all parts of the app write to the same log file/state through one coordinated instance, rather than each component managing its own file handle.

## Summary

The Singleton pattern combines a `private` constructor, a `sealed` class, and a thread-safe lazy (or eager) static accessor to guarantee exactly one instance exists application-wide. Prefer `Lazy<T>` over hand-written double-checked locking in modern C# — it achieves the same thread safety with far less code and lower risk of subtle bugs.
