# 1284. Minimum Number of Flips to Convert Binary Matrix to Zero Matrix

**Difficulty:** Hard
**Category:** Array, Breadth-First Search, Bit Manipulation, Matrix

## Problem

Given a small binary matrix `mat`, one "flip" toggles a cell and all of its orthogonal neighbors (up, down, left, right). Return the minimum number of flips needed to turn the entire matrix to all zeros, or `-1` if impossible.

### Example

```
Input: mat = [[0,0],[0,1]]
Output: 3
```

## Approach

Since the matrix is small (at most 15 cells given the constraints), encode the entire grid as a single integer bitmask and treat each distinct mask as a graph node. Run a breadth-first search from the starting mask, where each move XORs the bits corresponding to a chosen cell and its neighbors (flipping them); stop as soon as the all-zero mask (`0`) is reached, since BFS guarantees this happens in the minimum number of flips.

## C# Solution

```csharp
public class Solution
{
    public int MinFlips(int[][] mat)
    {
        int rows = mat.Length, cols = mat[0].Length;
        int start = 0;

        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                if (mat[r][c] == 1)
                    start |= 1 << (r * cols + c);

        if (start == 0) return 0;

        var visited = new HashSet<int> { start };
        var queue = new Queue<(int Mask, int Flips)>();
        queue.Enqueue((start, 0));

        while (queue.Count > 0)
        {
            var (mask, flips) = queue.Dequeue();

            for (int r = 0; r < rows; r++)
            {
                for (int c = 0; c < cols; c++)
                {
                    int next = Flip(mask, r, c, rows, cols);
                    if (next == 0) return flips + 1;

                    if (visited.Add(next))
                        queue.Enqueue((next, flips + 1));
                }
            }
        }

        return -1;
    }

    private int Flip(int mask, int r, int c, int rows, int cols)
    {
        int result = mask ^ (1 << (r * cols + c));

        if (r > 0) result ^= 1 << ((r - 1) * cols + c);
        if (r < rows - 1) result ^= 1 << ((r + 1) * cols + c);
        if (c > 0) result ^= 1 << (r * cols + c - 1);
        if (c < cols - 1) result ^= 1 << (r * cols + c + 1);

        return result;
    }
}
```

## Complexity

- **Time:** `O(2^(rows*cols) * rows * cols)`.
- **Space:** `O(2^(rows*cols))` for the visited set.
