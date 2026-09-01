# 3683. Earliest Time to Finish One Task

**Difficulty:** Easy
**Category:** Array

## Problem

You are given a 2D integer array `tasks` where `tasks[i] = [s_i, t_i]`. Each entry represents a task with start time `s_i` that takes `t_i` units of time to finish.

Return the earliest time at which at least one task is finished.

### Example

```
Input: tasks = [[1,6],[2,3]]
Output: 5
Explanation: Task 0 finishes at 1 + 6 = 7. Task 1 finishes at 2 + 3 = 5. The earliest finish is 5.
```

### Constraints

- `1 <= tasks.length <= 100`
- `1 <= s_i, t_i <= 100`

## Approach

The finish time of task `i` is simply `s_i + t_i`. Since every task runs independently and there is no shared resource constraint, the earliest possible completion time overall is just the minimum of all individual finish times.

## C# Solution

```csharp
public class Solution
{
    public int EarliestTime(int[][] tasks)
    {
        int earliest = int.MaxValue;

        foreach (int[] task in tasks)
        {
            int finish = task[0] + task[1];
            if (finish < earliest)
            {
                earliest = finish;
            }
        }

        return earliest;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of tasks.
- **Space:** `O(1)`.
