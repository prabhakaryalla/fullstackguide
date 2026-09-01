# 3093. Longest Common Suffix Queries

**Difficulty:** Hard
**Category:** Array, String, Trie

## Problem

You are given two arrays of strings, `wordsContainer` and `wordsQuery`. For every string in `wordsQuery`, find the index (into `wordsContainer`) of the word in `wordsContainer` that has the **longest common suffix** with it; break ties by the shortest such word, and if still tied, the earliest index. Return the array of chosen indices, one per query.

## Approach

Build a trie over the **reversed** words of `wordsContainer` (so shared suffixes become shared prefixes in the trie). At each trie node, record the best candidate (shortest word, earliest index) among all container words that pass through that node. To answer a query, walk the trie using the query's characters from the end backward; as long as a matching child exists, keep descending (each node visited represents a longer matched suffix), and stop when no further match is possible — the last visited node holds the best candidate for the longest matched suffix. If the very first character has no match, fall back to the overall shortest container word.

## C# Solution

```csharp
public class Solution {
    private class TrieNode {
        public TrieNode[] Children = new TrieNode[26];
        public int Length = int.MaxValue;
        public int Index = -1;
    }

    private readonly TrieNode root = new TrieNode();

    public int[] StringIndices(string[] wordsContainer, string[] wordsQuery) {
        int minIndex = 0;
        for (int i = 0; i < wordsContainer.Length; i++) {
            Insert(wordsContainer[i], i);
            if (wordsContainer[i].Length < wordsContainer[minIndex].Length)
                minIndex = i;
        }

        int[] ans = new int[wordsQuery.Length];
        for (int q = 0; q < wordsQuery.Length; q++) {
            int index = Search(wordsQuery[q]);
            ans[q] = index == -1 ? minIndex : index;
        }
        return ans;
    }

    private void Insert(string word, int index) {
        TrieNode node = root;
        for (int i = word.Length - 1; i >= 0; i--) {
            int c = word[i] - 'a';
            if (node.Children[c] == null)
                node.Children[c] = new TrieNode();
            node = node.Children[c];
            if (node.Length > word.Length) {
                node.Length = word.Length;
                node.Index = index;
            }
        }
    }

    private int Search(string word) {
        TrieNode node = root;
        for (int i = word.Length - 1; i >= 0; i--) {
            int c = word[i] - 'a';
            if (node.Children[c] == null)
                return node.Index;
            node = node.Children[c];
        }
        return node.Index;
    }
}
```

## Complexity

- Time: O(sum of container word lengths + sum of query word lengths) — each character is processed once during trie construction and once per query traversal.
- Space: O(sum of container word lengths * 26) worst case for the trie nodes.
