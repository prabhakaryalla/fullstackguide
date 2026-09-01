# 2634. Filter Elements from Array

**Difficulty:** Easy
**Category:** Array

## Problem
Implement `filter(arr, fn)` that returns a new array containing only the elements of `arr` for which `fn(value, index)` returns `true`, preserving their relative order.

## Approach
Iterate through the array once, evaluating the predicate on each `(value, index)` pair, and collect the elements that pass into a result list.

## C# Solution

```csharp
public class Solution
{
    public int[] Filter(int[] arr, Func<int, int, bool> fn)
    {
        var result = new List<int>();

        for (int i = 0; i < arr.Length; i++)
        {
            if (fn(arr[i], i))
            {
                result.Add(arr[i]);
            }
        }

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** O(n).
- **Space:** O(n) for the output array.
