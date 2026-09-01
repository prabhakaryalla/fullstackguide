# 1100. Find K-Length Substrings With No Repeated Characters

**Difficulty:** Medium
**Category:** String, Hash Table, Sliding Window, Counting

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string `s` and an integer `k`, return the number of substrings of length `k` that contain no repeated characters.

### Example

```
Input: s = "havefunonleetcode", k = 5
Output: 6
```

## Approach

Slide a window of exactly length `k` across `s`, maintaining a 26-letter frequency count and a running count of how many distinct letters currently appear in the window. As the window slides, adding a new character and removing the outgoing one updates both the frequency array and the distinct-letter count incrementally. A window has no repeats exactly when its distinct-letter count equals `k` (window length), since that means every character in it is unique.

## C# Solution

```csharp
public class Solution
{
    public int NumKLenSubstrNoRepeats(string s, int k)
    {
        if (k > s.Length) return 0;

        var counts = new int[26];
        int distinct = 0;
        int result = 0;

        for (int i = 0; i < s.Length; i++)
        {
            int c = s[i] - 'a';
            if (counts[c] == 0) distinct++;
            counts[c]++;

            if (i >= k)
            {
                int outC = s[i - k] - 'a';
                counts[outC]--;
                if (counts[outC] == 0) distinct--;
            }

            if (i >= k - 1 && distinct == k) result++;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass with constant-time window updates.
- **Space:** `O(1)` — a fixed 26-element counts array.
