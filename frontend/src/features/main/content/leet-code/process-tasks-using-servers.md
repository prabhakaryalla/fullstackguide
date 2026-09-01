# 1882. Process Tasks Using Servers

**Difficulty:** Medium
**Category:** Array, Heap (Priority Queue), Simulation

## Problem

Given `servers[i]` (weight of server `i`) and `tasks[j]` (time to process task `j`, which arrives at second `j`), assign each task, at its arrival time or later, to the free server with the smallest weight (ties broken by smaller index) — waiting if no server is currently free. Return, for each task, the index of the server that processes it.

### Example

```
Input: servers = [3,3,2], tasks = [1,2,3,2,1,2]
Output: [2,2,0,2,1,2]
```

## Approach

Maintain a min-heap of free servers keyed by `(weight, index)` and a min-heap of busy servers keyed by `(freeAtTime, weight, index)`. For each task's arrival second, first release any busy server whose free time has already passed into the free heap. If no server is free at that moment, fast-forward the clock to the earliest time a busy server becomes free (releasing it, and any others tied at that same time) before assigning. Pop the best available free server, record it as the answer, and push it back onto the busy heap with its new free time.

## C# Solution

```csharp
public class Solution
{
    public int[] AssignTasks(int[] servers, int[] tasks)
    {
        int n = servers.Length, m = tasks.Length;
        var free = new PriorityQueue<int, (int weight, int idx)>();
        var busy = new PriorityQueue<int, (long freeTime, int weight, int idx)>();

        for (int i = 0; i < n; i++) free.Enqueue(i, (servers[i], i));

        var result = new int[m];

        for (int t = 0; t < m; t++)
        {
            long now = t;
            ReleaseFreedServers(busy, free, servers, now);

            if (free.Count == 0)
            {
                busy.TryPeek(out _, out var nextPriority);
                now = nextPriority.freeTime;
                ReleaseFreedServers(busy, free, servers, now);
            }

            int server = free.Dequeue();
            result[t] = server;
            busy.Enqueue(server, (now + tasks[t], servers[server], server));
        }

        return result;
    }

    private void ReleaseFreedServers(
        PriorityQueue<int, (long freeTime, int weight, int idx)> busy,
        PriorityQueue<int, (int weight, int idx)> free,
        int[] servers,
        long now)
    {
        while (busy.TryPeek(out int idx, out var priority) && priority.freeTime <= now)
        {
            busy.Dequeue();
            free.Enqueue(idx, (servers[idx], idx));
        }
    }
}
```

## Complexity

- **Time:** `O((n + m) log n)` for the heap operations.
- **Space:** `O(n)` for the two heaps.
