# 2098. Subsequence of Size K With the Largest Even Sum

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an integer array `nums` and an integer `k`, find a subsequence of `nums` of size `k` with the largest possible sum such that the sum is even. Return that maximum even sum, or `-1` if no valid subsequence of size `k` has an even sum.

### Example

`nums = [4,1,5,3,1], k = 3` → the largest sum of any 3 elements is `4+5+3=12` which is already even, so the answer is 12.

## Approach

Sort `nums` ascending. The unconstrained maximum sum of `k` elements is the sum of the last `k` elements. If that sum is already even, it is the answer (taking the largest elements is always at least as good as any alternative that keeps the same parity). If it's odd, exactly one swap is needed to flip the parity while losing as little sum as possible: either replace the smallest odd number among the chosen `k` with the largest available even number outside the chosen set, or replace the smallest even number among the chosen `k` with the largest available odd number outside the chosen set. Try both (where feasible) and take whichever loses the least value; if neither swap is possible, no valid answer exists.

## C# Solution

```csharp
public class Solution 
{
    public long LargestEvenSum(int[] nums, int k) 
    {
        Array.Sort(nums);
        int n = nums.Length;
        long sum = 0;
        for (int i = n - k; i < n; i++)
            sum += nums[i];

        if (sum % 2 == 0)
            return sum;

        int minOdd = -1, minEven = -1, maxOdd = -1, maxEven = -1;

        for (int i = n - 1; i + k >= n; i--)
        {
            if (nums[i] % 2 != 0)
                minOdd = nums[i];
            else
                minEven = nums[i];
        }

        for (int i = 0; i + k < n; i++)
        {
            if (nums[i] % 2 != 0)
                maxOdd = nums[i];
            else
                maxEven = nums[i];
        }

        long ans = -1;

        if (maxEven >= 0 && minOdd >= 0)
            ans = Math.Max(ans, sum + maxEven - minOdd);
        if (maxOdd >= 0 && minEven >= 0)
            ans = Math.Max(ans, sum + maxOdd - minEven);

        return ans;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(1) extra (ignoring the sort)
