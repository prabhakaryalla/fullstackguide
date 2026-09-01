# 1672. Richest Customer Wealth

**Difficulty:** Easy
**Category:** Array, Matrix

## Problem

Given `accounts[i][j]`, the amount of money customer `i` has in bank `j`, return the wealth of the richest customer (the maximum total across all customers).

### Example

```
Input: accounts = [[1,2,3],[3,2,1]]
Output: 6
```

## Approach

Sum each customer's row and keep the running maximum.

## C# Solution

```csharp
public class Solution
{
    public int MaximumWealth(int[][] accounts)
    {
        int best = 0;

        foreach (var account in accounts)
        {
            best = Math.Max(best, account.Sum());
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(m * n)`.
- **Space:** `O(1)`.
