# 1200. Minimum Absolute Difference

**Difficulty:** Easy
**Category:** Array, Sorting

## Problem

Given an array of distinct integers `arr`, find the minimum absolute difference between any two elements, and return all pairs `[a, b]` (with `a < b`) that achieve that minimum difference, sorted in ascending order.

### Example

```
Input: arr = [4,2,1,3]
Output: [[1,2],[2,3],[3,4]]
```

## Approach

Sort the array first — the minimum absolute difference between any two elements must occur between some pair of adjacent elements in sorted order. Scan once to find that minimum gap, then scan again to collect every adjacent pair whose difference equals it.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> MinimumAbsDifference(int[] arr)
    {
        Array.Sort(arr);
        int minDiff = int.MaxValue;

        for (int i = 1; i < arr.Length; i++)
        {
            minDiff = Math.Min(minDiff, arr[i] - arr[i - 1]);
        }

        var result = new List<IList<int>>();

        for (int i = 1; i < arr.Length; i++)
        {
            if (arr[i] - arr[i - 1] == minDiff)
            {
                result.Add(new List<int> { arr[i - 1], arr[i] });
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the result list.
