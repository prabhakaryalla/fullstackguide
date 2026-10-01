# Nullable Types and Null-Coalescing (??)

`Nullable<T>` (`T?`) lets a value type represent "no value", and `??` gives a short-circuiting way to supply a fallback exactly when that value is missing — but only for an actual `null`, never for "falsy" values like `0`.

## The Question

```csharp
int? x = null;
int y = x ?? 99;
Console.WriteLine(y); // Output?
```

**Output:** `99`

- `??` evaluates to the left operand if it's non-null, or the right operand if the left is `null`.
- Since `x` is `null`, `y` becomes `99`.

## When x Already Has a Value

```csharp
int? x = 5;
int y = x ?? 99;
Console.WriteLine(y); // Output?
```

**Output:** `5`

- `x` already has a value, so the fallback (`99`) is never evaluated at all — `??` short-circuits.

## Chaining and ??=

```csharp
int? a = null;
int? b = null;
int c = a ?? b ?? 42; // 42 - falls through both nulls

int? counter = null;
counter ??= 0;  // assigns 0 only because counter is null
counter ??= 10; // no-op - counter already has a value (0)
Console.WriteLine(counter); // Output?
```

**Output:** `0`

- `??=` (null-coalescing assignment) only assigns when the left side is currently `null`.

## Common Mistake

Assuming `??` behaves like a "truthy" fallback (as in JavaScript's `||`) and falls back on `0`, `false`, or empty strings. It only falls back on an actual `null` — `int? x = 0; var y = x ?? 99;` gives `0`, not `99`.

## Summary

`??` is the idiomatic way to unwrap a `Nullable<T>` (or any nullable reference) with a default, short-circuiting so the fallback expression only runs when needed. `??=` extends the same null-check to conditional assignment, useful for lazy initialization.
