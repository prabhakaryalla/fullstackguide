# 2093. Minimum Cost to Reach City With Discounts

**Difficulty:** Medium
**Category:** Graph, Heap (Priority Queue), Shortest Path
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

There are `n` cities connected by a list of `highways`, where `highways[i] = [city1, city2, toll]` is a bidirectional road with the given toll cost. You start at city `0` and want to reach city `n - 1` for the minimum total cost. You may use at most `discounts` discount coupons; applying a coupon to any single highway traversal halves that highway's toll for that trip (integer division), and each highway usage can use at most one coupon. Return the minimum cost to reach city `n - 1`, or `-1` if unreachable.

### Example

`n = 5, highways = [[0,1,4],[1,2,4],[2,3,7],[3,4,15]], discounts = 2` → using discounts on the two 4-cost edges plus paying full for the rest gives a lower total cost than not discounting.

## Approach

Run a modified Dijkstra where each state is `(city, discountsRemaining)`. From each state, relax every incident edge twice: once at full cost with the same `discountsRemaining`, and once (if `discountsRemaining > 0`) at half cost with `discountsRemaining - 1`. Use a min-heap ordered by accumulated distance, and track the best (maximum) `discountsRemaining` already finalized for each city to prune dominated states — if a city has already been finalized with at least as many discounts remaining, a new pop for that city with fewer or equal remaining discounts can be skipped.

## C# Solution

```csharp
public class Solution 
{
    public int MinimumCost(int n, int[][] highways, int discounts) 
    {
        var graph = new List<(int to, int toll)>[n];
        for (int i = 0; i < n; i++)
            graph[i] = new List<(int, int)>();

        foreach (var h in highways)
        {
            graph[h[0]].Add((h[1], h[2]));
            graph[h[1]].Add((h[0], h[2]));
        }

        var minHeap = new PriorityQueue<(int city, long dist, int leftDiscounts), long>();
        var minDiscounts = new Dictionary<int, int>();
        minHeap.Enqueue((0, 0, discounts), 0);

        while (minHeap.Count > 0)
        {
            var (u, d, leftDiscounts) = minHeap.Dequeue();
            if (u == n - 1)
                return (int)d;
            if (minDiscounts.TryGetValue(u, out int seen) && seen >= leftDiscounts)
                continue;
            minDiscounts[u] = leftDiscounts;

            foreach (var (v, w) in graph[u])
            {
                minHeap.Enqueue((v, d + w, leftDiscounts), d + w);
                if (leftDiscounts > 0)
                    minHeap.Enqueue((v, d + w / 2, leftDiscounts - 1), d + w / 2);
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** O(|E| * discounts * log(|E| * discounts))
- **Space:** O(|E| * discounts)
