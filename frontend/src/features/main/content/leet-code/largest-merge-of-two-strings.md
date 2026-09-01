# 1754. Largest Merge Of Two Strings

**Difficulty:** Medium
**Category:** String, Greedy, Two Pointers

## Problem

Given strings `word1` and `word2`, build the largest possible `merge` string by repeatedly taking the first character of either `word1` or `word2` (removing it from that string) and appending it to `merge`, until both strings are empty.

### Example

```
Input: word1 = "cabaa", word2 = "bcaaa"
Output: "cbcabaaaaa"
```

## Approach

At each step, compare the remaining suffixes of `word1` and `word2` lexicographically: take the first character of whichever remaining suffix is greater (or equal), since that choice can never be worse than the alternative. Once one string is exhausted, append the rest of the other.

## C# Solution

```csharp
public class Solution
{
    public string LargestMerge(string word1, string word2)
    {
        var sb = new System.Text.StringBuilder();
        int i = 0, j = 0;

        while (i < word1.Length && j < word2.Length)
        {
            if (string.CompareOrdinal(word1, i, word2, j, Math.Max(word1.Length - i, word2.Length - j)) > 0)
                sb.Append(word1[i++]);
            else
                sb.Append(word2[j++]);
        }

        sb.Append(word1, i, word1.Length - i);
        sb.Append(word2, j, word2.Length - j);
        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O((m + n) * max(m, n))` due to suffix comparisons.
- **Space:** `O(m + n)` for the result.
