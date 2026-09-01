# 1428. Leftmost Column with at Least a One

**Difficulty:** Medium
**Category:** Array, Binary Search, Matrix, Interactive

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

A row-sorted binary matrix (each row's `1`s come after its `0`s) is hidden behind a `BinaryMatrix` interface exposing `Get(row, col)` and `Dimensions()`. Find the index of the leftmost column containing at least one `1`, using as few `Get` calls as possible; return `-1` if no such column exists.

## Approach

Start at the top-right corner of the matrix. If the current cell is `1`, it's a candidate answer — record its column and move one column to the left (since any `1`s further right can't beat it). If the cell is `0`, that entire row has no `1`s at or before this column, so move down to the next row. This staircase walk visits at most `rows + cols` cells.

## C# Solution

```csharp
/**
 * // This is the BinaryMatrix's API interface.
 * // You should not implement it, or speculate about its implementation
 * interface BinaryMatrix {
 *     public int Get(int row, int col) {}
 *     public IList<int> Dimensions() {}
 * };
 */
public class Solution
{
    public int LeftMostColumnWithOne(BinaryMatrix binaryMatrix)
    {
        var dims = binaryMatrix.Dimensions();
        int rows = dims[0], cols = dims[1];

        int row = 0, col = cols - 1;
        int result = -1;

        while (row < rows && col >= 0)
        {
            if (binaryMatrix.Get(row, col) == 1)
            {
                result = col;
                col--;
            }
            else
            {
                row++;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(rows + cols)` API calls.
- **Space:** `O(1)`.
