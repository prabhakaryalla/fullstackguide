# 1326. Minimum Number of Taps to Open to Water a Garden

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Greedy

## Problem

Given a garden `[0, n]` and `ranges[i]` for each tap at position `i` (watering `[i - ranges[i], i + ranges[i]]`), return the minimum number of taps to open to water the whole garden, or `-1` if impossible.

### Example

```
Input: n = 5, ranges = [3,4,1,1,0,0]
Output: 1
```

## Approach

Convert each tap into an interval and, for every starting point, record the farthest right endpoint reachable from an interval beginning at or before that point — this is the same greedy "maximum reach" strategy used for minimum jumps: repeatedly extend as far as possible before being forced to add another tap.

## C# Solution

```csharp
public class Solution
{
    public int MinTaps(int n, int[] ranges)
    {
        var maxReach = new int[n + 1];

        for (int i = 0; i <= n; i++)
        {
            int left = Math.Max(0, i - ranges[i]);
            int right = Math.Min(n, i + ranges[i]);
            maxReach[left] = Math.Max(maxReach[left], right);
        }

        int taps = 0, curEnd = 0, farthest = 0;

        for (int i = 0; i <= n; i++)
        {
            if (i > farthest) return -1;

            if (i > curEnd)
            {
                taps++;
                curEnd = farthest;
            }

            farthest = Math.Max(farthest, maxReach[i]);
        }

        return taps;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the max-reach array.
