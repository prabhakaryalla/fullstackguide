# 1388. Pizza With 3n Slices

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Heap (Priority Queue)

## Problem

There are `3n` pizza slices arranged in a circle with sizes `slices`. You and two others take turns picking a slice, always removing its two neighbors as well; each of you picks `n` times. Return the maximum total size you can obtain by picking optimally.

### Example

```
Input: slices = [1,2,3,4,5,6]
Output: 10
```

## Approach

This reduces to choosing `n` non-adjacent elements (in a circular array) to maximize their sum. Handle the circularity by solving the linear version twice — once excluding the first element and once excluding the last — using a DP over `dp[i][j]` (max sum choosing `j` non-adjacent slices from the first `i`), and take the better of the two results.

## C# Solution

```csharp
public class Solution
{
    public int MaxSizeSlices(int[] slices)
    {
        int total = slices.Length;
        int n = total / 3;

        int without_last = Solve(slices.Take(total - 1).ToArray(), n);
        int without_first = Solve(slices.Skip(1).ToArray(), n);

        return Math.Max(without_last, without_first);
    }

    private int Solve(int[] arr, int n)
    {
        int m = arr.Length;
        var dp = new int[m + 1, n + 1];

        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                int skip = dp[i - 1, j];
                int take = (i >= 2 ? dp[i - 2, j - 1] : (j == 1 ? 0 : int.MinValue / 2)) + arr[i - 1];
                dp[i, j] = Math.Max(skip, take);
            }
        }

        return dp[m, n];
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)` for the DP table.
