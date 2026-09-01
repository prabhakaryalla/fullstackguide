# 363. Max Sum of Rectangle No Larger Than K

**Difficulty:** Hard
**Category:** Array, Binary Search, Dynamic Programming, Matrix, Sorted Set

## Problem

Given an `m x n` matrix and an integer `k`, return the max sum of a rectangle in the matrix such that its sum is no larger than `k`.

### Example

```
Input: matrix = [[1,0,1],[0,-2,3]], k = 2
Output: 2
```

### Constraints

- `1 <= matrix.length, matrix[0].length <= 100`
- `-100 <= matrix[i][j] <= 100`
- `-10^5 <= k <= 10^5`

## Approach

Fix a pair of top and bottom rows, collapsing the matrix between them into a 1D array of column sums. For that 1D array, find the maximum subarray sum not exceeding `k` using prefix sums with a sorted set: for each running prefix sum, look up the smallest previously-seen prefix sum that is `>= sum - k`, since `sum - thatPrefix <= k`. Repeat for every pair of rows and keep the best result.

## C# Solution

```csharp
public class Solution
{
    public int MaxSumSubmatrix(int[][] matrix, int k)
    {
        int rows = matrix.Length, cols = matrix[0].Length;
        int best = int.MinValue;

        for (int top = 0; top < rows; top++)
        {
            var colSums = new int[cols];

            for (int bottom = top; bottom < rows; bottom++)
            {
                for (int c = 0; c < cols; c++)
                    colSums[c] += matrix[bottom][c];

                best = Math.Max(best, MaxSubarrayNoMoreThanK(colSums, k));
            }
        }

        return best;
    }

    private int MaxSubarrayNoMoreThanK(int[] colSums, int k)
    {
        var prefixSums = new SortedSet<int> { 0 };
        int sum = 0, best = int.MinValue;

        foreach (var value in colSums)
        {
            sum += value;
            var view = prefixSums.GetViewBetween(sum - k, int.MaxValue);
            if (view.Count > 0)
                best = Math.Max(best, sum - view.Min);

            prefixSums.Add(sum);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(rows^2 * cols * log cols)`.
- **Space:** `O(cols)` for the column-sum and prefix-sum structures.
