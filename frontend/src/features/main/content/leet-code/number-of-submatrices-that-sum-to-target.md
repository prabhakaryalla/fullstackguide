# 1074. Number of Submatrices That Sum to Target

**Difficulty:** Hard
**Category:** Array, Hash Table, Matrix, Prefix Sum

## Problem

Given a matrix and an integer `target`, return the number of non-empty submatrices whose sum of elements equals `target`.

### Example

```
Input: matrix = [[0,1,0],[1,1,1],[0,1,0]], target = 0
Output: 4
```

## Approach

Fix a pair of top and bottom row boundaries, and collapse every column between them into a single running sum — this reduces the 2D problem to the classic "subarray sum equals target" problem on that collapsed 1D array, solvable with a prefix-sum hash map in linear time. Repeating this for every pair of row boundaries (accumulating column sums incrementally as the bottom boundary advances) covers every possible submatrix exactly once.

## C# Solution

```csharp
public class Solution
{
    public int NumSubmatrixSumTarget(int[][] matrix, int target)
    {
        int rows = matrix.Length, cols = matrix[0].Length;
        int count = 0;

        for (int top = 0; top < rows; top++)
        {
            var colSums = new int[cols];

            for (int bottom = top; bottom < rows; bottom++)
            {
                for (int c = 0; c < cols; c++)
                {
                    colSums[c] += matrix[bottom][c];
                }

                count += CountSubarraysWithSum(colSums, target);
            }
        }

        return count;
    }

    private int CountSubarraysWithSum(int[] nums, int target)
    {
        var prefixCounts = new Dictionary<int, int> { [0] = 1 };
        int sum = 0;
        int count = 0;

        foreach (var num in nums)
        {
            sum += num;
            if (prefixCounts.TryGetValue(sum - target, out var found)) count += found;
            prefixCounts.TryGetValue(sum, out var existing);
            prefixCounts[sum] = existing + 1;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(rows^2 * cols)`.
- **Space:** `O(cols)` for the column-sum array plus the prefix-count map.
