# 1234. Replace the Substring for Balanced String

**Difficulty:** Medium
**Category:** String, Sliding Window

## Problem

A string of length `n` made only of `'Q'`, `'W'`, `'E'`, `'R'` is balanced when each character occurs exactly `n / 4` times. Given such a string `s` (not necessarily balanced), return the minimum length of a substring that can be replaced to make `s` balanced.

### Example

```
Input: s = "QWER"
Output: 0
```

## Approach

Count occurrences of each of the four characters. If every count is already at most `n / 4`, the string is balanced and the answer is `0`. Otherwise, use a sliding window over `s`: shrinking characters out of the window from the counts represents "candidates to replace." Find the smallest window such that the counts of the four characters *outside* the window are all `<= n / 4` — that window contains exactly the excess characters that must be swapped out.

## C# Solution

```csharp
public class Solution
{
    public int BalancedString(string s)
    {
        int n = s.Length;
        int target = n / 4;
        var count = new Dictionary<char, int> { { 'Q', 0 }, { 'W', 0 }, { 'E', 0 }, { 'R', 0 } };

        foreach (char c in s) count[c]++;

        bool IsBalanced() => count.Values.All(v => v <= target);

        if (IsBalanced()) return 0;

        int left = 0, minLength = n;

        for (int right = 0; right < n; right++)
        {
            count[s[right]]--;

            while (left <= right && IsBalanced())
            {
                minLength = Math.Min(minLength, right - left + 1);
                count[s[left]]++;
                left++;
            }
        }

        return minLength;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of `s`.
- **Space:** `O(1)`.
