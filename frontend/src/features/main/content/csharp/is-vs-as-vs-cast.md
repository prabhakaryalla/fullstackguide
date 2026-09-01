# Difference Between is, as, and Direct Cast in C#

All three convert or check a reference's type, but they differ in how they handle a failed conversion — one throws, one returns null, and one just returns a boolean.

## Quick Difference

- `(T)obj` (direct cast) throws an `InvalidCastException` if the conversion fails.
- `obj as T` returns `null` if the conversion fails, instead of throwing (only valid for reference types / nullable value types).
- `obj is T` returns `true`/`false` and does not throw or convert anything by itself (though modern C# lets you combine it with a pattern: `obj is T typed`).

## Direct Cast in C#

```csharp
object value = "hello";
int number = (int)value; // throws InvalidCastException at runtime
```

Key points:

- fastest option when you are already certain the cast will succeed
- an unhandled failed cast crashes the calling method with an exception

## as in C#

```csharp
object value = "hello";
int? number = value as int?; // null - no exception
string? text = value as string; // "hello" - succeeds
```

Key points:

- never throws for a reference-type or nullable target; returns `null` on failure instead
- requires an explicit null check afterward, easy to forget
- cannot be used with non-nullable value types (`value as int` doesn't compile)

## is in C#

```csharp
object value = "hello";

if (value is string text) // pattern match: checks AND casts in one step
{
    Console.WriteLine(text.Length);
}
```

Key points:
- `is` alone just answers a yes/no question without producing a converted variable
- the pattern-matching form (`is string text`) both checks the type and gives you a correctly typed variable, avoiding a second, separate cast

## Real-World Example: Choosing the Right One

```csharp
public void Handle(object payload)
{
    // BAD: throws if payload isn't OrderCreatedEvent, crashing the handler
    var evt1 = (OrderCreatedEvent)payload;

    // BETTER: safe, but requires a null check
    var evt2 = payload as OrderCreatedEvent;
    if (evt2 is null) return;

    // BEST for a single type check: combines the check and the cast
    if (payload is OrderCreatedEvent evt3)
    {
        Process(evt3);
    }
}
```

## Performance Note

`is`/`as` avoid the (small) overhead of exception handling for expected type mismatches, since exceptions are relatively expensive in .NET. Prefer `is`/pattern matching over a direct cast wrapped in `try/catch` when a mismatch is a normal, expected code path rather than a true bug.

## Summary

- Use `(T)obj` only when a failed cast should genuinely be treated as a bug (let it throw).
- Use `is T typed` (pattern matching) for the common "check and use if it matches" case — it's the safest and most concise.
- Use `as T` when you specifically need a nullable result to test/branch on later, without an immediate pattern match.
