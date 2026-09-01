# 2704. To Be Or Not To Be

**Difficulty:** Easy
**Category:** Function, Design

## Problem

Write a function `expect(val)` that returns an object with two methods:

- `toBe(val2)` returns `true` if `val` and `val2` are strictly equal; otherwise it throws an error with the message `"Not Equal"`.
- `notToBe(val2)` returns `true` if `val` and `val2` are **not** strictly equal; otherwise it throws an error with the message `"Equal"`.

### Example

```
expect(5).toBe(5); // true
expect(5).toBe(null); // throws "Not Equal"
expect(5).notToBe(null); // true
```

## Approach

Model the returned object as a small generic class capturing `val` in its constructor. `ToBe` and `NotToBe` compare `val` against the supplied argument using `EqualityComparer<T>.Default` and throw an `InvalidOperationException` with the appropriate message when the assertion fails, otherwise returning `true`.

## C# Solution

```csharp
public class Expect<T>
{
    private readonly T val;

    public Expect(T val)
    {
        this.val = val;
    }

    public bool ToBe(T val2)
    {
        if (!EqualityComparer<T>.Default.Equals(val, val2))
        {
            throw new InvalidOperationException("Not Equal");
        }
        return true;
    }

    public bool NotToBe(T val2)
    {
        if (EqualityComparer<T>.Default.Equals(val, val2))
        {
            throw new InvalidOperationException("Equal");
        }
        return true;
    }
}

public class Solution
{
    public static Expect<T> CreateExpectation<T>(T val) => new Expect<T>(val);
}
```

## Complexity

- **Time:** O(1).
- **Space:** O(1).
