# Null Comparison on Strings

Comparing a possibly-null string against `null` with `==` is always safe in C# — it never throws, because `string`'s `==` operator is specifically designed to handle null operands without dereferencing them.

## The Question

```csharp
string a = null;
Console.WriteLine(a == null); // Output?
```

**Output:** `True`

- `string` overloads `==` as a static operator, not an instance method — so evaluating `a == null` never calls a method *on* `a`. There's nothing to dereference, so a null `a` causes no exception.

## Why This Doesn't Throw

```csharp
string a = null;
// Console.WriteLine(a.Equals(null)); // THROWS NullReferenceException - this calls a method ON a
Console.WriteLine(a == null);          // True - static operator, safe even when a is null
Console.WriteLine(Equals(a, null));    // True - static Equals(object, object) is also null-safe
```

- `a.Equals(null)` fails because `.Equals` is an **instance** method — calling it requires dereferencing `a` first, and `a` is `null`.
- `a == null` and the static `object.Equals(a, null)` are both null-safe because they don't require an existing object to invoke a method on.

## Common Mistake

Assuming any comparison involving a potentially-null string is risky and needs a null-check helper before it's "safe" to touch. The `==`/`!=` operators (and the static `Equals` method) are specifically safe for this; it's only instance-method calls like `.Equals()`, `.Length`, or `.ToUpper()` on a null reference that throw.

## Summary

`==` on strings is implemented as a static operator overload, so comparing a null string against `null` (or against another string) is always safe and returns the expected boolean — no `NullReferenceException` risk. The risk only appears once you call an instance member directly on a variable that might be null.
