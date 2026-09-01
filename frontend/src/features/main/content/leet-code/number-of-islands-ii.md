# 305. Number of Islands II

**Difficulty:** Hard
**Category:** Union Find, Array
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `m x n` binary grid initially entirely water, and a list of `positions` where land is added one cell at a time, return an array where each entry is the number of islands after the corresponding land addition.

### Example

```
Input: m = 3, n = 3, positions = [[0,0],[0,1],[1,2],[2,1]]
Output: [1,1,2,3]
```

### Constraints

- `1 <= m, n, positions.length <= 10^4`
- `positions[i].length == 2`

## Approach

Use a Union-Find (disjoint set) structure over the flattened grid indices. Each time land is added, treat it as its own new island, then check its four neighbors: if a neighbor is already land, union the two components (decrementing the island count only when they were previously separate). If the cell was already land (duplicate position), simply report the current count unchanged.

## C# Solution

```csharp
public class Solution
{
    private int[] parent;
    private int[] rank_;
    private int count;

    public IList<int> NumIslands2(int m, int n, int[][] positions)
    {
        parent = new int[m * n];
        rank_ = new int[m * n];
        Array.Fill(parent, -1);

        var result = new List<int>();
        int[][] directions = { new[] { 1, 0 }, new[] { -1, 0 }, new[] { 0, 1 }, new[] { 0, -1 } };

        foreach (var pos in positions)
        {
            int row = pos[0], col = pos[1];
            int index = row * n + col;

            if (parent[index] != -1)
            {
                result.Add(count);
                continue;
            }

            parent[index] = index;
            count++;

            foreach (var dir in directions)
            {
                int nr = row + dir[0], nc = col + dir[1];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;

                int neighborIndex = nr * n + nc;
                if (parent[neighborIndex] == -1) continue;

                int root1 = Find(index);
                int root2 = Find(neighborIndex);

                if (root1 != root2)
                {
                    Union(root1, root2);
                    count--;
                }
            }

            result.Add(count);
        }

        return result;
    }

    private int Find(int x)
    {
        if (parent[x] != x)
            parent[x] = Find(parent[x]);

        return parent[x];
    }

    private void Union(int x, int y)
    {
        if (rank_[x] < rank_[y])
        {
            parent[x] = y;
        }
        else if (rank_[x] > rank_[y])
        {
            parent[y] = x;
        }
        else
        {
            parent[y] = x;
            rank_[x]++;
        }
    }
}
```

## Complexity

- **Time:** `O(k * α(mn))`, where `k` is the number of positions and `α` is the inverse Ackermann function.
- **Space:** `O(mn)` for the union-find arrays.
