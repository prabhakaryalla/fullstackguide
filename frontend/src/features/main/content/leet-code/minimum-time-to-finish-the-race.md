# 2411. Minimum Time to Finish the Race

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

You are given a 0-indexed 2D integer array `tires` where `tires[i] = [f_i, r_i]` indicates that the `i`-th tire can finish its `x`-th successive lap in `f_i * r_i^(x-1)` seconds.

You are also given an integer `changeTime` and an integer `numLaps`.

The race consists of `numLaps` laps and you start the race using any tire you want. You can change to any other tire (including the current tire) after finishing each lap, which takes `changeTime` seconds.

Return the minimum time to finish the race.

### Example

```
Input: tires = [[2,3],[3,4]], changeTime = 5, numLaps = 4
Output: 21
Explanation:
Lap 1: Use tire 0 in 2 seconds.
Lap 2: Change tire (5 seconds) and use tire 0 in 2 seconds. Total: 2 + 5 + 2 = 9.
Lap 3: Change tire (5 seconds) and use tire 0 in 2 seconds. Total: 9 + 5 + 2 = 16.
Lap 4: Change tire (5 seconds) and use tire 0 in 2 seconds. Total: 16 + 5 + 2 = 23.
Or better: Lap 1-2 with tire 0 (2 + 6 = 8), change (5), lap 3-4 with tire 0 (2 + 6 = 8). Total: 21.
```

## Approach

Use dynamic programming where `dp[i]` represents the minimum time to complete `i` laps. Precompute the best time to run consecutive laps without changing for each tire. Then for each lap count, try all possible ways to split the remaining laps.

## C# Solution

```csharp
public class Solution
{
    public int MinimumFinishTime(int[][] tires, int changeTime, int numLaps)
    {
        const int MAX_LAPS = 18;
        int n = tires.Length;
        
        long[][] minTime = new long[n][];
        for (int i = 0; i < n; i++)
        {
            minTime[i] = new long[MAX_LAPS];
            long time = 0;
            long lapTime = tires[i][0];
            
            for (int j = 0; j < MAX_LAPS; j++)
            {
                time += lapTime;
                minTime[i][j] = time;
                lapTime *= tires[i][1];
                if (lapTime > changeTime + tires[i][0]) break;
            }
        }
        
        long[] bestConsecutive = new long[MAX_LAPS];
        Array.Fill(bestConsecutive, long.MaxValue);
        
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < MAX_LAPS && minTime[i][j] > 0; j++)
            {
                bestConsecutive[j] = Math.Min(bestConsecutive[j], minTime[i][j]);
            }
        }
        
        long[] dp = new long[numLaps + 1];
        Array.Fill(dp, long.MaxValue);
        dp[0] = -changeTime;
        
        for (int i = 1; i <= numLaps; i++)
        {
            for (int j = 1; j <= Math.Min(i, MAX_LAPS - 1); j++)
            {
                if (bestConsecutive[j - 1] != long.MaxValue)
                {
                    dp[i] = Math.Min(dp[i], dp[i - j] + changeTime + bestConsecutive[j - 1]);
                }
            }
        }
        
        return (int)dp[numLaps];
    }
}
```

## Complexity

- **Time:** O(n × 18 + numLaps × 18) where n is the number of tires
- **Space:** O(n × 18 + numLaps)
