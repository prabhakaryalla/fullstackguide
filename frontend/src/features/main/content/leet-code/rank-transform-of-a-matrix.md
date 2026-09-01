# 1632. Rank Transform of a Matrix

**Difficulty:** Hard
**Category:** Array, Union Find, Graph, Sorting, Matrix

## Problem

Given an `m x n` integer `matrix`, replace every element with its rank, where rank starts at `1` and rules require: equal elements get equal ranks, and the rank must respect strict ordering along each shared row and column (a larger element must get a strictly larger rank than a smaller element in the same row or column).

### Example

```
Input: matrix = [[1,2],[3,4]]
Output: [[1,2],[2,3]]
```

## Approach

Process distinct values in increasing order. Cells sharing a value that also share a row or column must receive the *same* rank, so union them (row ids and column ids kept in disjoint numeric spaces to avoid collisions) within each value group. For each resulting connected component, its rank is one more than the maximum current rank recorded for any row or column its cells touch. Only after finishing an entire value group are the row/column max-rank trackers updated, ensuring equal values never see each other's just-assigned ranks.

## C# Solution

```csharp
public class Solution
{
    public int[][] MatrixRankTransform(int[][] matrix)
    {
        int rows = matrix.Length;
        int cols = matrix[0].Length;
        int[] rowMax = new int[rows];
        int[] colMax = new int[cols];
        int[][] result = new int[rows][];

        for (int i = 0; i < rows; i++)
        {
            result[i] = new int[cols];
        }

        var valueGroups = new SortedDictionary<int, List<(int Row, int Col)>>();

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (!valueGroups.TryGetValue(matrix[r][c], out var list))
                {
                    list = new List<(int, int)>();
                    valueGroups[matrix[r][c]] = list;
                }

                list.Add((r, c));
            }
        }

        foreach (var group in valueGroups)
        {
            var cells = group.Value;
            var parent = new Dictionary<int, int>();

            int Find(int x)
            {
                if (!parent.ContainsKey(x))
                {
                    parent[x] = x;
                }

                if (parent[x] != x)
                {
                    parent[x] = Find(parent[x]);
                }

                return parent[x];
            }

            void Union(int a, int b)
            {
                int rootA = Find(a);
                int rootB = Find(b);

                if (rootA != rootB)
                {
                    parent[rootA] = rootB;
                }
            }

            foreach (var (r, c) in cells)
            {
                Union(r, -(c + 1));
            }

            var maxRankByRoot = new Dictionary<int, int>();

            foreach (var (r, c) in cells)
            {
                int root = Find(r);
                int currentMax = Math.Max(rowMax[r], colMax[c]);

                if (!maxRankByRoot.TryGetValue(root, out int existing) || currentMax > existing)
                {
                    maxRankByRoot[root] = currentMax;
                }
            }

            foreach (var (r, c) in cells)
            {
                int root = Find(r);
                int rank = maxRankByRoot[root] + 1;
                result[r][c] = rank;
                rowMax[r] = Math.Max(rowMax[r], rank);
                colMax[c] = Math.Max(colMax[c], rank);
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(rows * cols * log(rows * cols))`.
- **Space:** `O(rows * cols)`.
