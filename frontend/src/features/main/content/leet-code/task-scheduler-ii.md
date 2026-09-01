# 2365. Task Scheduler II

**Difficulty:** Medium
**Category:** Array, Hash Table, Simulation

## Problem

You are given a 0-indexed array of positive integers `tasks`, representing tasks that need to be completed in order, where `tasks[i]` represents the type of the `i-th` task.

You are also given a positive integer `space`, which represents the minimum number of days that must pass after the completion of a task before another task of the same type can be performed.

Each day, until all tasks have been completed, you must either:

- Complete the next task from `tasks`, or
- Take a break.

Return the minimum number of days needed to complete all tasks.

### Example

```
Input: tasks = [1,2,1,2,3,1], space = 3
Output: 9
Explanation: Complete task 1, task 2, wait 3 days, complete task 1 again, etc.
```

## Approach

Track the last day each task type was completed. For each task, check if enough days have passed since the last occurrence of that type. If not, advance the day counter accordingly.

## C# Solution

```csharp
public class Solution
{
    public long TaskSchedulerII(int[] tasks, int space)
    {
        var lastDay = new Dictionary<int, long>();
        long day = 0;
        
        foreach (int task in tasks)
        {
            day++;
            
            if (lastDay.ContainsKey(task))
            {
                long requiredDay = lastDay[task] + space + 1;
                if (day < requiredDay)
                {
                    day = requiredDay;
                }
            }
            
            lastDay[task] = day;
        }
        
        return day;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(k) where k is number of unique tasks
