# 1915. Number of Wonderful Substrings

**Difficulty:** Medium
**Category:** Hash Table, String, Bit Manipulation, Prefix Sum

## Problem

A string is "wonderful" if at most one letter appears an odd number of times in it. Given a string `word` consisting only of the first ten lowercase letters (`'a'` to `'j'`), return the number of wonderful non-empty substrings of `word`.

### Example

```
Input: word = "aba"
Output: 4
Explanation: The wonderful substrings are "a", "b", "a", and "aba" (each has at most one letter with an odd count).
```

### Constraints

- `1 <= word.length <= 2 * 10^5`
- `word` consists of lowercase English letters from `'a'` to `'j'`.

## Approach

Represent the parity of each of the 10 letters' counts as a 10-bit mask, and maintain a running prefix XOR mask while scanning `word` left to right. A substring `word[i+1..j]` has parity mask `prefixMask[j] XOR prefixMask[i]`. It is wonderful if that XOR is `0` (all even) or a power of two (exactly one odd letter). For each prefix mask, add the count of previously seen equal masks (mask XOR mask = 0) plus, for each of the 10 bits, the count of previously seen masks that differ by exactly that one bit. Use a frequency dictionary keyed by mask (up to 1024 possible values) updated as we scan.

## C# Solution

```csharp
public class Solution
{
    public long WonderfulSubstrings(string word)
    {
        var freq = new long[1024];
        freq[0] = 1;
        int mask = 0;
        long answer = 0;

        foreach (char c in word)
        {
            mask ^= 1 << (c - 'a');
            answer += freq[mask];

            for (int bit = 0; bit < 10; bit++)
            {
                int target = mask ^ (1 << bit);
                answer += freq[target];
            }

            freq[mask]++;
        }

        return answer;
    }
}
```

## Complexity

- **Time:** `O(n * 10)` — a constant amount of work (10 bit checks) per character.
- **Space:** `O(1024)` for the fixed-size frequency array.
