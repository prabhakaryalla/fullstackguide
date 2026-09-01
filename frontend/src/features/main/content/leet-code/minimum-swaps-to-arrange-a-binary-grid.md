# 1536. Minimum Swaps to Arrange a Binary Grid

**Difficulty:** Medium
**Category:** Array, Greedy, Matrix

## Problem

Given an `n x n` binary grid, you may swap any two **adjacent rows**. Return the minimum number of adjacent row swaps needed so that every row `i` (0-indexed) has at least `n - 1 - i` trailing zeros (i.e., the grid becomes "upper triangular" of zeros in its top-right corner). Return `-1` if it's impossible.

### Example

```
Input: grid = [[0,0,1],[1,1,0],[1,0,0]]
Output: 3
```

## Approach

For each row, precompute the number of trailing zeros. Process rows from top to bottom: for row `i`, the required trailing-zero count is `n - 1 - i`. Search downward from row `i` for the closest row that already satisfies this requirement; if none exists, return `-1`. Otherwise, "bubble" that row up to position `i` via adjacent swaps, adding the number of swaps (the distance moved) to the answer, and update the trailing-zero array to reflect the row's new position.

## C# Solution

```csharp
public class Solution
{
    public int MinSwaps(int[][] grid)
    {
        int n = grid.Length;
        int[] trailingZeros = new int[n];

        for (int i = 0; i < n; i++)
        {
            int zeros = 0;
            for (int j = n - 1; j >= 0 && grid[i][j] == 0; j--)
            {
                zeros++;
            }
            trailingZeros[i] = zeros;
        }

        int swaps = 0;

        for (int i = 0; i < n; i++)
        {
            int required = n - 1 - i;
            int found = -1;

            for (int j = i; j < n; j++)
            {
                if (trailingZeros[j] >= required)
                {
                    found = j;
                    break;
                }
            }

            if (found == -1)
            {
                return -1;
            }

            while (found > i)
            {
                (trailingZeros[found], trailingZeros[found - 1]) = (trailingZeros[found - 1], trailingZeros[found]);
                found--;
                swaps++;
            }
        }

        return swaps;
    }
}
```

## Complexity

- **Time:** `O(n^2)` — for each of the `n` rows, scanning forward and bubbling up costs `O(n)`.
- **Space:** `O(n)` for the trailing-zero counts.
