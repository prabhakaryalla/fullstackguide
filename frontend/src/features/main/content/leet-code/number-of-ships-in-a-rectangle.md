# 1274. Number of Ships in a Rectangle

**Difficulty:** Hard
**Category:** Divide and Conquer, Interactive
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given access to a `Sea.HasShips(topRight, bottomLeft)` API that reports whether any ship exists within a rectangular region (each cell holds at most one ship, and the total number of ships is small relative to the grid), count the total number of ships within the initial rectangle `[0, 1000] x [0, 1000]`.

## Approach

Use a quad-tree-style divide and conquer. If the current rectangle reports no ships at all, stop immediately — there's nothing to count. If the rectangle has shrunk to a single cell and it reports a ship, count it. Otherwise, split the rectangle into four quadrants and recursively count ships in each, summing the results. Because API calls are only "wasted" on regions that actually contain at least one ship (empty regions terminate in one call), the total work stays proportional to the number of ships rather than the grid's full area.

## C# Solution

```csharp
public class Solution
{
    public int CountShips(Sea sea, int[] topRight, int[] bottomLeft)
    {
        if (bottomLeft[0] > topRight[0] || bottomLeft[1] > topRight[1]) return 0;
        if (!sea.HasShips(topRight, bottomLeft)) return 0;

        if (topRight[0] == bottomLeft[0] && topRight[1] == bottomLeft[1])
            return 1;

        int midX = (topRight[0] + bottomLeft[0]) / 2;
        int midY = (topRight[1] + bottomLeft[1]) / 2;

        int count = 0;
        count += CountShips(sea, new[] { midX, midY }, bottomLeft);
        count += CountShips(sea, topRight, new[] { midX + 1, midY + 1 });
        count += CountShips(sea, new[] { midX, topRight[1] }, new[] { bottomLeft[0], midY + 1 });
        count += CountShips(sea, new[] { topRight[0], midY }, new[] { midX + 1, bottomLeft[1] });

        return count;
    }
}
```

## Complexity

- **Time:** `O(k log(A / k))`, where `k` is the number of ships and `A` is the grid area.
- **Space:** `O(log A)` for the recursion stack.
