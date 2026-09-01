# 3343. Count Number of Balanced Permutations

**Difficulty:** Hard
**Category:** Math, String, Dynamic Programming, Combinatorics

## Problem

Given a string `num` of digits, a permutation is balanced if the sum of digits at even indices equals the sum of digits at odd indices. Return the number of distinct balanced permutations of `num`, modulo `10^9 + 7`.

### Example

Input: `num = "123"`

Output: `2`

Explanation: Among all permutations, only `"132"` and `"231"` are balanced.

## Approach

Let `E` be the number of even-indexed positions (`ceil(n/2)`) and `O` the number of odd-indexed positions (`floor(n/2)`). Let `total` be the sum of all digits; if `total` is odd, no balanced permutation exists. Otherwise both groups must sum to `half = total / 2`.

For a fixed split of each digit `d` (with total count `cnt[d]`) into `numEven[d]` copies placed at even positions and `cnt[d] - numEven[d]` at odd positions, the number of resulting permutations is `E! / prod(numEven[d]!) * O! / prod(numOdd[d]!)`.

Use a DP over digits `0..9`, tracking `(count placed at even positions so far, even-position sum so far)`, where the accumulated value represents the sum of `1 / (product of factorials)` (using modular inverse factorials) over all valid splits processed so far. After processing all digits, multiply the DP value at `(E, half)` by `E!` and `O!` to get the final answer.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1_000_000_007;

    public int CountBalancedPermutations(string num) 
    {
        int n = num.Length;
        int[] cnt = new int[10];
        int total = 0;
        foreach (char c in num)
        {
            cnt[c - '0']++;
            total += c - '0';
        }
        if (total % 2 != 0) return 0;

        int half = total / 2;
        int e = (n + 1) / 2;
        int o = n / 2;

        long[] fact = new long[n + 1];
        long[] invFact = new long[n + 1];
        fact[0] = 1;
        for (int i = 1; i <= n; i++) fact[i] = fact[i - 1] * i % MOD;
        invFact[n] = ModPow(fact[n], MOD - 2);
        for (int i = n; i > 0; i--) invFact[i - 1] = invFact[i] * i % MOD;

        long[,] dp = new long[e + 1, half + 1];
        dp[0, 0] = 1;

        for (int d = 0; d <= 9; d++)
        {
            int c = cnt[d];
            if (c == 0) continue;

            long[,] ndp = new long[e + 1, half + 1];
            for (int k = 0; k <= e; k++)
            {
                for (int s = 0; s <= half; s++)
                {
                    long ways = dp[k, s];
                    if (ways == 0) continue;

                    for (int kd = 0; kd <= c; kd++)
                    {
                        int nk = k + kd;
                        int ns = s + d * kd;
                        if (nk > e || ns > half) break;

                        long factor = invFact[kd] * invFact[c - kd] % MOD;
                        ndp[nk, ns] = (ndp[nk, ns] + ways * factor) % MOD;
                    }
                }
            }
            dp = ndp;
        }

        long res = dp[e, half] * fact[e] % MOD * fact[o] % MOD;
        return (int)res;
    }

    private long ModPow(long b, long p)
    {
        long r = 1;
        b %= MOD;
        while (p > 0)
        {
            if ((p & 1) == 1) r = r * b % MOD;
            b = b * b % MOD;
            p >>= 1;
        }
        return r;
    }
}
```

## Complexity

- **Time:** O(10 * E * half * maxCount), bounded well within limits for n <= 80.
- **Space:** O(E * half) for the DP table.
