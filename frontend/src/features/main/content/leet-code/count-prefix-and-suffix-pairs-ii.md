# 3045. Count Prefix and Suffix Pairs II

**Difficulty:** Hard
**Category:** Array, String, String Matching, Trie

## Problem

This is the larger-constraints version of [Count Prefix and Suffix Pairs I](count-prefix-and-suffix-pairs-i.md): given a 0-indexed array of strings `words` (now with a much larger total length), count the number of index pairs `(i, j)` with `i < j` such that `words[i]` is both a prefix and a suffix of `words[j]`.

## Approach

The trie-of-character-pairs technique from Part I is already linear in the total input size, so it directly scales to the larger constraints: insert each word into the trie keyed by `(word[k], word[len-1-k])` pairs, summing the per-node counts of previously-terminated words along the path as the running total for that word.

## C# Solution

```csharp
public class Solution {
    private class TrieNode {
        public Dictionary<int, TrieNode> Children = new Dictionary<int, TrieNode>();
        public int Count = 0;
    }

    public long CountPrefixSuffixPairs(string[] words) {
        long ans = 0;
        var root = new TrieNode();

        foreach (string word in words)
            ans += Insert(root, word);

        return ans;
    }

    private int Insert(TrieNode root, string word) {
        int n = word.Length;
        int count = 0;
        TrieNode node = root;
        for (int i = 0; i < n; i++) {
            int key = Hash(word[i], word[n - 1 - i]);
            if (!node.Children.TryGetValue(key, out TrieNode child)) {
                child = new TrieNode();
                node.Children[key] = child;
            }
            node = child;
            count += node.Count;
        }
        node.Count++;
        return count;
    }

    private int Hash(char prefix, char suffix) => 26 * (prefix - 'a') + (suffix - 'a');
}
```

## Complexity

- Time: O(sum of word lengths) — each character of each word does O(1) trie work.
- Space: O(sum of word lengths) — the trie nodes created.
