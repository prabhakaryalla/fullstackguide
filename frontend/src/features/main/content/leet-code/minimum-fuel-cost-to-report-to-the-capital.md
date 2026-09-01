# 2477. Minimum Fuel Cost to Report to the Capital

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Graph

## Problem

There is a tree of `n` cities with city 0 as the capital. Each car can hold `seats` passengers. Representatives from each city travel to the capital. Cars can pick up passengers along the way.

Return the minimum fuel cost (number of liters) to bring all representatives to the capital, where each car consumes 1 liter per road.

### Example

```
Input: roads = [[0,1],[0,2],[0,3]], seats = 5
Output: 3
Explanation: 3 cars needed (one from each of cities 1, 2, 3), each uses 1 liter.
```

## Approach

Use DFS from the capital. For each subtree, calculate how many representatives are in it. The number of cars needed from a subtree is `ceil(representatives / seats)`. Sum the fuel cost for all edges.

The key insight: at each edge, we need `ceil(passengers / seats)` cars to transport all passengers from that subtree toward the capital.

## C# Solution

```csharp
public class Solution
{
    private long totalFuel = 0;
    
    public long MinimumFuelCost(int[][] roads, int seats)
    {
        int n = roads.Length + 1;
        var graph = new List<int>[n];
        for (int i = 0; i < n; i++) graph[i] = new List<int>();
        
        foreach (var road in roads)
        {
            graph[road[0]].Add(road[1]);
            graph[road[1]].Add(road[0]);
        }
        
        DFS(0, -1, graph, seats);
        return totalFuel;
    }
    
    private long DFS(int node, int parent, List<int>[] graph, int seats)
    {
        long passengers = 1; // The representative from this city
        
        foreach (int child in graph[node])
        {
            if (child == parent) continue;
            
            long childPassengers = DFS(child, node, graph, seats);
            passengers += childPassengers;
            
            // Cars needed to bring childPassengers from child to node
            long carsNeeded = (childPassengers + seats - 1) / seats;
            totalFuel += carsNeeded;
        }
        
        return passengers;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of cities
- **Space:** O(n) for the graph and recursion
