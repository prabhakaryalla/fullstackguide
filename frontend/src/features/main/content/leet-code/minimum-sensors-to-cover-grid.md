# 3648. Minimum Sensors to Cover Grid

**Difficulty:** Medium
**Category:** Math

## Problem

A grid has `n` rows and `m` columns. Each sensor placed on a cell covers all cells within Chebyshev distance `k` (a `(2k+1) x (2k+1)` square centered on it). Return the minimum number of sensors needed to cover the entire grid.

### Example

`n=5, m=5, k=1`: each sensor covers a 3x3 area, so `ceil(5/3)=2` sensors per dimension, total `2*2=4`.

## Approach

Sensors can be placed so their coverage squares tile the grid without gaps: `ceil(n/(2k+1))` sensors are needed along the rows and `ceil(m/(2k+1))` along the columns, and the total is their product.

## C# Solution

```csharp
public class Solution 
{
    public int MinSensors(int n, int m, int k) 
    {
        int span = 2 * k + 1;
        int rows = (n + span - 1) / span;
        int cols = (m + span - 1) / span;
        return rows * cols;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
