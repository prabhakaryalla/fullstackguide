# 909. Snakes and Ladders

**Difficulty:** Medium
**Category:** Array, Breadth-First Search, Matrix

## Problem

Given an `n x n` board numbered in a boustrophedon (back-and-forth) pattern from `1` at the bottom-left to `n^2` at the top, where some cells contain a "snake or ladder" destination (`board[r][c] != -1`), return the minimum number of dice rolls (1-6) to move from square `1` to square `n^2`, or `-1` if it's not possible.

### Example

```
Input: board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]
Output: 4
```

## Approach

Flatten the boustrophedon board into a 1-indexed array of `n^2` squares. Run a breadth-first search from square `1`: from each square, try the next 1-6 squares, following any snake/ladder jump immediately, and record the first time each square is reached — that's its shortest distance.

## C# Solution

```csharp
public class Solution
{
    public int SnakesAndLadders(int[][] board)
    {
        int n = board.Length;
        var flat = new int[n * n + 1];
        int idx = 1;
        bool leftToRight = true;

        for (int r = n - 1; r >= 0; r--)
        {
            if (leftToRight)
            {
                for (int c = 0; c < n; c++) flat[idx++] = board[r][c];
            }
            else
            {
                for (int c = n - 1; c >= 0; c--) flat[idx++] = board[r][c];
            }
            leftToRight = !leftToRight;
        }

        var dist = new int[n * n + 1];
        Array.Fill(dist, -1);
        dist[1] = 0;

        var queue = new Queue<int>();
        queue.Enqueue(1);

        while (queue.Count > 0)
        {
            int cur = queue.Dequeue();
            if (cur == n * n) return dist[cur];

            for (int next = cur + 1; next <= Math.Min(cur + 6, n * n); next++)
            {
                int dest = flat[next] == -1 ? next : flat[next];
                if (dist[dest] == -1)
                {
                    dist[dest] = dist[cur] + 1;
                    queue.Enqueue(dest);
                }
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)`.
