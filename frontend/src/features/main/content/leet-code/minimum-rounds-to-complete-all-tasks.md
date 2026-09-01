# 2244. Minimum Rounds to Complete All Tasks

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy, Counting

## Problem

You are given a 0-indexed integer array `tasks`, where `tasks[i]` represents the difficulty level of a task. In each round, you can complete either 2 or 3 tasks of the same difficulty level.

Return the minimum number of rounds required to complete all tasks, or `-1` if it is not possible.

### Example

```
Input: tasks = [2,2,3,3,2,4,4,4,4,4]
Output: 4
Explanation:
- 3 tasks of difficulty 2 in round 1
- 2 tasks of difficulty 3 in round 2
- 2 tasks of difficulty 4 in round 3
- 3 tasks of difficulty 4 in round 4
Total: 4 rounds
```

## Approach

Count the frequency of each task difficulty. For each difficulty with count `c`:
- If `c == 1`, return -1 (impossible).
- Otherwise, use greedy: try to use as many 3s as possible. The formula is `(c + 2) / 3` which works for all cases.

## C# Solution

```csharp
public class Solution
{
    public int MinimumRounds(int[] tasks)
    {
        Dictionary<int, int> count = new Dictionary<int, int>();
        
        foreach (int task in tasks)
        {
            count[task] = count.GetValueOrDefault(task, 0) + 1;
        }
        
        int rounds = 0;
        
        foreach (int freq in count.Values)
        {
            if (freq == 1) return -1;
            rounds += (freq + 2) / 3;
        }
        
        return rounds;
    }
}
```

## Complexity

- **Time:** O(n) for counting.
- **Space:** O(n) for the hash map.
