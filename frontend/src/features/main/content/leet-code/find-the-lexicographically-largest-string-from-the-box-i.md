# 3403. Find the Lexicographically Largest String From the Box I

**Difficulty:** Medium
**Category:** String, Greedy, Enumeration

## Problem

You are given a string `word` of length `n` and an integer `numFriends`. `word` is split into `numFriends` non-empty contiguous parts (a different split may be chosen every time), where each friend receives exactly one part. No two split configurations produce the same set of assigned parts twice.

Among all possible parts that any friend could receive across all valid ways of splitting `word` into `numFriends` non-empty contiguous parts, return the **lexicographically largest** string possible.

### Example

`word = "dbca"`, `numFriends = 2`

Possible non-empty contiguous parts that a friend could receive have length at most `n - numFriends + 1 = 3`. Checking all substrings of length up to 3: `"d"`, `"db"`, `"dbc"`, `"b"`, `"bc"`, `"bca"`, `"c"`, `"ca"`, `"a"`. The lexicographically largest is `"dbc"`.

## Approach

If `numFriends == 1`, the only possible part is the whole string. Otherwise, any substring can be received by some friend as long as its length does not exceed `n - numFriends + 1` (the remaining letters must be enough to give every other friend at least one character). Therefore the answer is simply the **lexicographically largest substring of `word` whose length is at most `n - numFriends + 1`**.

Since `n` is small for this variant, brute force every starting index, take a substring capped at the maximum allowed length, and keep the largest one using ordinal string comparison (which naturally treats a longer string as larger when it shares a common prefix with a shorter one).

## C# Solution

```csharp
public class Solution 
{
    public string AnswerString(string word, int numFriends) 
    {
        if (numFriends == 1) 
        {
            return word;
        }

        int n = word.Length;
        int maxLen = n - numFriends + 1;
        string best = "";
        for (int start = 0; start < n; start++) 
        {
            int len = Math.Min(maxLen, n - start);
            string candidate = word.Substring(start, len);
            if (string.CompareOrdinal(candidate, best) > 0) 
            {
                best = candidate;
            }
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(n * maxLen)
- **Space:** O(n) for the candidate substrings
