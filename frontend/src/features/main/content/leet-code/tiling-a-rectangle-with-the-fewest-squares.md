# 1240. Tiling a Rectangle with the Fewest Squares

**Difficulty:** Hard
**Category:** Dynamic Programming, Backtracking

## Problem

Given a rectangle of size `n x m`, tile it completely using integer-sided squares, using as few squares as possible. Return the minimum number of squares needed.

### Example

```
Input: n = 2, m = 3
Output: 3
```

## Approach

Track the height already filled in each of the `m` columns (a "skyline"). Repeatedly find the shortest column(s) — the leftmost gap that needs filling — and try placing the largest possible square there first (bounded by both the remaining height and the width of the contiguous shortest-column region), then recursively try progressively smaller squares, backtracking after each attempt. Prune branches whose square count already meets or exceeds the best solution found so far. When every column reaches height `n`, the current square count is a candidate answer.

## C# Solution

```csharp
public class Solution
{
    private int n, m, best;
    private int[] heights = null!;

    public int TilingRectangle(int n, int m)
    {
        this.n = n;
        this.m = m;
        best = n * m;
        heights = new int[m];
        Dfs(0);
        return best;
    }

    private void Dfs(int count)
    {
        if (count >= best) return;

        int minHeight = heights.Min();
        if (minHeight == n)
        {
            best = count;
            return;
        }

        int start = Array.IndexOf(heights, minHeight);
        int end = start;
        while (end < m && heights[end] == minHeight) end++;

        int maxSquare = Math.Min(end - start, n - minHeight);

        for (int size = maxSquare; size >= 1; size--)
        {
            for (int i = start; i < start + size; i++) heights[i] += size;
            Dfs(count + 1);
            for (int i = start; i < start + size; i++) heights[i] -= size;
        }
    }
}
```

## Complexity

- **Time:** Exponential in the worst case, kept practical by pruning and the small constraints (`n, m <= 13`).
- **Space:** `O(m)` for the skyline array plus recursion depth.
