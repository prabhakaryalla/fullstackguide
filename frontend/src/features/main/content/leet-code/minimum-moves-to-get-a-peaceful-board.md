# 3189. Minimum Moves to Get a Peaceful Board

**Difficulty:** Medium
**Category:** Array, Counting Sort, Greedy, Sorting

## Problem
You have `n` rooks placed on an `n x n` chessboard, one per row and one per column (so the board can be made "peaceful," meaning no two rooks attack each other, by rearranging). Each move slides a rook one square horizontally or vertically. Return the minimum total number of moves needed to reach a configuration where every row and every column contains exactly one rook.

## Approach
Since there are exactly `n` rooks and `n` rows/columns, a peaceful configuration requires assigning each rook to a distinct target row and a distinct target column. The row and column dimensions can be optimized independently: sort the rooks by their row coordinate, and match the `i`-th smallest row coordinate to target row `i` (0-indexed), summing the absolute differences; do the same independently for column coordinates. Since row and column moves don't interfere on this sorted matching (a classic median/assignment argument for 1D optimal matching), summing the two independent totals gives the overall minimum number of moves.

## C# Solution
```csharp
public class Solution {
    public int MinMoves(int[][] rooks) {
        int n = rooks.Length;
        int ans = 0;

        int[] rows = new int[n];
        int[] cols = new int[n];
        for (int i = 0; i < n; i++) {
            rows[i] = rooks[i][0];
            cols[i] = rooks[i][1];
        }

        Array.Sort(rows);
        Array.Sort(cols);

        for (int i = 0; i < n; i++) {
            ans += Math.Abs(rows[i] - i);
            ans += Math.Abs(cols[i] - i);
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n log n)
- Space: O(n)
