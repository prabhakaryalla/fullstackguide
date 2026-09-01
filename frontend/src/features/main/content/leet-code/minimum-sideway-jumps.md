# 1824. Minimum Sideway Jumps

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Greedy

## Problem

A frog starts on lane `2` at point `0` of a 3-lane road described by `obstacles`, where `obstacles[i] != 0` means lane `obstacles[i]` has an obstacle at point `i`. The frog always moves forward by one point each step and may additionally make instantaneous sideways jumps to a different lane (not blocked by an obstacle at the current point). Return the minimum number of sideways jumps needed to reach any lane at the last point.

### Example

```
Input: obstacles = [0,1,2,3,0]
Output: 2
```

## Approach

Maintain `dp[lane]` = minimum sideways jumps needed to currently be standing in `lane` (0-indexed 0..2 for lanes 1..3) at the current point, initialized to `{1, 0, 1}` since the frog starts on lane 2. For each subsequent point, first invalidate (set to infinity) any lane blocked by an obstacle at that point, then relax every non-blocked lane's value using the minimum of any other lane's previous value plus one jump (since the frog could have jumped sideways at the previous point before advancing, or arrived directly by moving straight). The answer is the minimum over the three lanes after processing all points.

## C# Solution

```csharp
public class Solution
{
    public int MinSideJumps(int[] obstacles)
    {
        int n = obstacles.Length - 1;
        int[] dp = { 1, 0, 1 };

        for (int i = 1; i <= n; i++)
        {
            for (int lane = 0; lane < 3; lane++)
            {
                if (obstacles[i] == lane + 1) dp[lane] = int.MaxValue / 2;
            }

            for (int lane = 0; lane < 3; lane++)
            {
                if (obstacles[i] == lane + 1) continue;
                for (int other = 0; other < 3; other++)
                {
                    if (other != lane) dp[lane] = Math.Min(dp[lane], dp[other] + 1);
                }
            }
        }

        return dp.Min();
    }
}
```

## Complexity

- **Time:** `O(n)` since each point does constant work across the 3 lanes.
- **Space:** `O(1)` beyond the fixed-size `dp` array.
