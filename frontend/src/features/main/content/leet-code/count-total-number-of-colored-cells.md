# 2579. Count Total Number of Colored Cells

**Difficulty:** Medium
**Category:** Math

## Problem

There is an infinite 2D grid. At time `t = 0`, you color the cell at `(0, 0)`.

For each time unit `t >= 1`, you color all cells that share at least one corner or edge with the previously colored cells.

Given an integer `n`, return the number of colored cells at time `t = n`.

### Example

```
Input: n = 1
Output: 5
Explanation:
At t=0: (0,0) colored
At t=1: (0,0), (0,1), (0,-1), (1,0), (-1,0) colored
Total = 5 cells

Input: n = 2
Output: 13
Explanation: At t=2, we have a diamond shape with 13 cells
```

## Approach

The colored region at time `n` forms a diamond (square rotated 45°) shape.

The pattern follows:
- At `t = 0`: 1 cell
- At `t = 1`: 5 cells (center + 4 neighbors)
- At `t = 2`: 13 cells
- At `t = 3`: 25 cells

The formula is: `1 + 4 * (1 + 2 + ... + n) = 1 + 4 * n * (n + 1) / 2 = 2n² + 2n + 1`

Alternatively: Think of it as a diamond with side length `n+1`, which has `2n² + 2n + 1` cells.

## C# Solution

```csharp
public class Solution
{
    public long ColoredCells(int n)
    {
        return 2L * n * n + 2L * n + 1;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
