# 2662. Minimum Cost of a Path With Special Roads

**Difficulty:** Medium
**Category:** Array, Graph, Shortest Path

## Problem

You are given a 2D array `start` where `start = [startX, startY]` represents your starting position, and a 2D array `target` where `target = [targetX, targetY]` represents the target position. You are also given a 2D integer array `specialRoads` where `specialRoads[i] = [x1i, y1i, x2i, y2i, costi]` indicates that there is a special road going from `(x1i, y1i)` to `(x2i, y2i)` with a cost of `costi`.

You can travel anywhere using the Manhattan distance at a cost of `|x1 - x2| + |y1 - y2|` per unit, or use any of the special roads at their specified cost.

Return the minimum cost required to travel from `start` to `target`.

### Example

```
Input: start = [1,1], target = [4,5], specialRoads = [[1,2,3,3,2],[3,4,4,5,1]]
Output: 5
Explanation: The optimal path is: (1,1) -> (1,2) [cost 1] -> (3,3) [special road, cost 2] -> (3,4) [cost 1] -> (4,5) [special road, cost 1].
Total cost = 5.
```

## Approach

Use Dijkstra's algorithm treating each special road endpoint and the start/target as nodes. For each node, consider direct Manhattan distance to all other nodes and special road costs. Build a graph and find the shortest path from start to target.

## C# Solution

```csharp
public class Solution
{
    public int MinimumCost(int[] start, int[] target, int[][] specialRoads)
    {
        var points = new HashSet<(int, int)>();
        points.Add((start[0], start[1]));
        points.Add((target[0], target[1]));
        
        foreach (var road in specialRoads)
        {
            points.Add((road[0], road[1]));
            points.Add((road[2], road[3]));
        }
        
        var dist = new Dictionary<(int, int), int>();
        var pq = new PriorityQueue<(int, int), int>();
        
        var startPoint = (start[0], start[1]);
        dist[startPoint] = 0;
        pq.Enqueue(startPoint, 0);
        
        while (pq.Count > 0)
        {
            var (x, y) = pq.Dequeue();
            int currDist = dist[(x, y)];
            
            foreach (var (nx, ny) in points)
            {
                if ((nx, ny) == (x, y))
                    continue;
                
                int manhattanCost = Math.Abs(nx - x) + Math.Abs(ny - y);
                int newDist = currDist + manhattanCost;
                
                foreach (var road in specialRoads)
                {
                    if (road[0] == x && road[1] == y && road[2] == nx && road[3] == ny)
                    {
                        newDist = Math.Min(newDist, currDist + road[4]);
                    }
                }
                
                if (!dist.ContainsKey((nx, ny)) || newDist < dist[(nx, ny)])
                {
                    dist[(nx, ny)] = newDist;
                    pq.Enqueue((nx, ny), newDist);
                }
            }
        }
        
        return dist.GetValueOrDefault((target[0], target[1]), Math.Abs(target[0] - start[0]) + Math.Abs(target[1] - start[1]));
    }
}
```

## Complexity

- **Time:** O((V + E) log V) — Dijkstra's algorithm where V is the number of unique points
- **Space:** O(V) — for distance map and priority queue
