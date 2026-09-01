# 1129. Shortest Path with Alternating Colors

**Difficulty:** Medium
**Category:** Breadth-First Search, Graph

## Problem

Given `n` nodes and two lists of directed edges, `redEdges` and `blueEdges`, find, for each node, the length of the shortest path from node `0` that alternates between red and blue edges (starting with either color). Return `-1` for any node that isn't reachable via such an alternating path.

### Example

```
Input: n = 3, redEdges = [[0,1]], blueEdges = [[2,1]]
Output: [0,1,-1]
```

## Approach

Run a BFS over an expanded state space `(node, lastColorUsed)`, seeding the queue with node `0` in both "as if last was red" and "as if last was blue" states at distance `0` (so the very first move can be either color). From each state, only edges of the opposite color to `lastColorUsed` may be taken, flipping the color for the next state. The answer for each node is the minimum distance recorded across its two color-states.

## C# Solution

```csharp
public class Solution
{
    public int[] ShortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges)
    {
        var redAdj = new List<int>[n];
        var blueAdj = new List<int>[n];
        for (int i = 0; i < n; i++)
        {
            redAdj[i] = new List<int>();
            blueAdj[i] = new List<int>();
        }
        foreach (var e in redEdges) redAdj[e[0]].Add(e[1]);
        foreach (var e in blueEdges) blueAdj[e[0]].Add(e[1]);

        int[,] dist = new int[n, 2];
        for (int i = 0; i < n; i++)
        {
            dist[i, 0] = -1;
            dist[i, 1] = -1;
        }
        dist[0, 0] = 0;
        dist[0, 1] = 0;

        var queue = new Queue<(int node, int lastColor)>();
        queue.Enqueue((0, 0));
        queue.Enqueue((0, 1));

        while (queue.Count > 0)
        {
            var (node, lastColor) = queue.Dequeue();
            var neighbors = lastColor == 0 ? blueAdj[node] : redAdj[node];
            int nextColor = lastColor == 0 ? 1 : 0;

            foreach (var next in neighbors)
            {
                if (dist[next, nextColor] == -1)
                {
                    dist[next, nextColor] = dist[node, lastColor] + 1;
                    queue.Enqueue((next, nextColor));
                }
            }
        }

        int[] answer = new int[n];
        for (int i = 0; i < n; i++)
        {
            if (dist[i, 0] == -1 && dist[i, 1] == -1) answer[i] = -1;
            else if (dist[i, 0] == -1) answer[i] = dist[i, 1];
            else if (dist[i, 1] == -1) answer[i] = dist[i, 0];
            else answer[i] = Math.Min(dist[i, 0], dist[i, 1]);
        }

        return answer;
    }
}
```

## Complexity

- **Time:** `O(V + E)`.
- **Space:** `O(V + E)`.
