# 2907. Maximum Profitable Triplets With Increasing Prices I

**Difficulty:** Medium
**Category:** Array

## Problem

You are given two arrays `prices` and `profits` of the same length. Find three indices i < j < k such that `prices[i] < prices[j] < prices[k]` and return the maximum value of `profits[i] + profits[j] + profits[k]`. If no such triplet exists, return -1.

### Example

```
Input: prices = [10,2,3,4], profits = [100,2,7,10]
Output: 19
Explanation: Triplet (1,2,3): prices 2<3<4, profits 2+7+10=19.
```

## Approach

Use a brute force triple loop to check all possible triplets (i, j, k) where i < j < k. For each triplet, verify the price condition and track the maximum profit sum.

## C# Solution

```csharp
public class Solution 
{
    public int MaxProfit(int[] prices, int[] profits) 
    {
        int n = prices.Length;
        int maxProfit = -1;
        
        for (int i = 0; i < n - 2; i++) 
        {
            for (int j = i + 1; j < n - 1; j++) 
            {
                if (prices[i] >= prices[j]) continue;
                
                for (int k = j + 1; k < n; k++) 
                {
                    if (prices[j] < prices[k]) 
                    {
                        int sum = profits[i] + profits[j] + profits[k];
                        maxProfit = Math.Max(maxProfit, sum);
                    }
                }
            }
        }
        
        return maxProfit;
    }
}
```

## Complexity

- **Time:** O(n^3)
- **Space:** O(1)
