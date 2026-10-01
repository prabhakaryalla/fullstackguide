# Params Keyword Quirk

A `params` array lets callers pass zero, one, or many arguments — but passing an explicit `null` is not the same as passing nothing, and mixing the two up throws at runtime.

## The Question

```csharp
void Print(params int[] numbers) => Console.WriteLine(numbers.Length);

Print();          // Output?
Print(null);      // Output?
```

**Output:**

- `0` — empty params
- `System.NullReferenceException` — `null` is passed directly as the array itself

## Why This Happens

- Calling `Print()` with no arguments makes the compiler synthesize an empty array (`new int[0]`) behind the scenes — `numbers` is never `null` in that case.
- Calling `Print(null)` passes `null` as the whole `params` array parameter (since `null` is a valid `int[]` reference) — it does **not** get wrapped into a one-element array. `numbers` really is `null`, so `numbers.Length` throws.

## Defending Against It

```csharp
void Print(params int[] numbers)
{
    numbers ??= Array.Empty<int>(); // normalize null to an empty array up front
    Console.WriteLine(numbers.Length);
}

Print();     // 0
Print(null); // 0 - no longer throws
```

## Common Mistake

Assuming a `params` parameter is guaranteed non-null just because "the compiler builds the array for you." That guarantee only holds when the caller omits the argument entirely — an explicit `null` bypasses it completely.

## Summary

`params` arrays are a convenience feature, but "no arguments" and "explicit null" are not the same thing — only the former guarantees a non-null, zero-length array. Guard with `??=` (or an explicit null check) before relying on `.Length` or iterating over a `params` parameter.
