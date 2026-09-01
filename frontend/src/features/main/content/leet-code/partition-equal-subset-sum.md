# 416. Partition Equal Subset Sum

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given a non-empty array `nums` containing only positive integers, return `true` if it can be partitioned into two subsets such that the sum of elements in both subsets is equal.

### Example

```
Input: nums = [1,5,11,5]
Output: true
Explanation: [1, 5, 5] and [11] both sum to 11.
```

### Constraints

- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 100`

## Approach

If the total sum is odd, an equal partition is impossible. Otherwise, this reduces to a 0/1 knapsack "subset sum" problem: determine whether some subset sums to exactly half the total, using a boolean DP array where `dp[i]` tracks whether sum `i` is achievable, updated in reverse order per item to avoid reusing an element twice.

## C# Solution

```csharp
public class Solution
{
    public bool CanPartition(int[] nums)
    {
        int sum = nums.Sum();
        if (sum % 2 != 0) return false;

        int target = sum / 2;
        var dp = new bool[target + 1];
        dp[0] = true;

        foreach (var num in nums)
        {
            for (int i = target; i >= num; i--)
            {
                dp[i] = dp[i] || dp[i - num];
            }
        }

        return dp[target];
    }
}
```

## Complexity

- **Time:** `O(n * target)`.
- **Space:** `O(target)` for the DP array.
