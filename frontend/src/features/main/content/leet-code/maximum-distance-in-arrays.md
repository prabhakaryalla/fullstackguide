# 624. Maximum Distance in Arrays

**Difficulty:** Medium
**Category:** Array
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `m` sorted integer arrays, return the maximum distance between two integers taken from two *different* arrays, where distance is the absolute difference between their values.

### Example

```
Input: arrays = [[1,2,3],[4,5],[1,2,3]]
Output: 4
```

### Constraints

- `2 <= arrays.length <= 10^5`
- `1 <= arrays[i].length <= 500`

## Approach

Since each array is sorted, the extreme values worth considering from any array are just its first and last elements. Track the running minimum first-element and maximum last-element seen among all arrays processed so far. For each new array, compute the best possible distance pairing its own extremes against the running min/max from *previous* arrays (ensuring the two values come from different arrays), then update the running min/max to include the current array.

## C# Solution

```csharp
public class Solution
{
    public int MaxDistance(IList<IList<int>> arrays)
    {
        int minVal = arrays[0][0];
        int maxVal = arrays[0][^1];
        int result = 0;

        for (int i = 1; i < arrays.Count; i++)
        {
            var current = arrays[i];
            result = Math.Max(result, Math.Max(Math.Abs(current[^1] - minVal), Math.Abs(maxVal - current[0])));

            minVal = Math.Min(minVal, current[0]);
            maxVal = Math.Max(maxVal, current[^1]);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(m)`, where `m` is the number of arrays.
- **Space:** `O(1)`.
