# 1657. Determine if Two Strings Are Close

**Difficulty:** Medium
**Category:** Hash Table, String, Sorting, Counting

## Problem

Two strings are "close" if you can transform one into the other by any number of: swapping any two existing characters, or transforming every occurrence of one existing character into another existing character (and vice versa). Determine whether `word1` and `word2` are close.

### Example

```
Input: word1 = "cabbba", word2 = "abbccc"
Output: true
```

## Approach

Two strings can only be close if they use exactly the same *set* of distinct characters (swapping characters lets you rearrange freely, but only renaming operations let you convert one character into another). Beyond that, since character identities can be freely renamed, the *multiset of frequency counts* must match — sort both frequency arrays and compare.

## C# Solution

```csharp
public class Solution
{
    public bool CloseStrings(string word1, string word2)
    {
        if (word1.Length != word2.Length)
        {
            return false;
        }

        int[] count1 = new int[26];
        int[] count2 = new int[26];

        foreach (char c in word1)
        {
            count1[c - 'a']++;
        }

        foreach (char c in word2)
        {
            count2[c - 'a']++;
        }

        for (int i = 0; i < 26; i++)
        {
            if ((count1[i] == 0) != (count2[i] == 0))
            {
                return false;
            }
        }

        Array.Sort(count1);
        Array.Sort(count2);

        return count1.SequenceEqual(count2);
    }
}
```

## Complexity

- **Time:** `O(n + 26 log 26)`.
- **Space:** `O(1)` (fixed 26-slot arrays).
