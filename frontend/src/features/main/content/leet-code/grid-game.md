# 2017. Grid Game

**Difficulty:** Medium
**Category:** Array, Matrix, Prefix Sum

## Problem

You are given a 0-indexed 2D array `grid` of size `2 x n`, representing a robot race track with points in each cell. Robot 1 starts at `(0, 0)` and must reach `(1, n - 1)`, moving only right or down, collecting (and zeroing out) the points of every cell it visits. Robot 2 then starts at `(0, 0)` and travels to `(1, n - 1)` the same way, trying to maximize the points it collects from the cells robot 1 left behind. Robot 1 moves first and wants to **minimize** the maximum number of points robot 2 can collect. Return *that minimized maximum*.

## Approach

Robot 1's path is fully determined by the single column `i` where it switches from row 0 to row 1: it collects `grid[0][0..i]` and `grid[1][i..n-1]`, zeroing those cells. The only cells left for robot 2 are `grid[1][0..i-1]` (the untouched prefix of the bottom row) and `grid[0][i+1..n-1]` (the untouched suffix of the top row) — and since these two remaining segments are in different rows and don't overlap on any single top-to-bottom path, robot 2's optimal outcome for a given `i` is simply the larger of these two sums.

So the answer is `min over i of max(bottomPrefixSum(i-1), topSuffixSum(i+1))`. Precompute the total sum of row 0 and incrementally track the prefix sum of row 1 while sweeping `i` from `0` to `n - 1`.

## C# Solution

```csharp
public class Solution
{
    public long GridGame(int[][] grid)
    {
        int n = grid[0].Length;
        long topSum = 0;
        for (int i = 0; i < n; i++) topSum += grid[0][i];

        long bottomSum = 0;
        long best = long.MaxValue;

        for (int i = 0; i < n; i++)
        {
            topSum -= grid[0][i];
            long result = Math.Max(topSum, bottomSum);
            best = Math.Min(best, result);
            bottomSum += grid[1][i];
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
