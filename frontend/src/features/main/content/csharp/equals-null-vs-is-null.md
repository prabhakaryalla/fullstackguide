# Difference Between myObject == null and myObject is null in C#

Both check whether a reference is null, but they resolve differently and can behave differently when `==` is overloaded.

## Quick Difference

- `myObject == null` calls the `==` operator, which can be overloaded by the type (or hidden by a `new` operator).
- `myObject is null` is a pattern match that always performs a true null check, regardless of any overloaded `==`.

## == null in C#

```csharp
if (myObject == null)
{
    // uses the type's == operator (custom or default reference equality)
}
```

Key points:

- resolved at compile time based on the static type of `myObject`
- if the type overloads `==` (for example to add custom equality logic), that overload runs instead of a plain reference check
- a buggy overload could make `myObject == null` return an unexpected result

## is null in C#

```csharp
if (myObject is null)
{
    // pattern match, cannot be overloaded
}
```

Key points:

- introduced in C# 7 as a pattern-matching expression
- always checks for an actual null reference, ignoring any `==` overload
- safe and predictable even when the type has unusual equality logic

## Why It Matters

```csharp
public class Widget
{
    public static bool operator ==(Widget a, Widget b) => true; // buggy overload
    public static bool operator !=(Widget a, Widget b) => false;
}

var widget = new Widget();
Console.WriteLine(widget == null);  // true (bug!) - uses the overload above
Console.WriteLine(widget is null);  // false - correct, widget is not null
```

## Real-World Example: Entity with Overloaded Equality

Imagine an `Employee` type where `==` is overloaded to compare by `EmployeeId` instead of reference:

```csharp
public class Employee
{
    public int EmployeeId { get; set; }

    public static bool operator ==(Employee? a, Employee? b)
    {
        if (a is null || b is null)
        {
            return false; // bug: forgot to handle both being null
        }
        return a.EmployeeId == b.EmployeeId;
    }

    public static bool operator !=(Employee? a, Employee? b) => !(a == b);
}

Employee? current = null;

Console.WriteLine(current == null); // false (bug!) - the overload returns false whenever either side is null
Console.WriteLine(current is null); // true - correctly detects the null reference
```

This is a common real-world bug: developers overload `==` for business-key comparisons and forget the case where one side is actually `null`. Using `is null` for the null check avoids the problem entirely.

## Example: Generic Methods

`is null` also works safely with unconstrained generic type parameters, where `== null` may not even compile:

```csharp
public static bool IsEmpty<T>(T value)
{
    return value is null; // works for both reference and nullable value types
    // return value == null; // compile error: cannot apply == to unconstrained type parameter T
}
```

## When to Use Each

Use `is null` when:

- writing general-purpose null checks, especially in library code
- the type's `==` operator is unknown, overloaded, or untrusted
- working with generic type parameters

Use `== null` when:

- you specifically want the type's custom equality behavior to run

## Summary

- `is null` is the safer, recommended default for null checks.
- `== null` can be redirected by an overloaded `==` operator, so it is not guaranteed to check reference equality.
