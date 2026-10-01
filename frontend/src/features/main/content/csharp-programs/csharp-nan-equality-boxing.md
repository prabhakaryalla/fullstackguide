# NaN Equality and Boxing

`double.NaN` breaks the usual rule that a value equals itself — but only when compared with `==`. The moment it's boxed and compared with `.Equals()`, the answer flips.

## The Question

```csharp
Console.WriteLine(double.NaN == double.NaN); // Output?
```

**Output:** `False`

## Why This Happens

- Per the IEEE 754 floating-point standard (which .NET's `double`/`float` follow), `NaN` ("Not a Number") is defined to compare as **unequal to everything, including itself**. This isn't a .NET quirk — it's the same behavior in virtually every language that uses IEEE 754 floats.
- `double`'s `==` operator implements this IEEE rule literally: any comparison involving `NaN` returns `false`, even `NaN == NaN`.

## The Twist: Boxed NaN Compares as Equal

```csharp
object a = double.NaN;
object b = double.NaN;

Console.WriteLine(a.Equals(b)); // Output?
```

**Output:** `True`

- `object.Equals()` (and `double.Equals(double)`, which this ultimately calls) does **not** follow the IEEE `==` rule — `double.Equals` is specifically implemented to treat `NaN` as equal to `NaN`, precisely so that `NaN` can be used sensibly as a dictionary key, in a `HashSet<double>`, or in collection equality checks (`List<double>.Contains`, `Array.IndexOf`, etc.), all of which are built on `.Equals()`, not `==`.
- So the exact same two `NaN` values give a different answer depending on whether you compare them with `==` (IEEE semantics: never equal) or `.Equals()` (collections-friendly semantics: equal to itself).

## Where This Bites People

```csharp
double result = ComputeRatio(0, 0); // returns NaN in some edge case
if (result == expectedNaNSentinel)  // NEVER true, even if expectedNaNSentinel is also NaN
{
    HandleSpecialCase();
}

var seen = new HashSet<double>();
seen.Add(double.NaN);
Console.WriteLine(seen.Contains(double.NaN)); // True! HashSet uses Equals/GetHashCode, not ==
```

A developer who checks for a `NaN` "sentinel" result using `==` will never match it — `NaN == NaN` is always `false`, by design. Meanwhile, code relying on collections (which use `.Equals()`) sees the opposite behavior. Both are correct for what they're doing; the trap is not knowing which rule applies where.

## The Correct Way to Check for NaN

```csharp
if (double.IsNaN(result)) // always correct, regardless of == vs Equals semantics
{
    HandleSpecialCase();
}
```

`double.IsNaN(value)` is the one unambiguous way to test for `NaN` — never rely on `== double.NaN` (which is always `false`) or assume `.Equals()` semantics apply everywhere.

## Common Mistake

Assuming boxing has no effect on comparison behavior — it does here, precisely because `==` and `.Equals()` are allowed to (and do) implement different rules for `NaN`, and boxing is what pushes a comparison from operator resolution (`==`) toward the `.Equals()` path.

## Summary

| Comparison | `NaN` vs `NaN` |
|---|---|
| `double.NaN == double.NaN` | `False` (IEEE 754 semantics) |
| `((object)double.NaN).Equals(double.NaN)` | `True` (collections-friendly semantics) |
| `double.IsNaN(value)` | The only reliable way to test for `NaN` |
