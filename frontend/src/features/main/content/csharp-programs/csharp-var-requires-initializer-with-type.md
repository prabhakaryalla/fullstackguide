# Implicit Typing with Null (var)

`var` infers a variable's type from its initializer at compile time — but a bare `null` literal carries no type information on its own, so there's nothing for the compiler to infer.

## The Question

```csharp
var x = null; // Compile-time error
```

**Answer:** `var` needs an initializer with a specific type — `null` alone doesn't provide one.

## Why This Happens

- `var` is resolved entirely at compile time, based on the static type of the right-hand side expression.
- `null` can be assigned to *any* reference type or `Nullable<T>`, but by itself it has no single, specific static type for the compiler to bind `x` to.

## How to Fix It

```csharp
string x = null;          // OK - explicit type gives null somewhere to "live"
int? x2 = null;           // OK - Nullable<int> can represent null
var x3 = (string)null;     // OK - the cast gives the null literal an explicit static type
var x4 = default(string);  // OK - equivalent to null for reference types, but has a known type
```

## Contrast With a Method Return Value

```csharp
string GetName() => null;
var name = GetName(); // OK - var infers `string` from the method's declared return type, not from `null` itself
```

- `var` isn't inferring anything from the literal `null` here — it's inferring from `GetName()`'s declared return type, which is fully known at compile time.

## Common Mistake

Bulk-converting explicitly-typed locals to `var` during a refactor and forgetting that lines initialized directly with `null` can't be converted — they need to keep their explicit type, or use `default(T)`/a cast instead.

## Summary

`var` requires enough information at the point of declaration to pin down a concrete type, and a bare `null` literal doesn't provide that alone. Use an explicit type, `default(T)`, or a cast when a local needs to start out as `null`.
