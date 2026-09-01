# 1617. Count Subtrees With Max Distance Between Cities

**Difficulty:** Hard
**Category:** Dynamic Programming, Bit Manipulation, Tree, Bitmask, Enumeration

## Problem

Given `n` cities (`1` to `n`) connected as a tree by `edges`, for every `d` from `1` to `n - 1`, count the number of subsets of cities that form a connected subtree whose maximum pairwise distance (diameter) equals `d`.

### Example

```
Input: n = 4, edges = [[1,2],[2,3],[2,4]]
Output: [3,4,0]
```

## Approach

Since `n <= 15`, enumerate every subset (bitmask) of cities with at least two members. For each subset, BFS from an arbitrary member restricted to edges whose both endpoints lie in the subset; if the visited set equals the subset, the induced subgraph is connected. Then find the true diameter with the classic "BFS twice" technique: BFS from any node to find the farthest node, then BFS again from that farthest node — the greatest distance found is the diameter. Increment the result bucket at `diameter - 1`.

## C# Solution

```csharp
public class Solution
{
    public int[] CountSubgraphsForEachDiameter(int n, int[][] edges)
    {
        List<int>[] graph = new List<int>[n + 1];
        for (int i = 1; i <= n; i++)
        {
            graph[i] = new List<int>();
        }

        foreach (var edge in edges)
        {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }

        int[] result = new int[n - 1];

        for (int mask = 1; mask < (1 << n); mask++)
        {
            if (CountBits(mask) < 2)
            {
                continue;
            }

            int first = FirstSetBit(mask);
            int visitedMask = Bfs(first, mask, graph, n, out _);

            if (visitedMask != mask)
            {
                continue;
            }

            Bfs(first, mask, graph, n, out int farthest);
            Bfs(farthest, mask, graph, n, out _, out int diameter);

            if (diameter > 0)
            {
                result[diameter - 1]++;
            }
        }

        return result;
    }

    private int Bfs(int start, int mask, List<int>[] graph, int n, out int farthestNode)
    {
        return Bfs(start, mask, graph, n, out farthestNode, out _);
    }

    private int Bfs(int start, int mask, List<int>[] graph, int n, out int farthestNode, out int maxDist)
    {
        int[] dist = new int[n + 1];
        Array.Fill(dist, -1);
        dist[start] = 0;
        Queue<int> queue = new Queue<int>();
        queue.Enqueue(start);
        int visitedMask = 1 << (start - 1);
        farthestNode = start;
        maxDist = 0;

        while (queue.Count > 0)
        {
            int node = queue.Dequeue();

            foreach (int next in graph[node])
            {
                if (((mask >> (next - 1)) & 1) == 1 && dist[next] == -1)
                {
                    dist[next] = dist[node] + 1;
                    visitedMask |= 1 << (next - 1);

                    if (dist[next] > maxDist)
                    {
                        maxDist = dist[next];
                        farthestNode = next;
                    }

                    queue.Enqueue(next);
                }
            }
        }

        return visitedMask;
    }

    private int CountBits(int mask)
    {
        int count = 0;
        while (mask > 0)
        {
            count += mask & 1;
            mask >>= 1;
        }

        return count;
    }

    private int FirstSetBit(int mask)
    {
        for (int i = 1; i <= 32; i++)
        {
            if (((mask >> (i - 1)) & 1) == 1)
            {
                return i;
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(2^n * n)`.
- **Space:** `O(n)` per BFS.
