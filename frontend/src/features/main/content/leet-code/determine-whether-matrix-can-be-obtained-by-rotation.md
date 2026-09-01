# 1886. Determine Whether Matrix Can Be Obtained By Rotation

**Difficulty:** Easy
**Category:** Array, Matrix, Simulation

## Problem

Given two `n x n` binary matrices `mat` and `target`, return whether `mat` can be transformed into `target` by rotating it `0`, `90`, `180`, or `270` degrees.

### Example

```
Input: mat = [[0,1],[1,0]], target = [[1,0],[0,1]]
Output: false
```

## Approach

Try all four rotation states: compare `mat` to `target` directly, then repeatedly rotate `mat` 90 degrees clockwise (`result[j][n-1-i] = mat[i][j]`) and compare again, up to three times.

## C# Solution

```csharp
public class Solution
{
    public bool FindRotation(int[][] mat, int[][] target)
    {
        for (int rotation = 0; rotation < 4; rotation++)
        {
            if (Matches(mat, target)) return true;
            mat = Rotate(mat);
        }
        return false;
    }

    private bool Matches(int[][] a, int[][] b)
    {
        for (int i = 0; i < a.Length; i++)
        {
            for (int j = 0; j < a[0].Length; j++)
            {
                if (a[i][j] != b[i][j]) return false;
            }
        }
        return true;
    }

    private int[][] Rotate(int[][] mat)
    {
        int n = mat.Length;
        var result = new int[n][];
        for (int i = 0; i < n; i++) result[i] = new int[n];

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                result[j][n - 1 - i] = mat[i][j];
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n^2)` for the (at most 4) comparisons and rotations.
- **Space:** `O(n^2)` for the rotated copies.
