# 864. Shortest Path to Get All Keys

**Difficulty:** Hard
**Category:** Bit Manipulation, Array, Breadth-First Search, Matrix

## Problem

Given a grid representing a maze with walls (`#`), a starting position (`@`), keys (lowercase letters), and locks (matching uppercase letters, only passable once you have the corresponding key), return the minimum number of moves to collect all keys, or `-1` if impossible.

### Example

```
Input: grid = ["@.a.#","###.#","b.A.B"]
Output: 8
```

## Approach

Perform a BFS over states of `(row, column, collectedKeysBitmask)`. From each state, try moving in all 4 directions; skip walls and locks whose corresponding key bit isn't yet set. Moving onto a key cell updates the bitmask to include that key. Track visited states as `(row, column, bitmask)` triples to avoid revisiting equivalent states, and return the BFS depth the first time the bitmask includes every key.

## C# Solution

```csharp
public class Solution
{
    public int ShortestPathAllKeys(string[] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        int startR = 0, startC = 0, allKeys = 0;

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                char cell = grid[r][c];
                if (cell == '@') { startR = r; startC = c; }
                else if (cell >= 'a' && cell <= 'f') allKeys |= 1 << (cell - 'a');
            }
        }

        var visited = new HashSet<(int, int, int)>();
        var queue = new Queue<(int R, int C, int Keys, int Dist)>();
        queue.Enqueue((startR, startC, 0, 0));
        visited.Add((startR, startC, 0));

        int[][] directions = { new[] { 1, 0 }, new[] { -1, 0 }, new[] { 0, 1 }, new[] { 0, -1 } };

        while (queue.Count > 0)
        {
            var (r, c, keys, dist) = queue.Dequeue();

            if (keys == allKeys) return dist;

            foreach (var dir in directions)
            {
                int nr = r + dir[0], nc = c + dir[1];
                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

                char cell = grid[nr][nc];
                if (cell == '#') continue;

                int newKeys = keys;

                if (cell >= 'A' && cell <= 'F')
                {
                    int lockBit = 1 << (cell - 'A');
                    if ((keys & lockBit) == 0) continue;
                }
                else if (cell >= 'a' && cell <= 'f')
                {
                    newKeys |= 1 << (cell - 'a');
                }

                if (visited.Add((nr, nc, newKeys)))
                    queue.Enqueue((nr, nc, newKeys, dist + 1));
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(rows * cols * 2^k)`, where `k` is the number of keys.
- **Space:** `O(rows * cols * 2^k)` for the visited set.
