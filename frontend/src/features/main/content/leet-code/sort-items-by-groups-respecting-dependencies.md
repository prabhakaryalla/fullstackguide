# 1203. Sort Items by Groups Respecting Dependencies

**Difficulty:** Hard
**Category:** Array, Graph, Topological Sort

## Problem

There are `n` items, each optionally belonging to one of `m` groups (`group[i] == -1` means ungrouped). `beforeItems[i]` lists items that must appear before item `i`. Return an ordering of all items that respects every dependency and keeps items from the same group contiguous, or an empty array if no valid ordering exists.

### Example

```
Input: n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3,6],[],[],[]]
Output: [6,3,4,1,5,2,0,7]
```

## Approach

First give every ungrouped item its own unique group id so all items belong to some group. Build two topological-sort graphs: one over individual items (edges from each `beforeItems[i]` entry to `i`), and one over groups (an edge between two different groups whenever an item in one group must precede an item in another). Topologically sort both graphs with Kahn's algorithm; if either has a cycle, return an empty result. Otherwise, bucket the item-order by group, then walk the group-order and append each group's internally-ordered items.

## C# Solution

```csharp
public class Solution
{
    public int[] SortItems(int n, int m, int[] group, IList<IList<int>> beforeItems)
    {
        int groupId = m;
        for (int i = 0; i < n; i++)
            if (group[i] == -1) group[i] = groupId++;

        var itemGraph = new List<int>[n];
        var itemIndegree = new int[n];
        for (int i = 0; i < n; i++) itemGraph[i] = new List<int>();

        var groupGraph = new List<int>[groupId];
        var groupIndegree = new int[groupId];
        for (int i = 0; i < groupId; i++) groupGraph[i] = new List<int>();

        for (int i = 0; i < n; i++)
        {
            foreach (int before in beforeItems[i])
            {
                itemGraph[before].Add(i);
                itemIndegree[i]++;

                if (group[before] != group[i])
                {
                    groupGraph[group[before]].Add(group[i]);
                    groupIndegree[group[i]]++;
                }
            }
        }

        var itemOrder = TopSort(n, itemGraph, itemIndegree);
        var groupOrder = TopSort(groupId, groupGraph, groupIndegree);

        if (itemOrder.Count < n || groupOrder.Count < groupId) return Array.Empty<int>();

        var itemsByGroup = new Dictionary<int, List<int>>();
        foreach (int item in itemOrder)
        {
            if (!itemsByGroup.TryGetValue(group[item], out var list))
                itemsByGroup[group[item]] = list = new List<int>();
            list.Add(item);
        }

        var result = new List<int>();
        foreach (int g in groupOrder)
            if (itemsByGroup.TryGetValue(g, out var list))
                result.AddRange(list);

        return result.ToArray();
    }

    private List<int> TopSort(int count, List<int>[] graph, int[] indegree)
    {
        var queue = new Queue<int>();
        for (int i = 0; i < count; i++)
            if (indegree[i] == 0) queue.Enqueue(i);

        var order = new List<int>();
        while (queue.Count > 0)
        {
            int node = queue.Dequeue();
            order.Add(node);
            foreach (int next in graph[node])
                if (--indegree[next] == 0) queue.Enqueue(next);
        }

        return order;
    }
}
```

## Complexity

- **Time:** `O(n + m + e)`, where `e` is the total number of dependency edges.
- **Space:** `O(n + m + e)`.
