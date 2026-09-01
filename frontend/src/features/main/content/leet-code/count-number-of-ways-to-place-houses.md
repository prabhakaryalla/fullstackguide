# 2320. Count Number of Ways to Place Houses

**Difficulty:** Medium
**Category:** Dynamic Programming

## Problem

There is a street with `n * 2` plots, where there are `n` plots on each side of the street. The plots on each side are numbered from `1` to `n`. On each plot, a house can be placed.

Return the number of ways to place houses such that no two houses are adjacent to each other on the same side of the street. Since the answer may be very large, return it modulo `10^9 + 7`.

Note that if a house is placed on the `i-th` plot on one side of the street, a house can still be placed on the `i-th` plot on the other side of the street.

### Example

```
Input: n = 2
Output: 9
Explanation: We can place houses in 9 different configurations.
```

## Approach

This is equivalent to finding the number of ways to place houses on one side (which follows a Fibonacci-like pattern), then squaring it since both sides are independent. For one side: `dp[i] = dp[i-1] + dp[i-2]` (either skip current or place and skip previous).

## C# Solution

```csharp
public class Solution
{
    public int CountHousePlacements(int n)
    {
        const int MOD = 1_000_000_007;
        
        long prev2 = 1, prev1 = 2;
        
        for (int i = 2; i <= n; i++)
        {
            long curr = (prev1 + prev2) % MOD;
            prev2 = prev1;
            prev1 = curr;
        }
        
        long oneSide = n == 1 ? 2 : prev1;
        return (int)((oneSide * oneSide) % MOD);
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
