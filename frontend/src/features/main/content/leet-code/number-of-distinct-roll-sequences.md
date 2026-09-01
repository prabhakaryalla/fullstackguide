# 2318. Number of Distinct Roll Sequences

**Difficulty:** Hard
**Category:** Dynamic Programming, Memoization

## Problem

You are given an integer `n`. You roll a 6-sided die `n` times. Return the number of distinct sequences you can obtain such that:

1. Each roll is between 1 and 6 (inclusive)
2. No two consecutive rolls are the same
3. For every two consecutive rolls `i` and `j`, `gcd(i, j) = 1`

Since the answer may be large, return it modulo `10^9 + 7`.

### Example

```
Input: n = 4
Output: 184
```

## Approach

Use dynamic programming with state `dp[roll][prev1][prev2]` representing the number of ways to complete the sequence after `roll` rolls, where the last two rolls were `prev1` and `prev2`. Check the GCD condition and non-consecutive condition for each transition.

## C# Solution

```csharp
public class Solution
{
    private const int MOD = 1000000007;
    private long[,,] memo;
    
    public int DistinctSequences(int n)
    {
        if (n == 1) return 6;
        
        memo = new long[n + 1, 7, 7];
        for (int i = 0; i <= n; i++)
        {
            for (int j = 0; j <= 6; j++)
            {
                for (int k = 0; k <= 6; k++)
                {
                    memo[i, j, k] = -1;
                }
            }
        }
        
        return (int)DP(n, 0, 0);
    }
    
    private long DP(int rolls, int prev1, int prev2)
    {
        if (rolls == 0) return 1;
        
        if (memo[rolls, prev1, prev2] != -1)
        {
            return memo[rolls, prev1, prev2];
        }
        
        long result = 0;
        
        for (int dice = 1; dice <= 6; dice++)
        {
            if (dice == prev1) continue;
            if (prev1 != 0 && GCD(dice, prev1) != 1) continue;
            if (prev2 != 0 && dice == prev2) continue;
            
            result = (result + DP(rolls - 1, dice, prev1)) % MOD;
        }
        
        memo[rolls, prev1, prev2] = result;
        return result;
    }
    
    private int GCD(int a, int b)
    {
        while (b != 0)
        {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
```

## Complexity

- **Time:** O(n * 6 * 6 * 6) = O(n) with memoization
- **Space:** O(n * 6 * 6) for memoization
