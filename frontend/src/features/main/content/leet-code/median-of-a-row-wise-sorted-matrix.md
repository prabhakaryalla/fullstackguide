# 2387. Median of a Row Wise Sorted Matrix

**Difficulty:** Medium
**Category:** Array, Binary Search, Matrix
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `m x n` matrix `grid` where each row is sorted in non-decreasing order and `m * n` is odd, return the median of the matrix.

### Example

Input: `grid = [[1,1,2],[2,3,3],[1,3,4]]`
Output: `2`
Explanation: Flattening and sorting all 9 elements gives `[1,1,1,2,2,3,3,3,4]`, whose median (5th element) is `2`.

## Approach

Binary search on the answer value. For a candidate value `mid`, count how many elements across all rows are `<= mid` using an upper-bound binary search within each sorted row (this counting step is `O(m log n)`). If the count is less than the target rank `(m*n+1)/2`, the median must be larger, so move `lo` up; otherwise move `hi` down. The binary search converges to the smallest value whose count reaches the target rank, which is exactly the median.

## C# Solution

```csharp
public class Solution 
{
    public int FindMedian(int[][] grid) 
    {
        int m = grid.Length, n = grid[0].Length;
        int lo = int.MaxValue, hi = int.MinValue;
        foreach (var row in grid)
        {
            lo = Math.Min(lo, row[0]);
            hi = Math.Max(hi, row[n - 1]);
        }

        int target = (m * n + 1) / 2;

        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            int count = 0;
            foreach (var row in grid)
            {
                count += UpperBound(row, mid);
            }
            if (count < target) lo = mid + 1;
            else hi = mid;
        }

        return lo;
    }

    private int UpperBound(int[] row, int value)
    {
        int left = 0, right = row.Length;
        while (left < right)
        {
            int mid = left + (right - left) / 2;
            if (row[mid] <= value) left = mid + 1;
            else right = mid;
        }
        return left;
    }
}
```

## Complexity

- **Time:** O(m log n log(maxVal - minVal))
- **Space:** O(1)
