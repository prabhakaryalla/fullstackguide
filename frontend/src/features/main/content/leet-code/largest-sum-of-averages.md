# 813. Largest Sum of Averages

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Prefix Sum

## Problem

Given an array `nums` and an integer `k`, partition the array into at most `k` contiguous, non-empty groups so as to maximize the sum of each group's average value. Return that maximum sum.

### Example

```
Input: nums = [9,1,2,3,9], k = 3
Output: 20.00000
```

## Approach

Use prefix sums for O(1) range-average queries. First compute `dp[i]`, the best score using exactly one group covering `nums[i..n)`, for every starting index `i`. Then, for each additional allowed group count from `2` up to `k`, compute a new `dp[i]` as the best over every possible first-group end `j`: the average of `nums[i..j)` plus the previous `dp[j]` (the best score for the remainder using one fewer group). The final answer is `dp[0]` after processing all `k` group counts.

## C# Solution

```csharp
public class Solution
{
    public double LargestSumOfAverages(int[] nums, int k)
    {
        int n = nums.Length;
        var prefix = new double[n + 1];
        for (int i = 0; i < n; i++)
            prefix[i + 1] = prefix[i] + nums[i];

        var dp = new double[n + 1];
        for (int i = 0; i < n; i++)
            dp[i] = Average(prefix, i, n);

        for (int group = 2; group <= k; group++)
        {
            var newDp = new double[n + 1];

            for (int i = 0; i < n; i++)
            {
                for (int j = i + 1; j <= n; j++)
                {
                    newDp[i] = Math.Max(newDp[i], Average(prefix, i, j) + dp[j]);
                }
            }

            dp = newDp;
        }

        return dp[0];
    }

    private double Average(double[] prefix, int i, int j)
    {
        return (prefix[j] - prefix[i]) / (j - i);
    }
}
```

## Complexity

- **Time:** `O(k * n^2)`.
- **Space:** `O(n)` for the DP arrays.
