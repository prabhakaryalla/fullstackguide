# 547. Number of Provinces

**Difficulty:** Medium
**Category:** Depth-First Search, Breadth-First Search, Union Find, Graph

## Problem

Given an `n x n` adjacency matrix `isConnected` where `isConnected[i][j] == 1` means city `i` and city `j` are directly connected, return the total number of provinces — groups of directly or indirectly connected cities.

### Example

```
Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
```

### Constraints

- `1 <= n <= 200`
- `isConnected[i][j]` is `1` or `0`.
- `isConnected[i][i] == 1`

## Approach

Treat the matrix as an adjacency list for an undirected graph. For every unvisited city, start a depth-first search that marks every city reachable from it as visited, counting this as one new province; repeat until every city has been visited.

## C# Solution

```csharp
public class Solution
{
    public int FindCircleNum(int[][] isConnected)
    {
        int n = isConnected.Length;
        var visited = new bool[n];
        int provinces = 0;

        for (int i = 0; i < n; i++)
        {
            if (visited[i]) continue;

            provinces++;
            Dfs(isConnected, i, visited);
        }

        return provinces;
    }

    private void Dfs(int[][] isConnected, int city, bool[] visited)
    {
        visited[city] = true;

        for (int neighbor = 0; neighbor < isConnected.Length; neighbor++)
        {
            if (isConnected[city][neighbor] == 1 && !visited[neighbor])
                Dfs(isConnected, neighbor, visited);
        }
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)` for the visited array and recursion stack.
