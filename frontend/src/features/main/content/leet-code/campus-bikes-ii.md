# 1066. Campus Bikes II

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Bitmask

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `workers` and `bikes` positions on a 2D grid, assign each worker exactly one distinct bike using Manhattan distance so that the **total** distance across all assignments is minimized. Return that minimum total distance.

### Example

```
Input: workers = [[0,0],[1,1],[2,0]], bikes = [[1,0],[2,2],[2,1]]
Output: 4
```

## Approach

Since the number of bikes is small, use a bitmask to represent which bikes have already been used. `dp[mask]` holds the minimum total distance to assign bikes in `mask` to the first `popcount(mask)` workers (workers are assigned in a fixed order, one per transition). For each state, try assigning the next worker to every unused bike, transitioning to a new mask with the added distance. The answer is the minimum `dp[mask]` among masks with exactly `workers.Length` bits set.

## C# Solution

```csharp
public class Solution
{
    public int AssignBikes(int[][] workers, int[][] bikes)
    {
        int m = workers.Length;
        int n = bikes.Length;
        var dp = new int[1 << n];
        Array.Fill(dp, int.MaxValue);
        dp[0] = 0;

        for (int mask = 0; mask < (1 << n); mask++)
        {
            if (dp[mask] == int.MaxValue) continue;

            int workerIndex = CountBits(mask);
            if (workerIndex >= m) continue;

            for (int b = 0; b < n; b++)
            {
                if ((mask & (1 << b)) != 0) continue;

                int newMask = mask | (1 << b);
                int dist = Math.Abs(workers[workerIndex][0] - bikes[b][0]) + Math.Abs(workers[workerIndex][1] - bikes[b][1]);
                dp[newMask] = Math.Min(dp[newMask], dp[mask] + dist);
            }
        }

        int best = int.MaxValue;
        for (int mask = 0; mask < (1 << n); mask++)
        {
            if (CountBits(mask) == m)
            {
                best = Math.Min(best, dp[mask]);
            }
        }

        return best;
    }

    private int CountBits(int mask)
    {
        int count = 0;
        while (mask > 0)
        {
            count += mask & 1;
            mask >>= 1;
        }
        return count;
    }
}
```

## Complexity

- **Time:** `O(2^bikes * bikes)`.
- **Space:** `O(2^bikes)` for the DP array.
