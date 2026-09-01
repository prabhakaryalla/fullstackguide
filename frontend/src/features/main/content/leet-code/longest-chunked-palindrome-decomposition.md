# 1147. Longest Chunked Palindrome Decomposition

**Difficulty:** Hard
**Category:** Two Pointers, String, Hash Function, Dynamic Programming

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a string `text`, split it into the maximum number of consecutive substrings `s1, s2, ..., sk` (their concatenation equals `text`) such that the sequence reads the same forwards as backwards chunk-by-chunk: `si == reverse(s(k+1-i))` for every `i`. Return the maximum possible `k`.

### Example

```
Input: text = "ghiabcdefhelloadamhelloabcdefghi"
Output: 7
```

## Approach

Use two pointers growing inward from both ends of the string, accumulating a candidate prefix chunk and the mirrored suffix chunk one character at a time. As soon as the accumulated prefix equals the accumulated (reversed) suffix, that's a valid matched pair — count it as two chunks and reset both accumulators, continuing with the remaining middle portion. Whatever is left unmatched in the very middle (even a single character) forms one final, self-mirrored chunk.

## C# Solution

```csharp
public class Solution
{
    public int LongestDecomposition(string text)
    {
        int n = text.Length;
        int left = 0, right = n - 1, count = 0;
        var prefix = new StringBuilder();
        var suffix = new StringBuilder();

        while (left < right)
        {
            prefix.Append(text[left]);
            suffix.Insert(0, text[right]);
            left++;
            right--;

            if (prefix.ToString() == suffix.ToString())
            {
                count += 2;
                prefix.Clear();
                suffix.Clear();
            }
        }

        if (prefix.Length > 0 || left == right) count++;

        return count;
    }
}
```

## Complexity

- **Time:** `O(n^2)` worst case, due to string comparisons.
- **Space:** `O(n)` for the accumulator buffers.
