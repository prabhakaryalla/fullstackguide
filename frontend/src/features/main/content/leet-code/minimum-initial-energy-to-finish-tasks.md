# 1665. Minimum Initial Energy to Finish Tasks

**Difficulty:** Hard
**Category:** Array, Greedy, Sorting

## Problem

Each task `[actual, minimum]` requires at least `minimum` energy to *start*, then consumes `actual` energy. Given a list of tasks (any order allowed), return the minimum initial energy needed to complete all of them.

### Example

```
Input: tasks = [[1,2],[2,4],[4,8]]
Output: 8
```

## Approach

Sort tasks by descending "slack" (`minimum - actual`) — tasks requiring the largest energy cushion beyond what they actually consume should be done first, since leftover slack is wasted once bigger-slack tasks are deferred. Simulate the tasks in that order, bumping current energy up to each task's `minimum` requirement if needed before subtracting its `actual` cost; the final required initial energy is the resulting total.

## C# Solution

```csharp
public class Solution
{
    public int MinimumEffort(int[][] tasks)
    {
        Array.Sort(tasks, (a, b) => (b[1] - b[0]) - (a[1] - a[0]));

        long energy = 0;

        foreach (var task in tasks)
        {
            if (energy < task[1])
            {
                energy = task[1];
            }

            energy -= task[0];
        }

        return (int)energy;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(log n)` for the sort.
