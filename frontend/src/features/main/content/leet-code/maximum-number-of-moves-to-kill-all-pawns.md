# 3283. Maximum Number of Moves to Kill All Pawns

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bitmask, Breadth-First Search, Game Theory

## Problem
On a `50 x 50` chessboard, a knight starts at position `(kx, ky)`, and there are up to `15` pawns at given positions. Alice and Bob alternately control the knight, starting with Alice; on each turn, the current player moves the knight using standard chess-knight moves, one square-step at a time, until it lands exactly on a pawn's square, which captures that pawn and removes it from the board (the pawn positions never move). The number of individual knight moves used to reach a pawn is added to the running total. Alice plays to **maximize** the total number of moves used across the whole game, while Bob plays to **minimize** it; both play optimally, and the game ends when all pawns are captured. Return the total number of moves made when the game ends.

## Approach
Since the board is small (`50 x 50`) and there are at most `15` pawns, precompute the shortest knight-move distance from the knight's starting square to every pawn, and between every pair of pawns, using a breadth-first search from each of these up to `16` points.

Then solve the game with a bitmask dynamic program: `Solve(mask, last, isAliceTurn)` represents the optimal total number of remaining moves given that `mask` encodes the pawns still on the board, `last` is the pawn (or start) the knight is currently at, and `isAliceTurn` indicates whose move it is. For each remaining pawn, the cost of moving there plus the optimally-played remainder of the game is computed recursively; Alice takes the maximum over her choices, Bob takes the minimum. Memoize on `(mask, last, turn)`.

## C# Solution

```csharp
public class Solution 
{
    private int n;
    private int[][] pawnDist;
    private int[] startDist;
    private Dictionary<long, int> memo;

    public int MaxMoves(int kx, int ky, int[][] positions) 
    {
        n = positions.Length;
        memo = new Dictionary<long, int>();

        startDist = Bfs(kx, ky, positions);
        pawnDist = new int[n][];
        for (int i = 0; i < n; i++) 
        {
            pawnDist[i] = Bfs(positions[i][0], positions[i][1], positions);
        }

        int fullMask = (1 << n) - 1;
        return Solve(fullMask, -1, true);
    }

    // last == -1 means the knight is still at its starting square.
    private int Solve(int mask, int last, bool isAliceTurn) 
    {
        if (mask == 0) 
        {
            return 0;
        }

        long key = (long)mask | ((long)(last + 1) << 15) | (isAliceTurn ? (1L << 20) : 0);
        if (memo.TryGetValue(key, out int cached)) 
        {
            return cached;
        }

        int best = isAliceTurn ? int.MinValue : int.MaxValue;

        for (int next = 0; next < n; next++) 
        {
            if ((mask & (1 << next)) == 0) 
            {
                continue;
            }

            int moveCost = last == -1 ? startDist[next] : pawnDist[last][next];
            int remaining = Solve(mask & ~(1 << next), next, !isAliceTurn);
            int total = moveCost + remaining;

            best = isAliceTurn ? Math.Max(best, total) : Math.Min(best, total);
        }

        memo[key] = best;
        return best;
    }

    private int[] Bfs(int sx, int sy, int[][] positions) 
    {
        int[,] d = new int[50, 50];
        for (int i = 0; i < 50; i++) 
        {
            for (int j = 0; j < 50; j++) 
            {
                d[i, j] = -1;
            }
        }

        d[sx, sy] = 0;
        var q = new Queue<(int x, int y)>();
        q.Enqueue((sx, sy));

        int[] dx = { 1, 1, -1, -1, 2, 2, -2, -2 };
        int[] dy = { 2, -2, 2, -2, 1, -1, 1, -1 };

        while (q.Count > 0) 
        {
            var (x, y) = q.Dequeue();
            for (int k = 0; k < 8; k++) 
            {
                int nx = x + dx[k], ny = y + dy[k];
                if (nx >= 0 && nx < 50 && ny >= 0 && ny < 50 && d[nx, ny] == -1) 
                {
                    d[nx, ny] = d[x, y] + 1;
                    q.Enqueue((nx, ny));
                }
            }
        }

        int[] result = new int[positions.Length];
        for (int i = 0; i < positions.Length; i++) 
        {
            result[i] = d[positions[i][0], positions[i][1]];
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(50^2 * m) for the BFS precomputation plus O(2^m * m^2) for the bitmask DP, where m is the number of pawns (m ≤ 15).
- **Space:** O(50^2) for each BFS grid and O(2^m * m) for the memoization table.
