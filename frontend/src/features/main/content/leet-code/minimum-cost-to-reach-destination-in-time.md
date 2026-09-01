# 1928. Minimum Cost to Reach Destination in Time

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Graph, Shortest Path

## Problem

A country has `n` cities connected by bidirectional roads `edges[i] = [xi, yi, timei]`, and passing through city `i` (other than the start) costs `passingFees[i]`. Starting at city `0` you must reach city `n-1` within `maxTime`, and every time you pass through (or start at) a city you pay its fee once per visit. Return the minimum total fee to reach city `n-1` within `maxTime`, or `-1` if impossible.

### Example

```
Input: maxTime = 30, edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], passingFees = [5,1,2,20,20,3]
Output: 11
Explanation: Path 0 -> 1 -> 2 -> 5 costs 10+10+10=30 minutes and fee 5+1+2+3=11.
```

### Constraints

- `1 <= maxTime <= 1000`
- `n == passingFees.length`
- `2 <= n <= 1000`
- `1 <= edges.length <= 10^4`
- `1 <= timei <= 1000`
- `1 <= passingFees[i] <= 10^5`

## Approach

Use dynamic programming over `dp[t][city]` = minimum fee to reach `city` using exactly `t` total time (or at most `t`, tracked incrementally). Process time values `0..maxTime` (or use a Dijkstra-like relaxation ordered by time via a priority queue keyed on `(time, fee)`), relaxing `dp[time + edgeTime][neighbor] = min(dp[time+edgeTime][neighbor], dp[time][city] + passingFees[neighbor])`. Because the state space is `time x city`, process states in increasing time order (e.g., a priority queue ordered by time, or iterate time from 0 to maxTime updating a 2D table) so a city's dp value is finalized before being used to relax later times. The answer is the minimum over all `dp[t][n-1]` for `t <= maxTime`.

## C# Solution

```csharp
public class Solution
{
    public int MinCost(int maxTime, int[][] edges, int[] passingFees)
    {
        int n = passingFees.Length;
        var adj = new List<(int to, int time)>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<(int, int)>();
        foreach (var e in edges)
        {
            adj[e[0]].Add((e[1], e[2]));
            adj[e[1]].Add((e[0], e[2]));
        }

        var dist = new int[n];
        Array.Fill(dist, int.MaxValue);
        dist[0] = 0;

        var pq = new PriorityQueue<(int city, int time, int fee), (int fee, int time)>();
        pq.Enqueue((0, 0, passingFees[0]), (passingFees[0], 0));

        int best = -1;

        while (pq.Count > 0)
        {
            var (city, time, fee) = pq.Dequeue();

            if (time > dist[city]) continue;
            if (city == n - 1)
            {
                best = fee;
                break;
            }

            foreach (var (next, edgeTime) in adj[city])
            {
                int newTime = time + edgeTime;
                if (newTime > maxTime) continue;
                if (newTime <= dist[next] || newTime <= maxTime)
                {
                    if (newTime < dist[next] || dist[next] == int.MaxValue)
                    {
                        dist[next] = newTime;
                    }
                    pq.Enqueue((next, newTime, fee + passingFees[next]), (fee + passingFees[next], newTime));
                }
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(E * maxTime * log(V * maxTime))` in the worst case for the time-augmented Dijkstra-style search.
- **Space:** `O(V * maxTime)` for tracking best times/fees explored.
