# 3352. Count K-Reducible Numbers Less Than N

**Difficulty:** Hard
**Category:** Bit Manipulation, Dynamic Programming, Combinatorics

## Problem

Given the binary representation `s` of a number `N` and an integer `k`, count integers `x` in `[1, N-1]` that are *k-reducible*: repeatedly replacing `x` with `popcount(x)` reduces it to `1` within at most `k` operations. Return the count modulo $10^9+7$.

### Example

Input: `s = "111"` (N=7), `k = 1`
Output: `2` — 1 (0 ops) and 4=`100` (popcount 1, 1 op) qualify.

## Approach

Precompute `steps[c]` (ops to reduce `c` to 1) for `c` up to `len(s)` via memoized popcount recursion. Use standard binary-string combinatorics (Pascal's triangle) to count, for every popcount value `c`, how many numbers below `N` have exactly `c` set bits. Sum counts for values of `c` where `1 + steps[c] <= k`, plus 1 for `x = 1`.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1000000007;

    public int CountKReducibleNumbers(string s, int k) 
    {
        int n = s.Length;
        long[,] C = new long[n + 1, n + 1];
        for (int i = 0; i <= n; i++) 
        {
            C[i, 0] = 1;
            for (int j = 1; j <= i; j++)
                C[i, j] = (C[i - 1, j - 1] + (j <= i - 1 ? C[i - 1, j] : 0)) % MOD;
        }

        long[] f = new long[n + 1];
        int ones = 0;
        for (int i = 0; i < n; i++) 
        {
            if (s[i] == '1') 
            {
                int rem = n - i - 1;
                for (int c = ones; c <= ones + rem; c++)
                    f[c] = (f[c] + C[rem, c - ones]) % MOD;
                ones++;
            }
        }

        int[] steps = new int[n + 1];
        for (int c = 2; c <= n; c++) 
        {
            int pc = System.Numerics.BitOperations.PopCount((uint)c);
            steps[c] = steps[pc] + 1;
        }

        long ans = 1; // x = 1
        for (int c = 1; c <= n; c++) 
        {
            if (steps[c] <= k - 1) 
            {
                long v = f[c];
                if (c == 1) v = (v - 1 + MOD) % MOD;
                ans = (ans + v) % MOD;
            }
        }
        return (int)ans;
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(n^2)
