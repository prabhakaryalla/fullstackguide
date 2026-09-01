# 3042. Count Prefix and Suffix Pairs I

**Difficulty:** Easy
**Category:** Array, String, String Matching, Trie

## Problem

You are given a 0-indexed array of strings `words`. Count the number of index pairs `(i, j)` with `i < j` such that `words[i]` is both a **prefix** and a **suffix** of `words[j]`.

### Example

```
Input: words = ["a","aba","ababa","aa"]
Output: 4
Explanation: The valid pairs are (0,1), (0,2), (0,3), and (1,2) - in each pair the shorter word is
both a prefix and suffix of the longer one.
```

## Approach

For each word inserted so far, count how many previously inserted words are simultaneously a prefix and suffix of the current word. A clean way to do this in one pass is to build a trie over pairs of characters `(word[i], word[len-1-i])` — walking a word through this trie visits, at each depth, a node representing "is a prefix-and-suffix match of length so far." Each node stores how many previously-inserted words terminated exactly there; summing those counts while walking the current word's path gives the count of valid earlier words that are both prefix and suffix of it.

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

    // Inserts `word` into the trie and returns how many prior words are a prefix+suffix match of it.
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
