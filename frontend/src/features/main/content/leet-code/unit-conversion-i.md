# 3528. Unit Conversion I

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Array

## Problem

There are `n` units of measurement, numbered `0` to `n - 1`, where unit `0` is the base unit. You are given a 2D array `conversions` of length `n - 1`, where `conversions[i] = [sourceUnit, targetUnit, conversionFactor]` means `1` unit of `sourceUnit` is equal to `conversionFactor` units of `targetUnit`. The given conversions form a tree rooted at unit `0`.

Return an array `answer` of length `n`, where `answer[i]` is the number of `i`-th units equal to a single base unit (unit `0`), taken modulo `10^9 + 7`.

### Example

```
Input: conversions = [[0,1,2],[1,2,3]]
Output: [1,2,6]
Explanation:
- Unit 0 to unit 0: 1 (base case).
- Unit 0 to unit 1: 1 unit of 0 equals 2 units of 1, so answer[1] = 2.
- Unit 0 to unit 2: 1 unit of 1 equals 3 units of 2, so 1 unit of 0 equals 2 * 3 = 6 units of 2.
```

## Approach

Build an adjacency list of the tree using the given directed conversion edges. Starting from the base unit `0` with an accumulated factor of `1`, perform a BFS/DFS: whenever moving from a unit to one of its children through an edge with factor `f`, multiply the parent's accumulated factor by `f` (taking the result modulo `10^9 + 7`) to get the child's accumulated factor. Since the edges always point from an already-resolved ancestor toward its descendants, no division or modular inverse is required.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1_000_000_007;

    public int[] BaseUnitConversions(int[][] conversions) 
    {
        int n = conversions.Length + 1;
        var adj = new List<(int to, long factor)>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<(int, long)>();
        foreach (var c in conversions)
        {
            int source = c[0], target = c[1];
            long factor = c[2];
            adj[source].Add((target, factor));
        }

        var result = new long[n];
        result[0] = 1;
        var visited = new bool[n];
        visited[0] = true;
        var queue = new Queue<int>();
        queue.Enqueue(0);
        while (queue.Count > 0)
        {
            int u = queue.Dequeue();
            foreach (var (to, factor) in adj[u])
            {
                if (!visited[to])
                {
                    visited[to] = true;
                    result[to] = (result[u] * factor) % MOD;
                    queue.Enqueue(to);
                }
            }
        }

        var answer = new int[n];
        for (int i = 0; i < n; i++) answer[i] = (int)result[i];
        return answer;
    }
}
```

## Complexity

- **Time:** O(n), where n is the number of units.
- **Space:** O(n) for the adjacency list and result array.
