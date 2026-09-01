# 2492. Minimum Score of a Path Between Two Cities

**Difficulty:** Medium
**Category:** Depth-First Search, Breadth-First Search, Union Find, Graph

## Problem

You are given a positive integer `n` representing `n` cities numbered from 1 to `n`. You are also given a 2D array `roads` where `roads[i] = [a_i, b_i, distance_i]` indicates that there is a bidirectional road between cities `a_i` and `b_i` with a distance equal to `distance_i`.

The score of a path between two cities is defined as the minimum distance of a road in this path.

Return the minimum possible score of a path between cities 1 and `n`.

Note: A path exists between cities 1 and `n`, and you can visit any city multiple times.

### Example

```
Input: n = 4, roads = [[1,2,9],[2,3,6],[2,4,5],[1,4,7]]
Output: 5
Explanation: The path from city 1 to 4 with minimum score is: 1 -> 2 -> 4
The score is min(9, 5) = 5
```

## Approach

Since we can use any path and visit cities multiple times, this becomes a connected component problem. We need to find the minimum edge weight in the entire connected component containing cities 1 and n.

Use BFS/DFS or Union Find to identify all edges reachable from city 1. The answer is the minimum weight among all these edges.

## C# Solution

```csharp
public class Solution
{
    public int MinScore(int n, int[][] roads)
    {
        var graph = new Dictionary<int, List<(int, int)>>();
        
        foreach (var road in roads)
        {
            int a = road[0], b = road[1], dist = road[2];
            if (!graph.ContainsKey(a)) graph[a] = new List<(int, int)>();
            if (!graph.ContainsKey(b)) graph[b] = new List<(int, int)>();
            graph[a].Add((b, dist));
            graph[b].Add((a, dist));
        }
        
        var visited = new HashSet<int>();
        var queue = new Queue<int>();
        queue.Enqueue(1);
        visited.Add(1);
        int minScore = int.MaxValue;
        
        while (queue.Count > 0)
        {
            int city = queue.Dequeue();
            
            if (graph.ContainsKey(city))
            {
                foreach (var (neighbor, dist) in graph[city])
                {
                    minScore = Math.Min(minScore, dist);
                    
                    if (!visited.Contains(neighbor))
                    {
                        visited.Add(neighbor);
                        queue.Enqueue(neighbor);
                    }
                }
            }
        }
        
        return minScore;
    }
}
```

## Complexity

- **Time:** O(V + E) where V is the number of cities and E is the number of roads
- **Space:** O(V + E) for the graph and visited set
