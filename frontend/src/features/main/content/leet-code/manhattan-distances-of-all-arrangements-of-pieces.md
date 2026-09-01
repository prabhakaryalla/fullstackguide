# 3426. Manhattan Distances of All Arrangements of Pieces

**Difficulty:** Hard
**Category:** Math, Combinatorics

## Problem
You are given an `m x n` board (with `1 <= m, n <= 50`) and an integer `k` (`2 <= k <= m * n`) representing `k` indistinguishable pieces to be placed on `k` distinct cells. Consider every possible arrangement — every way to choose a set of `k` distinct cells. For a single arrangement, define its cost as the sum of Manhattan distances between every pair of pieces in it. Return the sum of costs over **all** possible arrangements, modulo `1_000_000_007`.

## Approach
Instead of enumerating arrangements, count each cell **pair**'s contribution across all arrangements. A specific pair of cells `(a, b)` contributes `distance(a, b)` to every arrangement that includes both `a` and `b`; the number of such arrangements is `C(total - 2, k - 2)`, where `total = m * n` (choosing the remaining `k - 2` pieces from the other cells). So:

$$\text{answer} = \Big(\sum_{\text{all cell pairs } (a,b)} \text{distance}(a, b)\Big) \times \binom{total - 2}{k - 2}$$

Manhattan distance decomposes into independent row and column components, so the total pairwise-distance sum also decomposes: `S = Sx + Sy`, where `Sx` sums `|row_a - row_b|` over all cell pairs and `Sy` sums `|col_a - col_b|`.

For a single dimension of size `x` (rows 0..x-1), the sum of `|i - j|` over all **ordered** pairs `(i, j)` has the closed form `f(x) = x(x-1)(x+1)/3`. Since each row value is paired with every column combination, `Sx = f(m) * n² / 2` (dividing by 2 converts ordered pairs to unordered distinct cell pairs), and symmetrically `Sy = f(n) * m² / 2`.

Finally, multiply `S` by `C(total - 2, k - 2)` computed modulo `1_000_000_007` using precomputed factorials and modular inverses (Fermat's little theorem).

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1_000_000_007;

    public int ManhattanDistanceSum(int m, int n, int k) 
    {
        long fM = (long)m * (m - 1) * (m + 1) / 3;
        long fN = (long)n * (n - 1) * (n + 1) / 3;
        long sumX = fM * ((long)n * n) / 2;
        long sumY = fN * ((long)m * m) / 2;
        long pairDistanceSum = (sumX + sumY) % MOD;

        long total = (long)m * n;
        long comb = BinomialMod((int)(total - 2), k - 2);

        return (int)(pairDistanceSum * comb % MOD);
    }

    private long BinomialMod(int n, int r) 
    {
        if (r < 0 || r > n) return 0;

        long[] fact = new long[n + 1];
        fact[0] = 1;
        for (int i = 1; i <= n; i++) fact[i] = fact[i - 1] * i % MOD;

        long denom = fact[r] * fact[n - r] % MOD;
        return fact[n] * ModPow(denom, MOD - 2, MOD) % MOD;
    }

    private long ModPow(long b, long e, long mod) 
    {
        long result = 1;
        b %= mod;
        while (e > 0) 
        {
            if ((e & 1) == 1) result = result * b % mod;
            b = b * b % mod;
            e >>= 1;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(m * n) for building the factorial table used in the modular binomial coefficient.
- **Space:** O(m * n) for the factorial array.
