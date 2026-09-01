# 2804. Array Prototype ForEach

**Difficulty:** Easy
**Category:** Array, Closure
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given an array `arr` and a function `fn`, implement `forEach(arr, fn)` that invokes `fn(value, index, arr)` once for every element of `arr`, in order, without using the built-in `Array.prototype.forEach`.

## Approach
Adapted with a simple indexed loop over a generic `List<T>`, invoking the supplied delegate with the element, its index, and the original list on each iteration.

## C# Solution

```csharp
public class Solution
{
    public static void ForEach<T>(List<T> arr, Action<T, int, List<T>> fn)
    {
        for (int i = 0; i < arr.Count; i++)
        {
            fn(arr[i], i, arr);
        }
    }
}
```

## Complexity

- **Time:** O(n).
- **Space:** O(1) extra.
