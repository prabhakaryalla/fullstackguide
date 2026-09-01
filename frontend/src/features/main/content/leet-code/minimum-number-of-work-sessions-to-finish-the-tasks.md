# 1986. Minimum Number of Work Sessions to Finish the Tasks

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Backtracking, Bitmask

## Problem

Given an array `tasks` where `tasks[i]` is the time needed for task `i`, and an integer `sessionTime`, partition the tasks into work sessions (a session may hold multiple tasks as long as their total time does not exceed `sessionTime`, and once a task is started it must finish within the same session without interruption). Return the minimum number of sessions needed to complete all tasks.

### Example

```
Input: tasks = [1,2,3], sessionTime = 3
Output: 2
Explanation: Session 1: tasks 1 and 2 (total 3). Session 2: task 3 (total 3).
```

### Constraints

- `1 <= tasks.length <= 14`
- `1 <= tasks[i] <= 10`
- `tasks[i] <= sessionTime <= 15`

## Approach

Since `n <= 14`, use bitmask DP. First, for every subset `mask`, precompute whether its total task time is `<= sessionTime` (a valid single-session subset). Then compute `dp[mask]` = minimum number of sessions to complete exactly the tasks in `mask`, by trying every valid single-session sub-subset `sub` of `mask` (enumerated via the standard "iterate submasks" technique) and taking `dp[mask] = min(dp[mask ^ sub] + 1)`. The answer is `dp[fullMask]`.

## C# Solution

```csharp
public class Solution
{
    public int MinSessions(int[] tasks, int sessionTime)
    {
        int n = tasks.Length;
        int fullMask = 1 << n;
        int[] sum = new int[fullMask];

        for (int mask = 1; mask < fullMask; mask++)
        {
            int lowestBit = mask & (-mask);
            int idx = System.Numerics.BitOperations.TrailingZeroCount(lowestBit);
            sum[mask] = sum[mask ^ lowestBit] + tasks[idx];
        }

        int[] dp = new int[fullMask];
        Array.Fill(dp, int.MaxValue / 2);
        dp[0] = 0;

        for (int mask = 1; mask < fullMask; mask++)
        {
            for (int sub = mask; sub > 0; sub = (sub - 1) & mask)
            {
                if (sum[sub] <= sessionTime)
                {
                    dp[mask] = Math.Min(dp[mask], dp[mask ^ sub] + 1);
                }
            }
        }

        return dp[fullMask - 1];
    }
}
```

## Complexity

- **Time:** `O(3^n)` — enumerating all submasks of all masks.
- **Space:** `O(2^n)` for the dp and sum arrays.
