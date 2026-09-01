# 3154. Find Number of Ways to Reach the K-th Stair

**Difficulty:** Hard
**Category:** Dynamic Programming, Math, Bit Manipulation, Combinatorics, Memoization

## Problem
You start on stair 1 and want to count the number of distinct ways to reach stair `k`. At any point, from stair `i` you may go down to stair `i - 1` (but not twice in a row, and not from stair 0), or you may jump using an internal jump counter `jump` to reach stair `i + 2^jump`, after which `jump` increases by 1. Count all distinct ways (sequences of operations) to land exactly on stair `k` at any point during the process.

## Approach
Model each "up" jump as a binary choice: after performing `jump` up-moves (using exponents 0, 1, ..., jump-1) and some number of "down" moves interspersed (not consecutively), the final position equals `1 + (2^jump - 1) - down`. Solving for `down` gives `down = 2^jump - k`. Since `down` moves cannot be adjacent to each other, and there are `jump + 1` available "slots" around the jump operations, the number of ways to place `down` down-moves among `jump + 1` slots is `C(jump + 1, down)`, provided `0 <= down <= jump + 1`. Precompute binomial coefficients up to the maximum possible `jump` value (bounded around 30, since `k <= 10^9`), then iterate over every feasible `jump` value, summing valid combinations.

## C# Solution
```csharp
public class Solution {
    public int WaysToReachStair(int k) {
        const int kMaxJump = 30;
        int[,] comb = GetComb(kMaxJump + 2, kMaxJump + 2);
        int ans = 0;

        for (int jump = 0; jump <= kMaxJump; jump++) {
            long down = (1L << jump) - k;
            if (down < 0 || down > jump + 1)
                continue;
            ans += comb[jump + 1, (int)down];
        }

        return ans;
    }

    private int[,] GetComb(int n, int k) {
        int[,] comb = new int[n + 1, k + 1];
        for (int i = 0; i <= n; i++)
            comb[i, 0] = 1;
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= k && j <= i; j++)
                comb[i, j] = comb[i - 1, j] + comb[i - 1, j - 1];
        return comb;
    }
}
```

## Complexity
- Time: O(1), bounded by a constant maximum jump value (~30)
- Space: O(1)
