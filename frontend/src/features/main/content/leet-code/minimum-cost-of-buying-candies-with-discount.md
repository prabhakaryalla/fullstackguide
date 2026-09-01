# 2144. Minimum Cost of Buying Candies With Discount

**Difficulty:** Easy
**Category:** Array, Greedy, Sorting

## Problem

A shop is selling candies at a discount. For every two candies sold, the shop gives a third candy for free.

The customer can choose any candy to take for free as long as the cost of the chosen candy is less than or equal to the minimum cost of the two candies bought.

Given an integer array `cost` where `cost[i]` denotes the cost of the `i-th` candy, return the minimum cost of buying all the candies.

### Example

```
Input: cost = [1,2,3]
Output: 5
Explanation: Buy candies with costs 2 and 3, get candy with cost 1 for free.

Input: cost = [6,5,7,9,2,2]
Output: 23
Explanation: Buy [9,7], get 6 free. Buy [5,2], get 2 free. Total: 9+7+5+2 = 23.
```

## Approach

Sort candies in descending order. Group them in sets of 3, paying for the two most expensive in each group:
1. Sort candies by cost (descending)
2. For every group of 3, pay for the first 2 (most expensive)
3. Get the 3rd one (cheapest in group) free

This greedy approach ensures we maximize savings by getting the most expensive possible candies for free.

## C# Solution

```csharp
public class Solution
{
    public int MinimumCost(int[] cost)
    {
        Array.Sort(cost);
        Array.Reverse(cost);
        
        int total = 0;
        
        for (int i = 0; i < cost.Length; i++)
        {
            // Skip every 3rd candy (0-indexed, so check (i+1) % 3)
            if ((i + 1) % 3 != 0)
                total += cost[i];
        }
        
        return total;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(1) if sorting in place
