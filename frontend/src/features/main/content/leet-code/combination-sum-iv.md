# 377. Combination Sum IV

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given an array of distinct integers `nums` and a target integer `target`, return the number of possible combinations (order matters, so different orderings count separately) that add up to `target`.

### Example

```
Input: nums = [1,2,3], target = 4
Output: 7
```

### Constraints

- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 1000`
- All the elements of `nums` are unique.
- `1 <= target <= 1000`

## Approach

Since order matters, this is an "unbounded permutation" counting problem, solved with dynamic programming where `dp[i]` is the number of ways to form sum `i`. For each target sum, try appending every number in `nums` as the last element, summing the ways to form the remainder.

## C# Solution

```csharp
public class Solution
{
    public int CombinationSum4(int[] nums, int target)
    {
        var dp = new int[target + 1];
        dp[0] = 1;

        for (int i = 1; i <= target; i++)
        {
            foreach (var num in nums)
            {
                if (num <= i)
                    dp[i] += dp[i - num];
            }
        }

        return dp[target];
    }
}
```

## Complexity

- **Time:** `O(target * nums.Length)`.
- **Space:** `O(target)` for the DP array.
