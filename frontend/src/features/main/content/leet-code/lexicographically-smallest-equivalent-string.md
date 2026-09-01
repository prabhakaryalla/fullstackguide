# 1061. Lexicographically Smallest Equivalent String

**Difficulty:** Medium
**Category:** String, Union Find

## Problem

Given two strings `s1` and `s2` of the same length, characters at matching positions are considered equivalent (and equivalence is transitive). Given a third string `baseStr`, return the lexicographically smallest equivalent string by replacing every character in `baseStr` with the smallest character in its equivalence group.

### Example

```
Input: s1 = "parker", s2 = "morris", baseStr = "parser"
Output: "makkek"
```

## Approach

Treat each of the 26 lowercase letters as a node in a union-find structure. For every position, union `s1[i]` with `s2[i]`, always keeping the alphabetically smaller letter as the representative root of the merged group. Once all unions are processed, replace every character of `baseStr` with the representative (smallest letter) of its group.

## C# Solution

```csharp
public class Solution
{
    private int[] parent = new int[26];

    public string SmallestEquivalentString(string s1, string s2, string baseStr)
    {
        for (int i = 0; i < 26; i++) parent[i] = i;

        for (int i = 0; i < s1.Length; i++)
        {
            Union(s1[i] - 'a', s2[i] - 'a');
        }

        var result = new char[baseStr.Length];
        for (int i = 0; i < baseStr.Length; i++)
        {
            result[i] = (char)('a' + Find(baseStr[i] - 'a'));
        }

        return new string(result);
    }

    private int Find(int x)
    {
        if (parent[x] != x) parent[x] = Find(parent[x]);
        return parent[x];
    }

    private void Union(int x, int y)
    {
        int rootX = Find(x);
        int rootY = Find(y);
        if (rootX == rootY) return;

        if (rootX < rootY) parent[rootY] = rootX;
        else parent[rootX] = rootY;
    }
}
```

## Complexity

- **Time:** `O(s1.Length + baseStr.Length)` with near-constant-time union-find operations.
- **Space:** `O(1)` — a fixed 26-element parent array.
