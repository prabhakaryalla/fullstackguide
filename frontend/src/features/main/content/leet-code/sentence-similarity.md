# 734. Sentence Similarity

**Difficulty:** Easy
**Category:** Array, Hash Table, String
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given two sentences (as word arrays) and a list of `similarPairs`, return `true` if the two sentences are similar — same length, and each corresponding pair of words is either identical or listed as similar (directly, not transitively).

### Example

```
Input: sentence1 = ["great","acting","skills"], sentence2 = ["fine","drama","talent"], similarPairs = [["great","fine"],["drama","acting"],["skills","talent"]]
Output: true
```

## Approach

If the sentences differ in length, they can't be similar. Otherwise, store every similar pair (in both directions) in a hash set for O(1) lookup. For each word position, the sentences are compatible if the words are identical or the pair appears in the similarity set.

## C# Solution

```csharp
public class Solution
{
    public bool AreSentencesSimilar(string[] sentence1, string[] sentence2, IList<IList<string>> similarPairs)
    {
        if (sentence1.Length != sentence2.Length) return false;

        var similarSet = new HashSet<(string, string)>();
        foreach (var pair in similarPairs)
        {
            similarSet.Add((pair[0], pair[1]));
            similarSet.Add((pair[1], pair[0]));
        }

        for (int i = 0; i < sentence1.Length; i++)
        {
            if (sentence1[i] == sentence2[i]) continue;
            if (!similarSet.Contains((sentence1[i], sentence2[i]))) return false;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n + p)`, where `p` is the number of similar pairs.
- **Space:** `O(p)` for the similarity set.
