# 787. Cheapest Flights Within K Stops

**Difficulty:** Medium
**Category:** Dynamic Programming, Graph, Breadth-First Search, Bellman-Ford, Heap

## Problem

Given `n` cities, a list of directed flights `[from, to, price]`, a source `src`, a destination `dst`, and an integer `k`, return the cheapest price to travel from `src` to `dst` using at most `k` stops (at most `k + 1` flights), or `-1` if not possible.

### Example

```
Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700
```

## Approach

Use a Bellman-Ford-style relaxation limited to `k + 1` rounds (since at most `k` stops means at most `k + 1` edges). Maintain a cost array initialized to infinity except the source. In each round, compute a fresh set of costs based on the previous round's costs (to prevent using more than one edge per round), relaxing every flight edge. After `k + 1` rounds, the destination's cost is the answer.

## C# Solution

```csharp
public class Solution
{
    public int FindCheapestPrice(int n, int[][] flights, int src, int dst, int k)
    {
        var costs = new int[n];
        Array.Fill(costs, int.MaxValue);
        costs[src] = 0;

        for (int i = 0; i <= k; i++)
        {
            var newCosts = (int[])costs.Clone();

            foreach (var flight in flights)
            {
                int from = flight[0], to = flight[1], price = flight[2];

                if (costs[from] == int.MaxValue) continue;

                if (costs[from] + price < newCosts[to])
                    newCosts[to] = costs[from] + price;
            }

            costs = newCosts;
        }

        return costs[dst] == int.MaxValue ? -1 : costs[dst];
    }
}
```

## Complexity

- **Time:** `O(k * E)`.
- **Space:** `O(n)` for the cost arrays.
