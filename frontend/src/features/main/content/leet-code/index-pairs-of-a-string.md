# 1065. Index Pairs of a String

**Difficulty:** Easy
**Category:** Array, String, Trie

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string `text` and an array of strings `words`, return every pair `[i, j]` such that `text[i..j]` (inclusive) exactly matches some word in `words`. Sort the pairs by `i`, then by `j`.

### Example

```
Input: text = "thestoryofleetcodeandme", words = ["story","fleet","leetcode"]
Output: [[3,7],[9,13],[10,17]]
```

## Approach

Since `text` is short, put all words in a hash set for `O(1)` lookup, then enumerate every substring of `text` by its start and end index, checking membership in the set. Because the outer loop iterates `i` in increasing order and the inner loop iterates `j` in increasing order for each `i`, the results come out already sorted correctly.

## C# Solution

```csharp
public class Solution
{
    public int[][] IndexPairs(string text, string[] words)
    {
        var wordSet = new HashSet<string>(words);
        var result = new List<int[]>();

        for (int i = 0; i < text.Length; i++)
        {
            for (int j = i; j < text.Length; j++)
            {
                string substring = text.Substring(i, j - i + 1);
                if (wordSet.Contains(substring))
                {
                    result.Add(new[] { i, j });
                }
            }
        }

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(n^3)` for a text of length `n`, from generating and hashing every substring.
- **Space:** `O(words)` for the hash set, plus output size.
