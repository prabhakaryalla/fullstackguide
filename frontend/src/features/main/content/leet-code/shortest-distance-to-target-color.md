# 1182. Shortest Distance to Target Color

**Difficulty:** Medium
**Category:** Array, Binary Search

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a `colors` array and a list of `queries[i] = [index, color]`, return for each query the shortest distance from `index` to any position holding `color`, or `-1` if that color doesn't appear.

### Example

```
Input: colors = [1,1,2,1,3,2,2,3,3], queries = [[1,3],[2,2],[6,1]]
Output: [3,0,3]
```

## Approach

Precompute a sorted list of positions for every distinct color. For each query, binary search that color's position list for the insertion point of `index`, then compare the distance to the closest position just before and just after that point — the smaller of the two (when they exist) is the answer.

## C# Solution

```csharp
public class Solution
{
    public IList<int> ShortestDistanceColor(int[] colors, int[][] queries)
    {
        var positions = new Dictionary<int, List<int>>();

        for (int i = 0; i < colors.Length; i++)
        {
            if (!positions.TryGetValue(colors[i], out var list))
            {
                list = new List<int>();
                positions[colors[i]] = list;
            }
            list.Add(i);
        }

        var result = new List<int>();

        foreach (var q in queries)
        {
            int index = q[0], color = q[1];

            if (!positions.TryGetValue(color, out var list))
            {
                result.Add(-1);
                continue;
            }

            int pos = LowerBound(list, index);
            int best = int.MaxValue;

            if (pos < list.Count) best = Math.Min(best, Math.Abs(list[pos] - index));
            if (pos > 0) best = Math.Min(best, Math.Abs(list[pos - 1] - index));

            result.Add(best);
        }

        return result;
    }

    private int LowerBound(List<int> list, int value)
    {
        int lo = 0, hi = list.Count;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (list[mid] < value) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** `O((n + q) log n)`.
- **Space:** `O(n)` for the position lists.
