# 2808. Minimum Time to Complete All Tasks

**Difficulty:** Hard
**Category:** Array, Greedy, Sorting, Heap (Priority Queue)

## Problem

There are `n` tasks that need to be completed, represented by a 2D array `tasks` where `tasks[i] = [startᵢ, endᵢ, durationᵢ]` indicates that task `i` must be worked on during the inclusive time interval `[startᵢ, endᵢ]` for at least `durationᵢ` seconds.

You can work on a task at any time within its interval, but you can only work on one task at a time. Once you start working on a task at a particular second, you must continue for one full second before switching.

Return the minimum time required to complete all tasks.

### Example

```
Input: tasks = [[2,3,1],[4,5,1],[1,5,2]]
Output: 2
Explanation: Work during seconds 2 and 5 to complete all tasks.
```

## Approach

This is a greedy interval scheduling problem:

1. Sort tasks by end time (greedy choice: process tasks that end earlier first)
2. Use a bitmask or set to track which seconds are already used
3. For each task, check how much work is already done within its interval
4. If more work is needed, greedily assign seconds from right to left (latest possible)
5. Count total unique seconds used

The key insight is to assign work as late as possible within each interval, which gives maximum flexibility for future tasks.

## C# Solution

```csharp
public class Solution
{
    public int FindMinimumTime(int[][] tasks)
    {
        Array.Sort(tasks, (a, b) => a[1].CompareTo(b[1]));
        
        var used = new HashSet<int>();
        
        foreach (var task in tasks)
        {
            int start = task[0];
            int end = task[1];
            int duration = task[2];
            
            int completed = 0;
            for (int t = start; t <= end; t++)
            {
                if (used.Contains(t))
                {
                    completed++;
                }
            }
            
            int needed = duration - completed;
            
            for (int t = end; t >= start && needed > 0; t--)
            {
                if (!used.Contains(t))
                {
                    used.Add(t);
                    needed--;
                }
            }
        }
        
        return used.Count;
    }
}
```

## Complexity

- **Time:** O(n log n + n × T) where n is the number of tasks and T is the maximum end time
- **Space:** O(T) for tracking used time slots
