# 1048. Longest String Chain

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Dynamic Programming, Sorting

## Problem

Given an array of strings `words`, a string chain is a sequence where each word is formed from the previous one by inserting exactly one letter anywhere (without reordering the other letters). Return the length of the longest possible word chain that can be formed using words from `words`.

### Example

```
Input: words = ["a","b","ba","bca","bda","bdca"]
Output: 4
```

## Approach

Sort words by length so every potential predecessor is processed before its successors. For each word, try removing one character at each position to generate all of its possible "predecessors"; if a predecessor exists in the DP map, the chain ending at the current word can extend it by one. Track the best chain length found for each word and the overall maximum.

## C# Solution

```csharp
public class Solution
{
    public int LongestStrChain(string[] words)
    {
        Array.Sort(words, (a, b) => a.Length.CompareTo(b.Length));
        var dp = new Dictionary<string, int>();
        int best = 1;

        foreach (var word in words)
        {
            int longest = 1;

            for (int i = 0; i < word.Length; i++)
            {
                string predecessor = word.Remove(i, 1);
                if (dp.TryGetValue(predecessor, out var length))
                {
                    longest = Math.Max(longest, length + 1);
                }
            }

            dp[word] = longest;
            best = Math.Max(best, longest);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(sum of word lengths squared)` — building predecessors costs `O(L)` per character removed.
- **Space:** `O(words.Length)` for the DP map.
