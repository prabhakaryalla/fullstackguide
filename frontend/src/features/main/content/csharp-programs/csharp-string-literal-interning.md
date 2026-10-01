# String Literal Interning

Identical string literals are typically interned by the compiler/runtime so they share one heap object — but that only applies to values the compiler can resolve at **compile time**, not to strings built while the program runs.

## The Question

```csharp
string a = "hello";
string b = "he" + "llo";
Console.WriteLine(object.ReferenceEquals(a, b)); // Output?
```

**Output:** `True`

- `"he" + "llo"` is a concatenation of two literal constants, so the compiler performs constant folding and replaces it with the single literal `"hello"` at compile time.
- The runtime interns identical literals, so `a` and `b` end up pointing at the exact same string object in the intern pool.

## When It Breaks: Runtime-Built Strings

```csharp
string a = "hello";
string b = string.Concat("he", "llo");
Console.WriteLine(object.ReferenceEquals(a, b)); // Output?
```

**Output:** `False`

- `string.Concat("he", "llo")` executes at **runtime**, not compile time — the compiler has no opportunity to fold it into a literal.
- The result is a brand-new heap-allocated string with the same content as `"hello"`, but it is never automatically interned, so it's a different object from `a`.

## Why This Happens

- String interning only kicks in for literals the compiler can prove are constant — plain literals, and expressions made entirely of literals joined with `+` (constant folding happens at compile time).
- Anything computed at runtime — `string.Concat`, `StringBuilder.ToString()`, `Substring`, user input, `+` involving a variable — produces a fresh object, regardless of whether an identical literal happens to already be interned.

```csharp
string x = "hel" + "lo";                 // compile-time constant -> interned, same object as "hello"
string y = "hel";
string z = y + "lo";                     // runtime concatenation (y is a variable) -> NOT interned
Console.WriteLine(ReferenceEquals(x, "hello")); // True
Console.WriteLine(ReferenceEquals(z, "hello")); // False
```

## Common Mistake

Assuming `ReferenceEquals` is a reliable way to compare strings because "literals are interned anyway." It only works by coincidence for compiler-provable constants — any string touched by a variable, method call, or user input at runtime breaks the assumption. Always use `==` (or `.Equals()`) to compare string content; reserve `ReferenceEquals` for demonstrating this exact interning behavior.

## Summary

Interning is a compile-time optimization: literal-only expressions get folded and interned, so their references match. The moment a string is produced at runtime — even from something as simple as `string.Concat` of two literal-looking arguments — interning no longer applies, and `ReferenceEquals` returns `False` despite identical content.
