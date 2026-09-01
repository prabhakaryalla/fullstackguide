# 737. Sentence Similarity II

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Union Find
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given two sentences (as word arrays) and a list of `similarPairs`, return `true` if the two sentences are similar, where similarity is now transitive (e.g., if `"great"` is similar to `"fine"`, and `"fine"` is similar to `"good"`, then `"great"` and `"good"` are also similar).

### Example

```
Input: sentence1 = ["great"], sentence2 = ["doubleplus","good"], similarPairs = [["great","good"],["fine","good"],["acting","skills"]]
Output: false
```

## Approach

Since similarity is now transitive, use Union-Find: union every pair of words listed as similar into the same connected component. Two sentences are similar exactly when they have equal length and, for every position, either the words are identical or they belong to the same connected component (checked via `Find`).

## C# Solution

```csharp
public class Solution
{
    private Dictionary<string, string> parent = new();

    public bool AreSentencesSimilarTwo(string[] sentence1, string[] sentence2, IList<IList<string>> similarPairs)
    {
        if (sentence1.Length != sentence2.Length) return false;

        foreach (var pair in similarPairs)
        {
            parent.TryAdd(pair[0], pair[0]);
            parent.TryAdd(pair[1], pair[1]);
            Union(pair[0], pair[1]);
        }

        for (int i = 0; i < sentence1.Length; i++)
        {
            var w1 = sentence1[i];
            var w2 = sentence2[i];

            if (w1 == w2) continue;

            if (!parent.ContainsKey(w1) || !parent.ContainsKey(w2)) return false;
            if (Find(w1) != Find(w2)) return false;
        }

        return true;
    }

    private string Find(string x)
    {
        if (parent[x] != x)
            parent[x] = Find(parent[x]);

        return parent[x];
    }

    private void Union(string x, string y)
    {
        string rootX = Find(x), rootY = Find(y);
        if (rootX != rootY)
            parent[rootX] = rootY;
    }
}
```

## Complexity

- **Time:** `O((n + p) * α(p))`, where `p` is the number of similar pairs.
- **Space:** `O(p)` for the union-find structure.
