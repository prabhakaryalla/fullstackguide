# 497. Random Point in Non-overlapping Rectangles

**Difficulty:** Medium
**Category:** Array, Math, Binary Search, Randomization, Prefix Sum

## Problem

Given a set of non-overlapping axis-aligned rectangles `rects`, implement the `Solution` class with `Pick()`, returning a uniformly random integer point inside the space covered by the rectangles.

### Example

```
Input:
["Solution", "pick", "pick", "pick"]
[[[[1, 1, 5, 5]]], [], [], []]
Output:
[null, [4, 1], [4, 1], [3, 3]] (values may vary)
```

### Constraints

- `1 <= rects.length <= 100`
- `rects[i].length == 4`
- `-10^9 <= ai < xi <= 10^9`
- `-10^9 <= bi < yi <= 10^9`

## Approach

Precompute a prefix sum of the number of integer points each rectangle contains, weighting the random selection so rectangles with more points are chosen proportionally more often. To pick a point, generate a random value within the total point count, binary search the prefix sums to find which rectangle it falls in, then convert the remaining offset within that rectangle into `(x, y)` coordinates using the rectangle's width.

## C# Solution

```csharp
public class Solution
{
    private readonly int[][] rects;
    private readonly int[] prefixCounts;
    private readonly Random random = new();

    public Solution(int[][] rects)
    {
        this.rects = rects;
        prefixCounts = new int[rects.Length];

        int total = 0;
        for (int i = 0; i < rects.Length; i++)
        {
            var rect = rects[i];
            int points = (rect[2] - rect[0] + 1) * (rect[3] - rect[1] + 1);
            total += points;
            prefixCounts[i] = total;
        }
    }

    public int[] Pick()
    {
        int target = random.Next(prefixCounts[^1]) + 1;
        int index = LowerBound(target);

        var rect = rects[index];
        int width = rect[2] - rect[0] + 1;

        int pointsBefore = index == 0 ? 0 : prefixCounts[index - 1];
        int offset = target - pointsBefore - 1;

        int x = rect[0] + offset % width;
        int y = rect[1] + offset / width;

        return new[] { x, y };
    }

    private int LowerBound(int target)
    {
        int lo = 0, hi = prefixCounts.Length;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (prefixCounts[mid] < target) lo = mid + 1;
            else hi = mid;
        }

        return lo;
    }
}
```

## Complexity

- **Time:** `O(n)` construction, `O(log n)` per `Pick` call.
- **Space:** `O(n)` for the prefix sums.
