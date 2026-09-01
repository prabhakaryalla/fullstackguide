# 1959. Minimum Total Space Wasted With K Resizing Operations

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given an array `nums` representing the number of elements used in each of `n` time steps, you have a dynamic array whose capacity you can resize at most `k` times (a resize can happen between any two time steps, setting the capacity to the maximum of the requirements it must cover until the next resize). Space wasted at a time step is `capacity - nums[i]`. Return the minimum total wasted space over all time steps, choosing at most `k` resize operations optimally.

### Example

```
Input: nums = [10,20], k = 0
Output: 10
Explanation: With no resizes, capacity must be 20 throughout: waste = (20-10)+(20-20) = 10.
```

### Constraints

- `1 <= nums.length <= 200`
- `1 <= k <= nums.length - 1`
- `1 <= nums[i] <= 10^6`

## Approach

Precompute `cost[i][j]`, the wasted space if a single fixed capacity (the max of `nums[i..j]`) covers the contiguous block `nums[i..j]`, equal to `max(nums[i..j]) * (j - i + 1) - sum(nums[i..j])`. Then run interval-partition DP: `dp[i][c]` = minimum waste to cover the first `i` elements using `c` resizes (i.e., `c+1` partitions), where `dp[i][c] = min over j < i of dp[j][c-1] + cost[j][i-1]`. The answer is `dp[n][k]` (using up to `k` resizes, i.e., up to `k+1` segments).

## C# Solution

```csharp
public class Solution
{
    public int MinSpaceWastedKResizing(int[] nums, int k)
    {
        int n = nums.Length;
        long[][] cost = new long[n][];
        for (int i = 0; i < n; i++)
        {
            cost[i] = new long[n];
            long sum = 0, max = 0;
            for (int j = i; j < n; j++)
            {
                sum += nums[j];
                max = Math.Max(max, nums[j]);
                cost[i][j] = max * (j - i + 1) - sum;
            }
        }

        long[,] dp = new long[n + 1, k + 2];
        for (int i = 0; i <= n; i++)
        {
            for (int c = 0; c <= k + 1; c++)
            {
                dp[i, c] = long.MaxValue / 2;
            }
        }
        dp[0, 0] = 0;

        for (int i = 1; i <= n; i++)
        {
            for (int c = 0; c <= k; c++)
            {
                for (int j = 0; j < i; j++)
                {
                    if (dp[j, c] == long.MaxValue / 2) continue;
                    long candidate = dp[j, c] + cost[j][i - 1];
                    if (candidate < dp[i, c + 1])
                    {
                        dp[i, c + 1] = candidate;
                    }
                }
            }
        }

        long best = long.MaxValue;
        for (int c = 1; c <= k + 1; c++)
        {
            best = Math.Min(best, dp[n, c]);
        }

        return (int)best;
    }
}
```

## Complexity

- **Time:** `O(n^2 * k)` — DP transitions over segment boundaries and resize counts.
- **Space:** `O(n^2)` for the cost table plus `O(n * k)` for the DP table.
