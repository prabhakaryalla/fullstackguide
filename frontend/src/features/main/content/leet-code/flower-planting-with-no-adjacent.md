# 1042. Flower Planting With No Adjacent

**Difficulty:** Medium
**Category:** Graph, Depth-First Search, Graph Coloring

## Problem

There are `n` gardens numbered `1` to `n`, and a list of bidirectional `paths` between pairs of gardens. Choose one of `4` flower types for each garden so that no two gardens connected by a path share the same flower type. Return any valid assignment as an array indexed by garden number.

### Example

```
Input: n = 3, paths = [[1,2],[2,3],[3,1]]
Output: [1,2,3]
```

## Approach

Because each garden has at most `3` paths (a graph property guaranteed by the problem), greedily assigning flowers always works with only `4` colors available. Build an adjacency list, then process gardens in order: for each garden, mark which of the `4` flower types are already used by its already-assigned neighbors, and pick any flower type not in that used set.

## C# Solution

```csharp
public class Solution
{
    public int[] GardenNoAdj(int n, int[][] paths)
    {
        var adjacency = new List<int>[n + 1];
        for (int i = 1; i <= n; i++) adjacency[i] = new List<int>();

        foreach (var path in paths)
        {
            adjacency[path[0]].Add(path[1]);
            adjacency[path[1]].Add(path[0]);
        }

        var result = new int[n + 1];

        for (int garden = 1; garden <= n; garden++)
        {
            var used = new bool[5];
            foreach (var neighbor in adjacency[garden])
            {
                if (result[neighbor] != 0) used[result[neighbor]] = true;
            }

            for (int flower = 1; flower <= 4; flower++)
            {
                if (!used[flower])
                {
                    result[garden] = flower;
                    break;
                }
            }
        }

        return result.Skip(1).ToArray();
    }
}
```

## Complexity

- **Time:** `O(n + paths.Length)`.
- **Space:** `O(n + paths.Length)` for the adjacency list.
