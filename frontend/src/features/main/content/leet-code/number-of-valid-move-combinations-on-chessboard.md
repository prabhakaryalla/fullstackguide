# 2056. Number of Valid Move Combinations On Chessboard

**Difficulty:** Hard
**Category:** Array, Backtracking, Simulation, Enumeration

## Problem

You are given up to four chess pieces (each a `"rook"`, `"queen"`, or `"bishop"`) on an 8x8 board with their positions. In one "move combination", every piece either stays put or moves any legal distance in one straight/diagonal direction consistent with its type, and **all chosen moves happen simultaneously at the same speed** (one square per unit time). A combination is invalid if any two pieces ever occupy the same square at the same instant during the simultaneous movement. Return *the number of valid move combinations* (including the combination where every piece stays put).

## Approach

For each piece, enumerate every candidate destination: staying in place, plus every reachable square along each of its legal directions (4 directions for a rook, 4 diagonals for a bishop, all 8 for a queen), recording the direction and distance traveled to reach it.

Use backtracking to try every combination (Cartesian product) of one candidate move per piece. For a fully chosen combination, validate it by checking every pair of pieces: for each pair, walk through time steps `t = 0` to `max(distA, distB)`, computing each piece's position at time `t` (it moves one square per unit time toward its destination and then stays there once arrived), and fail if the two pieces ever coincide. Count how many full combinations pass this check.

Because the board is small (8x8) and at most 4 pieces are involved, this brute-force enumeration with pairwise simultaneous-movement validation is efficient enough.

## C# Solution

```csharp
public class Solution
{
    private static readonly (int dr, int dc)[] RookDirs = { (-1, 0), (1, 0), (0, -1), (0, 1) };
    private static readonly (int dr, int dc)[] BishopDirs = { (-1, -1), (-1, 1), (1, -1), (1, 1) };
    private static readonly (int dr, int dc)[] QueenDirs = RookDirs.Concat(BishopDirs).ToArray();

    public int CountCombinations(string[] pieces, int[][] positions)
    {
        int n = pieces.Length;
        var options = new List<(int r, int c, int dr, int dc, int dist)>[n];

        for (int i = 0; i < n; i++)
        {
            var dirs = pieces[i] switch
            {
                "rook" => RookDirs,
                "bishop" => BishopDirs,
                _ => QueenDirs
            };

            var list = new List<(int, int, int, int, int)>
            {
                (positions[i][0], positions[i][1], 0, 0, 0)
            };

            foreach (var (dr, dc) in dirs)
            {
                int r = positions[i][0], c = positions[i][1];
                int dist = 0;
                while (true)
                {
                    r += dr; c += dc; dist++;
                    if (r < 1 || r > 8 || c < 1 || c > 8) break;
                    list.Add((r, c, dr, dc, dist));
                }
            }

            options[i] = list;
        }

        int count = 0;
        var chosen = new (int r, int c, int dr, int dc, int dist)[n];
        Backtrack(0, n, options, chosen, ref count);
        return count;
    }

    private void Backtrack(int idx, int n, List<(int r, int c, int dr, int dc, int dist)>[] options,
        (int r, int c, int dr, int dc, int dist)[] chosen, ref int count)
    {
        if (idx == n)
        {
            if (IsValidCombination(chosen)) count++;
            return;
        }

        foreach (var option in options[idx])
        {
            chosen[idx] = option;
            Backtrack(idx + 1, n, options, chosen, ref count);
        }
    }

    private bool IsValidCombination((int r, int c, int dr, int dc, int dist)[] chosen)
    {
        int n = chosen.Length;
        for (int i = 0; i < n; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                int maxDist = Math.Max(chosen[i].dist, chosen[j].dist);
                for (int t = 0; t <= maxDist; t++)
                {
                    var (ri, ci) = PositionAt(chosen[i], t);
                    var (rj, cj) = PositionAt(chosen[j], t);
                    if (ri == rj && ci == cj) return false;
                }
            }
        }
        return true;
    }

    private (int, int) PositionAt((int r, int c, int dr, int dc, int dist) move, int t)
    {
        int step = Math.Min(t, move.dist);
        int startR = move.r - move.dr * move.dist;
        int startC = move.c - move.dc * move.dist;
        return (startR + move.dr * step, startC + move.dc * step);
    }
}
```

## Complexity

- **Time:** `O(P^k * k^2 * D)`, where `k <= 4` is the number of pieces, `P` is the max number of candidate moves per piece (bounded by board size), and `D <= 7` is the max travel distance.
- **Space:** `O(P * k)` for the candidate move lists.
