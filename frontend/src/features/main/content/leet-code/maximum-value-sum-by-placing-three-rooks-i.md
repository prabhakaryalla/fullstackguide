# 3256. Maximum Value Sum by Placing Three Rooks I

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Enumeration, Matrix

## Problem
Given an `m x n` grid of integer values, place exactly 3 rooks on the grid such that no two rooks share the same row or column, maximizing the sum of the values at their positions. Return the maximum achievable sum.

## Approach
Since only 9 candidate positions are ever needed to guarantee an optimal placement (a known result: it suffices to consider the top-3 highest-valued cells per row combined with the top-3 highest-valued cells per column), collect the top 3 values (with their positions) for every row and every column into two separate sets. Take the intersection of these two collections of candidate positions (cells appearing in both a row's top-3 and a column's top-3), keep only the top 9 highest-valued cells among that intersection, and then brute-force check every combination of 3 distinct cells from these 9 candidates that don't share a row or column, tracking the maximum sum found.

## C# Solution
```csharp
public class Solution {
    public long MaximumValueSum(int[][] board) {
        int m = board.Length;
        int n = board[0].Length;
        long ans = long.MinValue;

        var rows = new List<(long val, int i, int j)>[m];
        var cols = new List<(long val, int i, int j)>[n];
        for (int i = 0; i < m; i++) rows[i] = new List<(long, int, int)>();
        for (int j = 0; j < n; j++) cols[j] = new List<(long, int, int)>();

        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) {
                rows[i].Add((board[i][j], i, j));
                cols[j].Add((board[i][j], i, j));
            }

        var candidateSet = new HashSet<(long, int, int)>();
        var colTopSet = new HashSet<(long, int, int)>();

        foreach (var row in rows) {
            row.Sort((a, b) => b.val.CompareTo(a.val));
            for (int i = 0; i < Math.Min(3, row.Count); i++)
                candidateSet.Add(row[i]);
        }

        foreach (var col in cols) {
            col.Sort((a, b) => b.val.CompareTo(a.val));
            for (int i = 0; i < Math.Min(3, col.Count); i++)
                colTopSet.Add(col[i]);
        }

        candidateSet.IntersectWith(colTopSet);
        var topNine = candidateSet.OrderByDescending(t => t.Item1).Take(9).ToList();

        for (int a = 0; a < topNine.Count; a++)
            for (int b = a + 1; b < topNine.Count; b++)
                for (int c = b + 1; c < topNine.Count; c++) {
                    var (val1, i1, j1) = topNine[a];
                    var (val2, i2, j2) = topNine[b];
                    var (val3, i3, j3) = topNine[c];
                    if (i1 == i2 || i1 == i3 || i2 == i3 || j1 == j2 || j1 == j3 || j2 == j3)
                        continue;
                    ans = Math.Max(ans, val1 + val2 + val3);
                }

        return ans;
    }
}
```

## Complexity
- Time: O(m * n)
- Space: O(m + n)
