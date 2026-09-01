# 3725. Count Ways to Choose Coprime Integers from Rows

**Difficulty:** Hard
**Category:** Array, Math, Dynamic Programming, Matrix, Combinatorics, Number Theory

## Problem

You are given an `m x n` matrix `mat` of positive integers.

Return the number of ways to choose exactly one integer from each row of `mat` such that the greatest common divisor of all chosen integers is 1, modulo `10^9 + 7`.

### Example

```
Input: mat = [[1,2],[3,4]]
Output: 3
Explanation: Choosing (1,3), (1,4), and (2,3) all give gcd 1; choosing (2,4) gives gcd 2.
```

### Constraints

- `1 <= m == mat.length <= 150`
- `1 <= n == mat[i].length <= 150`
- `1 <= mat[i][j] <= 150`

## Approach

Since all values are bounded by 150, track a DP over possible running gcd values (from 1 to 150) instead of over actual chosen tuples. Initialize `dp[v]` for the first row by adding 1 for each value `v` in that row. For each subsequent row, build a new DP where, for every current gcd `g` with `dp[g] > 0` and every value `v` in the row, `newDp[gcd(g, v)]` accumulates `dp[g]`. After processing all rows, the answer is `dp[1]`.

## C# Solution

```csharp
public class Solution
{
    public int CountCoprime(int[][] mat)
    {
        const int MOD = 1_000_000_007;
        const int MAXV = 150;

        long[] dp = new long[MAXV + 1];

        foreach (int v in mat[0])
        {
            dp[v] = (dp[v] + 1) % MOD;
        }

        for (int row = 1; row < mat.Length; row++)
        {
            long[] newDp = new long[MAXV + 1];

            for (int g = 1; g <= MAXV; g++)
            {
                if (dp[g] == 0) continue;

                foreach (int v in mat[row])
                {
                    int newGcd = Gcd(g, v);
                    newDp[newGcd] = (newDp[newGcd] + dp[g]) % MOD;
                }
            }

            dp = newDp;
        }

        return (int)dp[1];
    }

    private int Gcd(int a, int b)
    {
        while (b != 0)
        {
            (a, b) = (b, a % b);
        }
        return a;
    }
}
```

## Complexity

- **Time:** `O(m * V * n)`, where `V = 150` is the bound on gcd values.
- **Space:** `O(V)`.
