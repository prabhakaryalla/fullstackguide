# 1471. The k Strongest Values in an Array

**Difficulty:** Medium
**Category:** Array, Two Pointers, Sorting

## Problem

Given an integer array `arr` and an integer `k`, define the "median" `m` as the element at index `(n - 1) / 2` after sorting, and the "strength" of a value as its absolute difference from `m`. Return the `k` strongest values, sorted so stronger values come first (ties broken by the larger value first).

### Example

```
Input: arr = [1,2,3,4,5], k = 2
Output: [5,1]
```

## Approach

Sort the array to find the median at index `(n - 1) / 2`. Then sort all elements by strength (absolute difference from the median) descending, breaking ties by the value itself descending, and take the first `k` results.

## C# Solution

```csharp
public class Solution
{
    public int[] GetStrongest(int[] arr, int k)
    {
        Array.Sort(arr);
        int n = arr.Length;
        int median = arr[(n - 1) / 2];

        return arr
            .OrderByDescending(x => Math.Abs(x - median))
            .ThenByDescending(x => x)
            .Take(k)
            .ToArray();
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the sorted results.
