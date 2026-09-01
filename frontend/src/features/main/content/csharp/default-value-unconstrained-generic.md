# default(T) == null for Unconstrained Generic Types

`default(T)` compiles for any unconstrained type parameter `T`, but comparing it with `== null` behaves differently for reference types versus value types.

## Quick Difference

- For a reference type `T`, `default(T)` is `null`.
- For a value type `T`, `default(T)` is the type's zero value (for example `0` for `int`), never `null`.
- Comparing `default(T) == null` directly does not compile for unconstrained `T` — you must use `is null` or `EqualityComparer<T>.Default`.

## The Problem

```csharp
public static bool IsDefault<T>(T value)
{
    return value == null; // compile error: Operator '==' cannot be applied to
                           // operands of type 'T' and '<null>'
}
```

Key points:

- the compiler does not know whether `T` will be a reference type or a value type
- value types (like `int`, `struct`) can never be `null`, so `==` against `null` is disallowed unless `T` is constrained

## Safe Ways to Check

```csharp
public static bool IsDefault<T>(T value)
{
    return value is null; // works: pattern match, compiles for any T
}

public static bool IsDefaultValue<T>(T value)
{
    return EqualityComparer<T>.Default.Equals(value, default);
    // works for both reference types (null check) and value types (zero-value check)
}
```

## Real-World Example

```csharp
int number = default;           // 0, not null
string? text = default;         // null
DateTime date = default;        // 0001-01-01, not null

Console.WriteLine(number is null); // false - int can never be null
Console.WriteLine(text is null);   // true
Console.WriteLine(EqualityComparer<DateTime>.Default.Equals(date, default)); // true
```

A generic caching or validation method that only checks `value is null` will silently treat a legitimate `0` or `default(DateTime)` as "not set" only if that is actually the intended default — for value types, prefer `EqualityComparer<T>.Default.Equals(value, default)` to explicitly compare against the type's own default rather than assuming null semantics.

## Summary

- `default(T)` means "null" only when `T` is a reference type; for value types it means the zero/default value.
- Use `is null` (works for any `T`) or `EqualityComparer<T>.Default.Equals(value, default)` (correct "is this unset?" check for both kinds of `T`) instead of `value == null` in unconstrained generic code.
