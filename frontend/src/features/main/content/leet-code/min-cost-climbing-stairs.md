# 746. Min Cost Climbing Stairs

**Difficulty:** Easy
**Category:** Array, Dynamic Programming

## Problem

Given an array `cost` where `cost[i]` is the cost of stepping on stair `i`, and starting from either step `0` or step `1` (and able to climb one or two steps at a time), return the minimum cost to reach the top of the staircase (just past the last step).

### Example

```
Input: cost = [10,15,20]
Output: 15
```

## Approach

Use rolling dynamic programming where the minimum cost to reach step `i` is `cost[i-1]` plus the minimum of the costs to reach one or two steps before it. Track only the last two computed values instead of a full array, since each new step only depends on its two immediate predecessors.

## C# Solution

```csharp
public class Solution
{
    public int MinCostClimbingStairs(int[] cost)
    {
        int n = cost.Length;
        int prev2 = 0, prev1 = 0;

        for (int i = 2; i <= n; i++)
        {
            int current = Math.Min(prev1 + cost[i - 1], prev2 + cost[i - 2]);
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
