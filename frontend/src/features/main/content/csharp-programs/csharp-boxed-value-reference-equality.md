# Boxing and Equality (==)

Boxing wraps a value type in a new heap object every time it happens, so two boxed values that "look" identical can still be different objects — and `==` resolves differently depending on the *static* type of the operands.

## Question 1: Boxed Value Compared Against a Literal

```csharp
object obj = 10;
Console.WriteLine(obj == 10); // Output?
```

**Output:** `True`

- The compiler knows the right-hand side is an `int` literal, so it resolves `==` to `int`'s overload. That overload unboxes `obj` back to `int` before comparing — a value comparison, not a reference comparison.

## Question 2: Two Boxed Objects Compared Directly

```csharp
object a = 10;
object b = 10;
Console.WriteLine(a == b); // Output?
```

**Output:** `False`

- Both `a` and `b` are statically typed as `object`, so `==` resolves to `object.ReferenceEquals` (the default, unoverloaded `==` for reference types).
- Each assignment performs its own boxing operation, creating two distinct heap objects — even though both hold the value `10`.

```csharp
object a = 123;
object b = 123;
Console.WriteLine(a == b);           // False - reference equality, different boxes
Console.WriteLine(a.Equals(b));      // True - Equals is overridden by int to compare values
Console.WriteLine((int)a == (int)b); // True - explicit unboxing forces value comparison
```

## Why This Happens

- The *static type* of the operands at compile time — not their runtime type — determines which `==` overload is used.
- If at least one operand has a concrete value-type static type (like the literal `10` in Question 1), the compiler can bind to that type's `==` overload, which unboxes and compares values.
- If both operands are statically `object`, there's no value-type overload to bind to, so it falls back to reference equality.

## Common Mistake

Assuming `==` always compares boxed values by content because "they're both ints underneath." The compiler doesn't look at what's boxed inside — only at the declared (static) type of the variables being compared.

## Summary

`obj == 10` compares values because the literal gives the compiler a concrete type to bind `==` to. `a == b` between two `object`-typed variables compares references, and boxing always produces a new object — so prefer `.Equals()` (or explicit unboxing) whenever both sides are statically typed as `object`.
