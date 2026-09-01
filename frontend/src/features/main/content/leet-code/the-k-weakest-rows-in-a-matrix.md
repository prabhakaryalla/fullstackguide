# 1337. The K Weakest Rows in a Matrix

**Difficulty:** Easy
**Category:** Array, Binary Search, Matrix, Sorting, Heap (Priority Queue)

## Problem

Given a binary matrix `mat` where each row's `1`s (soldiers) are grouped to the left, return the indices of the `k` weakest rows, ordered from weakest to strongest (fewer soldiers is weaker; ties favor the smaller row index).

### Example

```
Input: mat = [[1,1,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,0,0,0],[1,1,1,1,1]], k = 3
Output: [2,0,3]
```

## Approach

Count the number of soldiers in each row, then sort the row indices by soldier count ascending, breaking ties by row index ascending, and take the first `k`.

## C# Solution

```csharp
public class Solution
{
    public int[] KWeakestRows(int[][] mat, int k)
    {
        int m = mat.Length;
        var strength = new (int count, int index)[m];

        for (int i = 0; i < m; i++)
        {
            strength[i] = (mat[i].Sum(), i);
        }

        Array.Sort(strength, (a, b) => a.count != b.count ? a.count - b.count : a.index - b.index);

        var result = new int[k];
        for (int i = 0; i < k; i++) result[i] = strength[i].index;

        return result;
    }
}
```

## Complexity

- **Time:** `O(m * n + m log m)`.
- **Space:** `O(m)` for the strength array.
