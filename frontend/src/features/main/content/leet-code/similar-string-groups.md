# 839. Similar String Groups

**Difficulty:** Hard
**Category:** Array, Hash Table, String, Depth-First Search, Breadth-First Search, Union Find

## Problem

Two strings are similar if they are anagrams of each other and differ in at most 2 positions (or are identical). Given an array of anagram strings `strs`, return the number of groups of similar strings (similarity is transitive within a group).

### Example

```
Input: strs = ["tars","rats","arts","star"]
Output: 2
```

## Approach

Use Union-Find: for every pair of strings, check if they are similar (differing in at most 2 character positions), and if so, union them. The final answer is the number of distinct root components across all strings.

## C# Solution

```csharp
public class Solution
{
    private int[] parent;

    public int NumSimilarGroups(string[] strs)
    {
        int n = strs.Length;
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        for (int i = 0; i < n; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                if (IsSimilar(strs[i], strs[j]))
                    Union(i, j);
            }
        }

        var roots = new HashSet<int>();
        for (int i = 0; i < n; i++)
            roots.Add(Find(i));

        return roots.Count;
    }

    private bool IsSimilar(string a, string b)
    {
        int diffCount = 0;

        for (int i = 0; i < a.Length; i++)
        {
            if (a[i] != b[i])
            {
                diffCount++;
                if (diffCount > 2) return false;
            }
        }

        return true;
    }

    private int Find(int x)
    {
        if (parent[x] != x)
            parent[x] = Find(parent[x]);
        return parent[x];
    }

    private void Union(int a, int b)
    {
        int rootA = Find(a), rootB = Find(b);
        if (rootA != rootB) parent[rootA] = rootB;
    }
}
```

## Complexity

- **Time:** `O(n^2 * L)`, where `L` is the string length.
- **Space:** `O(n)` for the union-find structure.
