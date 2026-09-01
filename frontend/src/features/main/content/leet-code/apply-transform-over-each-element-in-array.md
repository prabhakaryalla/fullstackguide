# 2635. Apply Transform Over Each Element in Array

**Difficulty:** Easy
**Category:** Array

## Problem
Implement `map(arr, fn)` that returns a new array where each element is the result of applying `fn(value, index)` to the corresponding element of `arr`.

## Approach
Iterate through the array once, applying the transformation callback to each `(value, index)` pair and writing the result into a new output array of the same length.

## C# Solution

```csharp
public class Solution
{
    public int[] Map(int[] arr, Func<int, int, int> fn)
    {
        int[] result = new int[arr.Length];

        for (int i = 0; i < arr.Length; i++)
        {
            result[i] = fn(arr[i], i);
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n).
- **Space:** O(n) for the output array.
