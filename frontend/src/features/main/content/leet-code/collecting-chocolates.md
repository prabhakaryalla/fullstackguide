# 2735. Collecting Chocolates

**Difficulty:** Medium
**Category:** Array, Enumeration

## Problem

You are given a 0-indexed integer array `nums` of size `n` and an integer `x`. You can perform an operation any number of times on the array:
- Choose an index `i` from the array and set `nums[i]` to `nums[(i + 1) % n]` at the cost of `x`.

Return the minimum total cost to collect one chocolate of each type.

### Example

```
Input: nums = [20,1,15], x = 5
Output: 13
Explanation: Type 0 chocolate costs 20, type 1 costs 1, type 2 costs 15.
After 1 operation on index 1, nums = [20,15,15], cost 5. Collect: 20 + 1 + 15 = 36.
Actually optimal is: collect 1 at pos 1, collect 15 at pos 2, shift once (cost 5) to get type 0 for 15+1+15 = 31... minimum is 13.
```

## Approach

For each number of rotations `k` from 0 to `n-1`, calculate the minimum cost to collect all types. The cost is the sum of minimum values after `k` rotations plus `k * x`.

## C# Solution

```csharp
public class Solution
{
    public long MinCost(int[] nums, int x)
    {
        int n = nums.Length;
        var minCost = new int[n];
        Array.Copy(nums, minCost, n);
        
        long result = nums.Select(v => (long)v).Sum();
        
        for (int k = 1; k < n; k++)
        {
            long totalCost = (long)k * x;
            
            for (int i = 0; i < n; i++)
            {
                minCost[i] = Math.Min(minCost[i], nums[(i + k) % n]);
                totalCost += minCost[i];
            }
            
            result = Math.Min(result, totalCost);
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n²)
- **Space:** O(n)
