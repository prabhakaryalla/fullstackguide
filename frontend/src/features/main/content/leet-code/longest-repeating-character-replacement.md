# 424. Longest Repeating Character Replacement

**Difficulty:** Medium
**Category:** Hash Table, String, Sliding Window

## Problem

Given a string `s` consisting of uppercase English letters and an integer `k`, you can replace up to `k` characters with any other uppercase letter. Return the length of the longest substring containing the same letter after such replacements.

### Example

```
Input: s = "AABABBA", k = 1
Output: 4
```

### Constraints

- `1 <= s.length <= 10^5`
- `s` consists of only uppercase English letters.
- `0 <= k <= s.length`

## Approach

Use a sliding window with a character-frequency count. A window of length `windowSize` is achievable if `windowSize - maxCount <= k`, where `maxCount` is the count of the most frequent letter in the window (only those characters need replacing). Expand the window each step, and shrink from the left only when this condition is violated; the window never needs to shrink below its previous maximum size, so `maxCount` can be tracked without recomputing it after each shrink.

## C# Solution

```csharp
public class Solution
{
    public int CharacterReplacement(string s, int k)
    {
        var counts = new int[26];
        int left = 0, maxCount = 0, longest = 0;

        for (int right = 0; right < s.Length; right++)
        {
            counts[s[right] - 'A']++;
            maxCount = Math.Max(maxCount, counts[s[right] - 'A']);

            while (right - left + 1 - maxCount > k)
            {
                counts[s[left] - 'A']--;
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
- **Space:** `O(1)` — bounded by the 26-letter alphabet.
