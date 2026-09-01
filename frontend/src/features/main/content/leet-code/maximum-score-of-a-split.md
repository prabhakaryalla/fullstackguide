# 3788. Maximum Score of a Split

**Difficulty:** Medium
**Category:** Array, Prefix Sum

## Problem

Given an integer array `nums` of length `n`, choose a split index `i` (`0 <= i < n-1`). The score is `prefixSum(i) - suffixMin(i)`, where `prefixSum(i) = nums[0]+...+nums[i]` and `suffixMin(i)` is the minimum of `nums[i+1..n-1]`. Return the maximum score over all valid split indices.

### Example

Input: `nums = [10,-1,3,-4,-5]`
Output: `17`

Split at `i=2`: `prefixSum=12`, `suffixMin=-5`, score `= 12-(-5) = 17`.

## Approach

Precompute prefix sums left-to-right and suffix minimums right-to-left in linear passes. Then iterate over all valid split indices and take the maximum of `prefixSum[i] - suffixMin[i+1]`.

## C# Solution

```csharp
public class Solution 
{
    public long MaxScore(int[] nums) 
    {
        int n = nums.Length;
        var prefixSum = new long[n];
        prefixSum[0] = nums[0];
        for (int i = 1; i < n; i++) prefixSum[i] = prefixSum[i - 1] + nums[i];

        var suffixMin = new long[n];
        suffixMin[n - 1] = nums[n - 1];
        for (int i = n - 2; i >= 0; i--) suffixMin[i] = Math.Min(suffixMin[i + 1], nums[i]);

        long best = long.MinValue;
        for (int i = 0; i < n - 1; i++)
        {
            long score = prefixSum[i] - suffixMin[i + 1];
            best = Math.Max(best, score);
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
