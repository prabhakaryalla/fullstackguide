# 213. House Robber II

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

This is House Robber, but the houses are arranged in a circle — the first and last houses are adjacent. Return the maximum amount that can be robbed without robbing two adjacent houses.

### Example

```
nums = [2,3,2] -> 3   (robbing both house 0 and house 2 isn't allowed, they're adjacent in the circle)
nums = [1,2,3,1] -> 4
```

## Approach

Because the first and last houses can't both be robbed, split into two independent linear House Robber subproblems: one considering all houses except the last, and one considering all houses except the first. The answer is the larger of the two results — this correctly excludes every case where both circular-adjacent ends would be robbed together.

## C# Solution

```csharp
public class Solution
{
    public int Rob(int[] nums)
    {
        int n = nums.Length;
        if (n == 1) return nums[0];

        return Math.Max(
            RobLinear(nums, 0, n - 2),
            RobLinear(nums, 1, n - 1));
    }

    private int RobLinear(int[] nums, int start, int end)
    {
        int prev2 = 0, prev1 = 0;

        for (int i = start; i <= end; i++)
        {
            int current = Math.Max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
}
```

## Complexity

- **Time:** `O(n)` — two linear passes.
- **Space:** `O(1)`.
