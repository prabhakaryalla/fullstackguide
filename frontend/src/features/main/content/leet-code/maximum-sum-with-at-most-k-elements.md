# 3462. Maximum Sum With at Most K Elements

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Matrix

## Problem

You are given an `m x n` 2D array `grid`, an integer array `limits` of length `m`, and an integer `k`. You may choose values from `grid`, taking at most `limits[i]` values from row `i`, and at most `k` values in total across all rows. Return the maximum possible sum of the chosen values.

### Example

`grid = [[1,2],[3,4]], limits = [1,2], k = 2` → the best choice takes the value `2` from row 0 (its limit is 1) and `4` from row 1, for a total of `6`, without exceeding the overall budget of `2` picks.

## Approach

From each row, only the top `limits[i]` largest values can ever be useful, since anything beyond that count within a row could never be selected. Collect these candidates across all rows into one list, sort them in descending order, and greedily take the largest `k` of them (or all of them if there are fewer than `k`).

## C# Solution

```csharp
public class Solution 
{
    public long MaxSum(int[][] grid, int[] limits, int k) 
    {
        List<int> candidates = new List<int>();

        for (int i = 0; i < grid.Length; i++)
        {
            int[] row = (int[])grid[i].Clone();
            Array.Sort(row);
            Array.Reverse(row);

            int take = Math.Min(limits[i], row.Length);
            for (int j = 0; j < take; j++)
                candidates.Add(row[j]);
        }

        candidates.Sort((a, b) => b - a);

        long sum = 0;
        int count = Math.Min(k, candidates.Count);
        for (int i = 0; i < count; i++)
            sum += candidates[i];

        return sum;
    }
}
```

## Complexity

- **Time:** O(m * n log n) for sorting each row, plus O(C log C) for the final sort where C is the total number of candidates
- **Space:** O(C)
