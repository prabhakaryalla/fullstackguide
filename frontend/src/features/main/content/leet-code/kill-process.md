# 582. Kill Process

**Difficulty:** Medium
**Category:** Tree, Array, Hash Table, Depth-First Search, Breadth-First Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `n` processes with ids `pid` and their parent ids `ppid` (forming a tree, with the root process having a parent id of `0`), and an integer `kill` representing a process to terminate, return the ids of all processes that will be killed, given that killing a process also kills all of its descendants.

### Example

```
Input: pid = [1,3,10,5], ppid = [3,0,5,3], kill = 5
Output: [5,10]
```

## Approach

Build an adjacency list mapping each process id to its direct children. Starting from the `kill` process, perform a breadth-first search that adds each visited process to the result and enqueues all of its children, naturally collecting every descendant along with the process itself.

## C# Solution

```csharp
public class Solution
{
    public IList<int> KillProcess(IList<int> pid, IList<int> ppid, int kill)
    {
        var childrenMap = new Dictionary<int, List<int>>();
        for (int i = 0; i < pid.Count; i++)
        {
            if (!childrenMap.TryGetValue(ppid[i], out var list))
            {
                list = new List<int>();
                childrenMap[ppid[i]] = list;
            }
            list.Add(pid[i]);
        }

        var result = new List<int>();
        var queue = new Queue<int>();
        queue.Enqueue(kill);

        while (queue.Count > 0)
        {
            int current = queue.Dequeue();
            result.Add(current);

            if (childrenMap.TryGetValue(current, out var children))
                foreach (var child in children)
                    queue.Enqueue(child);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the adjacency list and queue.
