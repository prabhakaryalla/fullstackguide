# 312. Burst Balloons

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

Given `n` balloons indexed `0` to `n - 1`, each with a number in `nums`, bursting balloon `i` earns `nums[left] * nums[i] * nums[right]` coins, where `left` and `right` are the adjacent (still present) balloons; out-of-bounds balloons are treated as having a value of `1`. Return the maximum coins achievable by bursting all balloons.

### Example

```
Input: nums = [3,1,5,8]
Output: 167
```

### Constraints

- `n == nums.length`
- `1 <= n <= 300`
- `0 <= nums[i] <= 100`

## Approach

Think in reverse: instead of choosing which balloon to burst first, choose which balloon to burst *last* within each subrange. Pad the array with virtual `1`s at both ends, then use interval dynamic programming where `dp[left, right]` is the maximum coins obtainable by bursting all balloons strictly between `left` and `right`, trying every `k` as the last balloon burst in that range.

## C# Solution

```csharp
public class Solution
{
    public int MaxCoins(int[] nums)
    {
        int n = nums.Length;
        var balloons = new int[n + 2];
        balloons[0] = balloons[n + 1] = 1;
        for (int i = 0; i < n; i++)
            balloons[i + 1] = nums[i];

        var dp = new int[n + 2, n + 2];

        for (int len = 1; len <= n; len++)
        {
            for (int left = 1; left + len - 1 <= n; left++)
            {
                int right = left + len - 1;
                for (int k = left; k <= right; k++)
                {
                    int coins = balloons[left - 1] * balloons[k] * balloons[right + 1]
                        + dp[left, k - 1] + dp[k + 1, right];
                    dp[left, right] = Math.Max(dp[left, right], coins);
                }
            }
        }

        return dp[1, n];
    }
}
```

## Complexity

- **Time:** `O(n^3)` — three nested loops over interval length, start, and split point.
- **Space:** `O(n^2)` for the DP table.
