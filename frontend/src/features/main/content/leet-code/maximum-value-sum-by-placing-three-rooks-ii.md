# 3257. Maximum Value Sum by Placing Three Rooks II

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Enumeration, Matrix

## Problem
This is the larger-constraints version of "Maximum Value Sum by Placing Three Rooks I": given an `m x n` grid of integer values, place exactly 3 rooks such that no two share a row or column, maximizing the sum of their values, now for a much larger grid.

## Approach
The identical top-3-per-row/column reduction technique from the smaller-constraints version applies directly and already runs efficiently at O(m*n): collect each row's top 3 values with positions and each column's top 3 values with positions, take the intersection of these two candidate sets, keep only the overall top 9 values among that intersection, and brute-force check all combinations of 3 from these 9 candidates that don't share a row or column.

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
