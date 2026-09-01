# 2695. Array Wrapper

**Difficulty:** Easy
**Category:** Design, Operator Overloading

## Problem

Create a class `ArrayWrapper` that accepts an array of integers in its constructor, providing two features:

- When two instances are added together with the `+` operator, the resulting value is the sum of all elements across both wrapped arrays.
- When an instance is converted to a string, it returns a comma-separated string surrounded by brackets, e.g. `"[1,2,3]"`.

### Example

```
const obj1 = new ArrayWrapper([1, 2]);
const obj2 = new ArrayWrapper([3, 4]);
obj1 + obj2; // 10
String(obj1); // "[1,2]"
```

## Approach

C# supports operator overloading and `ToString()` overrides directly, which map cleanly onto JavaScript's `Symbol.toPrimitive`/`valueOf` and `toString` customization used in the original problem. Overload `operator +` to sum the elements of both wrapped arrays, and override `ToString()` to build the bracketed, comma-separated representation.

## C# Solution

```csharp
public class ArrayWrapper
{
    private readonly int[] values;

    public ArrayWrapper(int[] values)
    {
        this.values = values;
    }

    public static int operator +(ArrayWrapper a, ArrayWrapper b)
    {
        return a.values.Sum() + b.values.Sum();
    }

    public override string ToString()
    {
        return "[" + string.Join(",", values) + "]";
    }
}
```

## Complexity

- **Time:** O(n) for `+` and O(n) for `ToString()`, where n is the array length.
- **Space:** O(n) for the resulting string.
