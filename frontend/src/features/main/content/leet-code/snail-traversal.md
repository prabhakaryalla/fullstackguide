# 2624. Snail Traversal

**Difficulty:** Medium
**Category:** Array, Matrix, Simulation
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given a flat array `arr` and two dimensions `rowsCount` and `colsCount`, produce a 2D array of shape `rowsCount x colsCount` by filling it with the elements of `arr` in "snail" (clockwise spiral) order: left-to-right across the top row, then top-to-bottom down the right column, then right-to-left across the bottom row, then bottom-to-top up the left column, spiraling inward — repeating until every ring is filled. If `rowsCount * colsCount` does not equal `arr.Length`, an empty array is returned instead.

## Approach
Maintain four shrinking boundaries — `top`, `bottom`, `left`, `right` — and repeatedly walk each edge of the current ring in the snail order (top row left→right, right column top→bottom, bottom row right→left, left column bottom→top), advancing an index into the flat source array. After completing a ring, shrink the boundaries inward and continue until the boundaries cross.

## C# Solution

```csharp
public class Solution
{
    public int[][] SnailTraversal(int[] arr, int rowsCount, int colsCount)
    {
        if (rowsCount * colsCount != arr.Length)
        {
            return Array.Empty<int[]>();
        }

        int[][] result = new int[rowsCount][];
        for (int r = 0; r < rowsCount; r++)
        {
            result[r] = new int[colsCount];
        }

        int top = 0, bottom = rowsCount - 1, left = 0, right = colsCount - 1;
        int idx = 0;

        while (top <= bottom && left <= right)
        {
            for (int c = left; c <= right; c++)
            {
                result[top][c] = arr[idx++];
            }
            top++;

            for (int r = top; r <= bottom; r++)
            {
                result[r][right] = arr[idx++];
            }
            right--;

            if (top <= bottom)
            {
                for (int c = right; c >= left; c--)
                {
                    result[bottom][c] = arr[idx++];
                }
                bottom--;
            }

            if (left <= right)
            {
                for (int r = bottom; r >= top; r--)
                {
                    result[r][left] = arr[idx++];
                }
                left++;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(rowsCount · colsCount).
- **Space:** O(rowsCount · colsCount) for the output (no extra auxiliary space).
