# 318. Maximum Product of Word Lengths

**Difficulty:** Medium
**Category:** Array, String, Bit Manipulation

## Problem

Given a string array `words`, return the maximum value of `words[i].length * words[j].length` where the two words do not share any common letters. If no such pair exists, return `0`.

### Example

```
Input: words = ["abcw","baz","foo","bar","xtfn","abcdef"]
Output: 16
Explanation: "abcw" and "xtfn" share no letters, giving a product of 4 * 4 = 16.
```

### Constraints

- `2 <= words.length <= 1000`
- `1 <= words[i].length <= 1000`
- `words[i]` consists only of lowercase English letters.

## Approach

Represent each word as a 26-bit bitmask of the letters it contains. Two words share no letters exactly when the bitwise AND of their masks is zero, which can be checked in constant time, avoiding character-by-character comparisons.

## C# Solution

```csharp
public class Solution
{
    public int MaxProduct(string[] words)
    {
        int n = words.Length;
        var masks = new int[n];

        for (int i = 0; i < n; i++)
            foreach (var c in words[i])
                masks[i] |= 1 << (c - 'a');

        int max = 0;
        for (int i = 0; i < n; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                if ((masks[i] & masks[j]) == 0)
                    max = Math.Max(max, words[i].Length * words[j].Length);
            }
        }

        return max;
    }
}
```

## Complexity

- **Time:** `O(n^2 + L)`, where `L` is the total length of all words (for mask construction).
- **Space:** `O(n)` for the bitmasks.
