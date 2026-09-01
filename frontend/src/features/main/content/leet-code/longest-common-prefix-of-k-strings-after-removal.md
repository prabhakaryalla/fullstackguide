# 3485. Longest Common Prefix of K Strings After Removal

**Difficulty:** Hard
**Category:** Array, String, Trie

## Problem
You are given an array of strings `words` and an integer `k`.

For every index `i`, find the length of the longest common prefix shared by at least `k` strings chosen from `words` after removing the element at index `i`. If fewer than `k` strings remain, the answer for that index is 0. Return an array `answer` where `answer[i]` is the result for index `i`.

### Example
Input: `words = ["jump", "run", "run", "jump", "run"]`, `k = 2`
Output: `[3, 4, 4, 3, 4]`
Explanation: Removing index 0 leaves `["run", "run", "jump", "run"]`; `"run"` occurs 3 times, giving a common prefix of length 3. Removing index 1 leaves two `"jump"`s, giving a common prefix of length 4. The remaining indices follow similarly.

## Approach
Build a trie over all words, where each trie node tracks how many words pass through it. For each depth (prefix length), maintain a count of how many trie nodes at that depth have at least `k` passing words; a prefix length is "achievable" whenever this count is positive, and we always want the largest achievable prefix length.

For each index `i`, temporarily remove `words[i]` from the trie (decrementing counts along its path and updating the achievable-length set), record the current longest achievable prefix length as `answer[i]`, then re-insert `words[i]` before moving to the next index.

## C# Solution

```csharp
public class Solution {
    private class TrieNode {
        public TrieNode[] Children = new TrieNode[26];
        public int Count = 0;
    }

    private int k;
    private TrieNode root = new TrieNode();
    private Dictionary<int, int> prefixLengthsCount = new Dictionary<int, int>();
    private SortedSet<int> prefixLengths = new SortedSet<int>();

    public int[] LongestCommonPrefix(string[] words, int k) {
        this.k = k;
        foreach (var word in words) Insert(word);

        int[] ans = new int[words.Length];
        for (int idx = 0; idx < words.Length; idx++) {
            Erase(words[idx]);
            ans[idx] = prefixLengths.Count == 0 ? 0 : prefixLengths.Max;
            Insert(words[idx]);
        }
        return ans;
    }

    private void Insert(string word) {
        TrieNode node = root;
        for (int i = 0; i < word.Length; i++) {
            int size = i + 1;
            int index = word[i] - 'a';
            if (node.Children[index] == null) node.Children[index] = new TrieNode();
            node = node.Children[index];
            node.Count++;
            if (node.Count >= k) {
                prefixLengthsCount.TryGetValue(size, out int c);
                if (c == 0) prefixLengths.Add(size);
                prefixLengthsCount[size] = c + 1;
            }
        }
    }

    private void Erase(string word) {
        TrieNode node = root;
        for (int i = 0; i < word.Length; i++) {
            int size = i + 1;
            int index = word[i] - 'a';
            node = node.Children[index];
            if (node.Count == k) {
                prefixLengthsCount.TryGetValue(size, out int c);
                if (c == 1) prefixLengths.Remove(size);
                prefixLengthsCount[size] = c - 1;
            }
            node.Count--;
        }
    }
}
```

## Complexity

- **Time:** O(sum of word lengths)
- **Space:** O(sum of word lengths)
