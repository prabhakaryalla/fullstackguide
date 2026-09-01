# 2431. Maximize Total Tastiness of Purchased Fruits

**Difficulty:** Medium
**Category:** Array, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You have arrays `price` and `tastiness`, each of length `n`, describing `n` types of fruit (one of each). You also have `maxAmount` coins and `maxCoupons` coupons. Buying a fruit costs `price[i]`, or `price[i] / 2` (integer division, floor) if you use one coupon on it — each fruit can use at most one coupon, and you have at most `maxCoupons` coupons total. Choose a subset of fruits to buy (optionally using coupons) so that the total amount paid is at most `maxAmount`, maximizing the total tastiness.

### Example

Input: `price = [10,20,20]`, `tastiness = [5,8,8]`, `maxAmount = 20`, `maxCoupons = 1`
Output: `13`
Explanation: Buy the first fruit with a coupon for `10/2 = 5` coins (tastiness 5), and the second fruit at full price `20`... total exceeds 20, so instead buy fruit 2 with the coupon for `10` coins (tastiness 8) and fruit 1 for `10` coins (tastiness 5), total `20` coins, tastiness `13`.

## Approach

This is a 0/1 knapsack with an extra dimension for the number of coupons used. Let `dp[j][k]` be the maximum tastiness achievable using at most `j` coins and at most `k` coupons. For each fruit with price `p` and tastiness `t`, update the table (iterating amounts and coupons in decreasing order to avoid reusing the same fruit twice):

- skip the fruit: `dp[j][k]` unchanged
- buy without a coupon: `dp[j][k] = max(dp[j][k], dp[j-p][k] + t)` if `j >= p`
- buy with a coupon: `dp[j][k] = max(dp[j][k], dp[j-p/2][k-1] + t)` if `k >= 1` and `j >= p/2`

The answer is `dp[maxAmount][maxCoupons]`.

## C# Solution

```csharp
public class Solution 
{
    public int MaxTastiness(int[] price, int[] tastiness, int maxAmount, int maxCoupons) 
    {
        int n = price.Length;
        int[,] dp = new int[maxAmount + 1, maxCoupons + 1];

        for (int i = 0; i < n; i++)
        {
            int p = price[i];
            int t = tastiness[i];
            int halfP = p / 2;

            for (int j = maxAmount; j >= 0; j--)
            {
                for (int k = maxCoupons; k >= 0; k--)
                {
                    int best = dp[j, k];

                    if (j >= p)
                    {
                        best = Math.Max(best, dp[j - p, k] + t);
                    }

                    if (k >= 1 && j >= halfP)
                    {
                        best = Math.Max(best, dp[j - halfP, k - 1] + t);
                    }

                    dp[j, k] = best;
                }
            }
        }

        return dp[maxAmount, maxCoupons];
    }
}
```

## Complexity

- **Time:** O(n * maxAmount * maxCoupons)
- **Space:** O(maxAmount * maxCoupons)
