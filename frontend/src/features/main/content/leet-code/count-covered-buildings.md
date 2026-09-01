# 3531. Count Covered Buildings

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

You are given a positive integer `n` and a 2D integer array `buildings`, where `buildings[i] = [x, y]` represents the coordinates of a building. No two buildings share the same coordinates.

A building is said to be **covered** if all four of the following hold:
- There exists another building in the same row (same `y`) with a smaller `x`.
- There exists another building in the same row with a larger `x`.
- There exists another building in the same column (same `x`) with a smaller `y`.
- There exists another building in the same column with a larger `y`.

Return the number of covered buildings.

### Example

`buildings` forms every cell of a 3x3 grid: `[[1,1],[2,1],[3,1],[1,2],[2,2],[3,2],[1,3],[2,3],[3,3]]`.

Only `[2,2]` has a building to its left (`x=1`) and right (`x=3`) in row `y=2`, and a building above (`y=1`) and below (`y=3`) in column `x=2`. Every other building lies on the border of the grid, so it is missing at least one neighbor. The answer is `1`.

## Approach

Group buildings by row and by column. For each row `y`, track the minimum and maximum `x`. For each column `x`, track the minimum and maximum `y`. A building `(x, y)` is covered exactly when `x` is neither the minimum nor the maximum `x` for row `y`, and `y` is neither the minimum nor the maximum `y` for column `x`.

## C# Solution

```csharp
public class Solution 
{
    public int CountCoveredBuildings(int n, int[][] buildings) 
    {
        Dictionary<int, int> rowMin = new Dictionary<int, int>();
        Dictionary<int, int> rowMax = new Dictionary<int, int>();
        Dictionary<int, int> colMin = new Dictionary<int, int>();
        Dictionary<int, int> colMax = new Dictionary<int, int>();

        foreach (int[] b in buildings)
        {
            int x = b[0], y = b[1];
            if (!rowMin.ContainsKey(y) || x < rowMin[y]) rowMin[y] = x;
            if (!rowMax.ContainsKey(y) || x > rowMax[y]) rowMax[y] = x;
            if (!colMin.ContainsKey(x) || y < colMin[x]) colMin[x] = y;
            if (!colMax.ContainsKey(x) || y > colMax[x]) colMax[x] = y;
        }

        int count = 0;
        foreach (int[] b in buildings)
        {
            int x = b[0], y = b[1];
            if (x == rowMin[y] || x == rowMax[y]) continue;
            if (y == colMin[x] || y == colMax[x]) continue;
            count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
