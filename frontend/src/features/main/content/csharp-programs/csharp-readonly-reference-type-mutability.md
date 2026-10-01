# Readonly with Reference Types

`readonly` only stops a field from being reassigned outside a constructor — it says nothing about whether the object the field points to can still be mutated internally.

## The Question

```csharp
readonly List<int> list = new List<int>();
list.Add(1); // Is this allowed?
```

**Answer:** Yes — `readonly` means the reference can't change, not that the object's contents are frozen.

## Why This Happens

```csharp
class Container
{
    readonly List<int> list = new List<int>();

    public void AddItem(int value)
    {
        list.Add(value); // Allowed - mutating the List, not reassigning the field
    }

    public void Replace()
    {
        // list = new List<int>(); // NOT allowed - this would be a reassignment
    }
}
```

- `list.Add(1)` calls a method on the object the field refers to — it never touches the `list` field itself.
- what `readonly` *does* block is reassigning the field itself (`list = new List<int>();`) anywhere outside the declaring class's constructor(s).
- this mirrors `const` array bindings in JavaScript or `final` collections in Java — the binding is frozen, the referenced object is not.

## Common Mistake

```csharp
class Settings
{
    public readonly List<string> AllowedHosts = new();
}

var settings = new Settings();
settings.AllowedHosts.Add("evil.example.com"); // compiles fine - readonly did not protect this list
```

A developer relying on `readonly` alone to protect a collection field from external tampering is in for a surprise — `readonly` never blocked the `.Add()` call.

## The Fix for True Immutability

Expose a read-only view or an actually-immutable collection type, and keep the mutable backing collection private:

```csharp
private readonly List<string> _allowedHosts = new();
public IReadOnlyList<string> AllowedHosts => _allowedHosts.AsReadOnly();
```

## The Twist: readonly + Concurrent Collections Is a Good Pattern

The same "reference is frozen, contents aren't" behavior that's a trap for a plain `List<T>` is exactly what you *want* for thread-safe shared state:

```csharp
class RequestCache
{
    private static readonly ConcurrentDictionary<string, string> _cache = new();
    private static readonly ConcurrentBag<string> _log = new();

    public void Record(string key, string value)
    {
        _cache[key] = value;     // safe concurrent mutation - by design
        _log.Add($"{key}={value}"); // also safe, from any thread
    }
}
```

- `readonly` here guarantees no code, on any thread, can ever swap `_cache`/`_log` out for a brand-new instance mid-flight. That matters a lot for concurrency: if the reference *could* change, one thread might read/lock/operate on an old instance while another thread has already moved on to a new one — the exact same "moving target" problem covered in [Locking on a Value Type](./csharp-locking-on-value-type.md), just applied to a whole collection instead of a lock object.
- `ConcurrentDictionary`/`ConcurrentBag` (unlike plain `List<T>`/`Dictionary<TKey,TValue>`) are specifically built to have their *contents* mutated safely from multiple threads at once — so the fact that `readonly` doesn't block `.Add()`/`[key] = value` isn't a loophole here, it's the entire point.
- This is why `private static readonly ConcurrentDictionary<...> _cache = new();` is such a common pattern in real codebases: `readonly` pins the reference, the concurrent collection type makes mutating its contents actually safe.

## Summary

`readonly` is about the field's binding, not the object's mutability. For a plain mutable collection, pair `readonly` with encapsulation (private backing field + read-only exposed view) or an immutable collection type if the contents themselves need protecting. For a *concurrent* collection, `readonly` + free mutation is the correct, idiomatic combination — the collection is designed to be mutated concurrently, and `readonly` just ensures every thread is always mutating the same instance.
