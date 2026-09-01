# Equals() vs == vs ReferenceEquals() for Custom Classes

For a custom reference type, these three checks can give three different answers unless you carefully override equality members consistently.

## Quick Difference

- `==` uses the operator overload resolved at compile time (default is reference equality for classes, unless overloaded).
- `.Equals()` is virtual and can be overridden to compare by value; it is resolved at runtime based on the actual object type.
- `ReferenceEquals()` always checks object identity and can never be overloaded.

## Default Behavior (No Overrides)

```csharp
public class Point
{
    public int X, Y;
}

var p1 = new Point { X = 1, Y = 2 };
var p2 = new Point { X = 1, Y = 2 };

Console.WriteLine(p1 == p2);            // false - default == is reference equality
Console.WriteLine(p1.Equals(p2));       // false - default Equals is also reference equality
Console.WriteLine(ReferenceEquals(p1, p2)); // false - different objects
```

## Overriding Equals Only

```csharp
public class Point
{
    public int X, Y;

    public override bool Equals(object? obj)
        => obj is Point other && X == other.X && Y == other.Y;

    public override int GetHashCode() => HashCode.Combine(X, Y);
}

var p1 = new Point { X = 1, Y = 2 };
var p2 = new Point { X = 1, Y = 2 };

Console.WriteLine(p1 == p2);      // false - == is still reference equality (not overloaded!)
Console.WriteLine(p1.Equals(p2)); // true - value comparison via overridden Equals
```

Key points:

- overriding `Equals` does **not** change `==` behavior — they are independent unless you also overload `==`
- this mismatch is a common source of bugs: code that uses `==` expecting value equality silently falls back to reference equality

## Overloading == as Well

```csharp
public class Point
{
    public int X, Y;

    public override bool Equals(object? obj)
        => obj is Point other && X == other.X && Y == other.Y;

    public override int GetHashCode() => HashCode.Combine(X, Y);

    public static bool operator ==(Point a, Point b) => a.Equals(b);
    public static bool operator !=(Point a, Point b) => !(a == b);
}

Console.WriteLine(p1 == p2); // now true - == delegates to Equals
```

Key points:

- when overloading `==`, always overload `!=` too, and keep both consistent with `Equals`/`GetHashCode`
- `ReferenceEquals(p1, p2)` still returns `false` regardless of any overloads — it can never be changed

## Tricky Example 1: Boxed Value Types

```csharp
object a = 5;
object b = 5;

Console.WriteLine(a == b);       // false! object's == is reference equality, and both are separate boxes
Console.WriteLine(a.Equals(b));  // true - int overrides Equals to compare values
```

Once an `int` is boxed into `object`, `==` resolves to `object`'s operator (reference equality) at compile time, because the *declared* type of `a`/`b` is `object`. `.Equals()` still dispatches virtually to `int.Equals`, which compares values. Same numbers, different answers.

## Tricky Example 2: Static Type Decides Which == Runs

```csharp
public class Base { }
public class Derived : Base
{
    public static bool operator ==(Derived a, Derived b) => true; // always "equal"
    public static bool operator !=(Derived a, Derived b) => false;
    public override bool Equals(object? obj) => true;
    public override int GetHashCode() => 0;
}

Derived d1 = new(), d2 = new();
Base b1 = d1, b2 = d2;

Console.WriteLine(d1 == d2); // true - Derived's overloaded == is used
Console.WriteLine(b1 == b2); // false! declared type is Base, which has no overload -> reference equality
Console.WriteLine(b1.Equals(b2)); // true - Equals is virtual, always runs the Derived override
```

`==` operator overloads are chosen by the **compile-time (declared) type** of the variables, not the runtime object — so the exact same two objects can compare differently through a base-typed reference. `.Equals()` never has this problem because it's virtual.

## Tricky Example 3: Equals(object) Can Throw, == Might Not

```csharp
Point? p1 = null;
Point p2 = new() { X = 1, Y = 2 };

Console.WriteLine(p1 == p2);        // false - safe, no exception (if == isn't overloaded, compiler null-checks first)
Console.WriteLine(p1!.Equals(p2));  // throws NullReferenceException - calling a method on null
```

Calling `.Equals()` on a `null` reference throws, because it's an instance method call. `==` on a `null` operand is generally safe (either the default reference-equality operator or a properly written overload that checks for `null` first) — but only if the overload was written defensively, as shown earlier in the "buggy overload" pattern.

## Tricky Example 4: records Get Both, Automatically

```csharp
public record PointRecord(int X, int Y);

var r1 = new PointRecord(1, 2);
var r2 = new PointRecord(1, 2);

Console.WriteLine(r1 == r2);      // true - records auto-generate value-based == AND Equals
Console.WriteLine(r1.Equals(r2)); // true - consistent, no manual overload needed
```

Unlike plain classes, `record` types automatically generate **both** a value-based `Equals` override and a matching `==`/`!=` overload, so this whole class of bug (mismatched `==` vs `Equals`) simply doesn't occur — one more reason to prefer `record` for simple data-holding types.

## Summary

- `ReferenceEquals` = always identity, never overridable.
- `Equals` = virtual, override it for value-based comparison.
- `==` = compile-time operator, defaults to reference equality for classes and stays that way unless you explicitly overload it, even after overriding `Equals`.
