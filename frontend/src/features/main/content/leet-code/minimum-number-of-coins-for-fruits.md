# 2944. Minimum Number of Coins for Fruits

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Queue

## Problem

You are given an array `prices` where `prices[i]` is the cost to buy fruit i. When you buy fruit i, you get the next i fruits for free. Return the minimum cost to acquire all fruits.

### Example

```
Input: prices = [3,1,2]
Output: 4
Explanation: Buy fruit 0 for 3 (get fruit 1 free), then buy fruit 2 for 1. Total = 4.
```

## Approach

Use dynamic programming with a monotonic deque. Work backwards from the last fruit. For each position i, you can buy it and get the next i fruits free, or rely on a previous purchase. Use a deque to efficiently track the minimum cost for valid ranges.

## C# Solution

```csharp
public class Solution 
{
    public int MinimumCoins(int[] prices) 
    {
        int n = prices.Length;
        int[] dp = new int[n + 1];
        
        for (int i = n - 1; i >= 0; i--) 
        {
            int freeRange = Math.Min(n, i + 1 + i + 1);
            int minCost = int.MaxValue;
            
            for (int j = i + 1; j < freeRange; j++) 
            {
                minCost = Math.Min(minCost, dp[j]);
            }
            
            dp[i] = prices[i] + minCost;
        }
        
        return dp[0];
    }
}
```

## Complexity

- **Time:** O(n^2) - can be optimized to O(n) with monotonic deque
- **Space:** O(n)
