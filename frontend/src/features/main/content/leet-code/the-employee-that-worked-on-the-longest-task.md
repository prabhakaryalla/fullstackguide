# 2432. The Employee That Worked on the Longest Task

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem

There are `n` employees, numbered `0` to `n - 1`. You are given a 2D array `logs`, where `logs[i] = [id_i, leaveTime_i]` indicates that employee `id_i` finished a task at time `leaveTime_i`. All `leaveTime` values are unique and sorted in strictly increasing order. Employee tasks are performed one after another: the very first task starts at time `0`, and each subsequent task starts exactly when the previous one ends. Return the id of the employee who worked the longest single task. If there is a tie, return the smallest id among them.

### Example

Input: `n = 3`, `logs = [[0,3],[2,5],[0,9],[1,15]]`
Output: `1`
Explanation: Task durations are `3-0=3` (employee 0), `5-3=2` (employee 2), `9-5=4` (employee 0), `15-9=6` (employee 1). The longest is `6`, by employee 1.

## Approach

Track the time the previous task ended (`prevTime`, starting at `0`). For each log entry, the duration of that task is `leaveTime - prevTime`. Keep the best duration seen so far along with its employee id, updating whenever a strictly longer duration is found, or an equal duration belongs to a smaller id.

## C# Solution

```csharp
public class Solution 
{
    public int HardestWorker(int n, int[][] logs) 
    {
        int prevTime = 0;
        int bestId = logs[0][0];
        int bestDuration = 0;

        foreach (var log in logs)
        {
            int id = log[0];
            int leaveTime = log[1];
            int duration = leaveTime - prevTime;

            if (duration > bestDuration || (duration == bestDuration && id < bestId))
            {
                bestDuration = duration;
                bestId = id;
            }

            prevTime = leaveTime;
        }

        return bestId;
    }
}
```

## Complexity

- **Time:** O(m), where m is the number of logs
- **Space:** O(1)
