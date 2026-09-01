# 2768. Number of Black Blocks

**Difficulty:** Medium
**Category:** Array, Hash Table, Matrix, Enumeration

## Problem

You are given two integers `m` and `n` representing the dimensions of a 0-indexed `m x n` grid, and a 2D array `coordinates` where `coordinates[i] = [x, y]` marks the cell `(x, y)` as black. All other cells are white. A "block" is a 2x2 submatrix. Return an array `arr` of size 5 where `arr[i]` is the number of blocks that contain exactly `i` black cells.

### Example

Input: m = 3, n = 3, coordinates = [[0,0]]
Output: [3,1,0,0,0]
Explanation: There are 4 possible 2x2 blocks. The block with top-left corner (0,0) contains the black cell (0,0), so it has 1 black cell. The other 3 blocks have 0 black cells.

## Approach

Each black cell `(x, y)` can belong to at most 4 different 2x2 blocks, identified by their top-left corner `(x-1, y-1)`, `(x-1, y)`, `(x, y-1)`, `(x, y)` — as long as that corner is within valid bounds (`0 <= r <= m-2`, `0 <= c <= n-2`). Use a hash map keyed by the block's top-left corner to count how many black cells fall into each block. The total number of blocks is `(m-1) * (n-1)`; blocks with 0 black cells are the ones never touched by the map, and the remaining counts are read directly from the map values.

## C# Solution

```csharp
public class Solution 
{
    public long[] CountBlackBlocks(int m, int n, int[][] coordinates) 
    {
        var counts = new Dictionary<long, int>();

        foreach (var cell in coordinates) 
        {
            int x = cell[0], y = cell[1];
            for (int dr = -1; dr <= 0; dr++) 
            {
                for (int dc = -1; dc <= 0; dc++) 
                {
                    int r = x + dr, c = y + dc;
                    if (r < 0 || c < 0 || r > m - 2 || c > n - 2) continue;
                    long key = (long)r * n + c;
                    counts[key] = counts.GetValueOrDefault(key, 0) + 1;
                }
            }
        }

        long totalBlocks = (long)(m - 1) * (n - 1);
        var ans = new long[5];

        foreach (var kvp in counts) ans[kvp.Value]++;
        ans[0] = totalBlocks - counts.Count;

        return ans;
    }
}
```

## Complexity

- **Time:** O(k) where k = coordinates.Length
- **Space:** O(k)
