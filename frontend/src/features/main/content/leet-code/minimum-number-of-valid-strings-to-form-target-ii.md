# 3292. Minimum Number of Valid Strings to Form Target II

**Difficulty:** Hard
**Category:** Array, String, Dynamic Programming, Trie, Greedy, Binary Search

## Problem

You are given an array of strings `words` and a string `target`. A string is considered valid if it is a prefix of any string in `words`. Return the minimum number of valid strings that can be concatenated to form `target`. If it is impossible, return `-1`. This version has larger input sizes than the "I" variant of the problem.

### Example

```
Input: words = ["abc","aaaaa","bcdef"], target = "aabcdabc"
Output: 3
```

## Approach

Build a trie containing all strings in `words`; every node in the trie represents a valid prefix. For every starting index `i` in `target`, walk down the trie while matching characters of `target` to find the maximum length `maxLen[i]` of a valid string that can start at position `i`. This turns the problem into a jump-game style problem: from position `i`, you can jump to any position up to `i + maxLen[i]`. Apply the standard greedy "Jump Game II" technique to find the minimum number of jumps needed to reach position `target.Length`, returning `-1` if some position cannot be reached because no valid string starts there.

## C# Solution

```csharp
public class Solution 
{
    private class TrieNode 
    {
        public TrieNode[] Children = new TrieNode[26];
    }

    public int MinValidStrings(string[] words, string target) 
    {
        TrieNode root = new TrieNode();

        foreach (string word in words) 
        {
            TrieNode node = root;
            foreach (char c in word) 
            {
                int idx = c - 'a';
                if (node.Children[idx] == null) node.Children[idx] = new TrieNode();
                node = node.Children[idx];
            }
        }

        int n = target.Length;
        int[] maxLen = new int[n];

        for (int i = 0; i < n; i++) 
        {
            TrieNode node = root;
            int depth = 0;

            for (int j = i; j < n; j++) 
            {
                int idx = target[j] - 'a';
                if (node.Children[idx] == null) break;
                node = node.Children[idx];
                depth++;
            }

            maxLen[i] = depth;
        }

        int jumps = 0;
        int currentEnd = 0;
        int farthest = 0;

        for (int i = 0; i < n; i++) 
        {
            if (i > currentEnd) return -1;

            farthest = Math.Max(farthest, i + maxLen[i]);

            if (i == currentEnd) 
            {
                if (farthest == currentEnd) return -1;
                jumps++;
                currentEnd = farthest;
                if (currentEnd >= n) return jumps;
            }
        }

        return currentEnd >= n ? jumps : -1;
    }
}
```

## Complexity

- **Time:** O(n * maxWordLength) for the trie walk, O(n) for the greedy jump pass
- **Space:** O(totalWordsLength)
