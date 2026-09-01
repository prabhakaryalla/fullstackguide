# 2226. Maximum Candies Allocated to K Children

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem

You are given a 0-indexed integer array `candies` where `candies[i]` represents the number of candies in the i-th pile. You are also given an integer `k`.

You can divide each pile of candies into any number of sub-piles, but you cannot merge two piles together.

You need to distribute the candies into `k` piles such that each pile has the same number of candies. Return the maximum number of candies a child can get. If it is not possible to distribute the candies, return 0.

### Example

```
Input: candies = [5,8,6], k = 3
Output: 5
Explanation: Divide the piles into [5], [5,3], and [5,1]. Each child gets 5 candies.
```

## Approach

Use binary search on the answer. For a given number of candies per child `x`, check if we can form `k` piles:
- For each pile with `candies[i]` candies, we can make `candies[i] / x` piles of size `x`
- If the total number of such piles >= k, then `x` is feasible

Binary search for the maximum feasible `x`.

## C# Solution

```csharp
public class Solution
{
    public int MaximumCandies(int[] candies, long k)
    {
        long left = 0;
        long right = candies.Max();
        long result = 0;
        
        while (left <= right)
        {
            long mid = left + (right - left) / 2;
            
            if (mid == 0 || CanDistribute(candies, k, mid))
            {
                result = mid;
                left = mid + 1;
            }
            else
            {
                right = mid - 1;
            }
        }
        
        return (int)result;
    }
    
    private bool CanDistribute(int[] candies, long k, long size)
    {
        long piles = 0;
        
        foreach (int candy in candies)
        {
            piles += candy / size;
            if (piles >= k) return true;
        }
        
        return piles >= k;
    }
}
```

## Complexity

- **Time:** O(n * log(max(candies))), where n is the number of piles
- **Space:** O(1)
