# 886. Possible Bipartition

**Difficulty:** Medium
**Category:** Depth-First Search, Breadth-First Search, Union Find, Graph

## Problem

Given `n` people and a list of `dislikes` pairs (people who must be placed in different groups), return `true` if it's possible to split everyone into two groups such that no two disliking people share a group.

### Example

```
Input: n = 4, dislikes = [[1,2],[1,3],[2,4]]
Output: true
```

## Approach

Model dislikes as edges in a graph and attempt a 2-coloring via BFS on each connected component: assign a starting color to the first person, then color every neighbor the opposite color. If a neighbor is ever found already colored the same as the current person, the bipartition is impossible.

## C# Solution

```csharp
public class Solution
{
    public bool PossibleBipartition(int n, int[][] dislikes)
    {
        var graph = new List<int>[n + 1];
        for (int i = 1; i <= n; i++) graph[i] = new List<int>();

        foreach (var pair in dislikes)
        {
            graph[pair[0]].Add(pair[1]);
            graph[pair[1]].Add(pair[0]);
        }

        var colors = new int[n + 1];

        for (int i = 1; i <= n; i++)
        {
            if (colors[i] != 0) continue;

            colors[i] = 1;
            var queue = new Queue<int>();
            queue.Enqueue(i);

            while (queue.Count > 0)
            {
                var node = queue.Dequeue();

                foreach (var neighbor in graph[node])
                {
                    if (colors[neighbor] == 0)
                    {
                        colors[neighbor] = -colors[node];
                        queue.Enqueue(neighbor);
                    }
                    else if (colors[neighbor] == colors[node])
                    {
                        return false;
                    }
                }
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n + d)`, where `d` is the number of dislike pairs.
- **Space:** `O(n + d)` for the graph and colors array.
