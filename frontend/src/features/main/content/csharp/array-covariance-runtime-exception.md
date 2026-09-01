# Array Covariance and ArrayTypeMismatchException in C#

Arrays of reference types are covariant in C#, which lets code compile that is actually unsafe and can throw at runtime.

## Quick Difference

- Array covariance allows a `string[]` to be assigned to an `object[]` variable, because `string` derives from `object`.
- The compiler allows writing to that array through the `object[]` reference, but the CLR checks the actual element type at runtime on every write — an incompatible write throws `ArrayTypeMismatchException`.

## The Problem

```csharp
string[] strings = new string[3];
object[] objects = strings; // allowed: array covariance

objects[0] = "ok";       // fine - string fits
objects[1] = 5;          // compiles fine (object accepts int)...
                         // ...but throws ArrayTypeMismatchException at runtime!
```

Key points:

- `objects` is declared as `object[]`, so the compiler happily allows storing any `object`-compatible value, including an `int`
- at runtime, the array's actual element type is still `string[]`, and the CLR rejects the incompatible write with an exception
- this is a well-known gap in C#'s type safety, kept for backward compatibility (predates generics)

## Why Reads Are Safe But Writes Aren't

```csharp
object[] objects = new string[] { "a", "b" };

object item = objects[0]; // fine - reading is always safe, "a" really is an object
objects[0] = 123;          // throws - "123" is not a string, the array's real type
```

Reading never breaks type safety (every `string` is a valid `object`), but writing can, because the array's true runtime element type is more specific than the variable's declared type.

## Real-World Example

```csharp
void PrintAll(object[] items)
{
    for (int i = 0; i < items.Length; i++)
    {
        Console.WriteLine(items[i]);
    }
}

void FillWithDefault(object[] items)
{
    for (int i = 0; i < items.Length; i++)
    {
        items[i] = new object(); // looks harmless...
    }
}

string[] names = new string[5];
FillWithDefault(names); // throws ArrayTypeMismatchException - names is really string[]
```

A generic-looking helper method that writes `new object()` into any `object[]` parameter will blow up specifically when called with a covariant array like `string[]`, even though the code compiles cleanly and looks type-safe.

## How to Avoid It

- Prefer `IReadOnlyList<T>`/`IEnumerable<T>` for read-only APIs, or generic `List<T>`/`T[]` with the exact element type, instead of passing arrays through an `object[]`-typed parameter.
- If you must accept `object[]`, avoid writing to it, or validate element types before writing.

## Summary

- Array covariance lets a more-derived array (like `string[]`) be used as a less-derived array type (`object[]`), which compiles but is not fully type-safe.
- Writes are checked at runtime and can throw `ArrayTypeMismatchException` — this is a classic "compiles fine, crashes later" C# gotcha.
