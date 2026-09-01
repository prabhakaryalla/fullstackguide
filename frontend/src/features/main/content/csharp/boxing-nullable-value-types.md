# Boxing Behavior of Nullable&lt;T&gt; in C#

`Nullable<T>` gets special-cased by the runtime when boxed — the result is not what you'd naively expect from a generic struct.

## Quick Difference

- Boxing a normal struct wraps it in an `object` whose runtime type is that struct type.
- Boxing a `Nullable<T>` that **has a value** produces a boxed `T` (not a boxed `Nullable<T>`) — the "nullable-ness" disappears.
- Boxing a `Nullable<T>` that is **null** (`HasValue == false`) produces an actual `null` reference, not a boxed object at all.

## Boxing a Regular Struct

```csharp
int number = 42;
object boxed = number;

Console.WriteLine(boxed.GetType()); // System.Int32
```

## Boxing a Nullable<T> With a Value

```csharp
int? number = 42;
object boxed = number;

Console.WriteLine(boxed.GetType()); // System.Int32, NOT System.Nullable`1[System.Int32]!
```

Key points:

- the CLR special-cases `Nullable<T>` boxing specifically so that boxed nullables behave like their underlying type
- `boxed is int` is `true`, and `boxed is int?` is also `true` — but `boxed.GetType()` never reports `Nullable<int>`

## Boxing a Nullable<T> That Is Null

```csharp
int? number = null;
object? boxed = number;

Console.WriteLine(boxed == null); // true - boxing null Nullable<T> gives an actual null reference
```

Key points:

- there is no such thing as a "boxed null Nullable<T>" object — it's just `null`
- this means you cannot distinguish, from the boxed reference alone, whether the original static type was `int?` or `object` was simply assigned `null` directly

## Real-World Example

```csharp
public static void Describe(object? value)
{
    if (value is null)
    {
        Console.WriteLine("null - could have come from int?, string, or any reference type");
        return;
    }

    Console.WriteLine($"Runtime type: {value.GetType()}"); // never "Nullable`1[...]"
}

Describe((int?)5);    // Runtime type: System.Int32
Describe((int?)null); // null - ...
```

Code that uses reflection or `GetType()` to inspect a boxed value and expects to see `Nullable<T>` will be surprised — the CLR guarantees you never observe a boxed `Nullable<T>` directly; you either get the boxed underlying value or plain `null`.

## Summary

- Boxed `Nullable<T>` collapses to either a boxed `T` (when it has a value) or `null` (when it doesn't) — the wrapper type itself is never observable after boxing.
- Don't rely on `GetType()` or reflection to detect "this came from a nullable value type" — that information is lost during boxing by design.
