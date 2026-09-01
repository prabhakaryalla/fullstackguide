# 198. House Robber

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given an array `nums` representing the amount of money in each house along a street, find the maximum amount that can be robbed without robbing two adjacent houses.

### Example

```
nums = [1,2,3,1] -> 4   (rob house 0 and house 2: 1 + 3 = 4)
nums = [2,7,9,3,1] -> 12  (rob houses 0, 2, 4: 2 + 9 + 1 = 12)
```

## Approach

At each house, decide whether robbing it is worthwhile: `dp[i]` is the best total up through house `i`, equal to `max(dp[i-1], dp[i-2] + nums[i])` — either skip house `i` (keeping the best total so far) or rob it (adding its value to the best total from two houses back, since the adjacent house can't also be robbed). Track only the last two values to run in constant space.

## C# Solution

```csharp
public class Solution
{
    public int Rob(int[] nums)
    {
        int prev2 = 0, prev1 = 0;

        foreach (int num in nums)
        {
            int current = Math.Max(prev1, prev2 + num);
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass.
- **Space:** `O(1)`.
