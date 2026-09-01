# 2087. Minimum Cost Homecoming of a Robot in a Grid

**Difficulty:** Medium
**Category:** Array, Greedy, Matrix

## Problem

A robot is on an `m x n` grid at `startPos` and must reach `homePos`. Moving between adjacent rows costs `rowCosts[r]` (the cost of the row being entered), and moving between adjacent columns costs `colCosts[c]` (the cost of the column being entered). The robot can only move up, down, left, or right (never diagonally), and cannot leave the grid. Return *the minimum total cost to reach `homePos`* (it is guaranteed to be reachable).

## Approach

Since the robot can move in any order (rows and columns independently) and the grid always permits a monotonic path toward the target (moving consistently toward `homePos` row-wise and column-wise, one step at a time, is always achievable within grid bounds — there's no need to detour), the minimum cost is simply the sum of the costs of every row strictly between `startRow` and `homeRow` (inclusive of `homeRow`, exclusive of `startRow`) plus every column strictly between `startCol` and `homeCol` similarly, regardless of direction.

## C# Solution

```csharp
public class Solution
{
    public int MinCost(int[] startPos, int[] homePos, int[] rowCosts, int[] colCosts)
    {
        int cost = 0;

        int rowStep = startPos[0] < homePos[0] ? 1 : -1;
        for (int r = startPos[0] + rowStep; r != homePos[0] + rowStep; r += rowStep)
            cost += rowCosts[r];

        int colStep = startPos[1] < homePos[1] ? 1 : -1;
        for (int c = startPos[1] + colStep; c != homePos[1] + colStep; c += colStep)
            cost += colCosts[c];

        return cost;
    }
}
```

## Complexity

- **Time:** `O(|startRow - homeRow| + |startCol - homeCol|)`.
- **Space:** `O(1)`.
