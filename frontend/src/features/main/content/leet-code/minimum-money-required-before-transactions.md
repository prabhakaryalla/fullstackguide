# 2412. Minimum Money Required Before Transactions

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

You are given a 0-indexed 2D integer array `transactions`, where `transactions[i] = [costi, cashbacki]`.

The array describes transactions, where if you pay `costi` dollars, you will receive `cashbacki` dollars back.

Note that `cashbacki < costi`, so every transaction results in a net loss.

You need to perform the transactions in some order such that you can pay for all transactions. At any point in time, you must have enough money to pay for the current transaction.

Return the minimum amount of money required before any transaction so that all of the transactions can be paid.

### Example

```
Input: transactions = [[2,1],[5,0],[4,2]]
Output: 10
Explanation: Starting with 10 dollars:
- Pay 2, get 1 back → 9 dollars
- Pay 5, get 0 back → 4 dollars
- Pay 4, get 2 back → 2 dollars
```

## Approach

Key insight: Do transactions with higher cashback first to maintain maximum liquidity. Calculate the total loss (sum of all cost - cashback). The minimum money needed is the total loss plus the maximum cost among all transactions (to ensure we can start the most expensive one).

## C# Solution

```csharp
public class Solution
{
    public long MinimumMoney(int[][] transactions)
    {
        long totalLoss = 0;
        int maxCost = 0;
        
        foreach (var t in transactions)
        {
            int cost = t[0];
            int cashback = t[1];
            int loss = cost - cashback;
            
            totalLoss += loss;
            
            // Track max(cost, cashback) for transactions with positive loss
            if (loss > 0)
            {
                maxCost = Math.Max(maxCost, cashback);
            }
            else
            {
                // For zero or negative loss transactions
                maxCost = Math.Max(maxCost, cost);
            }
        }
        
        return totalLoss + maxCost;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of transactions
- **Space:** O(1)
