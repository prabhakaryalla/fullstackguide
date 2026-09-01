# 1140. Stone Game II

**Difficulty:** Medium
**Category:** Array, Math, Dynamic Programming, Game Theory

## Problem

Piles of stones are arranged in a row. Alice and Bob alternate turns, starting with Alice, and on each turn the current player takes the first `x` piles where `1 <= x <= 2M`, updating `M = max(M, x)` for the next turn (`M` starts at `1`). Both play optimally to maximize their own total stones. Return the maximum number of stones Alice can end up with.

### Example

```
Input: piles = [2,7,9,4,4]
Output: 10
```

## Approach

Use memoized recursion `dfs(i, m)` returning the maximum stones the player to move can collect from `piles[i:]` given the current `M = m`. If `2m >= piles.Length - i`, the mover can take everything remaining. Otherwise, try every valid `x` from `1` to `2m`: the mover's total is the stones just taken plus whatever is left over after the opponent plays optimally on the new suffix (`suffixSum[i + x] - dfs(i + x, max(m, x))`), and the best `x` is kept.

## C# Solution

```csharp
public class Solution
{
    public int StoneGameII(int[] piles)
    {
        int n = piles.Length;
        int[] suffixSum = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) suffixSum[i] = suffixSum[i + 1] + piles[i];

        var memo = new Dictionary<(int, int), int>();

        int Dfs(int i, int m)
        {
            if (i == n) return 0;
            if (2 * m >= n - i) return suffixSum[i];

            if (memo.TryGetValue((i, m), out int cached)) return cached;

            int best = 0, taken = 0;

            for (int x = 1; x <= 2 * m && i + x <= n; x++)
            {
                taken += piles[i + x - 1];
                int opponent = Dfs(i + x, Math.Max(m, x));
                best = Math.Max(best, taken + suffixSum[i + x] - opponent);
            }

            memo[(i, m)] = best;
            return best;
        }

        return Dfs(0, 1);
    }
}
```

## Complexity

- **Time:** `O(n^3)` in the worst case (`O(n^2)` states, each with up to `O(n)` transitions).
- **Space:** `O(n^2)` for the memoization table.
