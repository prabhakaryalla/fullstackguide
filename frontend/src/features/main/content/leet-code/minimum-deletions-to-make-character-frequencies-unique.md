# 1647. Minimum Deletions to Make Character Frequencies Unique

**Difficulty:** Medium
**Category:** Hash Table, String, Greedy, Sorting

## Problem

Given a string `s`, return the minimum number of character deletions needed so that no two distinct characters have the same frequency.

### Example

```
Input: s = "aaabbbcc"
Output: 2
```

## Approach

Count each letter's frequency, then process the counts from largest to smallest, greedily capping each one to be strictly less than the previous (already finalized) frequency, never going below zero. The total deletions are the sum of how much each count had to be reduced.

## C# Solution

```csharp
public class Solution
{
    public int MinDeletions(string s)
    {
        int[] freq = new int[26];

        foreach (char c in s)
        {
            freq[c - 'a']++;
        }

        Array.Sort(freq);
        Array.Reverse(freq);

        int deletions = 0;
        int previousMax = int.MaxValue;

        foreach (int count in freq)
        {
            int cap = previousMax > 0 ? previousMax - 1 : 0;
            int adjusted = Math.Max(0, Math.Min(count, cap));
            deletions += count - adjusted;
            previousMax = adjusted;
        }

        return deletions;
    }
}
```

## Complexity

- **Time:** `O(n + 26 log 26)`, dominated by the scan of `s`.
- **Space:** `O(1)` (fixed 26-slot array).
