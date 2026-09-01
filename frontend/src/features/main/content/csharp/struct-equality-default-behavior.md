# Default Equality Behavior of Structs in C#

Structs get a default `Equals` implementation "for free", but it is field-by-field, can involve reflection, and behaves differently when reference-type fields are involved.

## Quick Difference

- A `struct` automatically supports `Equals` via `ValueType.Equals`, which compares all fields for equality (unlike classes, which default to reference equality).
- If a struct contains a reference-type field, that field is compared using the field's own `Equals` (or reference equality if unoverridden) — not deep value equality.
- The default struct `Equals` uses reflection and is noticeably slower than a hand-written override.

## Default Struct Equality

```csharp
public struct Point
{
    public int X, Y;
}

var p1 = new Point { X = 1, Y = 2 };
var p2 = new Point { X = 1, Y = 2 };

Console.WriteLine(p1.Equals(p2)); // true - all fields compared automatically
Console.WriteLine(p1 == p2);      // compile error: struct has no == unless you add one
```

Key points:

- `struct` gets value-based `Equals` automatically, but **not** `==` — you must implement `==`/`!=` yourself if you want them
- the default `Equals` uses reflection internally, which is slow in hot paths (loops, large collections)

## The Reference-Field Trap

```csharp
public struct Wrapper
{
    public List<int> Items; // reference type field
}

var a = new Wrapper { Items = new List<int> { 1, 2, 3 } };
var b = new Wrapper { Items = new List<int> { 1, 2, 3 } };

Console.WriteLine(a.Equals(b)); // false - Items are different List<int> objects
```

Key points:

- the default struct `Equals` compares the `Items` field using `List<int>.Equals`, which `List<T>` does not override, so it falls back to reference equality
- two structs that "look" identical can compare as unequal because a contained reference-type field points to different objects

## Recommended: Override Equals for Performance and Correctness

```csharp
public readonly struct Point : IEquatable<Point>
{
    public int X { get; }
    public int Y { get; }

    public Point(int x, int y) { X = x; Y = y; }

    public bool Equals(Point other) => X == other.X && Y == other.Y;
    public override bool Equals(object? obj) => obj is Point other && Equals(other);
    public override int GetHashCode() => HashCode.Combine(X, Y);

    public static bool operator ==(Point a, Point b) => a.Equals(b);
    public static bool operator !=(Point a, Point b) => !a.Equals(b);
}
```

Key points:

- implementing `IEquatable<T>` avoids boxing and the slow reflection-based path
- explicitly compare each field you care about, so reference-type fields are handled the way you intend (value or identity)

## Summary

- Structs get automatic, field-by-field `Equals` — but it is reflection-based (slow) and compares reference-type fields by reference, not deep value.
- For any struct used in equality checks, hash sets, or dictionaries, override `Equals`/`GetHashCode` and implement `IEquatable<T>` explicitly.
