# 1542. Find Longest Awesome Substring

**Difficulty:** Hard
**Category:** Hash Table, String, Bit Manipulation

## Problem

Given a string `s` of digits, an "awesome" substring is one that can be rearranged to form a palindrome. Return the length of the longest awesome substring of `s`.

### Example

```
Input: s = "3242415"
Output: 5
Explanation: "24241" can be rearranged to "24142", a palindrome.
```

## Approach

A substring can be rearranged into a palindrome if at most one digit has an odd count. Track a 10-bit mask representing the parity (odd/even count) of each digit `0`-`9` seen in the prefix ending at each index. For two prefixes to bound a valid awesome substring, their masks must be either identical (all digit parities match, meaning zero odd digits in between) or differ in exactly one bit (one digit has odd parity in between). Store the earliest index at which each mask first occurs; for every position, check the current mask and all 10 masks obtained by flipping a single bit, and compute the resulting substring length against the earliest matching prefix index.

## C# Solution

```csharp
public class Solution
{
    public int LongestAwesome(string s)
    {
        int n = s.Length;
        var firstIndex = new Dictionary<int, int> { { 0, -1 } };
        int mask = 0;
        int best = 1;

        for (int i = 0; i < n; i++)
        {
            int digit = s[i] - '0';
            mask ^= 1 << digit;

            if (firstIndex.TryGetValue(mask, out int idx))
            {
                best = Math.Max(best, i - idx);
            }
            else
            {
                firstIndex[mask] = i;
            }

            for (int d = 0; d < 10; d++)
            {
                int candidateMask = mask ^ (1 << d);
                if (firstIndex.TryGetValue(candidateMask, out int candidateIdx))
                {
                    best = Math.Max(best, i - candidateIdx);
                }
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n * 10)` — a constant amount of extra work (10 bit-flip checks) per character.
- **Space:** `O(n)` for the mask-to-index map (bounded by `2^10` distinct masks).
