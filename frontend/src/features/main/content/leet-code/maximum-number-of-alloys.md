# 2861. Maximum Number of Alloys

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem

You are the owner of a company that creates alloys using various types of metals. There are `n` different types of metals available, and you have access to `k` machines that can create alloys. Each machine requires a specific amount of each metal to create one alloy.

You are given:
- An integer `n` representing the number of metal types
- An integer `k` representing the number of machines
- An integer `budget` representing your budget
- A 2D array `composition` where `composition[i][j]` is the amount of metal `j` needed to create one alloy using machine `i`
- An array `stock` where `stock[i]` is the initial amount of metal `i` you have
- An array `cost` where `cost[i]` is the cost to buy one unit of metal `i`

Return the maximum number of alloys you can create with your budget. You can use only one machine.

### Example

```
Input: n = 3, k = 2, budget = 15, 
       composition = [[1,1,1],[1,1,10]], 
       stock = [0,0,0], 
       cost = [1,2,3]
Output: 2
Explanation:
Using machine 0: Each alloy needs 1 of each metal, cost = 1+2+3 = 6 per alloy.
With budget 15, we can make 15/6 = 2 alloys (12 cost, 3 left over).
```

## Approach

For each machine, use binary search to find the maximum number of alloys that can be produced given the budget. For a candidate number `mid` of alloys:
- Calculate the total amount of each metal needed: `composition[machine][metal] * mid`
- Subtract available stock
- Calculate the cost to buy the remaining metals
- Check if the cost is within budget

The answer is the maximum across all machines.

## C# Solution

```csharp
public class Solution
{
    public int MaxNumberOfAlloys(int n, int k, int budget, int[][] composition, int[] stock, int[] cost)
    {
        int maxAlloys = 0;
        
        for (int machine = 0; machine < k; machine++)
        {
            int left = 0, right = (int)2e8;
            
            while (left <= right)
            {
                int mid = left + (right - left) / 2;
                
                if (CanMake(mid, composition[machine], stock, cost, budget))
                {
                    maxAlloys = Math.Max(maxAlloys, mid);
                    left = mid + 1;
                }
                else
                {
                    right = mid - 1;
                }
            }
        }
        
        return maxAlloys;
    }
    
    private bool CanMake(long numAlloys, int[] comp, int[] stock, int[] cost, long budget)
    {
        long totalCost = 0;
        
        for (int i = 0; i < comp.Length; i++)
        {
            long needed = (long)comp[i] * numAlloys;
            long toBuy = Math.Max(0, needed - stock[i]);
            totalCost += toBuy * cost[i];
            
            if (totalCost > budget)
                return false;
        }
        
        return totalCost <= budget;
    }
}
```

## Complexity

- **Time:** `O(k * log(M) * n)` where `M` is the maximum possible number of alloys.
- **Space:** `O(1)`.
