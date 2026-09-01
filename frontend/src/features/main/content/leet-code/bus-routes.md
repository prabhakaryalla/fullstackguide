# 815. Bus Routes

**Difficulty:** Hard
**Category:** Array, Hash Table, Breadth-First Search

## Problem

Given bus `routes`, where `routes[i]` lists the stops that bus `i` cycles through repeatedly, and a `source` and `target` stop, return the minimum number of buses you must take to travel from `source` to `target`, or `-1` if impossible.

### Example

```
Input: routes = [[1,2,7],[3,6,7]], source = 1, target = 6
Output: 2
```

## Approach

Model this as a BFS over stops, where each level of the search represents boarding one more bus. Build a map from each stop to the list of routes serving it. BFS from `source`: at each stop, explore every unvisited route through it, mark that route visited, and enqueue every stop on that route (since boarding a route lets you reach any of its stops in one bus ride). Track the number of BFS levels (buses taken) until `target` is reached.

## C# Solution

```csharp
public class Solution
{
    public int NumBusesToDestination(int[][] routes, int source, int target)
    {
        if (source == target) return 0;

        var stopToRoutes = new Dictionary<int, List<int>>();

        for (int r = 0; r < routes.Length; r++)
        {
            foreach (var stop in routes[r])
            {
                if (!stopToRoutes.ContainsKey(stop))
                    stopToRoutes[stop] = new List<int>();

                stopToRoutes[stop].Add(r);
            }
        }

        var visitedRoutes = new bool[routes.Length];
        var visitedStops = new HashSet<int> { source };
        var queue = new Queue<int>();
        queue.Enqueue(source);
        int buses = 0;

        while (queue.Count > 0)
        {
            int size = queue.Count;
            buses++;

            for (int i = 0; i < size; i++)
            {
                int stop = queue.Dequeue();

                if (!stopToRoutes.ContainsKey(stop)) continue;

                foreach (var route in stopToRoutes[stop])
                {
                    if (visitedRoutes[route]) continue;
                    visitedRoutes[route] = true;

                    foreach (var nextStop in routes[route])
                    {
                        if (nextStop == target) return buses;

                        if (visitedStops.Add(nextStop))
                            queue.Enqueue(nextStop);
                    }
                }
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(sum of route lengths)`.
- **Space:** `O(sum of route lengths)` for the stop-to-routes map.
