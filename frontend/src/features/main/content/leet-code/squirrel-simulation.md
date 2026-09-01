# 573. Squirrel Simulation

**Difficulty:** Medium
**Category:** Array, Math
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the size of a grid, the position of a `tree`, the position of a `squirrel`, and the positions of `nuts`, return the minimum total distance the squirrel needs to travel to collect all nuts and bring each one back to the tree, visiting nuts in any order (one at a time).

### Example

```
Input: height = 5, width = 7, tree = [2,2], squirrel = [4,4], nuts = [[3,0],[2,5]]
Output: 12
```

## Approach

Every nut requires a round trip between the tree and the nut, contributing `2 * distance(tree, nut)` to the total regardless of order — except for exactly one nut, which the squirrel can visit *first* directly from its starting position instead of from the tree, saving `distance(tree, nut) - distance(squirrel, nut)` compared to the default round-trip cost. Sum the full round-trip cost for every nut, then subtract the largest possible savings (choosing whichever nut maximizes that saving as the first one visited).

## C# Solution

```csharp
public class Solution
{
    public int MinDistance(int height, int width, int[] tree, int[] squirrel, int[][] nuts)
    {
        int totalDistance = 0;
        int maxSaved = int.MinValue;

        foreach (var nut in nuts)
        {
            int treeToNut = Distance(tree, nut);
            totalDistance += 2 * treeToNut;

            int squirrelToNut = Distance(squirrel, nut);
            maxSaved = Math.Max(maxSaved, treeToNut - squirrelToNut);
        }

        return totalDistance - maxSaved;
    }

    private int Distance(int[] a, int[] b)
    {
        return Math.Abs(a[0] - b[0]) + Math.Abs(a[1] - b[1]);
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of nuts.
- **Space:** `O(1)`.
