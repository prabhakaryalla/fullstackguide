# 332. Reconstruct Itinerary

**Difficulty:** Hard
**Category:** Depth-First Search, Graph, Eulerian Circuit

## Problem

Given a list of airline `tickets` where `tickets[i] = [from, to]`, reconstruct the itinerary in order and return it, starting from `"JFK"`. If multiple valid itineraries exist, return the one that has the smallest lexical order when read as a single string. All tickets must be used exactly once.

### Example

```
Input: tickets = [["MUC","LHR"],["JFK","MUC"],["LHR","SFO"],["SFO","SJC"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]
```

### Constraints

- `1 <= tickets.length <= 300`
- `tickets[i].length == 2`
- It is guaranteed that a valid itinerary exists.

## Approach

Build an adjacency list of destinations for each airport, sorting each list lexicographically so the smallest destination is tried first. Perform Hierholzer's algorithm for finding an Eulerian path: recursively visit the smallest available destination, removing edges as they are used, and prepend each airport to the result only after all its outgoing edges are exhausted (post-order), which correctly handles dead ends.

## C# Solution

```csharp
public class Solution
{
    public IList<string> FindItinerary(IList<IList<string>> tickets)
    {
        var graph = new Dictionary<string, List<string>>();
        foreach (var ticket in tickets)
        {
            if (!graph.TryGetValue(ticket[0], out var list))
            {
                list = new List<string>();
                graph[ticket[0]] = list;
            }

            list.Add(ticket[1]);
        }

        foreach (var list in graph.Values)
            list.Sort(StringComparer.Ordinal);

        var route = new LinkedList<string>();
        Visit("JFK", graph, route);
        return route.ToList();
    }

    private void Visit(string airport, Dictionary<string, List<string>> graph, LinkedList<string> route)
    {
        while (graph.TryGetValue(airport, out var destinations) && destinations.Count > 0)
        {
            var next = destinations[0];
            destinations.RemoveAt(0);
            Visit(next, graph, route);
        }

        route.AddFirst(airport);
    }
}
```

## Complexity

- **Time:** `O(E log E)`, dominated by sorting the destination lists (`E` is the number of tickets).
- **Space:** `O(E)` for the adjacency list and result.
