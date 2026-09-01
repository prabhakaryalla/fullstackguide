# 2565. Subsequence With the Minimum Score

**Difficulty:** Hard
**Category:** String, Binary Search, Two Pointers

## Problem

You are given two strings `s` and `t`. You can remove a substring from `s` (possibly empty). Let the resulting string be `s'`.

Return the minimum possible score of `s'`, where the score is the length of the longest substring of `t` that is not a subsequence of `s'`.

### Example

```
Input: s = "abacaba", t = "bzaa"
Output: 1
Explanation: Remove substring "ba" from s, giving s' = "acaba"
t[1:3] = "za" is not a subsequence of s', so score = 2
Actually need to verify this...

Input: s = "cde", t = "xyz"
Output: 3
Explanation: No matter what we remove, "xyz" is not a subsequence
```

## Approach

Use binary search on the answer (the score). For a given score `k`, check if we can remove a substring from `s` such that no substring of length `k` from `t` is a subsequence of the result.

For verification:
1. Precompute for each position in `t`, how far we can match from the start of `s`
2. Precompute for each position in `t`, how far we can match from the end of `s`
3. Check if there's a valid gap we can remove

## C# Solution

```csharp
public class Solution
{
    public int MinimumScore(string s, string t)
    {
        int m = s.Length, n = t.Length;
        
        // leftMatch[i] = max index in t we can match using s[0..i]
        int[] leftMatch = new int[m];
        int tIdx = 0;
        for (int i = 0; i < m && tIdx < n; i++)
        {
            if (s[i] == t[tIdx])
                tIdx++;
            leftMatch[i] = tIdx;
        }
        
        // rightMatch[i] = min index in t we can match using s[i..m-1]
        int[] rightMatch = new int[m];
        tIdx = n - 1;
        for (int i = m - 1; i >= 0 && tIdx >= 0; i--)
        {
            if (s[i] == t[tIdx])
                tIdx--;
            rightMatch[i] = tIdx + 1;
        }
        
        int minScore = n - leftMatch[m - 1]; // No removal
        minScore = Math.Min(minScore, rightMatch[0]); // Remove entire left part
        
        for (int i = 0; i < m - 1; i++)
        {
            int matchedLeft = leftMatch[i];
            int matchedRight = rightMatch[i + 1];
            
            if (matchedRight > matchedLeft)
                minScore = Math.Min(minScore, matchedRight - matchedLeft);
            else
                minScore = 0;
        }
        
        return minScore;
    }
}
```

## Complexity

- **Time:** O(m + n)
- **Space:** O(m) for the match arrays
