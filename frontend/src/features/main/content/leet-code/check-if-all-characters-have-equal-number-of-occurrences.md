# 1941. Check if All Characters Have Equal Number of Occurrences

**Difficulty:** Easy
**Category:** Hash Table, String, Counting

## Problem

Given a string `s`, return `true` if every distinct character in `s` occurs the same number of times.

### Example

```
Input: s = "abacbc"
Output: true
Explanation: 'a', 'b', and 'c' each occur exactly twice.
```

### Constraints

- `1 <= s.length <= 1000`
- `s` consists only of lowercase English letters.

## Approach

Count the frequency of each character using a fixed-size array (26 letters), then compare all non-zero frequencies — if they are all equal, return `true`.

## C# Solution

```csharp
public class Solution
{
    public bool AreOccurrencesEqual(string s)
    {
        int[] count = new int[26];
        foreach (char c in s)
        {
            count[c - 'a']++;
        }

        int expected = -1;
        foreach (int c in count)
        {
            if (c == 0) continue;
            if (expected == -1) expected = c;
            else if (expected != c) return false;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass to count plus a constant pass over 26 buckets.
- **Space:** `O(1)` for the fixed-size count array.
