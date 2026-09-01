# 2218. Maximum Value of K Coins From Piles

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Prefix Sum

## Problem

There are `n` piles of coins on a table. Each pile consists of a positive number of coins of varying values.

In one move, you can choose any coin on top of any pile, remove it, and add it to your wallet.

Given a list `piles`, where `piles[i]` is a list of integers denoting the composition of the i-th pile from top to bottom, and an integer `k`, return the maximum total value of coins you can collect.

### Example

```
Input: piles = [[1,100,3],[7,8,9]], k = 2
Output: 101
Explanation: Take coin 100 from pile 0 and coin 1 from pile 0.
Total = 100 + 1 = 101.
```

## Approach

Use dynamic programming: `dp[i][j]` = maximum value using first i piles with j coins taken.

For each pile, try taking 0, 1, 2, ..., min(k, pile_size) coins from the top.

Transition: `dp[i][j] = max(dp[i-1][j-t] + sum of top t coins from pile i)` for all valid t.

Use prefix sums to quickly compute sum of top t coins.

## C# Solution

```csharp
public class Solution
{
    public int MaxValueOfCoins(IList<IList<int>> piles, int k)
    {
        int n = piles.Count;
        
        // dp[j] = max value with j coins
        int[] dp = new int[k + 1];
        
        foreach (var pile in piles)
        {
            int[] newDp = (int[])dp.Clone();
            
            // Precompute prefix sums for this pile
            int[] prefixSum = new int[pile.Count + 1];
            for (int i = 0; i < pile.Count; i++)
            {
                prefixSum[i + 1] = prefixSum[i] + pile[i];
            }
            
            // Try taking different numbers of coins from this pile
            for (int j = 1; j <= k; j++)
            {
                for (int take = 1; take <= Math.Min(j, pile.Count); take++)
                {
                    newDp[j] = Math.Max(newDp[j], dp[j - take] + prefixSum[take]);
                }
            }
            
            dp = newDp;
        }
        
        return dp[k];
    }
}
```

## Complexity

- **Time:** O(n * k * max_pile_size)
- **Space:** O(k)
