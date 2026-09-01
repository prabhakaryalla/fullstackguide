# 484. Find Permutation

**Difficulty:** Medium
**Category:** Stack, Array, Greedy
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string `s` of length `n - 1` consisting only of `'I'` (increase) and `'D'` (decrease), reconstruct the lexicographically smallest permutation of `[1, n]` such that for every position, the relation `s[i]` describes matches the permutation.

### Example

```
Input: s = "DI"
Output: [2,1,3]
```

### Constraints

- `1 <= s.length <= 10^5`
- `s[i]` is `'I'` or `'D'`.

## Approach

Start with the identity permutation `[1, 2, ..., n]`, which is already the lexicographically smallest arrangement. Every maximal run of consecutive `'D'` characters in `s` describes a range of the permutation that must be strictly decreasing; reversing the identity permutation's values across that exact range (including the boundary position after the run) produces the required descent while otherwise preserving the smallest possible ordering elsewhere.

## C# Solution

```csharp
public class Solution
{
    public int[] FindPermutation(string s)
    {
        int n = s.Length + 1;
        var result = new int[n];
        for (int i = 0; i < n; i++)
            result[i] = i + 1;

        int i2 = 0;
        while (i2 < s.Length)
        {
            int start = i2;
            while (i2 < s.Length && s[i2] == 'D')
                i2++;

            Array.Reverse(result, start, i2 - start + 1);
            i2++;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the result array.
