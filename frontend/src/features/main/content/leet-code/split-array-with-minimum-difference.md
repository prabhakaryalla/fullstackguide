# 3698. Split Array With Minimum Difference

**Difficulty:** Medium
**Category:** Array, Prefix Sum

## Problem

You are given an integer array `nums`.

Split the array into exactly two subarrays, `left` and `right`, such that `left` is strictly increasing and `right` is strictly decreasing.

Return the minimum possible absolute difference between the sums of `left` and `right`. If no valid split exists, return `-1`.

### Example

```
Input: nums = [1,3,2]
Output: 2
Explanation: Splitting into [1,3] and [2] gives sums 4 and 2, a difference of 2, which is minimal among valid splits.
```

### Constraints

- `2 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

## Approach

Precompute a boolean prefix array `increasingPrefix[i]` that is true iff `nums[0..i]` is strictly increasing, and a boolean suffix array `decreasingSuffix[i]` that is true iff `nums[i..n-1]` is strictly decreasing. A split after index `i` (giving `left = nums[0..i]`, `right = nums[i+1..n-1]`) is valid exactly when `increasingPrefix[i]` and `decreasingSuffix[i+1]` are both true. Using prefix sums, evaluate the absolute difference of sums for every valid split point and keep the minimum; return `-1` if no split point is valid.

## C# Solution

```csharp
public class Solution
{
    public long MinimumDifference(int[] nums)
    {
        int n = nums.Length;
        bool[] increasingPrefix = new bool[n];
        bool[] decreasingSuffix = new bool[n];

        increasingPrefix[0] = true;
        for (int i = 1; i < n; i++)
        {
            increasingPrefix[i] = increasingPrefix[i - 1] && nums[i] > nums[i - 1];
        }

        decreasingSuffix[n - 1] = true;
        for (int i = n - 2; i >= 0; i--)
        {
            decreasingSuffix[i] = decreasingSuffix[i + 1] && nums[i] > nums[i + 1];
        }

        long[] prefixSum = new long[n + 1];
        for (int i = 0; i < n; i++)
        {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        long best = -1;
        for (int i = 0; i < n - 1; i++)
        {
            if (increasingPrefix[i] && decreasingSuffix[i + 1])
            {
                long leftSum = prefixSum[i + 1];
                long rightSum = prefixSum[n] - leftSum;
                long diff = Math.Abs(leftSum - rightSum);

                if (best == -1 || diff < best)
                {
                    best = diff;
                }
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)`.
