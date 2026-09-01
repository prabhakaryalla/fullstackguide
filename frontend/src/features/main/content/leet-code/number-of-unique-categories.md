# 2782. Number of Unique Categories

**Difficulty:** Medium
**Category:** Union Find, Interactive
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an integer `n` and an object `categoryHandler` of a predefined class `CategoryHandler` that exposes a method `bool HaveSameCategory(int a, int b)`, which returns whether elements `a` and `b` (0-indexed, `0 <= a, b < n`) belong to the same category. Return the number of unique categories among the `n` elements.

### Example

Input: n = 6, categoryHandler groups elements into {0,1,2}, {3,4}, {5}
Output: 3
Explanation: There are three distinct categories.

## Approach

The "same category" relation is an equivalence relation, so it can be discovered with a Union-Find (Disjoint Set Union) structure. For every pair `(i, j)` with `i < j`, query `categoryHandler.HaveSameCategory(i, j)`; if true, union `i` and `j`. After processing all pairs, the number of distinct roots in the DSU equals the number of unique categories.

## C# Solution

```csharp
// CategoryHandler is assumed to be predefined elsewhere with method:
// bool HaveSameCategory(int a, int b)
public class Solution 
{
    private int[] parent;

    public int NumberOfCategories(int n, CategoryHandler categoryHandler) 
    {
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        for (int i = 0; i < n; i++) 
        {
            for (int j = i + 1; j < n; j++) 
            {
                if (categoryHandler.HaveSameCategory(i, j)) Union(i, j);
            }
        }

        var roots = new HashSet<int>();
        for (int i = 0; i < n; i++) roots.Add(Find(i));

        return roots.Count;
    }

    private int Find(int x) 
    {
        if (parent[x] != x) parent[x] = Find(parent[x]);
        return parent[x];
    }

    private void Union(int a, int b) 
    {
        int ra = Find(a), rb = Find(b);
        if (ra != rb) parent[ra] = rb;
    }
}
```

## Complexity

- **Time:** O(n^2 · α(n))
- **Space:** O(n)
