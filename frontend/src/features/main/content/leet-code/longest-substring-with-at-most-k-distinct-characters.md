# 340. Longest Substring with At Most K Distinct Characters

**Difficulty:** Medium
**Category:** Hash Table, String, Sliding Window
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string `s` and an integer `k`, return the length of the longest substring of `s` that contains at most `k` distinct characters.

### Example

```
Input: s = "eceba", k = 2
Output: 3
Explanation: "ece" has 2 distinct characters and length 3.
```

### Constraints

- `1 <= s.length <= 5 * 10^4`
- `0 <= k <= 50`

## Approach

Maintain a sliding window with a character-frequency count. Expand the window by one character each step; whenever the number of distinct characters in the window exceeds `k`, shrink from the left (decrementing and removing characters as their count hits zero) until the window is valid again, tracking the maximum window size seen.

## C# Solution

```csharp
public class Solution
{
    public int LengthOfLongestSubstringKDistinct(string s, int k)
    {
        if (k == 0) return 0;

        var counts = new Dictionary<char, int>();
        int left = 0, longest = 0;

        for (int right = 0; right < s.Length; right++)
        {
            counts[s[right]] = counts.GetValueOrDefault(s[right]) + 1;

            while (counts.Count > k)
            {
                counts[s[left]]--;
                if (counts[s[left]] == 0) counts.Remove(s[left]);
                left++;
            }

            longest = Math.Max(longest, right - left + 1);
        }

        return longest;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(k)` for the character count map.
