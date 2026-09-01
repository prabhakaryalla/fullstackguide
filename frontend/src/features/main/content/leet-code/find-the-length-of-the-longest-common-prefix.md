# 3043. Find the Length of the Longest Common Prefix

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Trie

## Problem

You are given two arrays of positive integers `arr1` and `arr2`. Find the length of the longest common prefix among all pairs of integers `(x, y)` such that `x` is from `arr1` and `y` is from `arr2` (comparing their decimal string representations). If no pair shares any common prefix, return `0`.

### Example

```
Input: arr1 = [1,10,100], arr2 = [1000]
Output: 3
Explanation: "100" is a common prefix of "1000" shared with the number 100 from arr1 (length 3).
```

## Approach

Insert every number from `arr1` (as its digit string) into a trie keyed by digit (`0`-`9`). Then, for each number in `arr2`, walk the trie as far as possible following its digits, counting how many characters matched before falling off the trie (either a digit not present, or the string ended) — that count is the longest prefix shared with *some* number in `arr1`. Track the maximum across all of `arr2`.

## C# Solution

```csharp
public class Solution {
    private class TrieNode {
        public TrieNode[] Children = new TrieNode[10];
    }

    private TrieNode root = new TrieNode();

    public int LongestCommonPrefix(int[] arr1, int[] arr2) {
        int ans = 0;
        foreach (int num in arr1)
            Insert(num.ToString());
        foreach (int num in arr2)
            ans = Math.Max(ans, Search(num.ToString()));
        return ans;
    }

    private void Insert(string word) {
        TrieNode node = root;
        foreach (char c in word) {
            int i = c - '0';
            if (node.Children[i] == null)
                node.Children[i] = new TrieNode();
            node = node.Children[i];
        }
    }

    private int Search(string word) {
        int prefixLength = 0;
        TrieNode node = root;
        foreach (char c in word) {
            int i = c - '0';
            if (node.Children[i] == null)
                break;
            node = node.Children[i];
            prefixLength++;
        }
        return prefixLength;
    }
}
```

## Complexity

- Time: O(|arr1| + |arr2|) — each digit does O(1) trie work, times the total digit count.
- Space: O(|arr1|) — the trie nodes created while inserting `arr1`.
