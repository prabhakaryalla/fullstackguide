# Enum.HasFlag Boxes Its Argument

`HasFlag` reads nicely and is easy to reach for when checking `[Flags]` enums — but every single call quietly boxes its argument, making it a surprisingly expensive choice in a hot path.

## The Question

```csharp
[Flags]
enum Permissions
{
    None = 0,
    Read = 1,
    Write = 2,
    Execute = 4
}

Permissions p = Permissions.Read | Permissions.Write;

for (int i = 0; i < 1_000_000; i++)
{
    bool canRead = p.HasFlag(Permissions.Read); // what's the hidden cost of this line?
}
```

**Answer:** Each call to `HasFlag` boxes both `p` and the argument (`Permissions.Read`) into `object` — that's up to two heap allocations, one million times over, just to check a couple of bits.

## Why This Happens

- `Enum.HasFlag`'s signature is `public bool HasFlag(Enum flag)` — it takes the argument as the base `Enum` type, not as the specific enum type you're using.
- Since your enum is a value type, passing it as an `Enum`-typed parameter requires boxing it onto the heap first, on every call — both the instance `p` and the argument `Permissions.Read` get boxed.
- The bitwise check `HasFlag` performs internally is trivially cheap (essentially `(value & flag) == flag`) — almost the entire cost of the call is the boxing overhead, not the actual flag comparison.

## Where This Actually Matters

```csharp
// In a loop processing millions of items, checking flags per item:
foreach (var item in millionItems)
{
    if (item.Permissions.HasFlag(Permissions.Read)) // boxes twice, per item, per call site
    {
        // ...
    }
}
```

For a one-off check, the overhead is irrelevant. In a hot loop over a large collection, or a method called extremely frequently, the repeated boxing allocations add measurable GC pressure that a plain bitwise check completely avoids.

## The Fix: Plain Bitwise Comparison

```csharp
bool canRead = (p & Permissions.Read) == Permissions.Read; // no boxing at all
```

- This does exactly the same logical check as `HasFlag`, using the enum's own `&`/`==` operators directly on the value type — no conversion to `Enum`, no boxing, no heap allocation.
- It's slightly less readable at a glance than `HasFlag`, but it's the standard idiom recommended specifically for performance-sensitive code.

## Common Mistake

Reaching for `HasFlag` everywhere by default because it reads better, without realizing it has a real (if usually small) per-call cost that a direct bitwise check doesn't. For code that isn't performance-sensitive, `HasFlag`'s readability is a perfectly reasonable trade-off — the mistake is not knowing the trade-off exists at all, especially in code that later becomes a hot path.

## Summary

`HasFlag` is correct and readable, but its signature (`HasFlag(Enum flag)`) forces boxing on every call, on both the receiver and the argument. For flag checks inside loops or other performance-sensitive paths, prefer the boxing-free `(value & flag) == flag` pattern instead.
