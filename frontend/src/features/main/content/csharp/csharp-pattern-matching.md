# C# Pattern Matching

Pattern matching lets you test a value's **shape** (type, structure, property values, ranges) in a single expression, replacing chains of `is`/`as` casts and nested `if` statements with something the compiler can check for exhaustiveness and optimize.

## Short Answer

- `switch` **expressions** (`x switch { ... }`) return a value and require the compiler to be convinced every case is handled (or a `_` discard); `switch` **statements** don't.
- Patterns compose: type patterns, property patterns, relational patterns, and logical combinators (`and`/`or`/`not`) can all nest inside each other.
- Compiled pattern matching is not "free" — the compiler lowers complex patterns into a decision tree of type checks and comparisons; it's not meaningfully slower than equivalent hand-written `if`/`else`, but a giant `switch` on many unrelated types can hurt readability more than performance.
- Reach for a plain `switch` **statement** or simple `if` when you only have 2-3 cases and no value needs returning — pattern matching earns its keep once you have several shapes to distinguish or want the compiler's exhaustiveness checking.

## Switch Expressions

```csharp
string Describe(object obj) => obj switch
{
    int n when n > 0 => "positive",
    int n when n < 0 => "negative",
    int => "zero",
    string s => $"string: {s}",
    _ => "unknown"
};
```

- Each arm is tried top to bottom; the first matching pattern wins — order matters, especially with overlapping `when` guards.
- Omitting the final `_ => ...` discard arm is a compile **error** if the compiler can't prove exhaustiveness (e.g. switching on a non-sealed class hierarchy) — this is a real safety net: adding a new case to an enum later causes a compiler warning (`CS8509`) at every `switch` expression that doesn't handle it, instead of a silent runtime bug.

## Property Patterns

```csharp
static bool IsAdult(Person p) => p is { Age: >= 18 };
```

- Nested property patterns avoid null-check pyramids: `p is { Address.City: "London" }` safely short-circuits to `false` if `p` or `p.Address` is `null`, instead of throwing `NullReferenceException`.

## Relational and Logical Patterns (C# 9+)

```csharp
static string Grade(int score) => score switch
{
    >= 90 => "A",
    >= 80 and < 90 => "B",
    >= 70 and < 80 => "C",
    < 0 or > 100 => throw new ArgumentOutOfRangeException(nameof(score)),
    _ => "F"
};
```

- `and`, `or`, and `not` combine patterns directly, replacing what used to require nested `if`s or nested ternaries.
- `not null` is the idiomatic modern null-check: `if (value is not null)` reads more naturally than `if (!(value is null))` and works identically with pattern-based flow analysis for nullable reference types.

## List Patterns (C# 11+)

```csharp
static string DescribeArray(int[] numbers) => numbers switch
{
    [] => "empty",
    [var single] => $"one element: {single}",
    [var first, .., var last] => $"starts with {first}, ends with {last}",
    _ => "unmatched"
};
```

- `..` is the "slice" discard — it matches any number of elements in the middle, letting you pattern-match on the *shape* of a sequence (empty, single, first/last) without manually checking `.Length`.

## Performance and Compiler Behavior

The compiler lowers a `switch` on multiple type patterns into a sequence of `is`-type checks (effectively the same `isinst`/comparison IL you'd write by hand) — for **type patterns**, there's no hidden reflection or boxing cost beyond what an equivalent `if (x is Foo foo)` chain would already incur. For patterns over `int`/`string`, the compiler can use jump tables identical to a classic `switch` statement, so there's no meaningful runtime cost. The real tradeoff is **readability**, not speed: a `switch` expression with a dozen unrelated types and deeply nested property/relational patterns can become harder to scan than well-factored `if`/`else if` — reach for polymorphism (a virtual method) instead of matching on type once the number of cases grows large and each case needs real behavior, not just a value mapping.

## When It's Overkill vs. a Plain Switch Statement

| Prefer pattern matching (`switch` expression) when | Prefer a plain `if`/`switch` statement when |
|---|---|
| You're producing a **value** from several distinct shapes (a mapping) | You're running **side effects** (logging, I/O) per branch, not returning a value |
| You want the compiler to flag missing cases on an enum/type hierarchy | You have 2-3 simple boolean conditions — a pattern adds ceremony for no benefit |
| You're testing structural shape (nested properties, list shape, ranges) | A single `is`/`==` check already reads clearly |

## Interview Answer

Pattern matching lets you test a value's type, properties, or structure in one expression instead of chained `is`/`as` casts. `switch` expressions are the most powerful form — they return a value and the compiler enforces exhaustiveness, catching missing cases at compile time when someone adds a new enum value or subtype later. Under the hood it compiles to the same type checks and jump tables you'd write by hand, so it's not a performance tradeoff — the real judgment call is readability: use it for value-shape mapping, but fall back to a plain `if`/`switch` statement for side-effect-heavy branches or trivial boolean checks.

## Summary

Pattern matching turns "check the shape of this value" into declarative syntax the compiler can verify for exhaustiveness, composing type, property, relational, and list patterns. It compiles down to ordinary type checks and comparisons — no hidden performance tax — so the decision to use it is about readability and compile-time safety (catching un-handled cases), not speed. Use it for value-producing shape matching; prefer plain conditionals or polymorphism once branches carry real behavior instead of a simple mapping.

