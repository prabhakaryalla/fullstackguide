# 1181. Before and After Puzzle

**Difficulty:** Medium
**Category:** Array, Hash Table, String

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a list of `phrases`, find every "before and after" puzzle: for two different phrases where the last word of one exactly matches the first word of another, merge them into a single phrase sharing that overlapping word once. Return all distinct results sorted lexicographically.

### Example

```
Input: phrases = ["writing code","code rocks"]
Output: ["writing code rocks"]
```

## Approach

Precompute the first and last word of every phrase. Then check every ordered pair `(i, j)` with `i != j`: if phrase `i`'s last word equals phrase `j`'s first word, concatenate phrase `i` with phrase `j` minus its duplicated leading word. Collect all such merges into a sorted set to automatically deduplicate and order the results.

## C# Solution

```csharp
public class Solution
{
    public IList<string> BeforeAndAfterPuzzles(string[] phrases)
    {
        int n = phrases.Length;
        var firstWord = new string[n];
        var lastWord = new string[n];

        for (int i = 0; i < n; i++)
        {
            var words = phrases[i].Split(' ');
            firstWord[i] = words[0];
            lastWord[i] = words[^1];
        }

        var result = new SortedSet<string>();

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (i != j && lastWord[i] == firstWord[j])
                {
                    string merged = phrases[i] + phrases[j].Substring(firstWord[j].Length);
                    result.Add(merged);
                }
            }
        }

        return result.ToList();
    }
}
```

## Complexity

- **Time:** `O(n^2 · L)`, where `L` is the average phrase length.
- **Space:** `O(n^2 · L)` for the result set.
