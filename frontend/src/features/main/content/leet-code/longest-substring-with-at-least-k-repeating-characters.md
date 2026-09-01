# 395. Longest Substring with At Least K Repeating Characters

**Difficulty:** Medium
**Category:** Hash Table, String, Divide and Conquer, Sliding Window

## Problem

Given a string `s` and an integer `k`, return the length of the longest substring of `s` such that the frequency of each character in this substring is greater than or equal to `k`.

### Example

```
Input: s = "aaabb", k = 3
Output: 3
Explanation: "aaa" is the longest substring where 'a' occurs 3 times.
```

### Constraints

- `1 <= s.length <= 10^4`
- `0 <= k <= 10^5`
- `s` consists of only lowercase English letters.

## Approach

Count character frequencies over the current range; any character occurring fewer than `k` times can never be part of a valid answer, so it must act as a hard split point. Recursively solve the two substrings on either side of the first such disqualifying character (skipping any run of such characters), and take the best of the two recursive results; if no character disqualifies the whole range, the entire range is itself a valid answer.

## C# Solution

```csharp
public class Solution
{
    public int LongestSubstring(string s, int k)
    {
        return Solve(s, 0, s.Length, k);
    }

    private int Solve(string s, int start, int end, int k)
    {
        if (end - start < k) return 0;

        var counts = new int[26];
        for (int i = start; i < end; i++)
            counts[s[i] - 'a']++;

        for (int i = start; i < end; i++)
        {
            if (counts[s[i] - 'a'] >= k) continue;

            int splitIndex = i;
            while (splitIndex < end && counts[s[splitIndex] - 'a'] < k)
                splitIndex++;

            int left = Solve(s, start, i, k);
            int right = Solve(s, splitIndex, end, k);
            return Math.Max(left, right);
        }

        return end - start;
    }
}
```

## Complexity

- **Time:** `O(26 * n)` in the worst case, since each recursion level scans its range and there are at most 26 levels of splitting.
- **Space:** `O(26)` per call frame, with recursion depth up to 26.
