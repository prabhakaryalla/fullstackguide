# 1606. Find Servers That Handled Most Number of Requests

**Difficulty:** Hard
**Category:** Array, Greedy, Heap (Priority Queue), Ordered Set

## Problem

There are `k` servers numbered `0` to `k - 1`. Request `i` arrives at `arrival[i]` and takes `load[i]` time. It is assigned to the server `(i mod k)` if free, otherwise to the next free server in increasing order (circularly), skipping it entirely if no server is free. Return the server IDs that handled the most requests.

### Example

```
Input: k = 3, arrival = [1,2,3,4,5], load = [5,2,3,3,3]
Output: [1]
```

## Approach

Maintain a `SortedSet<int>` of free server indices and a `SortedSet<(long End, int Server)>` of busy servers ordered by completion time. For each request, first release any busy servers whose end time has passed. Then look up the smallest free server `>= i % k` via `GetViewBetween`; if none exists, wrap around to the smallest free server overall. Track a count per server and return all servers tied for the maximum.

## C# Solution

```csharp
public class Solution
{
    public IList<int> BusiestServers(int k, int[] arrival, int[] load)
    {
        SortedSet<int> free = new SortedSet<int>();
        for (int i = 0; i < k; i++)
        {
            free.Add(i);
        }

        SortedSet<(long End, int Server)> busy = new SortedSet<(long, int)>();
        int[] count = new int[k];

        for (int i = 0; i < arrival.Length; i++)
        {
            long start = arrival[i];

            while (busy.Count > 0 && busy.Min.End <= start)
            {
                var entry = busy.Min;
                busy.Remove(entry);
                free.Add(entry.Server);
            }

            if (free.Count == 0)
            {
                continue;
            }

            int startIndex = i % k;
            var view = free.GetViewBetween(startIndex, k - 1);
            int server = view.Count > 0 ? view.Min : free.Min;

            count[server]++;
            free.Remove(server);
            busy.Add((start + load[i], server));
        }

        int maxCount = count.Max();
        List<int> result = new List<int>();

        for (int i = 0; i < k; i++)
        {
            if (count[i] == maxCount)
            {
                result.Add(i);
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log k)`, where `n` is the number of requests.
- **Space:** `O(k)` for the ordered sets.
