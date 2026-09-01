# 1955. Count Number of Special Subsequences

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

A sequence is "special" if it consists of some positive number of `0`s, followed by some positive number of `1`s, followed by some positive number of `2`s (each group non-empty). Given an array `nums` of `0`s, `1`s, and `2`s, return the number of special subsequences of `nums`, modulo `10^9 + 7`.

### Example

```
Input: nums = [0,1,2,2]
Output: 3
Explanation: The special subsequences are [0,1,2], [0,1,2] (second 2), and [0,1,2,2].
```

### Constraints

- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 2`

## Approach

Maintain three running DP counters modulo `10^9 + 7`: `dp0` = number of ways to form a non-empty subsequence of only `0`s using elements seen so far; `dp1` = number of ways to form `0...01...1`; `dp2` = number of ways to form the full `0...01...12...2` pattern. When the current element is `0`, `dp0 = dp0 * 2 + 1` (either extend every existing 0-run or start a new one with this element). When it's `1`, `dp1 = dp1 * 2 + dp0` (extend existing 1-runs, or transition from a completed 0-run by appending this 1). When it's `2`, `dp2 = dp2 * 2 + dp1` similarly. The final answer is `dp2`.

## C# Solution

```csharp
public class Solution
{
    private const long Mod = 1_000_000_007;

    public int CountSpecialSubsequences(int[] nums)
    {
        long dp0 = 0, dp1 = 0, dp2 = 0;

        foreach (int num in nums)
        {
            if (num == 0)
            {
                dp0 = (dp0 * 2 + 1) % Mod;
            }
            else if (num == 1)
            {
                dp1 = (dp1 * 2 + dp0) % Mod;
            }
            else
            {
                dp2 = (dp2 * 2 + dp1) % Mod;
            }
        }

        return (int)dp2;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single linear pass.
- **Space:** `O(1)`.
