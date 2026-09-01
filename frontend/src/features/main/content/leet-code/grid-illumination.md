# 1001. Grid Illumination

**Difficulty:** Hard
**Category:** Array, Hash Table

## Problem

There is an `n x n` grid. Each `lamps[i] = [rowi, coli]` turns on every cell in its row, column, and both diagonals. Given `queries`, for each `queries[i] = [rowi, coli]` determine whether that cell is illuminated, then turn off that lamp (if any) along with all lamps adjacent to it (the 8 surrounding cells), before answering the next query.

### Example

```
Input: n = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,0]]
Output: [1,0]
```

## Approach

Track how many lamps contribute to each row, column, diagonal (`row - col`), and anti-diagonal (`row + col`) using hash maps, plus a hash set of active lamp positions. A cell is illuminated if any of its row/column/diagonal/anti-diagonal counts are non-zero. After answering a query, scan the query cell and its 8 neighbors; for any that hold an active lamp, remove it and decrement the corresponding row/column/diagonal counts.

## C# Solution

```csharp
public class Solution
{
    public int[] GridIllumination(int n, int[][] lamps, int[][] queries)
    {
        var lampSet = new HashSet<long>();
        var rows = new Dictionary<int, int>();
        var cols = new Dictionary<int, int>();
        var diag = new Dictionary<int, int>();
        var antiDiag = new Dictionary<int, int>();

        void Increment(Dictionary<int, int> map, int key)
        {
            map.TryGetValue(key, out var count);
            map[key] = count + 1;
        }

        void Decrement(Dictionary<int, int> map, int key)
        {
            if (!map.TryGetValue(key, out var count)) return;
            if (count <= 1) map.Remove(key);
            else map[key] = count - 1;
        }

        foreach (var lamp in lamps)
        {
            int r = lamp[0], c = lamp[1];
            long key = (long)r * n + c;
            if (!lampSet.Add(key)) continue;
            Increment(rows, r);
            Increment(cols, c);
            Increment(diag, r - c);
            Increment(antiDiag, r + c);
        }

        var result = new int[queries.Length];

        for (int i = 0; i < queries.Length; i++)
        {
            int r = queries[i][0], c = queries[i][1];
            bool lit = rows.ContainsKey(r) || cols.ContainsKey(c) || diag.ContainsKey(r - c) || antiDiag.ContainsKey(r + c);
            result[i] = lit ? 1 : 0;

            for (int dr = -1; dr <= 1; dr++)
            {
                for (int dc = -1; dc <= 1; dc++)
                {
                    int nr = r + dr, nc = c + dc;
                    if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;
                    long key = (long)nr * n + nc;
                    if (!lampSet.Remove(key)) continue;
                    Decrement(rows, nr);
                    Decrement(cols, nc);
                    Decrement(diag, nr - nc);
                    Decrement(antiDiag, nr + nc);
                }
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(lamps + queries)` amortized, since each lamp is removed at most once.
- **Space:** `O(lamps)` for the row/column/diagonal maps and lamp set.
