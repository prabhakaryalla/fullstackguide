# C# Records

Records are reference types (or, since C# 10, value types via `record struct`) with **compiler-synthesized value-based equality** and a concise, immutable-by-default declaration syntax — designed for modeling data rather than behavior.

## Short Answer

- Two records are `==`-equal when their **runtime type matches and every property value matches** — unlike a regular class, where `==` compares references by default.
- Properties declared positionally are `init`-only: settable during construction/`with`-expressions, but not reassignable afterward.
- "Immutable" only applies to the record's own top-level properties — a record holding a `List<T>` doesn't stop you mutating that list's contents.
- Use records for DTOs, value objects, and API request/response models; use classes for anything with real behavior, mutable state, or identity that should be reference-based.

## Declaring a Record

```csharp
public record Person(string FirstName, string LastName);
```

This one line generates: a constructor, `init`-only properties for `FirstName`/`LastName`, `Equals`/`GetHashCode` overrides based on those properties, a readable `ToString()` (e.g. `Person { FirstName = Alice, LastName = Smith }`), and a `Deconstruct` method.

## Value-Based Equality: How It Actually Works

```csharp
var p1 = new Person("Alice", "Smith");
var p2 = new Person("Alice", "Smith");

Console.WriteLine(p1 == p2);          // True  - records compare by value
Console.WriteLine(p1.Equals(p2));     // True  - same
Console.WriteLine(ReferenceEquals(p1, p2)); // False - still two distinct objects on the heap
```

The compiler generates `Equals(Person? other)` that checks `other is not null && other.GetType() == GetType() && FirstName == other.FirstName && LastName == other.LastName`. The explicit `GetType()` check matters for inheritance — see below.

## With-Expressions and Immutability Nuance

```csharp
var alice = new Person("Alice", "Smith");
var bob = alice with { FirstName = "Bob" }; // creates a NEW Person, doesn't mutate alice
```

`with` performs a shallow copy: it copies every property, then overwrites the ones you specify. That's the important caveat — **shallow**, not deep:

```csharp
public record Team(string Name, List<string> Members);

var teamA = new Team("Alpha", new List<string> { "Alice" });
var teamB = teamA with { Name = "Beta" };

teamB.Members.Add("Bob");
Console.WriteLine(teamA.Members.Count); // 2 - "immutable" teamA was mutated through the shared list reference!
```

If a record holds mutable reference types (`List<T>`, arrays, other mutable classes), those are shared by reference across every `with`-copy. For true immutability, use `IReadOnlyList<T>`/`ImmutableList<T>` for collection-typed properties.

Reflection can also bypass `init`-only enforcement entirely (`typeof(Person).GetProperty("FirstName")!.SetValue(alice, "Eve")` compiles and works at runtime) — `init` is a compile-time guardrail against accidental mutation, not a hard runtime guarantee.

## Positional Deconstruction

```csharp
var (first, last) = alice;
```

## Record Inheritance

```csharp
public record Person(string FirstName, string LastName);
public record Employee(string FirstName, string LastName, string Department) : Person(FirstName, LastName);
```

- A record can only inherit from another **record** (not a plain class), and vice versa — you can't mix a `record` and a `class` in the same hierarchy.
- The generated `Equals` compares `GetType()`, not just declared members, so an `Employee` and a `Person` with identical `FirstName`/`LastName` are never equal to each other even if you upcast — this avoids the classic "equal but different subtype" bug that plain classes with custom `Equals` can fall into.
- `Person` should typically be declared `abstract` or `sealed` deliberately: an unsealed, non-abstract base record invites subtypes that add properties `Equals` won't compare unless properly overridden, or "slicing" bugs where callers accidentally compare a base-typed reference and lose subtype-specific data.

## record class vs. record struct

```csharp
public record class Point2D(int X, int Y);   // reference type (default "record" = record class)
public record struct Point2D(int X, int Y);  // value type - copied on assignment, no heap allocation
```

Use `record struct` for small, frequently-allocated value types (coordinates, money amounts) where heap allocation and GC pressure matter; use `record class` (the default) for typical DTOs and API models where reference semantics for `null`-ability are more natural.

## When to Use a Record vs. a Class

| Use a **record** when | Use a **class** when |
|---|---|
| Modeling a DTO, value object, or API request/response | The type has real behavior/methods beyond data holding |
| Equality should be based on content, not identity | Equality should be reference-based (default) or custom-defined |
| You want cheap, safe "copy with a change" via `with` | Instances represent mutable, identity-based entities (e.g. an EF Core tracked entity) |

## Interview Answer

Records give you compiler-generated value equality and immutable-by-default properties in one line, which is ideal for DTOs and value objects. The gotcha to mention: immutability is shallow — a record holding a mutable collection can still have that collection's contents changed through a `with`-copy, since `with` only shallow-copies the top-level properties. Record equality also checks the runtime type via `GetType()`, so subtype instances are never accidentally equal to their base type even with identical property values.

## Summary

Records trade the flexibility of classes for concise, value-equal, mostly-immutable data types — ideal for DTOs and value objects. The key nuances a senior review should probe: `with` is a shallow copy (mutable reference members are shared, not cloned), `init` is compile-time-only immutability (reflection can bypass it), and record inheritance requires an explicit `sealed`/`abstract` design decision on the base type to avoid equality and slicing surprises.

