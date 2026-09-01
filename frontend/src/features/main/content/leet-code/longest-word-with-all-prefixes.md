# 1858. Longest Word With All Prefixes

**Difficulty:** Medium
**Category:** Trie, String, Depth-First Search

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array of strings `words`, find the longest word in `words` such that every prefix of that word is also present in `words`. If there are ties, return the lexicographically smallest one; if none qualifies (besides single-character words that are trivially their own only prefix), return an empty string.

### Example

```
Input: words = ["k","ki","kir","kira", "kiran"]
Output: "kiran"
```

## Approach

Insert every word into a trie, marking end-of-word nodes. Then, for each word, walk the trie character by character and verify that every node visited along the way (including the final one) is marked as a complete word — this confirms every prefix exists in the input list. Track the best (longest, then lexicographically smallest) qualifying word seen.

## C# Solution

```csharp
public class Solution
{
    private class TrieNode
    {
        public TrieNode[] Children = new TrieNode[26];
        public bool IsWord;
    }

    private readonly TrieNode _root = new TrieNode();

    public string LongestWord(string[] words)
    {
        foreach (var word in words) Insert(word);

        string best = "";

        foreach (var word in words)
        {
            if (IsBuildable(word) && IsBetter(word, best)) best = word;
        }

        return best;
    }

    private void Insert(string word)
    {
        var node = _root;
        foreach (char c in word)
        {
            int i = c - 'a';
            if (node.Children[i] == null) node.Children[i] = new TrieNode();
            node = node.Children[i];
        }
        node.IsWord = true;
    }

    private bool IsBuildable(string word)
    {
        var node = _root;
        foreach (char c in word)
        {
            node = node.Children[c - 'a'];
            if (node == null || !node.IsWord) return false;
        }
        return true;
    }

    private bool IsBetter(string candidate, string current)
    {
        if (candidate.Length != current.Length) return candidate.Length > current.Length;
        return string.Compare(candidate, current, StringComparison.Ordinal) < 0;
    }
}
```

## Complexity

- **Time:** `O(sum of word lengths)` for both building the trie and validating every word.
- **Space:** `O(sum of word lengths)` for the trie nodes.
