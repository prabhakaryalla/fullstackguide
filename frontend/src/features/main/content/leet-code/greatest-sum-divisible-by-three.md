# 1262. Greatest Sum Divisible by Three

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Greedy, Sorting

## Problem

Given an integer array `nums`, return the maximum possible sum of a subset of its elements such that the sum is divisible by `3`.

### Example

```
Input: nums = [3,6,5,1,8]
Output: 18
```

## Approach

Maintain a DP array of size 3, `dp[r]`, representing the best achievable sum with remainder `r` when divided by `3`, using elements processed so far (starting as `dp[0] = 0`, `dp[1] = dp[2] = -infinity` to mark "not yet achievable"). For each number, compute its own remainder, and for every currently achievable remainder `r`, adding this number can produce a new achievable sum at remainder `(r + num % 3) % 3` — keep the best value seen for each target remainder. The final `dp[0]` is the answer.

## C# Solution

```csharp
public class Solution
{
    public int MaxSumDivThree(int[] nums)
    {
        var dp = new int[] { 0, int.MinValue, int.MinValue };

        foreach (int num in nums)
        {
            var next = (int[])dp.Clone();

            for (int rem = 0; rem < 3; rem++)
            {
                if (dp[rem] == int.MinValue) continue;
                int newRem = (rem + num % 3) % 3;
                next[newRem] = Math.Max(next[newRem], dp[rem] + num);
            }

            dp = next;
        }

        return dp[0];
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of `nums`.
- **Space:** `O(1)`.
