# 1411. Number of Ways to Paint N x 3 Grid

**Difficulty:** Hard
**Category:** Dynamic Programming

## Problem

You have a grid with `n` rows and `3` columns, and 3 available colors. Paint the grid so that no two adjacent cells (horizontally or vertically) share the same color. Return the number of ways to paint the grid, modulo `10^9 + 7`.

### Example

```
Input: n = 1
Output: 12
```

## Approach

Every valid row of 3 cells falls into one of two shapes: an "ABA" pattern (first and last cell share a color, 6 permutations) or an "ABC" pattern (all three cells distinct colors, 6 permutations). Track the count of each shape row-by-row:

- An `ABA` row can be followed by 3 more `ABA` rows or 2 `ABC` rows.
- An `ABC` row can be followed by 2 more `ABA` rows or 2 more `ABC` rows.

Starting with 6 rows of each shape for `n = 1`, apply these transitions `n - 1` times and sum both counts.

## C# Solution

```csharp
public class Solution
{
    public int NumOfWays(int n)
    {
        const int MOD = 1_000_000_007;
        long aba = 6, abc = 6;

        for (int i = 2; i <= n; i++)
        {
            long nextAba = (3 * aba + 2 * abc) % MOD;
            long nextAbc = (2 * aba + 2 * abc) % MOD;
            aba = nextAba;
            abc = nextAbc;
        }

        return (int)((aba + abc) % MOD);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
