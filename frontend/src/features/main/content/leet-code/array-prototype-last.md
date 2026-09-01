# 2619. Array Prototype Last

**Difficulty:** Easy
**Category:** Array, Closures

## Problem
Extend an array type with a `last()` operation that returns the last element of the array, or `-1` if the array is empty — without relying on the language's existing "get last element" convenience methods.

## Approach
Adapted to C#: implement this as an extension method on `int[]` that checks the array's length and directly indexes the final slot (`arr.Length - 1`) rather than using LINQ's `Last()`/`LastOrDefault()`.

## C# Solution

```csharp
public static class ArrayExtensions
{
    public static int LastOrMinusOne(this int[] arr)
    {
        return arr.Length == 0 ? -1 : arr[arr.Length - 1];
    }
}

public class Solution
{
    public int GetLast(int[] arr) => arr.LastOrMinusOne();
}
```

## Complexity

- **Time:** O(1).
- **Space:** O(1).
