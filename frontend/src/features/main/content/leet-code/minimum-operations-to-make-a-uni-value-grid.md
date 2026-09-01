# 2033. Minimum Operations to Make a Uni-Value Grid

**Difficulty:** Medium
**Category:** Array, Math, Matrix, Sorting

## Problem

Given a 2D integer array `grid` and an integer `x`, in one operation you may add or subtract `x` from any single element. Return *the minimum number of operations required to make every element in `grid` equal*; return `-1` if it is impossible.

## Approach

Adding or subtracting `x` never changes a value's remainder modulo `x`, so every element must already share the same remainder modulo `x` for the task to be possible; check this first.

If feasible, flatten and sort all values. To make everything equal using the fewest total steps of size `x`, the target value should be the **median** of the flattened array — this minimizes the sum of absolute differences. For each element, the number of operations needed is `|value - median| / x` (guaranteed to divide evenly since all values share a remainder). Sum these counts for the answer.

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(int[][] grid, int x)
    {
        var flat = grid.SelectMany(row => row).OrderBy(v => v).ToArray();
        int remainder = flat[0] % x;

        foreach (var v in flat)
            if (v % x != remainder) return -1;

        int median = flat[flat.Length / 2];
        long operations = 0;
        foreach (var v in flat)
            operations += Math.Abs(v - median) / x;

        return (int)operations;
    }
}
```

## Complexity

- **Time:** `O(m * n * log(m * n))` for sorting the flattened grid.
- **Space:** `O(m * n)` for the flattened array.
