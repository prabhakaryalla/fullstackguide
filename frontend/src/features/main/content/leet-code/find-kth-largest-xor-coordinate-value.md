# 1738. Find Kth Largest XOR Coordinate Value

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Matrix, Divide and Conquer

## Problem

Given a 2D `matrix`, define the value of coordinate `(a, b)` as the XOR of all `matrix[i][j]` with `0 <= i <= a` and `0 <= j <= b`. Return the `kth` largest coordinate value.

### Example

```
Input: matrix = [[5,2],[1,6]], k = 1
Output: 7
```

## Approach

Compute a 2D prefix-XOR table using the inclusion-exclusion identity `prefix[i][j] = matrix[i-1][j-1] XOR prefix[i-1][j] XOR prefix[i][j-1] XOR prefix[i-1][j-1]`. Collect every computed value, sort them descending, and return the `kth` one.

## C# Solution

```csharp
public class Solution
{
    public int KthLargestValue(int[][] matrix, int k)
    {
        int m = matrix.Length, n = matrix[0].Length;
        int[,] prefix = new int[m + 1, n + 1];
        var values = new List<int>();

        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                prefix[i, j] = matrix[i - 1][j - 1] ^ prefix[i - 1, j] ^ prefix[i, j - 1] ^ prefix[i - 1, j - 1];
                values.Add(prefix[i, j]);
            }
        }

        values.Sort((x, y) => y - x);
        return values[k - 1];
    }
}
```

## Complexity

- **Time:** `O(m * n log(m * n))`.
- **Space:** `O(m * n)`.
