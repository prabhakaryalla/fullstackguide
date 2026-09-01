# 2895. Minimum Processing Time

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

You have `n` processors, each having 4 cores. You are given an array `processorTime` representing the time at which each processor becomes available, and an array `tasks` representing the time it takes to execute each task.

Each core can execute at most one task at a time, and each task must be assigned to exactly one core. Return the minimum time needed to complete all tasks.

### Example

```
Input: processorTime = [8,10], tasks = [2,2,3,1,8,7,4,5]
Output: 16
Explanation:
Processor 0 available at time 8, assign tasks [8,7,4,5]:
- Core finishes at max(8+8, 8+7, 8+4, 8+5) = 16
Processor 1 available at time 10, assign tasks [2,2,3,1]:
- Core finishes at max(10+2, 10+2, 10+3, 10+1) = 13
Overall finish time: 16
```

## Approach

To minimize the maximum completion time, assign the longest tasks to the processors that become available earliest. Sort `processorTime` in ascending order and `tasks` in descending order. Assign tasks in groups of 4 to each processor in order.

The answer is the maximum of `processorTime[i] + maxTaskInGroup[i]` for all processors.

## C# Solution

```csharp
public class Solution
{
    public int MinProcessingTime(int[] processorTime, int[] tasks)
    {
        Array.Sort(processorTime);
        Array.Sort(tasks);
        Array.Reverse(tasks);
        
        int maxTime = 0;
        int taskIndex = 0;
        
        foreach (int procTime in processorTime)
        {
            for (int i = 0; i < 4; i++)
            {
                maxTime = Math.Max(maxTime, procTime + tasks[taskIndex]);
                taskIndex++;
            }
        }
        
        return maxTime;
    }
}
```

## Complexity

- **Time:** `O(n log n + m log m)` where `n` is processors and `m` is tasks.
- **Space:** `O(1)` excluding sorting space.
