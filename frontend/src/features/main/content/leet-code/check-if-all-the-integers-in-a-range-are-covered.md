# 1893. Check if All the Integers in a Range Are Covered

**Difficulty:** Easy
**Category:** Array, Hash Table, Prefix Sum

## Problem

Given a 2D array `ranges` where `ranges[i] = [start, end]`, and integers `left`/`right`, return whether every integer in `[left, right]` is covered by at least one range.

### Example

```
Input: ranges = [[1,2],[3,4],[5,6]], left = 2, right = 5
Output: true
```

## Approach

Since the constraints keep all values within a small fixed bound (at most 50), mark a boolean array for every integer covered by any range, then check that every integer in `[left, right]` is marked.

## C# Solution

```csharp
public class Solution
{
    public bool IsCovered(int[][] ranges, int left, int right)
    {
        var covered = new bool[51];

        foreach (var range in ranges)
        {
            for (int i = Math.Max(range[0], 1); i <= Math.Min(range[1], 50); i++)
            {
                covered[i] = true;
            }
        }

        for (int i = left; i <= right; i++)
        {
            if (!covered[i]) return false;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n * 50 + (right - left))`, effectively `O(n)`.
- **Space:** `O(1)` (fixed-size 51-element array).
