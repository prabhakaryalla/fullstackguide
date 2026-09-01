# 2743. Count Substrings Without Repeating Character

**Difficulty:** Medium
**Category:** Hash Table, String, Sliding Window
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a string `s` consisting of lowercase English letters. Return the number of substrings of `s` in which every character appears at most once (no character repeats within the substring).

### Example

Input: s = "aab"
Output: 4
Explanation: The valid substrings are "a" (index 0), "a" (index 1), "b" (index 2), and "ab" (indices 1-2). "aa" and "aab" both repeat 'a', so they don't count.

## Approach

Use a sliding window with two pointers `left` and `right`, tracking the last seen index of each character. Whenever the character at `right` was already seen inside the current window, move `left` forward past its previous occurrence. For every valid window ending at `right`, all substrings ending at `right` and starting anywhere within `[left, right]` have no repeating characters, so add `right - left + 1` to the running total.

## C# Solution

```csharp
public class Solution 
{
    public long CountSubstringsWithoutRepeat(string s) 
    {
        var lastSeen = new int[26];
        Array.Fill(lastSeen, -1);

        long count = 0;
        int left = 0;
        for (int right = 0; right < s.Length; right++) 
        {
            int c = s[right] - 'a';
            if (lastSeen[c] >= left) left = lastSeen[c] + 1;
            lastSeen[c] = right;
            count += right - left + 1;
        }

        return count;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1) (26-letter alphabet)
