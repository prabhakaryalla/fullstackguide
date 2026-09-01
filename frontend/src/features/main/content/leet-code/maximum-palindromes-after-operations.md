# 3035. Maximum Palindromes After Operations

**Difficulty:** Medium
**Category:** Array, String, Greedy, Counting, Sorting

## Problem

You are given an array of strings `words`. You may rearrange the characters **within** each word however you like, and you may also move characters **between** different words, as long as the total count of each letter across the whole array stays the same. Return the maximum possible number of strings in `words` that can be made into palindromes simultaneously (after redistributing characters this way).

## Approach

Every letter contributes floor(count / 2) reusable **pairs** across the whole collection — pool all of these pairs together, since characters can move freely between words. A palindrome of length `L` needs exactly `L / 2` pairs (plus, if `L` is odd, one leftover single character, which is always obtainable for free since there's no shortage of individual characters once pairs are accounted for).

To make as many words into palindromes as possible with a limited pool of pairs, greedily satisfy the **shortest** words first (they're cheapest), consuming pairs from the shared pool until it runs out.

## C# Solution

```csharp
public class Solution {
    public int MaxPalindromesAfterOperations(string[] words) {
        int ans = 0;
        int pairs = GetPairs(words);

        foreach (int length in GetSortedLengths(words)) {
            int needPairs = length / 2;
            if (pairs < needPairs)
                return ans;
            ans++;
            pairs -= needPairs;
        }

        return ans;
    }

    private int GetPairs(string[] words) {
        int pairs = 0;
        var count = new Dictionary<char, int>();
        foreach (string word in words)
            foreach (char c in word)
                count[c] = count.GetValueOrDefault(c) + 1;

        foreach (int freq in count.Values)
            pairs += freq / 2;
        return pairs;
    }

    private List<int> GetSortedLengths(string[] words) {
        var lengths = words.Select(w => w.Length).ToList();
        lengths.Sort();
        return lengths;
    }
}
```

## Complexity

- Time: O(sum of word lengths + n log n) — counting letters plus sorting the lengths.
- Space: O(n) — the letter-count map and lengths list.
