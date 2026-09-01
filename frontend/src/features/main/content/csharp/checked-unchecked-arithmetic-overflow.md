# checked and unchecked Arithmetic Overflow in C#

By default, integer arithmetic in C# silently wraps around on overflow instead of throwing — `checked`/`unchecked` let you control that behavior explicitly.

## Quick Difference

- In an `unchecked` context (the default for most build configurations), integer overflow silently wraps around to an incorrect value with no error.
- In a `checked` context, the same overflow throws an `OverflowException` at runtime instead of producing a wrong value.

## Default (Unchecked) Behavior

```csharp
int max = int.MaxValue; // 2147483647
int result = max + 1;

Console.WriteLine(result); // -2147483648 - silently wrapped around, no error!
```

Key points:

- this is the default behavior for arithmetic operators (`+`, `-`, `*`) unless overridden
- no exception, no warning — just a mathematically wrong result that can silently corrupt calculations

## checked Keyword

```csharp
int max = int.MaxValue;

int result = checked(max + 1); // throws System.OverflowException

checked
{
    int a = max;
    int b = a + 1; // also throws, applies to the whole block
}
```

Key points:

- `checked` can wrap a single expression or an entire block
- makes overflow bugs fail loudly and immediately instead of producing silently wrong data

## unchecked Keyword (Explicit Opt-Out)

```csharp
unchecked
{
    int result = int.MaxValue + 1; // explicitly allowed to wrap, no exception
}
```

Useful when wraparound is the intended behavior (for example, certain hashing algorithms rely on it).

## Project-Wide Setting

```xml
<!-- in the .csproj file -->
<PropertyGroup>
  <CheckForOverflowUnderflow>true</CheckForOverflowUnderflow>
</PropertyGroup>
```

Setting this makes **all** unmarked arithmetic in the project `checked` by default, without needing the keyword everywhere — useful for catching overflow bugs during development/testing, sometimes disabled again for release builds where the extra checks add overhead.

## Real-World Example

```csharp
public int CalculateTotalCents(int dollars, int cents)
{
    return checked(dollars * 100 + cents); // financial code: fail loudly on overflow
}

CalculateTotalCents(int.MaxValue / 50, 0); // throws OverflowException instead of
                                            // silently returning a corrupted total
```

For financial, security-sensitive, or safety-critical calculations, wrapping arithmetic in `checked` turns a silent, hard-to-detect data corruption bug into an immediate, loud failure that's easy to catch in testing.

## Summary

- Plain arithmetic silently overflows/wraps by default in C# — this can hide serious bugs.
- Use `checked` around arithmetic where an overflow should never happen and should fail loudly instead of producing a wrong number; use `unchecked` only when wraparound is the explicitly desired behavior.
