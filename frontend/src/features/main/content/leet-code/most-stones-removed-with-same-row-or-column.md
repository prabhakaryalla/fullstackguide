# 947. Most Stones Removed with Same Row or Column

**Difficulty:** Medium
**Category:** Union Find, Graph, Depth-First Search

## Problem

Given the positions of stones on a 2D plane, a stone can be removed if it shares a row or column with another stone that hasn't been removed. Return the maximum number of stones that can be removed.

### Example

```
Input: stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
Output: 5
```

## Approach

Stones connected (directly or transitively) by shared rows/columns form one component, and within any component all stones but one can eventually be removed. Union each stone's row and column identifiers (kept in separate namespaces, e.g. by bit-complementing column indices) into a union-find structure, then the answer is `total stones - number of distinct components`.

## C# Solution

```csharp
public class Solution
{
    public int RemoveStones(int[][] stones)
    {
        var parent = new Dictionary<int, int>();

        int Find(int x)
        {
            if (!parent.ContainsKey(x)) parent[x] = x;
            if (parent[x] != x) parent[x] = Find(parent[x]);
            return parent[x];
        }

        void Union(int a, int b) => parent[Find(a)] = Find(b);

        foreach (var s in stones)
        {
            Union(s[0], ~s[1]);
        }

        var roots = new HashSet<int>();
        foreach (var s in stones) roots.Add(Find(s[0]));

        return stones.Length - roots.Count;
    }
}
```

## Complexity

- **Time:** `O(n * alpha(n))`.
- **Space:** `O(n)`.
