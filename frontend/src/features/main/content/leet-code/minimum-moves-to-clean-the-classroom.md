# 3568. Minimum Moves to Clean the Classroom

**Difficulty:** Medium
**Category:** Array, Hash Table, Bit Manipulation, Breadth-First Search, Matrix

## Problem
You are given an `m x n` grid `classroom` where each cell is one of:
- `'S'`: the student's starting position
- `'L'`: litter that must be collected (collecting empties the cell)
- `'R'`: a reset area that restores the student's energy to full (usable any number of times)
- `'X'`: an obstacle that cannot be passed through
- `'.'`: empty space

You are also given an integer `energy`, the student's maximum energy capacity, which they also start with. Each move to an adjacent cell (up, down, left, right) costs 1 unit of energy; if energy reaches 0 the student may only continue if standing on an `'R'` cell, which resets energy back to `energy`. Return the minimum number of moves required to collect all litter, or `-1` if impossible.

**Constraints:**
- `1 <= m, n <= 20`
- `1 <= energy <= 50`
- At most `10` `'L'` cells.

## Approach
Since there are at most 10 litter cells, encode "which litter has been collected so far" as a bitmask (`0` to `2^L - 1`). Perform a BFS/Dijkstra-like search over the state space `(row, col, mask, remainingEnergy)`, where each move to an adjacent non-obstacle cell costs one step and decreases `remainingEnergy` by 1 (only allowed if `remainingEnergy > 0`), except that standing on an `'R'` cell resets `remainingEnergy` back to `energy` immediately upon arrival. Collecting an `'L'` cell updates the mask.

Because higher remaining energy is always at least as good as lower remaining energy for the same `(row, col, mask)`, prune states: track `bestEnergy[row][col][mask]`, the highest energy level previously seen for that combination, and skip any newly generated state whose energy does not exceed it. Explore states in order of increasing steps (BFS layer by layer) so the first time `mask == fullMask` is reached the answer is the current step count.

## C# Solution

```csharp
public class Solution {
    public int MinimumMoves(string[] classroom, int energy) {
        int m = classroom.Length;
        int n = classroom[0].Length;

        int sr = -1, sc = -1;
        var litterIndex = new Dictionary<(int, int), int>();

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                char ch = classroom[r][c];
                if (ch == 'S') { sr = r; sc = c; }
                else if (ch == 'L') litterIndex[(r, c)] = litterIndex.Count;
            }
        }

        int litterCount = litterIndex.Count;
        int fullMask = (1 << litterCount) - 1;
        if (litterCount == 0) return 0;

        int[,,] bestEnergy = new int[m, n, 1 << litterCount];
        for (int r = 0; r < m; r++)
            for (int c = 0; c < n; c++)
                for (int mask = 0; mask <= fullMask; mask++)
                    bestEnergy[r, c, mask] = -1;

        int startMask = litterIndex.TryGetValue((sr, sc), out int li) ? (1 << li) : 0;
        bestEnergy[sr, sc, startMask] = energy;

        var queue = new Queue<(int r, int c, int mask, int e, int steps)>();
        queue.Enqueue((sr, sc, startMask, energy, 0));

        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        while (queue.Count > 0) {
            var (r, c, mask, e, steps) = queue.Dequeue();

            if (mask == fullMask) return steps;
            if (e <= 0) continue;

            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d], nc = c + dc[d];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
                if (classroom[nr][nc] == 'X') continue;

                int ne = e - 1;
                if (classroom[nr][nc] == 'R') ne = energy;

                int nmask = mask;
                if (litterIndex.TryGetValue((nr, nc), out int idx)) nmask |= (1 << idx);

                if (ne > bestEnergy[nr, nc, nmask]) {
                    bestEnergy[nr, nc, nmask] = ne;
                    queue.Enqueue((nr, nc, nmask, ne, steps + 1));
                }
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** O(m · n · 2^L · 4) where L is the number of litter cells (at most 10).
- **Space:** O(m · n · 2^L) for the `bestEnergy` table and BFS queue.
