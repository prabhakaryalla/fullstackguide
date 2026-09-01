# 1931. Painting a Grid With Three Different Colors

**Difficulty:** Hard
**Category:** Dynamic Programming, Bitmask

## Problem

Given `m` rows and `n` columns, count the number of ways to paint an `m x n` grid with 3 colors such that no two adjacent cells (sharing an edge) have the same color, modulo `10^9 + 7`.

### Example

```
Input: m = 1, n = 1
Output: 3
Explanation: Any single cell can use any of the 3 colors.
```

### Constraints

- `1 <= m <= 5`
- `1 <= n <= 1000`

## Approach

Since `m <= 5`, first enumerate all valid colorings of a single column (a sequence of `m` colors from 3 options where adjacent entries differ) — represent each as a base-3 mask. Then, for every pair of valid column masks `(a, b)`, check they are compatible (no row has the same color in both columns) and build a compatibility list. Run a DP across the `n` columns: `dp[col][mask]` = number of ways to paint the first `col` columns ending with `mask`, transitioning only through compatible mask pairs, summed modulo `10^9 + 7`.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;

    public int ColorTheGrid(int m, int n)
    {
        var validColumns = new List<int[]>();
        GenerateColumns(m, new int[m], 0, validColumns);

        int k = validColumns.Count;
        var compatible = new List<int>[k];
        for (int i = 0; i < k; i++)
        {
            compatible[i] = new List<int>();
            for (int j = 0; j < k; j++)
            {
                if (IsCompatible(validColumns[i], validColumns[j], m))
                {
                    compatible[i].Add(j);
                }
            }
        }

        long[] dp = new long[k];
        for (int i = 0; i < k; i++) dp[i] = 1;

        for (int col = 1; col < n; col++)
        {
            long[] next = new long[k];
            for (int i = 0; i < k; i++)
            {
                if (dp[i] == 0) continue;
                foreach (int j in compatible[i])
                {
                    next[j] = (next[j] + dp[i]) % Mod;
                }
            }
            dp = next;
        }

        long total = 0;
        foreach (long v in dp) total = (total + v) % Mod;
        return (int)total;
    }

    private void GenerateColumns(int m, int[] current, int idx, List<int[]> result)
    {
        if (idx == m)
        {
            result.Add((int[])current.Clone());
            return;
        }
        for (int color = 0; color < 3; color++)
        {
            if (idx > 0 && current[idx - 1] == color) continue;
            current[idx] = color;
            GenerateColumns(m, current, idx + 1, result);
        }
    }

    private bool IsCompatible(int[] a, int[] b, int m)
    {
        for (int i = 0; i < m; i++)
        {
            if (a[i] == b[i]) return false;
        }
        return true;
    }
}
```

## Complexity

- **Time:** `O(n * k^2)` where `k` is the number of valid column colorings (at most 3 * 2^(m-1), a small constant for `m <= 5`).
- **Space:** `O(k^2)` for the compatibility lists.
