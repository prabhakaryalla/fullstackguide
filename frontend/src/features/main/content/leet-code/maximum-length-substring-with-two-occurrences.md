# 3090. Maximum Length Substring With Two Occurrences

**Difficulty:** Easy
**Category:** Hash Table, String, Sliding Window

## Problem

Given a string `s`, return the length of the longest substring such that every character in it appears at most twice.

### Example

```
Input: s = "bcbbbcba"
Output: 4
Explanation: "bcbbbcba" -> the substring "bcbb" has 'b' appearing twice at most... the actual longest valid
window is "bcbb" or similar of length 4 where no letter exceeds 2 occurrences within the window.
```

## Approach

Use a sliding window with a 26-slot frequency counter. Expand the right edge, incrementing the current character's count; while that character's count exceeds `2`, shrink from the left. Track the maximum window length seen.

## C# Solution

```csharp
public class Solution {
    public int MaximumLengthSubstring(string s) {
        int ans = 0;
        int[] count = new int[26];
        int l = 0;

        for (int r = 0; r < s.Length; r++) {
            count[s[r] - 'a']++;
            while (count[s[r] - 'a'] > 2)
                count[s[l++] - 'a']--;
            ans = Math.Max(ans, r - l + 1);
        }

        return ans;
    }
}
```

## Complexity

- Time: O(n) — each character is added and removed from the window at most once.
- Space: O(1) — a fixed 26-slot frequency array.
