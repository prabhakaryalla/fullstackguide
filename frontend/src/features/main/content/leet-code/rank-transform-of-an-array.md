# 1331. Rank Transform of an Array

**Difficulty:** Easy
**Category:** Array, Hash Table, Sorting

## Problem

Given an array `arr`, replace each element with its rank, where the smallest element gets rank `1`, the next distinct smallest gets rank `2`, and so on, with equal elements sharing the same rank.

### Example

```
Input: arr = [40,10,20,30]
Output: [4,1,2,3]
```

## Approach

Sort the distinct values in ascending order to determine their rank, storing each value's rank in a dictionary. Then map every original element to its rank via a single lookup pass.

## C# Solution

```csharp
public class Solution
{
    public int[] ArrayRankTransform(int[] arr)
    {
        var sorted = arr.Distinct().ToArray();
        Array.Sort(sorted);

        var rank = new Dictionary<int, int>();
        for (int i = 0; i < sorted.Length; i++) rank[sorted[i]] = i + 1;

        var result = new int[arr.Length];
        for (int i = 0; i < arr.Length; i++) result[i] = rank[arr[i]];

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the rank map.
