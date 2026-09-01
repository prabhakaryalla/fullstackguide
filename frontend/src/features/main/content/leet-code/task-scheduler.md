# 621. Task Scheduler

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy, Sorting, Heap, Counting

## Problem

Given a character array `tasks` representing CPU tasks and a non-negative integer `n` representing a cooldown period between two identical tasks, return the minimum number of time units the CPU needs to complete all tasks.

### Example

```
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
```

### Constraints

- `1 <= tasks.length <= 10^4`
- `0 <= n <= 100`

## Approach

The most frequent task dictates the minimum schedule length: arrange `(maxCount - 1)` full cycles of length `n + 1` around the most frequent task, then add one more slot for each task that ties for the maximum frequency (since they all need a final placement). This theoretical minimum, `(maxCount - 1) * (n + 1) + maxCountFrequency`, may still be less than simply running every task back-to-back if there are enough distinct tasks to fill idle slots, so the answer is the larger of that formula and the total task count.

## C# Solution

```csharp
public class Solution
{
    public int LeastInterval(char[] tasks, int n)
    {
        var counts = new int[26];
        foreach (var task in tasks)
            counts[task - 'A']++;

        int maxCount = counts.Max();
        int maxCountFrequency = counts.Count(c => c == maxCount);

        int intervalLength = (maxCount - 1) * (n + 1) + maxCountFrequency;

        return Math.Max(intervalLength, tasks.Length);
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of tasks.
- **Space:** `O(1)` — bounded by the 26-letter task alphabet.
